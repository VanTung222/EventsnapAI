using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EventFeedback
{
    public long FeedbackId { get; set; }

    public long EventId { get; set; }

    public long UserId { get; set; }

    public short OverallRating { get; set; }

    public short? OrganizationRating { get; set; }

    public short? ContentRating { get; set; }

    public short? SpeakerRating { get; set; }

    public short? VenueRating { get; set; }

    public short? UsefulnessRating { get; set; }

    public bool? WouldJoinSimilar { get; set; }

    public string? Content { get; set; }

    public string? Sentiment { get; set; }

    public string ModerationStatus { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual Event Event { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
