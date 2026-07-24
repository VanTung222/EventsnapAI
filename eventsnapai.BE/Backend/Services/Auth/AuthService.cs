using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;
using Backend.Data;
using Backend.Models;
using Backend.Models.Auth;
using Backend.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Services.Auth;

public sealed class AuthService : IAuthService
{
    private static readonly string[] RolePriority = ["admin", "organizer", "check-in", "attendee"];
    private static readonly HashSet<string> AllowedRoles = new(RolePriority, StringComparer.OrdinalIgnoreCase);

    private readonly EventSnapDbContext _dbContext;
    private readonly JwtOptions _jwtOptions;
    private readonly GoogleAuthOptions _googleOptions;
    private readonly IHttpClientFactory _httpClientFactory;

    public AuthService(
        EventSnapDbContext dbContext,
        IOptions<JwtOptions> jwtOptions,
        IOptions<GoogleAuthOptions> googleOptions,
        IHttpClientFactory httpClientFactory)
    {
        _dbContext = dbContext;
        _jwtOptions = jwtOptions.Value;
        _googleOptions = googleOptions.Value;
        _httpClientFactory = httpClientFactory;
    }

    public async Task<AuthResponse?> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
    {
        var email = NormalizeEmail(request.Email);
        var user = await LoadActiveUserByEmailAsync(email, cancellationToken);

        if (user is null || string.IsNullOrWhiteSpace(user.PasswordHash) || !VerifyPassword(request.Password, user.PasswordHash))
        {
            return null;
        }

        user.FailedLoginCount = 0;
        user.LastLoginAt = DateTime.UtcNow;
        user.UpdatedAt = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return CreateAuthResponse(user);
    }

