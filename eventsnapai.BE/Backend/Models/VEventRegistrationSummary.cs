using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class VEventRegistrationSummary
{
    public long? EventId { get; set; }

    public Guid? PublicId { get; set; }

    public string? Title { get; set; }

    public int? Capacity { get; set; }

    public long? PendingCount { get; set; }

    public long? ConfirmedCount { get; set; }

    public long? WaitlistedCount { get; set; }

    public long? CheckedInCount { get; set; }

    public long? CancelledCount { get; set; }

    public long? AbsentCount { get; set; }

    public long? RemainingCapacity { get; set; }
}
