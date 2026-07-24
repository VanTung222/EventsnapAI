using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EventRegistration
{
    public long RegistrationId { get; set; }

    public Guid PublicId { get; set; }

    public long EventId { get; set; }

    public long UserId { get; set; }

    public string Status { get; set; } = null!;

    public long? WaitlistPosition { get; set; }

    public string RegistrationData { get; set; } = null!;

    public Guid? QrToken { get; set; }

    public long? ApprovedBy { get; set; }

    public DateTime? ApprovedAt { get; set; }

    public string? RejectedReason { get; set; }

    public long? CancelledBy { get; set; }

    public DateTime? CancelledAt { get; set; }

    public string? CancellationReason { get; set; }

    public DateTime RegisteredAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual User? ApprovedByNavigation { get; set; }

    public virtual User? CancelledByNavigation { get; set; }

    public virtual Event Event { get; set; } = null!;

    public virtual EventCheckin? EventCheckin { get; set; }

    public virtual User User { get; set; } = null!;
}
