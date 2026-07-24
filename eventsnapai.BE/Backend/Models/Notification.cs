using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Notification
{
    public long NotificationId { get; set; }

    public long UserId { get; set; }

    public long? BroadcastId { get; set; }

    public long? RelatedEventId { get; set; }

    public string NotificationType { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string Content { get; set; } = null!;

    public string? ActionUrl { get; set; }

    public DateTime? ReadAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual EventBroadcast? Broadcast { get; set; }

    public virtual ICollection<NotificationDelivery> NotificationDeliveries { get; set; } = new List<NotificationDelivery>();

    public virtual Event? RelatedEvent { get; set; }

    public virtual User User { get; set; } = null!;
}
