using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Auth;

public sealed class LoginRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}

public sealed class RegisterRequest
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(8)]
    public string Password { get; set; } = string.Empty;

    public string Role { get; set; } = "attendee";
}

public sealed class GoogleLoginRequest
{
    [Required]
    public string IdToken { get; set; } = string.Empty;
}

public sealed record AuthUserResponse(
    string Id,
    string Name,
    string Email,
    string Role);

public sealed record AuthResponse(
    string AccessToken,
    DateTime ExpiresAt,
    AuthUserResponse User,
    string RedirectPath);

public sealed record AuthErrorResponse(string Message);
