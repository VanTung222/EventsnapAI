using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class NotificationPreference
{
    public long UserId { get; set; }

    public string NotificationType { get; set; } = null!;

    public bool InAppEnabled { get; set; }

    public bool EmailEnabled { get; set; }

    public bool PushEnabled { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
