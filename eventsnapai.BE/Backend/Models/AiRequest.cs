using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class AiRequest
{
    public long AiRequestId { get; set; }

    public long? RequestedBy { get; set; }

    public string RequestType { get; set; } = null!;

    public string Provider { get; set; } = null!;

    public string ModelName { get; set; } = null!;

    public string? PromptVersion { get; set; }

    public string Status { get; set; } = null!;

    public string InputMetadata { get; set; } = null!;

    public string? RawResponse { get; set; }

    public string? ErrorMessage { get; set; }

    public int? InputTokenCount { get; set; }

    public int? OutputTokenCount { get; set; }

    public int? DurationMs { get; set; }

    public decimal? EstimatedCost { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? StartedAt { get; set; }

    public DateTime? CompletedAt { get; set; }

    public virtual FeedbackSummary? FeedbackSummary { get; set; }

    public virtual PosterExtraction? PosterExtraction { get; set; }

    public virtual User? RequestedByNavigation { get; set; }
}
