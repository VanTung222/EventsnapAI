using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class VPublicEvent
{
    public long? EventId { get; set; }

    public Guid? PublicId { get; set; }

    public string? Slug { get; set; }

    public string? Title { get; set; }

    public string? Summary { get; set; }

    public string? EventType { get; set; }

    public DateTime? StartAt { get; set; }

    public DateTime? EndAt { get; set; }

    public string? LocationName { get; set; }

    public string? Address { get; set; }

    public decimal? TicketPrice { get; set; }

    public string? CurrencyCode { get; set; }

    public int? Capacity { get; set; }

    public DateTime? RegistrationDeadline { get; set; }

    public string? CategoryName { get; set; }

    public string? CategorySlug { get; set; }

    public string? OrganizationName { get; set; }

    public string? PosterUrl { get; set; }

    public long? ConfirmedCount { get; set; }

    public long? WaitlistedCount { get; set; }

    public long? CheckedInCount { get; set; }

    public long? RemainingCapacity { get; set; }
}
