using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class ModerationAction
{
    public long ModerationActionId { get; set; }

    public long AdminId { get; set; }

    public string TargetType { get; set; } = null!;

    public long TargetId { get; set; }

    public string ActionType { get; set; } = null!;

    public string Reason { get; set; } = null!;

    public string Metadata { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public virtual User Admin { get; set; } = null!;
}
