using Backend.Data;
using Backend.Models;
using Backend.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Backend.Services.Auth;

public sealed class AuthDataSeeder
{
    private static readonly (string Code, string Name)[] DefaultRoles =
    [
        ("ATTENDEE", "Attendee"),
        ("ORGANIZER", "Organizer"),
        ("CHECK_IN", "Check-in Staff"),
        ("ADMIN", "Admin")
    ];

    private readonly EventSnapDbContext _dbContext;
    private readonly AdminAccountOptions _adminOptions;

    public AuthDataSeeder(EventSnapDbContext dbContext, IOptions<AdminAccountOptions> adminOptions)
    {
        _dbContext = dbContext;
        _adminOptions = adminOptions.Value;
    }

    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        var rolesByCode = await EnsureRolesAsync(cancellationToken);
        await EnsureAdminAsync(rolesByCode["ADMIN"], cancellationToken);
    }

    private async Task<Dictionary<string, Role>> EnsureRolesAsync(CancellationToken cancellationToken)
    {
        var existingRoles = await _dbContext.Roles.ToListAsync(cancellationToken);
        var rolesByCode = existingRoles.ToDictionary(role => role.Code.ToUpperInvariant(), StringComparer.OrdinalIgnoreCase);

        foreach (var (code, name) in DefaultRoles)
        {
            if (rolesByCode.ContainsKey(code))
            {
                continue;
            }

            var role = new Role
            {
                Code = code,
                Name = name,
                Description = $"EventSnap AI {name} role",
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.Roles.Add(role);
            rolesByCode[code] = role;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return rolesByCode;
    }

    private async Task EnsureAdminAsync(Role adminRole, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(_adminOptions.Email) || string.IsNullOrWhiteSpace(_adminOptions.Password))
        {
            return;
        }

        var email = _adminOptions.Email.Trim().ToLowerInvariant();
        var now = DateTime.UtcNow;
        var admin = await _dbContext.Users
            .Include(user => user.UserProfile)
            .Include(user => user.UserRoleUsers)
            .FirstOrDefaultAsync(user => user.Email.ToLower() == email && user.DeletedAt == null, cancellationToken);

        if (admin is null)
        {
            admin = new User
            {
                PublicId = Guid.NewGuid(),
                Email = email,
                PasswordHash = AuthService.HashPassword(_adminOptions.Password),
                AccountStatus = "ACTIVE",
                EmailVerifiedAt = now,
                FailedLoginCount = 0,
                CreatedAt = now,
                UpdatedAt = now,
                UserProfile = new UserProfile
                {
                    FullName = string.IsNullOrWhiteSpace(_adminOptions.Name) ? "EventSnap Admin" : _adminOptions.Name.Trim(),
                    CreatedAt = now,
                    UpdatedAt = now
                }
            };

            _dbContext.Users.Add(admin);
        }
        else
        {
            admin.AccountStatus = "ACTIVE";
            admin.PasswordHash = AuthService.HashPassword(_adminOptions.Password);
            admin.EmailVerifiedAt ??= now;
            admin.UpdatedAt = now;

            if (admin.UserProfile is null)
            {
                admin.UserProfile = new UserProfile
                {
                    FullName = string.IsNullOrWhiteSpace(_adminOptions.Name) ? "EventSnap Admin" : _adminOptions.Name.Trim(),
                    CreatedAt = now,
                    UpdatedAt = now
                };
            }
            else if (!string.IsNullOrWhiteSpace(_adminOptions.Name))
            {
                admin.UserProfile.FullName = _adminOptions.Name.Trim();
                admin.UserProfile.UpdatedAt = now;
            }
        }

        var hasAdminRole = admin.UserRoleUsers.Any(userRole => userRole.RoleId == adminRole.RoleId || userRole.Role?.Code == "ADMIN");
        if (!hasAdminRole)
        {
            admin.UserRoleUsers.Add(new UserRole
            {
                Role = adminRole,
                AssignedAt = now
            });
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
