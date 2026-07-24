using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class ExternalLogin
{
    public long ExternalLoginId { get; set; }

    public long UserId { get; set; }

    public string Provider { get; set; } = null!;

    public string ProviderUserId { get; set; } = null!;

    public string? ProviderEmail { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
