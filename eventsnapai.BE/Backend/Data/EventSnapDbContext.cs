using System;
using System.Collections.Generic;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public partial class EventSnapDbContext : DbContext
{
    public EventSnapDbContext()
    {
    }

    public EventSnapDbContext(DbContextOptions<EventSnapDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AiRequest> AiRequests { get; set; }

    public virtual DbSet<AuditLog> AuditLogs { get; set; }

    public virtual DbSet<CheckinSession> CheckinSessions { get; set; }

    public virtual DbSet<EmailVerificationToken> EmailVerificationTokens { get; set; }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<EventAgendaItem> EventAgendaItems { get; set; }

    public virtual DbSet<EventAsset> EventAssets { get; set; }

    public virtual DbSet<EventBroadcast> EventBroadcasts { get; set; }

    public virtual DbSet<EventCategory> EventCategories { get; set; }

    public virtual DbSet<EventCheckin> EventCheckins { get; set; }

    public virtual DbSet<EventDraft> EventDrafts { get; set; }

    public virtual DbSet<EventFavorite> EventFavorites { get; set; }

    public virtual DbSet<EventFeedback> EventFeedbacks { get; set; }

    public virtual DbSet<EventRegistration> EventRegistrations { get; set; }

    public virtual DbSet<EventReport> EventReports { get; set; }

    public virtual DbSet<EventSpeaker> EventSpeakers { get; set; }

    public virtual DbSet<EventSponsor> EventSponsors { get; set; }

    public virtual DbSet<EventStaffAssignment> EventStaffAssignments { get; set; }

    public virtual DbSet<EventStatusHistory> EventStatusHistories { get; set; }

    public virtual DbSet<ExternalLogin> ExternalLogins { get; set; }

    public virtual DbSet<FeedbackSummary> FeedbackSummaries { get; set; }

    public virtual DbSet<MediaFile> MediaFiles { get; set; }

    public virtual DbSet<ModerationAction> ModerationActions { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<NotificationDelivery> NotificationDeliveries { get; set; }

    public virtual DbSet<NotificationPreference> NotificationPreferences { get; set; }

    public virtual DbSet<Organization> Organizations { get; set; }

    public virtual DbSet<OrganizationInvitation> OrganizationInvitations { get; set; }

    public virtual DbSet<OrganizationMember> OrganizationMembers { get; set; }

    public virtual DbSet<OrganizerRequest> OrganizerRequests { get; set; }

    public virtual DbSet<PasswordResetToken> PasswordResetTokens { get; set; }

    public virtual DbSet<PosterExtraction> PosterExtractions { get; set; }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<SystemSetting> SystemSettings { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserEventInterest> UserEventInterests { get; set; }

    public virtual DbSet<UserProfile> UserProfiles { get; set; }

    public virtual DbSet<UserRole> UserRoles { get; set; }

    public virtual DbSet<VEventRegistrationSummary> VEventRegistrationSummaries { get; set; }

    public virtual DbSet<VOrganizerDashboard> VOrganizerDashboards { get; set; }

    public virtual DbSet<VPublicEvent> VPublicEvents { get; set; }

    private string GetConnectionString()
    {
        IConfiguration configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", true, true).Build();
        return configuration["ConnectionStrings:DefaultConnection"]
            ?? throw new InvalidOperationException("ConnectionStrings:DefaultConnection is missing.");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseNpgsql(GetConnectionString());
        }
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("pgcrypto");

        modelBuilder.Entity<AiRequest>(entity =>
        {
            entity.HasKey(e => e.AiRequestId).HasName("ai_requests_pkey");

            entity.ToTable("ai_requests", "eventsnap");

            entity.HasIndex(e => new { e.Status, e.CreatedAt }, "ix_ai_requests_status");

            entity.HasIndex(e => new { e.RequestedBy, e.CreatedAt }, "ix_ai_requests_user_created").IsDescending(false, true);

            entity.Property(e => e.AiRequestId).HasColumnName("ai_request_id");
            entity.Property(e => e.CompletedAt).HasColumnName("completed_at");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.DurationMs).HasColumnName("duration_ms");
            entity.Property(e => e.ErrorMessage).HasColumnName("error_message");
            entity.Property(e => e.EstimatedCost)
                .HasPrecision(12, 6)
                .HasColumnName("estimated_cost");
            entity.Property(e => e.InputMetadata)
                .HasDefaultValueSql("'{}'::jsonb")
                .HasColumnType("jsonb")
                .HasColumnName("input_metadata");
            entity.Property(e => e.InputTokenCount).HasColumnName("input_token_count");
            entity.Property(e => e.ModelName)
                .HasMaxLength(100)
                .HasColumnName("model_name");
            entity.Property(e => e.OutputTokenCount).HasColumnName("output_token_count");
            entity.Property(e => e.PromptVersion)
                .HasMaxLength(50)
                .HasColumnName("prompt_version");
            entity.Property(e => e.Provider)
                .HasMaxLength(30)
                .HasDefaultValueSql("'GEMINI'::character varying")
                .HasColumnName("provider");
            entity.Property(e => e.RawResponse)
                .HasColumnType("jsonb")
                .HasColumnName("raw_response");
            entity.Property(e => e.RequestType)
                .HasMaxLength(40)
                .HasColumnName("request_type");
            entity.Property(e => e.RequestedBy).HasColumnName("requested_by");
            entity.Property(e => e.StartedAt).HasColumnName("started_at");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValueSql("'QUEUED'::character varying")
                .HasColumnName("status");

            entity.HasOne(d => d.RequestedByNavigation).WithMany(p => p.AiRequests)
                .HasForeignKey(d => d.RequestedBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("ai_requests_requested_by_fkey");
        });

        modelBuilder.Entity<AuditLog>(entity =>
        {
            entity.HasKey(e => e.AuditLogId).HasName("audit_logs_pkey");

            entity.ToTable("audit_logs", "eventsnap");

            entity.HasIndex(e => new { e.ActorUserId, e.CreatedAt }, "ix_audit_logs_actor").IsDescending(false, true);

            entity.HasIndex(e => new { e.EntityType, e.EntityId, e.CreatedAt }, "ix_audit_logs_entity").IsDescending(false, false, true);

            entity.Property(e => e.AuditLogId).HasColumnName("audit_log_id");
            entity.Property(e => e.Action)
                .HasMaxLength(100)
                .HasColumnName("action");
            entity.Property(e => e.ActorUserId).HasColumnName("actor_user_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.EntityId)
                .HasMaxLength(100)
                .HasColumnName("entity_id");
            entity.Property(e => e.EntityType)
                .HasMaxLength(100)
                .HasColumnName("entity_type");
            entity.Property(e => e.IpAddress).HasColumnName("ip_address");
            entity.Property(e => e.NewValues)
                .HasColumnType("jsonb")
                .HasColumnName("new_values");
            entity.Property(e => e.OldValues)
                .HasColumnType("jsonb")
                .HasColumnName("old_values");
            entity.Property(e => e.UserAgent)
                .HasMaxLength(500)
                .HasColumnName("user_agent");

            entity.HasOne(d => d.ActorUser).WithMany(p => p.AuditLogs)
                .HasForeignKey(d => d.ActorUserId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("audit_logs_actor_user_id_fkey");
        });

        modelBuilder.Entity<CheckinSession>(entity =>
        {
            entity.HasKey(e => e.CheckinSessionId).HasName("checkin_sessions_pkey");

            entity.ToTable("checkin_sessions", "eventsnap");

            entity.HasIndex(e => new { e.EventId, e.Status }, "ix_checkin_sessions_event");

            entity.Property(e => e.CheckinSessionId).HasColumnName("checkin_session_id");
            entity.Property(e => e.ClosedAt).HasColumnName("closed_at");
            entity.Property(e => e.ClosedBy).HasColumnName("closed_by");
            entity.Property(e => e.ClosesAt).HasColumnName("closes_at");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.OpenedBy).HasColumnName("opened_by");
            entity.Property(e => e.OpensAt).HasColumnName("opens_at");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValueSql("'OPEN'::character varying")
                .HasColumnName("status");

            entity.HasOne(d => d.ClosedByNavigation).WithMany(p => p.CheckinSessionClosedByNavigations)
                .HasForeignKey(d => d.ClosedBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("checkin_sessions_closed_by_fkey");

            entity.HasOne(d => d.Event).WithMany(p => p.CheckinSessions)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("checkin_sessions_event_id_fkey");

            entity.HasOne(d => d.OpenedByNavigation).WithMany(p => p.CheckinSessionOpenedByNavigations)
                .HasForeignKey(d => d.OpenedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("checkin_sessions_opened_by_fkey");
        });

        modelBuilder.Entity<EmailVerificationToken>(entity =>
        {
            entity.HasKey(e => e.TokenId).HasName("email_verification_tokens_pkey");

            entity.ToTable("email_verification_tokens", "eventsnap");

            entity.HasIndex(e => e.TokenHash, "email_verification_tokens_token_hash_key").IsUnique();

            entity.Property(e => e.TokenId).HasColumnName("token_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.ExpiresAt).HasColumnName("expires_at");
            entity.Property(e => e.TokenHash)
                .HasMaxLength(128)
                .HasColumnName("token_hash");
            entity.Property(e => e.UsedAt).HasColumnName("used_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.EmailVerificationTokens)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("email_verification_tokens_user_id_fkey");
        });

        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.EventId).HasName("events_pkey");

            entity.ToTable("events", "eventsnap");

            entity.HasIndex(e => e.PublicId, "events_public_id_key").IsUnique();

            entity.HasIndex(e => new { e.CategoryId, e.StartAt }, "ix_events_category_start").HasFilter("((deleted_at IS NULL) AND ((status)::text = ANY ((ARRAY['PUBLISHED'::character varying, 'REGISTRATION_CLOSED'::character varying, 'ONGOING'::character varying])::text[])))");

            entity.HasIndex(e => new { e.OwnerId, e.CreatedAt }, "ix_events_owner")
                .IsDescending(false, true)
                .HasFilter("(deleted_at IS NULL)");

            entity.HasIndex(e => new { e.Status, e.Visibility, e.StartAt }, "ix_events_public_search").HasFilter("(deleted_at IS NULL)");

            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.Address)
                .HasMaxLength(500)
                .HasColumnName("address");
            entity.Property(e => e.ApprovedAt).HasColumnName("approved_at");
            entity.Property(e => e.ApprovedBy).HasColumnName("approved_by");
            entity.Property(e => e.CancellationReason).HasColumnName("cancellation_reason");
            entity.Property(e => e.Capacity).HasColumnName("capacity");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CompletedAt).HasColumnName("completed_at");
            entity.Property(e => e.ContactEmail)
                .HasMaxLength(320)
                .HasColumnName("contact_email");
            entity.Property(e => e.ContactPhone)
                .HasMaxLength(30)
                .HasColumnName("contact_phone");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.CurrencyCode)
                .HasMaxLength(3)
                .HasDefaultValueSql("'VND'::bpchar")
                .IsFixedLength()
                .HasColumnName("currency_code");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.EndAt).HasColumnName("end_at");
            entity.Property(e => e.EventType)
                .HasMaxLength(20)
                .HasColumnName("event_type");
            entity.Property(e => e.Latitude)
                .HasPrecision(9, 6)
                .HasColumnName("latitude");
            entity.Property(e => e.LocationName)
                .HasMaxLength(300)
                .HasColumnName("location_name");
            entity.Property(e => e.Longitude)
                .HasPrecision(9, 6)
                .HasColumnName("longitude");
            entity.Property(e => e.OnlineMeetingUrl).HasColumnName("online_meeting_url");
            entity.Property(e => e.OrganizationId).HasColumnName("organization_id");
            entity.Property(e => e.OwnerId).HasColumnName("owner_id");
            entity.Property(e => e.PublicId)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("public_id");
            entity.Property(e => e.PublishAt).HasColumnName("publish_at");
            entity.Property(e => e.PublishedAt).HasColumnName("published_at");
            entity.Property(e => e.RegistrationDeadline).HasColumnName("registration_deadline");
            entity.Property(e => e.RegistrationOpenAt).HasColumnName("registration_open_at");
            entity.Property(e => e.RegistrationType)
                .HasMaxLength(30)
                .HasDefaultValueSql("'OPEN'::character varying")
                .HasColumnName("registration_type");
            entity.Property(e => e.RejectionReason).HasColumnName("rejection_reason");
            entity.Property(e => e.Slug)
                .HasMaxLength(260)
                .HasColumnName("slug");
            entity.Property(e => e.SourceDraftId).HasColumnName("source_draft_id");
            entity.Property(e => e.StartAt).HasColumnName("start_at");
            entity.Property(e => e.Status)
                .HasMaxLength(30)
                .HasDefaultValueSql("'DRAFT'::character varying")
                .HasColumnName("status");
            entity.Property(e => e.Summary)
                .HasMaxLength(500)
                .HasColumnName("summary");
            entity.Property(e => e.TicketPrice)
                .HasPrecision(12, 2)
                .HasColumnName("ticket_price");
            entity.Property(e => e.Title)
                .HasMaxLength(250)
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("updated_at");
            entity.Property(e => e.VersionNo)
                .HasDefaultValue(1)
                .HasColumnName("version_no");
            entity.Property(e => e.Visibility)
                .HasMaxLength(20)
                .HasDefaultValueSql("'PUBLIC'::character varying")
                .HasColumnName("visibility");
            entity.Property(e => e.WaitlistEnabled)
                .HasDefaultValue(false)
                .HasColumnName("waitlist_enabled");

            entity.HasOne(d => d.ApprovedByNavigation).WithMany(p => p.EventApprovedByNavigations)
                .HasForeignKey(d => d.ApprovedBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("events_approved_by_fkey");

            entity.HasOne(d => d.Category).WithMany(p => p.Events)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("events_category_id_fkey");

            entity.HasOne(d => d.Organization).WithMany(p => p.Events)
                .HasForeignKey(d => d.OrganizationId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("events_organization_id_fkey");

            entity.HasOne(d => d.Owner).WithMany(p => p.EventOwners)
                .HasForeignKey(d => d.OwnerId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("events_owner_id_fkey");

            entity.HasOne(d => d.SourceDraft).WithMany(p => p.Events)
                .HasForeignKey(d => d.SourceDraftId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("events_source_draft_id_fkey");
        });

        modelBuilder.Entity<EventAgendaItem>(entity =>
        {
            entity.HasKey(e => e.AgendaItemId).HasName("event_agenda_items_pkey");

            entity.ToTable("event_agenda_items", "eventsnap");

            entity.Property(e => e.AgendaItemId).HasColumnName("agenda_item_id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.EndsAt).HasColumnName("ends_at");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.SortOrder)
                .HasDefaultValue(0)
                .HasColumnName("sort_order");
            entity.Property(e => e.SpeakerId).HasColumnName("speaker_id");
            entity.Property(e => e.StartsAt).HasColumnName("starts_at");
            entity.Property(e => e.Title)
                .HasMaxLength(250)
                .HasColumnName("title");

            entity.HasOne(d => d.Event).WithMany(p => p.EventAgendaItems)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("event_agenda_items_event_id_fkey");

            entity.HasOne(d => d.Speaker).WithMany(p => p.EventAgendaItems)
                .HasForeignKey(d => d.SpeakerId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("event_agenda_items_speaker_id_fkey");
        });

        modelBuilder.Entity<EventAsset>(entity =>
        {
            entity.HasKey(e => e.EventAssetId).HasName("event_assets_pkey");

            entity.ToTable("event_assets", "eventsnap");

            entity.HasIndex(e => new { e.EventId, e.FileId, e.AssetType }, "event_assets_event_id_file_id_asset_type_key").IsUnique();

            entity.HasIndex(e => e.EventId, "ux_event_single_poster")
                .IsUnique()
                .HasFilter("((asset_type)::text = 'POSTER'::text)");

            entity.Property(e => e.EventAssetId).HasColumnName("event_asset_id");
            entity.Property(e => e.AssetType)
                .HasMaxLength(30)
                .HasColumnName("asset_type");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.FileId).HasColumnName("file_id");
            entity.Property(e => e.SortOrder)
                .HasDefaultValue(0)
                .HasColumnName("sort_order");
            entity.Property(e => e.Title)
                .HasMaxLength(200)
                .HasColumnName("title");

            entity.HasOne(d => d.Event).WithOne(p => p.EventAsset)
                .HasForeignKey<EventAsset>(d => d.EventId)
                .HasConstraintName("event_assets_event_id_fkey");

            entity.HasOne(d => d.File).WithMany(p => p.EventAssets)
                .HasForeignKey(d => d.FileId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("event_assets_file_id_fkey");
        });

        modelBuilder.Entity<EventBroadcast>(entity =>
        {
            entity.HasKey(e => e.BroadcastId).HasName("event_broadcasts_pkey");

            entity.ToTable("event_broadcasts", "eventsnap");

            entity.Property(e => e.BroadcastId).HasColumnName("broadcast_id");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.ScheduledAt).HasColumnName("scheduled_at");
            entity.Property(e => e.SendEmail)
                .HasDefaultValue(false)
                .HasColumnName("send_email");
            entity.Property(e => e.SendInApp)
                .HasDefaultValue(true)
                .HasColumnName("send_in_app");
            entity.Property(e => e.SentAt).HasColumnName("sent_at");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValueSql("'DRAFT'::character varying")
                .HasColumnName("status");
            entity.Property(e => e.TargetGroup)
                .HasMaxLength(30)
                .HasColumnName("target_group");
            entity.Property(e => e.Title)
                .HasMaxLength(200)
                .HasColumnName("title");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EventBroadcasts)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("event_broadcasts_created_by_fkey");

            entity.HasOne(d => d.Event).WithMany(p => p.EventBroadcasts)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("event_broadcasts_event_id_fkey");
        });

        modelBuilder.Entity<EventCategory>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("event_categories_pkey");

            entity.ToTable("event_categories", "eventsnap");

            entity.HasIndex(e => e.Slug, "event_categories_slug_key").IsUnique();

            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.DisplayOrder)
                .HasDefaultValue(0)
                .HasColumnName("display_order");
            entity.Property(e => e.IconName)
                .HasMaxLength(100)
                .HasColumnName("icon_name");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Slug)
                .HasMaxLength(120)
                .HasColumnName("slug");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<EventCheckin>(entity =>
        {
            entity.HasKey(e => e.CheckinId).HasName("event_checkins_pkey");

            entity.ToTable("event_checkins", "eventsnap");

            entity.HasIndex(e => new { e.CheckinSessionId, e.CheckedInAt }, "ix_event_checkins_session");

            entity.HasIndex(e => e.RegistrationId, "ux_event_checkin_active")
                .IsUnique()
                .HasFilter("(undone_at IS NULL)");

            entity.Property(e => e.CheckinId).HasColumnName("checkin_id");
            entity.Property(e => e.CheckedInAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("checked_in_at");
            entity.Property(e => e.CheckedInBy).HasColumnName("checked_in_by");
            entity.Property(e => e.CheckinSessionId).HasColumnName("checkin_session_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.ManualReason).HasColumnName("manual_reason");
            entity.Property(e => e.Method)
                .HasMaxLength(20)
                .HasColumnName("method");
            entity.Property(e => e.RegistrationId).HasColumnName("registration_id");
            entity.Property(e => e.ScannerDevice)
                .HasMaxLength(300)
                .HasColumnName("scanner_device");
            entity.Property(e => e.UndoReason).HasColumnName("undo_reason");
            entity.Property(e => e.UndoneAt).HasColumnName("undone_at");
            entity.Property(e => e.UndoneBy).HasColumnName("undone_by");

            entity.HasOne(d => d.CheckedInByNavigation).WithMany(p => p.EventCheckinCheckedInByNavigations)
                .HasForeignKey(d => d.CheckedInBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("event_checkins_checked_in_by_fkey");

            entity.HasOne(d => d.CheckinSession).WithMany(p => p.EventCheckins)
                .HasForeignKey(d => d.CheckinSessionId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("event_checkins_checkin_session_id_fkey");

            entity.HasOne(d => d.Registration).WithOne(p => p.EventCheckin)
                .HasForeignKey<EventCheckin>(d => d.RegistrationId)
                .HasConstraintName("event_checkins_registration_id_fkey");

            entity.HasOne(d => d.UndoneByNavigation).WithMany(p => p.EventCheckinUndoneByNavigations)
                .HasForeignKey(d => d.UndoneBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("event_checkins_undone_by_fkey");
        });

        modelBuilder.Entity<EventDraft>(entity =>
        {
            entity.HasKey(e => e.DraftId).HasName("event_drafts_pkey");

            entity.ToTable("event_drafts", "eventsnap");

            entity.HasIndex(e => e.PublicId, "event_drafts_public_id_key").IsUnique();

            entity.HasIndex(e => new { e.CreatorId, e.UpdatedAt }, "ix_event_drafts_creator")
                .IsDescending(false, true)
                .HasFilter("(deleted_at IS NULL)");

            entity.Property(e => e.DraftId).HasColumnName("draft_id");
            entity.Property(e => e.Address)
                .HasMaxLength(500)
                .HasColumnName("address");
            entity.Property(e => e.AiGenerated)
                .HasDefaultValue(false)
                .HasColumnName("ai_generated");
            entity.Property(e => e.AiOriginalData)
                .HasColumnType("jsonb")
                .HasColumnName("ai_original_data");
            entity.Property(e => e.Capacity).HasColumnName("capacity");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.ContactEmail)
                .HasMaxLength(320)
                .HasColumnName("contact_email");
            entity.Property(e => e.ContactPhone)
                .HasMaxLength(30)
                .HasColumnName("contact_phone");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatorId).HasColumnName("creator_id");
            entity.Property(e => e.CurrencyCode)
                .HasMaxLength(3)
                .HasDefaultValueSql("'VND'::bpchar")
                .IsFixedLength()
                .HasColumnName("currency_code");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.EndAt).HasColumnName("end_at");
            entity.Property(e => e.EventType)
                .HasMaxLength(20)
                .HasDefaultValueSql("'OFFLINE'::character varying")
                .HasColumnName("event_type");
            entity.Property(e => e.ExtractionId).HasColumnName("extraction_id");
            entity.Property(e => e.LocationName)
                .HasMaxLength(300)
                .HasColumnName("location_name");
            entity.Property(e => e.OnlineMeetingUrl).HasColumnName("online_meeting_url");
            entity.Property(e => e.OrganizationId).HasColumnName("organization_id");
            entity.Property(e => e.PosterFileId).HasColumnName("poster_file_id");
            entity.Property(e => e.PublicId)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("public_id");
            entity.Property(e => e.RegistrationDeadline).HasColumnName("registration_deadline");
            entity.Property(e => e.RegistrationOpenAt).HasColumnName("registration_open_at");
            entity.Property(e => e.RegistrationType)
                .HasMaxLength(30)
                .HasDefaultValueSql("'OPEN'::character varying")
                .HasColumnName("registration_type");
            entity.Property(e => e.StartAt).HasColumnName("start_at");
            entity.Property(e => e.Summary)
                .HasMaxLength(500)
                .HasColumnName("summary");
            entity.Property(e => e.TicketPrice)
                .HasPrecision(12, 2)
                .HasColumnName("ticket_price");
            entity.Property(e => e.Title)
                .HasMaxLength(250)
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("updated_at");
            entity.Property(e => e.Visibility)
                .HasMaxLength(20)
                .HasDefaultValueSql("'PUBLIC'::character varying")
                .HasColumnName("visibility");
            entity.Property(e => e.WaitlistEnabled)
                .HasDefaultValue(false)
                .HasColumnName("waitlist_enabled");

            entity.HasOne(d => d.Category).WithMany(p => p.EventDrafts)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("event_drafts_category_id_fkey");

            entity.HasOne(d => d.Creator).WithMany(p => p.EventDrafts)
                .HasForeignKey(d => d.CreatorId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("event_drafts_creator_id_fkey");

            entity.HasOne(d => d.Extraction).WithMany(p => p.EventDrafts)
                .HasForeignKey(d => d.ExtractionId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("event_drafts_extraction_id_fkey");

            entity.HasOne(d => d.Organization).WithMany(p => p.EventDrafts)
                .HasForeignKey(d => d.OrganizationId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("event_drafts_organization_id_fkey");

            entity.HasOne(d => d.PosterFile).WithMany(p => p.EventDrafts)
                .HasForeignKey(d => d.PosterFileId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("event_drafts_poster_file_id_fkey");
        });

        modelBuilder.Entity<EventFavorite>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.EventId }).HasName("event_favorites_pkey");

            entity.ToTable("event_favorites", "eventsnap");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");

            entity.HasOne(d => d.Event).WithMany(p => p.EventFavorites)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("event_favorites_event_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.EventFavorites)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("event_favorites_user_id_fkey");
        });

        modelBuilder.Entity<EventFeedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("event_feedbacks_pkey");

            entity.ToTable("event_feedbacks", "eventsnap");

            entity.HasIndex(e => new { e.EventId, e.CreatedAt }, "ix_feedback_event")
                .IsDescending(false, true)
                .HasFilter("(deleted_at IS NULL)");

            entity.HasIndex(e => new { e.EventId, e.UserId }, "ux_feedback_user_event_active")
                .IsUnique()
                .HasFilter("(deleted_at IS NULL)");

            entity.Property(e => e.FeedbackId).HasColumnName("feedback_id");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.ContentRating).HasColumnName("content_rating");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.ModerationStatus)
                .HasMaxLength(20)
                .HasDefaultValueSql("'VISIBLE'::character varying")
                .HasColumnName("moderation_status");
            entity.Property(e => e.OrganizationRating).HasColumnName("organization_rating");
            entity.Property(e => e.OverallRating).HasColumnName("overall_rating");
            entity.Property(e => e.Sentiment)
                .HasMaxLength(20)
                .HasColumnName("sentiment");
            entity.Property(e => e.SpeakerRating).HasColumnName("speaker_rating");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("updated_at");
            entity.Property(e => e.UsefulnessRating).HasColumnName("usefulness_rating");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.VenueRating).HasColumnName("venue_rating");
            entity.Property(e => e.WouldJoinSimilar).HasColumnName("would_join_similar");

            entity.HasOne(d => d.Event).WithMany(p => p.EventFeedbacks)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("event_feedbacks_event_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.EventFeedbacks)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("event_feedbacks_user_id_fkey");
        });

        modelBuilder.Entity<EventRegistration>(entity =>
        {
            entity.HasKey(e => e.RegistrationId).HasName("event_registrations_pkey");

            entity.ToTable("event_registrations", "eventsnap");

            entity.HasIndex(e => e.PublicId, "event_registrations_public_id_key").IsUnique();

            entity.HasIndex(e => new { e.EventId, e.Status, e.RegisteredAt }, "ix_registration_event_status");

            entity.HasIndex(e => new { e.UserId, e.RegisteredAt }, "ix_registration_user").IsDescending(false, true);

            entity.HasIndex(e => new { e.EventId, e.UserId }, "ux_registration_active_user_event")
                .IsUnique()
                .HasFilter("((status)::text <> ALL ((ARRAY['REJECTED'::character varying, 'CANCELLED'::character varying])::text[]))");

            entity.HasIndex(e => e.QrToken, "ux_registration_qr_token")
                .IsUnique()
                .HasFilter("(qr_token IS NOT NULL)");

            entity.HasIndex(e => new { e.EventId, e.WaitlistPosition }, "ux_registration_waitlist_position")
                .IsUnique()
                .HasFilter("((status)::text = 'WAITLISTED'::text)");

            entity.Property(e => e.RegistrationId).HasColumnName("registration_id");
            entity.Property(e => e.ApprovedAt).HasColumnName("approved_at");
            entity.Property(e => e.ApprovedBy).HasColumnName("approved_by");
            entity.Property(e => e.CancellationReason).HasColumnName("cancellation_reason");
            entity.Property(e => e.CancelledAt).HasColumnName("cancelled_at");
            entity.Property(e => e.CancelledBy).HasColumnName("cancelled_by");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.PublicId)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("public_id");
            entity.Property(e => e.QrToken).HasColumnName("qr_token");
            entity.Property(e => e.RegisteredAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("registered_at");
            entity.Property(e => e.RegistrationData)
                .HasDefaultValueSql("'{}'::jsonb")
                .HasColumnType("jsonb")
                .HasColumnName("registration_data");
            entity.Property(e => e.RejectedReason).HasColumnName("rejected_reason");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValueSql("'PENDING'::character varying")
                .HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.WaitlistPosition).HasColumnName("waitlist_position");

            entity.HasOne(d => d.ApprovedByNavigation).WithMany(p => p.EventRegistrationApprovedByNavigations)
                .HasForeignKey(d => d.ApprovedBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("event_registrations_approved_by_fkey");

            entity.HasOne(d => d.CancelledByNavigation).WithMany(p => p.EventRegistrationCancelledByNavigations)
                .HasForeignKey(d => d.CancelledBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("event_registrations_cancelled_by_fkey");

            entity.HasOne(d => d.Event).WithMany(p => p.EventRegistrations)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("event_registrations_event_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.EventRegistrationUsers)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("event_registrations_user_id_fkey");
        });

        modelBuilder.Entity<EventReport>(entity =>
        {
            entity.HasKey(e => e.EventReportId).HasName("event_reports_pkey");

            entity.ToTable("event_reports", "eventsnap");

            entity.HasIndex(e => new { e.EventId, e.ReporterId, e.ReasonCode }, "ux_event_reports_open_by_reporter")
                .IsUnique()
                .HasFilter("((status)::text = ANY ((ARRAY['OPEN'::character varying, 'UNDER_REVIEW'::character varying, 'ESCALATED'::character varying])::text[]))");

            entity.Property(e => e.EventReportId).HasColumnName("event_report_id");
            entity.Property(e => e.AssignedTo).HasColumnName("assigned_to");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.EvidenceFileId).HasColumnName("evidence_file_id");
            entity.Property(e => e.ReasonCode)
                .HasMaxLength(40)
                .HasColumnName("reason_code");
            entity.Property(e => e.ReporterId).HasColumnName("reporter_id");
            entity.Property(e => e.ResolutionNote).HasColumnName("resolution_note");
            entity.Property(e => e.ResolvedAt).HasColumnName("resolved_at");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValueSql("'OPEN'::character varying")
                .HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.AssignedToNavigation).WithMany(p => p.EventReportAssignedToNavigations)
                .HasForeignKey(d => d.AssignedTo)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("event_reports_assigned_to_fkey");

            entity.HasOne(d => d.Event).WithMany(p => p.EventReports)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("event_reports_event_id_fkey");

            entity.HasOne(d => d.EvidenceFile).WithMany(p => p.EventReports)
                .HasForeignKey(d => d.EvidenceFileId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("event_reports_evidence_file_id_fkey");

            entity.HasOne(d => d.Reporter).WithMany(p => p.EventReportReporters)
                .HasForeignKey(d => d.ReporterId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("event_reports_reporter_id_fkey");
        });

        modelBuilder.Entity<EventSpeaker>(entity =>
        {
            entity.HasKey(e => e.SpeakerId).HasName("event_speakers_pkey");

            entity.ToTable("event_speakers", "eventsnap");

            entity.Property(e => e.SpeakerId).HasColumnName("speaker_id");
            entity.Property(e => e.AvatarFileId).HasColumnName("avatar_file_id");
            entity.Property(e => e.Bio).HasColumnName("bio");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.FullName)
                .HasMaxLength(150)
                .HasColumnName("full_name");
            entity.Property(e => e.OrganizationName)
                .HasMaxLength(200)
                .HasColumnName("organization_name");
            entity.Property(e => e.ProfessionalTitle)
                .HasMaxLength(200)
                .HasColumnName("professional_title");
            entity.Property(e => e.SortOrder)
                .HasDefaultValue(0)
                .HasColumnName("sort_order");

            entity.HasOne(d => d.AvatarFile).WithMany(p => p.EventSpeakers)
                .HasForeignKey(d => d.AvatarFileId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("event_speakers_avatar_file_id_fkey");

            entity.HasOne(d => d.Event).WithMany(p => p.EventSpeakers)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("event_speakers_event_id_fkey");
        });

        modelBuilder.Entity<EventSponsor>(entity =>
        {
            entity.HasKey(e => e.SponsorId).HasName("event_sponsors_pkey");

            entity.ToTable("event_sponsors", "eventsnap");

            entity.Property(e => e.SponsorId).HasColumnName("sponsor_id");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.LogoUrl).HasColumnName("logo_url");
            entity.Property(e => e.Name)
                .HasMaxLength(200)
                .HasColumnName("name");
            entity.Property(e => e.SortOrder)
                .HasDefaultValue(0)
                .HasColumnName("sort_order");
            entity.Property(e => e.SponsorLevel)
                .HasMaxLength(50)
                .HasColumnName("sponsor_level");
            entity.Property(e => e.WebsiteUrl).HasColumnName("website_url");

            entity.HasOne(d => d.Event).WithMany(p => p.EventSponsors)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("event_sponsors_event_id_fkey");
        });

        modelBuilder.Entity<EventStaffAssignment>(entity =>
        {
            entity.HasKey(e => new { e.EventId, e.UserId, e.StaffRole }).HasName("event_staff_assignments_pkey");

            entity.ToTable("event_staff_assignments", "eventsnap");

            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.StaffRole)
                .HasMaxLength(30)
                .HasColumnName("staff_role");
            entity.Property(e => e.AssignedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("assigned_at");
            entity.Property(e => e.AssignedBy).HasColumnName("assigned_by");
            entity.Property(e => e.RemovedAt).HasColumnName("removed_at");

            entity.HasOne(d => d.AssignedByNavigation).WithMany(p => p.EventStaffAssignmentAssignedByNavigations)
                .HasForeignKey(d => d.AssignedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("event_staff_assignments_assigned_by_fkey");

            entity.HasOne(d => d.Event).WithMany(p => p.EventStaffAssignments)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("event_staff_assignments_event_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.EventStaffAssignmentUsers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("event_staff_assignments_user_id_fkey");
        });

        modelBuilder.Entity<EventStatusHistory>(entity =>
        {
            entity.HasKey(e => e.EventStatusHistoryId).HasName("event_status_history_pkey");

            entity.ToTable("event_status_history", "eventsnap");

            entity.HasIndex(e => new { e.EventId, e.ChangedAt }, "ix_event_status_history_event").IsDescending(false, true);

            entity.Property(e => e.EventStatusHistoryId).HasColumnName("event_status_history_id");
            entity.Property(e => e.ChangedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("changed_at");
            entity.Property(e => e.ChangedBy).HasColumnName("changed_by");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.NewStatus)
                .HasMaxLength(30)
                .HasColumnName("new_status");
            entity.Property(e => e.OldStatus)
                .HasMaxLength(30)
                .HasColumnName("old_status");
            entity.Property(e => e.Reason).HasColumnName("reason");

            entity.HasOne(d => d.ChangedByNavigation).WithMany(p => p.EventStatusHistories)
                .HasForeignKey(d => d.ChangedBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("event_status_history_changed_by_fkey");

            entity.HasOne(d => d.Event).WithMany(p => p.EventStatusHistories)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("event_status_history_event_id_fkey");
        });

        modelBuilder.Entity<ExternalLogin>(entity =>
        {
            entity.HasKey(e => e.ExternalLoginId).HasName("external_logins_pkey");

            entity.ToTable("external_logins", "eventsnap");

            entity.HasIndex(e => new { e.Provider, e.ProviderUserId }, "external_logins_provider_provider_user_id_key").IsUnique();

            entity.Property(e => e.ExternalLoginId).HasColumnName("external_login_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.Provider)
                .HasMaxLength(30)
                .HasColumnName("provider");
            entity.Property(e => e.ProviderEmail)
                .HasMaxLength(320)
                .HasColumnName("provider_email");
            entity.Property(e => e.ProviderUserId)
                .HasMaxLength(255)
                .HasColumnName("provider_user_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.ExternalLogins)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("external_logins_user_id_fkey");
        });

        modelBuilder.Entity<FeedbackSummary>(entity =>
        {
            entity.HasKey(e => e.FeedbackSummaryId).HasName("feedback_summaries_pkey");

            entity.ToTable("feedback_summaries", "eventsnap");

            entity.HasIndex(e => e.AiRequestId, "feedback_summaries_ai_request_id_key").IsUnique();

            entity.Property(e => e.FeedbackSummaryId).HasColumnName("feedback_summary_id");
            entity.Property(e => e.AiRequestId).HasColumnName("ai_request_id");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.GeneratedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("generated_at");
            entity.Property(e => e.SummaryData)
                .HasColumnType("jsonb")
                .HasColumnName("summary_data");
            entity.Property(e => e.ValidFeedbackCount).HasColumnName("valid_feedback_count");

            entity.HasOne(d => d.AiRequest).WithOne(p => p.FeedbackSummary)
                .HasForeignKey<FeedbackSummary>(d => d.AiRequestId)
                .HasConstraintName("feedback_summaries_ai_request_id_fkey");

            entity.HasOne(d => d.Event).WithMany(p => p.FeedbackSummaries)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("feedback_summaries_event_id_fkey");
        });

        modelBuilder.Entity<MediaFile>(entity =>
        {
            entity.HasKey(e => e.FileId).HasName("media_files_pkey");

            entity.ToTable("media_files", "eventsnap");

            entity.HasIndex(e => new { e.UploadedBy, e.CreatedAt }, "ix_media_files_uploader").IsDescending(false, true);

            entity.HasIndex(e => e.PublicId, "media_files_public_id_key").IsUnique();

            entity.HasIndex(e => e.StorageKey, "media_files_storage_key_key").IsUnique();

            entity.Property(e => e.FileId).HasColumnName("file_id");
            entity.Property(e => e.ChecksumSha256)
                .HasMaxLength(64)
                .HasColumnName("checksum_sha256");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.FilePurpose)
                .HasMaxLength(50)
                .HasColumnName("file_purpose");
            entity.Property(e => e.MimeType)
                .HasMaxLength(150)
                .HasColumnName("mime_type");
            entity.Property(e => e.OriginalFileName)
                .HasMaxLength(255)
                .HasColumnName("original_file_name");
            entity.Property(e => e.PublicId)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("public_id");
            entity.Property(e => e.PublicUrl).HasColumnName("public_url");
            entity.Property(e => e.SizeBytes).HasColumnName("size_bytes");
            entity.Property(e => e.StorageKey)
                .HasMaxLength(500)
                .HasColumnName("storage_key");
            entity.Property(e => e.StorageProvider)
                .HasMaxLength(30)
                .HasDefaultValueSql("'LOCAL'::character varying")
                .HasColumnName("storage_provider");
            entity.Property(e => e.UploadedBy).HasColumnName("uploaded_by");

            entity.HasOne(d => d.UploadedByNavigation).WithMany(p => p.MediaFiles)
                .HasForeignKey(d => d.UploadedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("media_files_uploaded_by_fkey");
        });

        modelBuilder.Entity<ModerationAction>(entity =>
        {
            entity.HasKey(e => e.ModerationActionId).HasName("moderation_actions_pkey");

            entity.ToTable("moderation_actions", "eventsnap");

            entity.HasIndex(e => new { e.TargetType, e.TargetId, e.CreatedAt }, "ix_moderation_actions_target").IsDescending(false, false, true);

            entity.Property(e => e.ModerationActionId).HasColumnName("moderation_action_id");
            entity.Property(e => e.ActionType)
                .HasMaxLength(40)
                .HasColumnName("action_type");
            entity.Property(e => e.AdminId).HasColumnName("admin_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.Metadata)
                .HasDefaultValueSql("'{}'::jsonb")
                .HasColumnType("jsonb")
                .HasColumnName("metadata");
            entity.Property(e => e.Reason).HasColumnName("reason");
            entity.Property(e => e.TargetId).HasColumnName("target_id");
            entity.Property(e => e.TargetType)
                .HasMaxLength(30)
                .HasColumnName("target_type");

            entity.HasOne(d => d.Admin).WithMany(p => p.ModerationActions)
                .HasForeignKey(d => d.AdminId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("moderation_actions_admin_id_fkey");
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.NotificationId).HasName("notifications_pkey");

            entity.ToTable("notifications", "eventsnap");

            entity.HasIndex(e => new { e.UserId, e.CreatedAt }, "ix_notifications_user_unread")
                .IsDescending(false, true)
                .HasFilter("((read_at IS NULL) AND (deleted_at IS NULL))");

            entity.Property(e => e.NotificationId).HasColumnName("notification_id");
            entity.Property(e => e.ActionUrl).HasColumnName("action_url");
            entity.Property(e => e.BroadcastId).HasColumnName("broadcast_id");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.NotificationType)
                .HasMaxLength(50)
                .HasColumnName("notification_type");
            entity.Property(e => e.ReadAt).HasColumnName("read_at");
            entity.Property(e => e.RelatedEventId).HasColumnName("related_event_id");
            entity.Property(e => e.Title)
                .HasMaxLength(200)
                .HasColumnName("title");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Broadcast).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.BroadcastId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("notifications_broadcast_id_fkey");

            entity.HasOne(d => d.RelatedEvent).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.RelatedEventId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("notifications_related_event_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("notifications_user_id_fkey");
        });

        modelBuilder.Entity<NotificationDelivery>(entity =>
        {
            entity.HasKey(e => e.DeliveryId).HasName("notification_deliveries_pkey");

            entity.ToTable("notification_deliveries", "eventsnap");

            entity.Property(e => e.DeliveryId).HasColumnName("delivery_id");
            entity.Property(e => e.AttemptCount)
                .HasDefaultValue(0)
                .HasColumnName("attempt_count");
            entity.Property(e => e.Channel)
                .HasMaxLength(20)
                .HasColumnName("channel");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.ErrorMessage).HasColumnName("error_message");
            entity.Property(e => e.LastAttemptAt).HasColumnName("last_attempt_at");
            entity.Property(e => e.NotificationId).HasColumnName("notification_id");
            entity.Property(e => e.RecipientAddress)
                .HasMaxLength(320)
                .HasColumnName("recipient_address");
            entity.Property(e => e.SentAt).HasColumnName("sent_at");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValueSql("'PENDING'::character varying")
                .HasColumnName("status");

            entity.HasOne(d => d.Notification).WithMany(p => p.NotificationDeliveries)
                .HasForeignKey(d => d.NotificationId)
                .HasConstraintName("notification_deliveries_notification_id_fkey");
        });

        modelBuilder.Entity<NotificationPreference>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.NotificationType }).HasName("notification_preferences_pkey");

            entity.ToTable("notification_preferences", "eventsnap");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.NotificationType)
                .HasMaxLength(50)
                .HasColumnName("notification_type");
            entity.Property(e => e.EmailEnabled)
                .HasDefaultValue(true)
                .HasColumnName("email_enabled");
            entity.Property(e => e.InAppEnabled)
                .HasDefaultValue(true)
                .HasColumnName("in_app_enabled");
            entity.Property(e => e.PushEnabled)
                .HasDefaultValue(false)
                .HasColumnName("push_enabled");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.User).WithMany(p => p.NotificationPreferences)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("notification_preferences_user_id_fkey");
        });

        modelBuilder.Entity<Organization>(entity =>
        {
            entity.HasKey(e => e.OrganizationId).HasName("organizations_pkey");

            entity.ToTable("organizations", "eventsnap");

            entity.HasIndex(e => e.Status, "ix_organizations_status").HasFilter("(deleted_at IS NULL)");

            entity.HasIndex(e => e.PublicId, "organizations_public_id_key").IsUnique();

            entity.HasIndex(e => e.Slug, "organizations_slug_key").IsUnique();

            entity.Property(e => e.OrganizationId).HasColumnName("organization_id");
            entity.Property(e => e.Address)
                .HasMaxLength(500)
                .HasColumnName("address");
            entity.Property(e => e.ApprovedAt).HasColumnName("approved_at");
            entity.Property(e => e.ApprovedBy).HasColumnName("approved_by");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Email)
                .HasMaxLength(320)
                .HasColumnName("email");
            entity.Property(e => e.LogoUrl).HasColumnName("logo_url");
            entity.Property(e => e.Name)
                .HasMaxLength(200)
                .HasColumnName("name");
            entity.Property(e => e.OrganizationType)
                .HasMaxLength(50)
                .HasDefaultValueSql("'OTHER'::character varying")
                .HasColumnName("organization_type");
            entity.Property(e => e.Phone)
                .HasMaxLength(30)
                .HasColumnName("phone");
            entity.Property(e => e.PublicId)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("public_id");
            entity.Property(e => e.ShortName)
                .HasMaxLength(100)
                .HasColumnName("short_name");
            entity.Property(e => e.Slug)
                .HasMaxLength(220)
                .HasColumnName("slug");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValueSql("'ACTIVE'::character varying")
                .HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("updated_at");
            entity.Property(e => e.WebsiteUrl).HasColumnName("website_url");

            entity.HasOne(d => d.ApprovedByNavigation).WithMany(p => p.OrganizationApprovedByNavigations)
                .HasForeignKey(d => d.ApprovedBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("organizations_approved_by_fkey");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.OrganizationCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("organizations_created_by_fkey");
        });

        modelBuilder.Entity<OrganizationInvitation>(entity =>
        {
            entity.HasKey(e => e.InvitationId).HasName("organization_invitations_pkey");

            entity.ToTable("organization_invitations", "eventsnap");

            entity.HasIndex(e => e.TokenHash, "organization_invitations_token_hash_key").IsUnique();

            entity.Property(e => e.InvitationId).HasColumnName("invitation_id");
            entity.Property(e => e.AcceptedBy).HasColumnName("accepted_by");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.ExpiresAt).HasColumnName("expires_at");
            entity.Property(e => e.InvitedBy).HasColumnName("invited_by");
            entity.Property(e => e.InvitedEmail)
                .HasMaxLength(320)
                .HasColumnName("invited_email");
            entity.Property(e => e.InvitedRole)
                .HasMaxLength(30)
                .HasColumnName("invited_role");
            entity.Property(e => e.OrganizationId).HasColumnName("organization_id");
            entity.Property(e => e.RespondedAt).HasColumnName("responded_at");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValueSql("'PENDING'::character varying")
                .HasColumnName("status");
            entity.Property(e => e.TokenHash)
                .HasMaxLength(128)
                .HasColumnName("token_hash");

            entity.HasOne(d => d.AcceptedByNavigation).WithMany(p => p.OrganizationInvitationAcceptedByNavigations)
                .HasForeignKey(d => d.AcceptedBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("organization_invitations_accepted_by_fkey");

            entity.HasOne(d => d.InvitedByNavigation).WithMany(p => p.OrganizationInvitationInvitedByNavigations)
                .HasForeignKey(d => d.InvitedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("organization_invitations_invited_by_fkey");

            entity.HasOne(d => d.Organization).WithMany(p => p.OrganizationInvitations)
                .HasForeignKey(d => d.OrganizationId)
                .HasConstraintName("organization_invitations_organization_id_fkey");
        });

        modelBuilder.Entity<OrganizationMember>(entity =>
        {
            entity.HasKey(e => new { e.OrganizationId, e.UserId }).HasName("organization_members_pkey");

            entity.ToTable("organization_members", "eventsnap");

            entity.HasIndex(e => e.UserId, "ix_organization_members_user").HasFilter("(removed_at IS NULL)");

            entity.Property(e => e.OrganizationId).HasColumnName("organization_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.AddedBy).HasColumnName("added_by");
            entity.Property(e => e.CanCreateEvent)
                .HasDefaultValue(true)
                .HasColumnName("can_create_event");
            entity.Property(e => e.JoinedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("joined_at");
            entity.Property(e => e.MemberRole)
                .HasMaxLength(30)
                .HasColumnName("member_role");
            entity.Property(e => e.RemovedAt).HasColumnName("removed_at");

            entity.HasOne(d => d.AddedByNavigation).WithMany(p => p.OrganizationMemberAddedByNavigations)
                .HasForeignKey(d => d.AddedBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("organization_members_added_by_fkey");

            entity.HasOne(d => d.Organization).WithMany(p => p.OrganizationMembers)
                .HasForeignKey(d => d.OrganizationId)
                .HasConstraintName("organization_members_organization_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.OrganizationMemberUsers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("organization_members_user_id_fkey");
        });

        modelBuilder.Entity<OrganizerRequest>(entity =>
        {
            entity.HasKey(e => e.OrganizerRequestId).HasName("organizer_requests_pkey");

            entity.ToTable("organizer_requests", "eventsnap");

            entity.HasIndex(e => e.UserId, "ux_organizer_requests_pending")
                .IsUnique()
                .HasFilter("((status)::text = ANY ((ARRAY['PENDING'::character varying, 'NEED_MORE_INFORMATION'::character varying])::text[]))");

            entity.Property(e => e.OrganizerRequestId).HasColumnName("organizer_request_id");
            entity.Property(e => e.ContactEmail)
                .HasMaxLength(320)
                .HasColumnName("contact_email");
            entity.Property(e => e.ContactPhone)
                .HasMaxLength(30)
                .HasColumnName("contact_phone");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.EvidenceUrl).HasColumnName("evidence_url");
            entity.Property(e => e.ExpectedEventTypes)
                .HasMaxLength(500)
                .HasColumnName("expected_event_types");
            entity.Property(e => e.OrganizationName)
                .HasMaxLength(200)
                .HasColumnName("organization_name");
            entity.Property(e => e.Reason).HasColumnName("reason");
            entity.Property(e => e.ReviewNote).HasColumnName("review_note");
            entity.Property(e => e.ReviewedAt).HasColumnName("reviewed_at");
            entity.Property(e => e.ReviewedBy).HasColumnName("reviewed_by");
            entity.Property(e => e.Status)
                .HasMaxLength(30)
                .HasDefaultValueSql("'PENDING'::character varying")
                .HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.ReviewedByNavigation).WithMany(p => p.OrganizerRequestReviewedByNavigations)
                .HasForeignKey(d => d.ReviewedBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("organizer_requests_reviewed_by_fkey");

            entity.HasOne(d => d.User).WithOne(p => p.OrganizerRequestUser)
                .HasForeignKey<OrganizerRequest>(d => d.UserId)
                .HasConstraintName("organizer_requests_user_id_fkey");
        });

        modelBuilder.Entity<PasswordResetToken>(entity =>
        {
            entity.HasKey(e => e.TokenId).HasName("password_reset_tokens_pkey");

            entity.ToTable("password_reset_tokens", "eventsnap");

            entity.HasIndex(e => e.TokenHash, "password_reset_tokens_token_hash_key").IsUnique();

            entity.Property(e => e.TokenId).HasColumnName("token_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.ExpiresAt).HasColumnName("expires_at");
            entity.Property(e => e.TokenHash)
                .HasMaxLength(128)
                .HasColumnName("token_hash");
            entity.Property(e => e.UsedAt).HasColumnName("used_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.PasswordResetTokens)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("password_reset_tokens_user_id_fkey");
        });

        modelBuilder.Entity<PosterExtraction>(entity =>
        {
            entity.HasKey(e => e.ExtractionId).HasName("poster_extractions_pkey");

            entity.ToTable("poster_extractions", "eventsnap");

            entity.HasIndex(e => e.AiRequestId, "poster_extractions_ai_request_id_key").IsUnique();

            entity.Property(e => e.ExtractionId).HasColumnName("extraction_id");
            entity.Property(e => e.AiRequestId).HasColumnName("ai_request_id");
            entity.Property(e => e.CompletedAt).HasColumnName("completed_at");
            entity.Property(e => e.ConfidenceScore)
                .HasPrecision(5, 4)
                .HasColumnName("confidence_score");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.ExtractedData)
                .HasColumnType("jsonb")
                .HasColumnName("extracted_data");
            entity.Property(e => e.ExtractionStatus)
                .HasMaxLength(20)
                .HasDefaultValueSql("'QUEUED'::character varying")
                .HasColumnName("extraction_status");
            entity.Property(e => e.MissingFields)
                .HasDefaultValueSql("'[]'::jsonb")
                .HasColumnType("jsonb")
                .HasColumnName("missing_fields");
            entity.Property(e => e.PosterFileId).HasColumnName("poster_file_id");
            entity.Property(e => e.RawText).HasColumnName("raw_text");
            entity.Property(e => e.ValidationErrors)
                .HasDefaultValueSql("'[]'::jsonb")
                .HasColumnType("jsonb")
                .HasColumnName("validation_errors");

            entity.HasOne(d => d.AiRequest).WithOne(p => p.PosterExtraction)
                .HasForeignKey<PosterExtraction>(d => d.AiRequestId)
                .HasConstraintName("poster_extractions_ai_request_id_fkey");

            entity.HasOne(d => d.PosterFile).WithMany(p => p.PosterExtractions)
                .HasForeignKey(d => d.PosterFileId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("poster_extractions_poster_file_id_fkey");
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(e => e.RefreshTokenId).HasName("refresh_tokens_pkey");

            entity.ToTable("refresh_tokens", "eventsnap");

            entity.HasIndex(e => e.TokenHash, "refresh_tokens_token_hash_key").IsUnique();

            entity.Property(e => e.RefreshTokenId).HasColumnName("refresh_token_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.DeviceInfo)
                .HasMaxLength(500)
                .HasColumnName("device_info");
            entity.Property(e => e.ExpiresAt).HasColumnName("expires_at");
            entity.Property(e => e.IpAddress).HasColumnName("ip_address");
            entity.Property(e => e.ReplacedByHash)
                .HasMaxLength(128)
                .HasColumnName("replaced_by_hash");
            entity.Property(e => e.RevokedAt).HasColumnName("revoked_at");
            entity.Property(e => e.TokenHash)
                .HasMaxLength(128)
                .HasColumnName("token_hash");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.RefreshTokens)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("refresh_tokens_user_id_fkey");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("roles_pkey");

            entity.ToTable("roles", "eventsnap");

            entity.HasIndex(e => e.Code, "roles_code_key").IsUnique();

            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.Code)
                .HasMaxLength(30)
                .HasColumnName("code");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
        });

        modelBuilder.Entity<SystemSetting>(entity =>
        {
            entity.HasKey(e => e.SettingKey).HasName("system_settings_pkey");

            entity.ToTable("system_settings", "eventsnap");

            entity.Property(e => e.SettingKey)
                .HasMaxLength(100)
                .HasColumnName("setting_key");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.IsPublic)
                .HasDefaultValue(false)
                .HasColumnName("is_public");
            entity.Property(e => e.SettingValue)
                .HasColumnType("jsonb")
                .HasColumnName("setting_value");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("updated_at");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.SystemSettings)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("system_settings_updated_by_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("users_pkey");

            entity.ToTable("users", "eventsnap");

            entity.HasIndex(e => e.AccountStatus, "ix_users_account_status").HasFilter("(deleted_at IS NULL)");

            entity.HasIndex(e => e.PublicId, "users_public_id_key").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.AccountStatus)
                .HasMaxLength(20)
                .HasDefaultValueSql("'ACTIVE'::character varying")
                .HasColumnName("account_status");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.Email)
                .HasMaxLength(320)
                .HasColumnName("email");
            entity.Property(e => e.EmailVerifiedAt).HasColumnName("email_verified_at");
            entity.Property(e => e.FailedLoginCount)
                .HasDefaultValue(0)
                .HasColumnName("failed_login_count");
            entity.Property(e => e.LastLoginAt).HasColumnName("last_login_at");
            entity.Property(e => e.LockoutEndAt).HasColumnName("lockout_end_at");
            entity.Property(e => e.PasswordHash).HasColumnName("password_hash");
            entity.Property(e => e.PublicId)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("public_id");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<UserEventInterest>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.CategoryId }).HasName("user_event_interests_pkey");

            entity.ToTable("user_event_interests", "eventsnap");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");

            entity.HasOne(d => d.Category).WithMany(p => p.UserEventInterests)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("user_event_interests_category_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.UserEventInterests)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("user_event_interests_user_id_fkey");
        });

        modelBuilder.Entity<UserProfile>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("user_profiles_pkey");

            entity.ToTable("user_profiles", "eventsnap");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("user_id");
            entity.Property(e => e.AvatarUrl).HasColumnName("avatar_url");
            entity.Property(e => e.Bio)
                .HasMaxLength(1000)
                .HasColumnName("bio");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.DateOfBirth).HasColumnName("date_of_birth");
            entity.Property(e => e.FullName)
                .HasMaxLength(150)
                .HasColumnName("full_name");
            entity.Property(e => e.Phone)
                .HasMaxLength(30)
                .HasColumnName("phone");
            entity.Property(e => e.SchoolOrCompany)
                .HasMaxLength(200)
                .HasColumnName("school_or_company");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.User).WithOne(p => p.UserProfile)
                .HasForeignKey<UserProfile>(d => d.UserId)
                .HasConstraintName("user_profiles_user_id_fkey");
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.RoleId }).HasName("user_roles_pkey");

            entity.ToTable("user_roles", "eventsnap");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.AssignedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("assigned_at");
            entity.Property(e => e.AssignedBy).HasColumnName("assigned_by");

            entity.HasOne(d => d.AssignedByNavigation).WithMany(p => p.UserRoleAssignedByNavigations)
                .HasForeignKey(d => d.AssignedBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("user_roles_assigned_by_fkey");

            entity.HasOne(d => d.Role).WithMany(p => p.UserRoles)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("user_roles_role_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.UserRoleUsers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("user_roles_user_id_fkey");
        });

        modelBuilder.Entity<VEventRegistrationSummary>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("v_event_registration_summary", "eventsnap");

            entity.Property(e => e.AbsentCount).HasColumnName("absent_count");
            entity.Property(e => e.CancelledCount).HasColumnName("cancelled_count");
            entity.Property(e => e.Capacity).HasColumnName("capacity");
            entity.Property(e => e.CheckedInCount).HasColumnName("checked_in_count");
            entity.Property(e => e.ConfirmedCount).HasColumnName("confirmed_count");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.PendingCount).HasColumnName("pending_count");
            entity.Property(e => e.PublicId).HasColumnName("public_id");
            entity.Property(e => e.RemainingCapacity).HasColumnName("remaining_capacity");
            entity.Property(e => e.Title)
                .HasMaxLength(250)
                .HasColumnName("title");
            entity.Property(e => e.WaitlistedCount).HasColumnName("waitlisted_count");
        });

        modelBuilder.Entity<VOrganizerDashboard>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("v_organizer_dashboard", "eventsnap");

            entity.Property(e => e.ActiveEvents).HasColumnName("active_events");
            entity.Property(e => e.AverageCheckinRatePercent).HasColumnName("average_checkin_rate_percent");
            entity.Property(e => e.OwnerId).HasColumnName("owner_id");
            entity.Property(e => e.TotalCheckedInAttendees).HasColumnName("total_checked_in_attendees");
            entity.Property(e => e.TotalConfirmedAttendees).HasColumnName("total_confirmed_attendees");
            entity.Property(e => e.TotalEvents).HasColumnName("total_events");
            entity.Property(e => e.UpcomingEvents).HasColumnName("upcoming_events");
        });

        modelBuilder.Entity<VPublicEvent>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("v_public_events", "eventsnap");

            entity.Property(e => e.Address)
                .HasMaxLength(500)
                .HasColumnName("address");
            entity.Property(e => e.Capacity).HasColumnName("capacity");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(100)
                .HasColumnName("category_name");
            entity.Property(e => e.CategorySlug)
                .HasMaxLength(120)
                .HasColumnName("category_slug");
            entity.Property(e => e.CheckedInCount).HasColumnName("checked_in_count");
            entity.Property(e => e.ConfirmedCount).HasColumnName("confirmed_count");
            entity.Property(e => e.CurrencyCode)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("currency_code");
            entity.Property(e => e.EndAt).HasColumnName("end_at");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.EventType)
                .HasMaxLength(20)
                .HasColumnName("event_type");
            entity.Property(e => e.LocationName)
                .HasMaxLength(300)
                .HasColumnName("location_name");
            entity.Property(e => e.OrganizationName)
                .HasMaxLength(200)
                .HasColumnName("organization_name");
            entity.Property(e => e.PosterUrl).HasColumnName("poster_url");
            entity.Property(e => e.PublicId).HasColumnName("public_id");
            entity.Property(e => e.RegistrationDeadline).HasColumnName("registration_deadline");
            entity.Property(e => e.RemainingCapacity).HasColumnName("remaining_capacity");
            entity.Property(e => e.Slug)
                .HasMaxLength(260)
                .HasColumnName("slug");
            entity.Property(e => e.StartAt).HasColumnName("start_at");
            entity.Property(e => e.Summary)
                .HasMaxLength(500)
                .HasColumnName("summary");
            entity.Property(e => e.TicketPrice)
                .HasPrecision(12, 2)
                .HasColumnName("ticket_price");
            entity.Property(e => e.Title)
                .HasMaxLength(250)
                .HasColumnName("title");
            entity.Property(e => e.WaitlistedCount).HasColumnName("waitlisted_count");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
