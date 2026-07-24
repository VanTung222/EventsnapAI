using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EventAsset
{
    public long EventAssetId { get; set; }

    public long EventId { get; set; }

    public long FileId { get; set; }

    public string AssetType { get; set; } = null!;

    public string? Title { get; set; }

    public int SortOrder { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Event Event { get; set; } = null!;

    public virtual MediaFile File { get; set; } = null!;
}
