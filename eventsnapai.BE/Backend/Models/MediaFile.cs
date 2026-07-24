using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class MediaFile
{
    public long FileId { get; set; }

    public Guid PublicId { get; set; }

    public long UploadedBy { get; set; }

    public string StorageProvider { get; set; } = null!;

    public string StorageKey { get; set; } = null!;

    public string OriginalFileName { get; set; } = null!;

    public string MimeType { get; set; } = null!;

    public long SizeBytes { get; set; }

    public string? ChecksumSha256 { get; set; }

    public string FilePurpose { get; set; } = null!;

    public string PublicUrl { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<EventAsset> EventAssets { get; set; } = new List<EventAsset>();

    public virtual ICollection<EventDraft> EventDrafts { get; set; } = new List<EventDraft>();

    public virtual ICollection<EventReport> EventReports { get; set; } = new List<EventReport>();

    public virtual ICollection<EventSpeaker> EventSpeakers { get; set; } = new List<EventSpeaker>();

    public virtual ICollection<PosterExtraction> PosterExtractions { get; set; } = new List<PosterExtraction>();

    public virtual User UploadedByNavigation { get; set; } = null!;
}
