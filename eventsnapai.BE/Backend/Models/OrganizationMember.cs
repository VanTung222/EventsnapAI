using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class OrganizationMember
{
    public long OrganizationId { get; set; }

    public long UserId { get; set; }

    public string MemberRole { get; set; } = null!;

    public bool CanCreateEvent { get; set; }

    public DateTime JoinedAt { get; set; }

    public DateTime? RemovedAt { get; set; }

    public long? AddedBy { get; set; }

    public virtual User? AddedByNavigation { get; set; }

    public virtual Organization Organization { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
