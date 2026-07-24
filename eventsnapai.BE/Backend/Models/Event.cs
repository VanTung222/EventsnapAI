using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Event
{
    public long EventId { get; set; }

    public Guid PublicId { get; set; }

    public string Slug { get; set; } = null!;

    public long OwnerId { get; set; }

    public long? OrganizationId { get; set; }

    public long CategoryId { get; set; }

    public long? SourceDraftId { get; set; }

    public string Title { get; set; } = null!;

    public string? Summary { get; set; }

    public string Description { get; set; } = null!;

    public string EventType { get; set; } = null!;

    public string Visibility { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateTime StartAt { get; set; }

    public DateTime EndAt { get; set; }

    public DateTime? RegistrationOpenAt { get; set; }

    public DateTime? RegistrationDeadline { get; set; }

    public DateTime? PublishAt { get; set; }

    public string? LocationName { get; set; }

    public string? Address { get; set; }

    public decimal? Latitude { get; set; }

    public decimal? Longitude { get; set; }

    public string? OnlineMeetingUrl { get; set; }

    public int? Capacity { get; set; }

    public decimal TicketPrice { get; set; }

    public string CurrencyCode { get; set; } = null!;

    public string RegistrationType { get; set; } = null!;

    public bool WaitlistEnabled { get; set; }

    public string? ContactEmail { get; set; }

    public string? ContactPhone { get; set; }

    public string? CancellationReason { get; set; }

    public string? RejectionReason { get; set; }

    public long? ApprovedBy { get; set; }

    public DateTime? ApprovedAt { get; set; }

    public DateTime? PublishedAt { get; set; }

    public DateTime? CompletedAt { get; set; }

    public int VersionNo { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual User? ApprovedByNavigation { get; set; }

    public virtual EventCategory Category { get; set; } = null!;

    public virtual ICollection<CheckinSession> CheckinSessions { get; set; } = new List<CheckinSession>();

    public virtual ICollection<EventAgendaItem> EventAgendaItems { get; set; } = new List<EventAgendaItem>();

    public virtual EventAsset? EventAsset { get; set; }

    public virtual ICollection<EventBroadcast> EventBroadcasts { get; set; } = new List<EventBroadcast>();

    public virtual ICollection<EventFavorite> EventFavorites { get; set; } = new List<EventFavorite>();

    public virtual ICollection<EventFeedback> EventFeedbacks { get; set; } = new List<EventFeedback>();

    public virtual ICollection<EventRegistration> EventRegistrations { get; set; } = new List<EventRegistration>();

    public virtual ICollection<EventReport> EventReports { get; set; } = new List<EventReport>();

    public virtual ICollection<EventSpeaker> EventSpeakers { get; set; } = new List<EventSpeaker>();

    public virtual ICollection<EventSponsor> EventSponsors { get; set; } = new List<EventSponsor>();

    public virtual ICollection<EventStaffAssignment> EventStaffAssignments { get; set; } = new List<EventStaffAssignment>();

    public virtual ICollection<EventStatusHistory> EventStatusHistories { get; set; } = new List<EventStatusHistory>();

    public virtual ICollection<FeedbackSummary> FeedbackSummaries { get; set; } = new List<FeedbackSummary>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual Organization? Organization { get; set; }

    public virtual User Owner { get; set; } = null!;

    public virtual EventDraft? SourceDraft { get; set; }
}
