using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EventDraft
{
    public long DraftId { get; set; }

    public Guid PublicId { get; set; }

    public long CreatorId { get; set; }

    public long? OrganizationId { get; set; }

    public long? CategoryId { get; set; }

    public long? ExtractionId { get; set; }

    public long? PosterFileId { get; set; }

    public string? Title { get; set; }

    public string? Summary { get; set; }

    public string? Description { get; set; }

    public string EventType { get; set; } = null!;

    public string Visibility { get; set; } = null!;

    public DateTime? StartAt { get; set; }

    public DateTime? EndAt { get; set; }

    public DateTime? RegistrationOpenAt { get; set; }

    public DateTime? RegistrationDeadline { get; set; }

    public string? LocationName { get; set; }

    public string? Address { get; set; }

    public string? OnlineMeetingUrl { get; set; }

    public int? Capacity { get; set; }

    public decimal TicketPrice { get; set; }

    public string CurrencyCode { get; set; } = null!;

    public string RegistrationType { get; set; } = null!;

    public bool WaitlistEnabled { get; set; }

    public string? ContactEmail { get; set; }

    public string? ContactPhone { get; set; }

    public bool AiGenerated { get; set; }

    public string? AiOriginalData { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual EventCategory? Category { get; set; }

    public virtual User Creator { get; set; } = null!;

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();

    public virtual PosterExtraction? Extraction { get; set; }

    public virtual Organization? Organization { get; set; }

    public virtual MediaFile? PosterFile { get; set; }
}
