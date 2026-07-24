using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EventStatusHistory
{
    public long EventStatusHistoryId { get; set; }

    public long EventId { get; set; }

    public string? OldStatus { get; set; }

    public string NewStatus { get; set; } = null!;

    public long? ChangedBy { get; set; }

    public string? Reason { get; set; }

    public DateTime ChangedAt { get; set; }

    public virtual User? ChangedByNavigation { get; set; }

    public virtual Event Event { get; set; } = null!;
}
