using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class OrganizerRequest
{
    public long OrganizerRequestId { get; set; }

    public long UserId { get; set; }

    public string OrganizationName { get; set; } = null!;

    public string? ContactPhone { get; set; }

    public string ContactEmail { get; set; } = null!;

    public string Reason { get; set; } = null!;

    public string? EvidenceUrl { get; set; }

    public string? ExpectedEventTypes { get; set; }

    public string Status { get; set; } = null!;

    public long? ReviewedBy { get; set; }

    public DateTime? ReviewedAt { get; set; }

    public string? ReviewNote { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual User? ReviewedByNavigation { get; set; }

    public virtual User User { get; set; } = null!;
}
