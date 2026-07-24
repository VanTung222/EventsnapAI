using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EventCheckin
{
    public long CheckinId { get; set; }

    public long RegistrationId { get; set; }

    public long CheckinSessionId { get; set; }

    public string Method { get; set; } = null!;

    public long CheckedInBy { get; set; }

    public DateTime CheckedInAt { get; set; }

    public string? ManualReason { get; set; }

    public string? ScannerDevice { get; set; }

    public DateTime? UndoneAt { get; set; }

    public long? UndoneBy { get; set; }

    public string? UndoReason { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual User CheckedInByNavigation { get; set; } = null!;

    public virtual CheckinSession CheckinSession { get; set; } = null!;

    public virtual EventRegistration Registration { get; set; } = null!;

    public virtual User? UndoneByNavigation { get; set; }
}