    public async Task<AuthResponse?> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default)
    {
        var email = NormalizeEmail(request.Email);
        var roleCode = NormalizeRole(request.Role);

        if (roleCode is "admin")
        {
            roleCode = "attendee";
        }

        var exists = await _dbContext.Users.AnyAsync(
            user => user.Email.ToLower() == email && user.DeletedAt == null,
            cancellationToken);

        if (exists)
        {
            return null;
        }

        var role = await EnsureRoleAsync(roleCode, cancellationToken);
        var now = DateTime.UtcNow;
        var user = new User
        {
            PublicId = Guid.NewGuid(),
            Email = email,
            PasswordHash = HashPassword(request.Password),
            AccountStatus = "ACTIVE",
            EmailVerifiedAt = null,
            FailedLoginCount = 0,
            CreatedAt = now,
            UpdatedAt = now,
            UserProfile = new UserProfile
            {
                FullName = request.Name.Trim(),
                CreatedAt = now,
                UpdatedAt = now
            }
        };

        user.UserRoleUsers.Add(new UserRole
        {
            Role = role,
            AssignedAt = now
        });

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return CreateAuthResponse(user);
    }

    public async Task<AuthResponse?> LoginWithGoogleAsync(GoogleLoginRequest request, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(_googleOptions.ClientId))
        {
            return null;
        }

        var client = _httpClientFactory.CreateClient("GoogleAuth");
        var tokenInfo = await client.GetFromJsonAsync<GoogleTokenInfo>(
            $"tokeninfo?id_token={Uri.EscapeDataString(request.IdToken)}",
            cancellationToken);

        if (tokenInfo is null ||
            string.IsNullOrWhiteSpace(tokenInfo.Subject) ||
            string.IsNullOrWhiteSpace(tokenInfo.Email) ||
            !string.Equals(tokenInfo.Audience, _googleOptions.ClientId, StringComparison.Ordinal) ||
            !string.Equals(tokenInfo.EmailVerified, "true", StringComparison.OrdinalIgnoreCase))
        {
            return null;
        }

        var email = NormalizeEmail(tokenInfo.Email);
        var user = await _dbContext.ExternalLogins
            .Include(externalLogin => externalLogin.User)
                .ThenInclude(existingUser => existingUser.UserProfile)
            .Include(externalLogin => externalLogin.User)
                .ThenInclude(existingUser => existingUser.UserRoleUsers)
                    .ThenInclude(userRole => userRole.Role)
            .Where(externalLogin => externalLogin.Provider == "GOOGLE" && externalLogin.ProviderUserId == tokenInfo.Subject)
            .Select(externalLogin => externalLogin.User)
            .FirstOrDefaultAsync(cancellationToken);

        if (user is null)
        {
            user = await LoadActiveUserByEmailAsync(email, cancellationToken);
            if (user is null)
            {
                var role = await EnsureRoleAsync("attendee", cancellationToken);
                var now = DateTime.UtcNow;
                user = new User
                {
                    PublicId = Guid.NewGuid(),
                    Email = email,
                    PasswordHash = null,
                    AccountStatus = "ACTIVE",
                    EmailVerifiedAt = now,
                    FailedLoginCount = 0,
                    CreatedAt = now,
                    UpdatedAt = now,
                    UserProfile = new UserProfile
                    {
                        FullName = tokenInfo.Name ?? email.Split('@')[0],
                        CreatedAt = now,
                        UpdatedAt = now
                    }
                };

                user.UserRoleUsers.Add(new UserRole
                {
                    Role = role,
                    AssignedAt = now
                });

                _dbContext.Users.Add(user);
            }

            user.ExternalLogins.Add(new ExternalLogin
            {
                Provider = "GOOGLE",
                ProviderUserId = tokenInfo.Subject,
                ProviderEmail = email,
                CreatedAt = DateTime.UtcNow
            });
        }

        user.EmailVerifiedAt ??= DateTime.UtcNow;
        user.LastLoginAt = DateTime.UtcNow;
        user.UpdatedAt = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return CreateAuthResponse(user);
    }

    public AuthUserResponse? GetCurrentUser(ClaimsPrincipal principal)
    {
        var id = principal.FindFirstValue(JwtRegisteredClaimNames.Sub) ?? principal.FindFirstValue(ClaimTypes.NameIdentifier);
        var email = principal.FindFirstValue(JwtRegisteredClaimNames.Email) ?? principal.FindFirstValue(ClaimTypes.Email);
        var name = principal.FindFirstValue(JwtRegisteredClaimNames.Name) ?? principal.Identity?.Name;
        var role = GetPrimaryRole(principal.FindAll(ClaimTypes.Role).Select(claim => claim.Value));

        if (string.IsNullOrWhiteSpace(id) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(role))
        {
            return null;
        }

        return new AuthUserResponse(id, name ?? email, email, role);
    }

    private async Task<User?> LoadActiveUserByEmailAsync(string email, CancellationToken cancellationToken)
    {
        return await _dbContext.Users
            .Include(user => user.UserProfile)
            .Include(user => user.UserRoleUsers)
                .ThenInclude(userRole => userRole.Role)
            .FirstOrDefaultAsync(
                user => user.Email.ToLower() == email && user.DeletedAt == null && user.AccountStatus == "ACTIVE",
                cancellationToken);
    }

    private async Task<Role> EnsureRoleAsync(string roleCode, CancellationToken cancellationToken)
    {
        var appRole = NormalizeRole(roleCode);
        var dbRoleCode = ToDbRoleCode(appRole);
        var role = await _dbContext.Roles.FirstOrDefaultAsync(
            item => item.Code == dbRoleCode,
            cancellationToken);

        if (role is not null)
        {
            return role;
        }

        role = new Role
        {
            Code = dbRoleCode,
            Name = GetRoleName(appRole),
            Description = $"EventSnap AI {GetRoleName(appRole)} role",
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.Roles.Add(role);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return role;
    }

    private AuthResponse CreateAuthResponse(User user)
    {
        var roles = user.UserRoleUsers
            .Select(userRole => ToAppRole(userRole.Role.Code))
            .Where(role => !string.IsNullOrWhiteSpace(role))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

        if (roles.Length == 0)
        {
            roles = ["attendee"];
        }

        var primaryRole = GetPrimaryRole(roles);
        var expiresAt = DateTime.UtcNow.AddMinutes(_jwtOptions.AccessTokenMinutes);
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Key));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var name = user.UserProfile?.FullName ?? user.Email;

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.PublicId.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(JwtRegisteredClaimNames.Name, name),
            new(ClaimTypes.NameIdentifier, user.PublicId.ToString()),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Name, name),
            new("user_id", user.UserId.ToString())
        };

        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var token = new JwtSecurityToken(
            issuer: _jwtOptions.Issuer,
            audience: _jwtOptions.Audience,
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials);

        return new AuthResponse(
            new JwtSecurityTokenHandler().WriteToken(token),
            expiresAt,
            new AuthUserResponse(user.PublicId.ToString(), name, user.Email, primaryRole),
            GetRedirectPath(primaryRole));
    }

    private static string GetRedirectPath(string role) => NormalizeRole(role) switch
    {
        "admin" => "/admin",
        "organizer" => "/organizer/dashboard",
        "check-in" => "/check-in",
        _ => "/attendee/dashboard"
    };

    private static string GetPrimaryRole(IEnumerable<string> roles)
    {
        var normalizedRoles = roles.Select(NormalizeRole).ToHashSet(StringComparer.OrdinalIgnoreCase);
        return RolePriority.FirstOrDefault(normalizedRoles.Contains) ?? "attendee";
    }

    private static string GetRoleName(string role) => NormalizeRole(role) switch
    {
        "admin" => "Admin",
        "organizer" => "Organizer",
        "check-in" => "Check-in Staff",
        _ => "Attendee"
    };

    private static string ToDbRoleCode(string role) => NormalizeRole(role) switch
    {
        "admin" => "ADMIN",
        "organizer" => "ORGANIZER",
        "check-in" => "CHECK_IN",
        _ => "ATTENDEE"
    };

    private static string ToAppRole(string roleCode) => roleCode.Trim().ToUpperInvariant() switch
    {
        "ADMIN" => "admin",
        "ORGANIZER" => "organizer",
        "CHECK_IN" => "check-in",
        "CHECKIN_STAFF" => "check-in",
        _ => "attendee"
    };

    private static string NormalizeEmail(string email) => email.Trim().ToLowerInvariant();

    private static string NormalizeRole(string role)
    {
        var normalized = role.Trim().ToLowerInvariant().Replace("_", "-");
        return AllowedRoles.Contains(normalized) ? normalized : "attendee";
    }

    internal static string HashPassword(string password)
    {
        var salt = RandomNumberGenerator.GetBytes(16);
        var hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, 100_000, HashAlgorithmName.SHA256, 32);
        return $"pbkdf2${Convert.ToBase64String(salt)}${Convert.ToBase64String(hash)}";
    }

    private static bool VerifyPassword(string password, string storedHash)
    {
        var parts = storedHash.Split('$');
        if (parts.Length != 3 || parts[0] != "pbkdf2")
        {
            return false;
        }

        try
        {
            var salt = Convert.FromBase64String(parts[1]);
            var expectedHash = Convert.FromBase64String(parts[2]);
            var actualHash = Rfc2898DeriveBytes.Pbkdf2(password, salt, 100_000, HashAlgorithmName.SHA256, 32);
            return CryptographicOperations.FixedTimeEquals(actualHash, expectedHash);
        }
        catch (FormatException)
        {
            return false;
        }
    }

    private sealed class GoogleTokenInfo
    {
        [JsonPropertyName("sub")]
        public string? Subject { get; set; }

        [JsonPropertyName("aud")]
        public string? Audience { get; set; }

        [JsonPropertyName("email")]
        public string? Email { get; set; }

        [JsonPropertyName("email_verified")]
        public string? EmailVerified { get; set; }

        [JsonPropertyName("name")]
        public string? Name { get; set; }
    }
}
