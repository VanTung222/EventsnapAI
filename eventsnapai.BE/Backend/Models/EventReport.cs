using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EventReport
{
    public long EventReportId { get; set; }

    public long EventId { get; set; }

    public long ReporterId { get; set; }

    public string ReasonCode { get; set; } = null!;

    public string Description { get; set; } = null!;

    public long? EvidenceFileId { get; set; }

    public string Status { get; set; } = null!;

    public long? AssignedTo { get; set; }

    public string? ResolutionNote { get; set; }

    public DateTime? ResolvedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual User? AssignedToNavigation { get; set; }

    public virtual Event Event { get; set; } = null!;

    public virtual MediaFile? EvidenceFile { get; set; }

    public virtual User Reporter { get; set; } = null!;
}
