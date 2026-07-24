using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EventStaffAssignment
{
    public long EventId { get; set; }

    public long UserId { get; set; }

    public string StaffRole { get; set; } = null!;

    public long AssignedBy { get; set; }

    public DateTime AssignedAt { get; set; }

    public DateTime? RemovedAt { get; set; }

    public virtual User AssignedByNavigation { get; set; } = null!;

    public virtual Event Event { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
