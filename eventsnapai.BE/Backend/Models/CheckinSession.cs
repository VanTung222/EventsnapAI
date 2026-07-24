using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class CheckinSession
{
    public long CheckinSessionId { get; set; }

    public long EventId { get; set; }

    public string Status { get; set; } = null!;

    public long OpenedBy { get; set; }

    public DateTime OpensAt { get; set; }

    public DateTime? ClosesAt { get; set; }

    public long? ClosedBy { get; set; }

    public DateTime? ClosedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual User? ClosedByNavigation { get; set; }

    public virtual Event Event { get; set; } = null!;

    public virtual ICollection<EventCheckin> EventCheckins { get; set; } = new List<EventCheckin>();

    public virtual User OpenedByNavigation { get; set; } = null!;
}
