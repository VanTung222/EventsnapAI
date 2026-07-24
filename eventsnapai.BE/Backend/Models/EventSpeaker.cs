using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EventSpeaker
{
    public long SpeakerId { get; set; }

    public long EventId { get; set; }

    public string FullName { get; set; } = null!;

    public string? ProfessionalTitle { get; set; }

    public string? OrganizationName { get; set; }

    public string? Bio { get; set; }

    public long? AvatarFileId { get; set; }

    public int SortOrder { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual MediaFile? AvatarFile { get; set; }

    public virtual Event Event { get; set; } = null!;

    public virtual ICollection<EventAgendaItem> EventAgendaItems { get; set; } = new List<EventAgendaItem>();
}
