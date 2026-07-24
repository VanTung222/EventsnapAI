using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class OrganizationInvitation
{
    public long InvitationId { get; set; }

    public long OrganizationId { get; set; }

    public string InvitedEmail { get; set; } = null!;

    public string InvitedRole { get; set; } = null!;

    public string TokenHash { get; set; } = null!;

    public string Status { get; set; } = null!;

    public long InvitedBy { get; set; }

    public long? AcceptedBy { get; set; }

    public DateTime ExpiresAt { get; set; }

    public DateTime? RespondedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual User? AcceptedByNavigation { get; set; }

    public virtual User InvitedByNavigation { get; set; } = null!;

    public virtual Organization Organization { get; set; } = null!;
}
