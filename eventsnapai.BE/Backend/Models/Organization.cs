using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Organization
{
    public long OrganizationId { get; set; }

    public Guid PublicId { get; set; }

    public string Name { get; set; } = null!;

    public string Slug { get; set; } = null!;

    public string? ShortName { get; set; }

    public string? Description { get; set; }

    public string OrganizationType { get; set; } = null!;

    public string? LogoUrl { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? WebsiteUrl { get; set; }

    public string? Address { get; set; }

    public string Status { get; set; } = null!;

    public long CreatedBy { get; set; }

    public long? ApprovedBy { get; set; }

    public DateTime? ApprovedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual User? ApprovedByNavigation { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<EventDraft> EventDrafts { get; set; } = new List<EventDraft>();

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();

    public virtual ICollection<OrganizationInvitation> OrganizationInvitations { get; set; } = new List<OrganizationInvitation>();

    public virtual ICollection<OrganizationMember> OrganizationMembers { get; set; } = new List<OrganizationMember>();
}
