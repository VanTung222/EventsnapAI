using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EventAgendaItem
{
    public long AgendaItemId { get; set; }

    public long EventId { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime StartsAt { get; set; }

    public DateTime EndsAt { get; set; }

    public long? SpeakerId { get; set; }

    public int SortOrder { get; set; }

    public virtual Event Event { get; set; } = null!;

    public virtual EventSpeaker? Speaker { get; set; }
}
