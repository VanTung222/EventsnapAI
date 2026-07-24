using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class PosterExtraction
{
    public long ExtractionId { get; set; }

    public long AiRequestId { get; set; }

    public long PosterFileId { get; set; }

    public string ExtractionStatus { get; set; } = null!;

    public string? ExtractedData { get; set; }

    public string? RawText { get; set; }

    public decimal? ConfidenceScore { get; set; }

    public string MissingFields { get; set; } = null!;

    public string ValidationErrors { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime? CompletedAt { get; set; }

    public virtual AiRequest AiRequest { get; set; } = null!;

    public virtual ICollection<EventDraft> EventDrafts { get; set; } = new List<EventDraft>();

    public virtual MediaFile PosterFile { get; set; } = null!;
}
