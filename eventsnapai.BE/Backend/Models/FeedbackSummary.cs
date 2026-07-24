using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class FeedbackSummary
{
    public long FeedbackSummaryId { get; set; }

    public long EventId { get; set; }

    public long AiRequestId { get; set; }

    public int ValidFeedbackCount { get; set; }

    public string SummaryData { get; set; } = null!;

    public DateTime GeneratedAt { get; set; }

    public virtual AiRequest AiRequest { get; set; } = null!;

    public virtual Event Event { get; set; } = null!;
}
