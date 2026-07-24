using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class UserRole
{
    public long UserId { get; set; }

    public short RoleId { get; set; }

    public long? AssignedBy { get; set; }

    public DateTime AssignedAt { get; set; }

    public virtual User? AssignedByNavigation { get; set; }

    public virtual Role Role { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
