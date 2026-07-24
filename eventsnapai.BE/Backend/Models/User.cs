using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class User
{
    public long UserId { get; set; }

    public Guid PublicId { get; set; }

    public string Email { get; set; } = null!;

    public string? PasswordHash { get; set; }

    public string AccountStatus { get; set; } = null!;

    public DateTime? EmailVerifiedAt { get; set; }

    public int FailedLoginCount { get; set; }

    public DateTime? LockoutEndAt { get; set; }

    public DateTime? LastLoginAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<AiRequest> AiRequests { get; set; } = new List<AiRequest>();

    public virtual ICollection<AuditLog> AuditLogs { get; set; } = new List<AuditLog>();

    public virtual ICollection<CheckinSession> CheckinSessionClosedByNavigations { get; set; } = new List<CheckinSession>();

    public virtual ICollection<CheckinSession> CheckinSessionOpenedByNavigations { get; set; } = new List<CheckinSession>();

    public virtual ICollection<EmailVerificationToken> EmailVerificationTokens { get; set; } = new List<EmailVerificationToken>();

    public virtual ICollection<Event> EventApprovedByNavigations { get; set; } = new List<Event>();

    public virtual ICollection<EventBroadcast> EventBroadcasts { get; set; } = new List<EventBroadcast>();

    public virtual ICollection<EventCheckin> EventCheckinCheckedInByNavigations { get; set; } = new List<EventCheckin>();

    public virtual ICollection<EventCheckin> EventCheckinUndoneByNavigations { get; set; } = new List<EventCheckin>();

    public virtual ICollection<EventDraft> EventDrafts { get; set; } = new List<EventDraft>();

    public virtual ICollection<EventFavorite> EventFavorites { get; set; } = new List<EventFavorite>();

    public virtual ICollection<EventFeedback> EventFeedbacks { get; set; } = new List<EventFeedback>();

    public virtual ICollection<Event> EventOwners { get; set; } = new List<Event>();

    public virtual ICollection<EventRegistration> EventRegistrationApprovedByNavigations { get; set; } = new List<EventRegistration>();

    public virtual ICollection<EventRegistration> EventRegistrationCancelledByNavigations { get; set; } = new List<EventRegistration>();

    public virtual ICollection<EventRegistration> EventRegistrationUsers { get; set; } = new List<EventRegistration>();

    public virtual ICollection<EventReport> EventReportAssignedToNavigations { get; set; } = new List<EventReport>();

    public virtual ICollection<EventReport> EventReportReporters { get; set; } = new List<EventReport>();

    public virtual ICollection<EventStaffAssignment> EventStaffAssignmentAssignedByNavigations { get; set; } = new List<EventStaffAssignment>();

    public virtual ICollection<EventStaffAssignment> EventStaffAssignmentUsers { get; set; } = new List<EventStaffAssignment>();

    public virtual ICollection<EventStatusHistory> EventStatusHistories { get; set; } = new List<EventStatusHistory>();

    public virtual ICollection<ExternalLogin> ExternalLogins { get; set; } = new List<ExternalLogin>();

    public virtual ICollection<MediaFile> MediaFiles { get; set; } = new List<MediaFile>();

    public virtual ICollection<ModerationAction> ModerationActions { get; set; } = new List<ModerationAction>();

    public virtual ICollection<NotificationPreference> NotificationPreferences { get; set; } = new List<NotificationPreference>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<Organization> OrganizationApprovedByNavigations { get; set; } = new List<Organization>();

    public virtual ICollection<Organization> OrganizationCreatedByNavigations { get; set; } = new List<Organization>();

    public virtual ICollection<OrganizationInvitation> OrganizationInvitationAcceptedByNavigations { get; set; } = new List<OrganizationInvitation>();

    public virtual ICollection<OrganizationInvitation> OrganizationInvitationInvitedByNavigations { get; set; } = new List<OrganizationInvitation>();

    public virtual ICollection<OrganizationMember> OrganizationMemberAddedByNavigations { get; set; } = new List<OrganizationMember>();

    public virtual ICollection<OrganizationMember> OrganizationMemberUsers { get; set; } = new List<OrganizationMember>();

    public virtual ICollection<OrganizerRequest> OrganizerRequestReviewedByNavigations { get; set; } = new List<OrganizerRequest>();

    public virtual OrganizerRequest? OrganizerRequestUser { get; set; }

    public virtual ICollection<PasswordResetToken> PasswordResetTokens { get; set; } = new List<PasswordResetToken>();

    public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    public virtual ICollection<SystemSetting> SystemSettings { get; set; } = new List<SystemSetting>();

    public virtual ICollection<UserEventInterest> UserEventInterests { get; set; } = new List<UserEventInterest>();

    public virtual UserProfile? UserProfile { get; set; }

    public virtual ICollection<UserRole> UserRoleAssignedByNavigations { get; set; } = new List<UserRole>();

    public virtual ICollection<UserRole> UserRoleUsers { get; set; } = new List<UserRole>();
}
