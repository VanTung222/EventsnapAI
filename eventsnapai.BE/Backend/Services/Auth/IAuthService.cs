using System.Security.Claims;
using Backend.Models.Auth;

namespace Backend.Services.Auth;

public interface IAuthService
{
    Task<AuthResponse?> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default);
    Task<AuthResponse?> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default);
    Task<AuthResponse?> LoginWithGoogleAsync(GoogleLoginRequest request, CancellationToken cancellationToken = default);
    AuthUserResponse? GetCurrentUser(ClaimsPrincipal principal);
}