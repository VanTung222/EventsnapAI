using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class NotificationDelivery
{
    public long DeliveryId { get; set; }

    public long NotificationId { get; set; }

    public string Channel { get; set; } = null!;

    public string? RecipientAddress { get; set; }

    public string Status { get; set; } = null!;

    public int AttemptCount { get; set; }

    public DateTime? LastAttemptAt { get; set; }

    public DateTime? SentAt { get; set; }

    public string? ErrorMessage { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Notification Notification { get; set; } = null!;
}
