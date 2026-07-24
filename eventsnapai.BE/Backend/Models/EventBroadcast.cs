using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EventBroadcast
{
    public long BroadcastId { get; set; }

    public long EventId { get; set; }

    public long CreatedBy { get; set; }

    public string TargetGroup { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string Content { get; set; } = null!;

    public bool SendInApp { get; set; }

    public bool SendEmail { get; set; }

    public string Status { get; set; } = null!;

    public DateTime? ScheduledAt { get; set; }

    public DateTime? SentAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual Event Event { get; set; } = null!;

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}
