using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EventCategory
{
    public long CategoryId { get; set; }

    public string Name { get; set; } = null!;

    public string Slug { get; set; } = null!;

    public string? Description { get; set; }

    public string? IconName { get; set; }

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual ICollection<EventDraft> EventDrafts { get; set; } = new List<EventDraft>();

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();

    public virtual ICollection<UserEventInterest> UserEventInterests { get; set; } = new List<UserEventInterest>();
}
