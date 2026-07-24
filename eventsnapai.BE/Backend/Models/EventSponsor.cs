using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EventSponsor
{
    public long SponsorId { get; set; }

    public long EventId { get; set; }

    public string Name { get; set; } = null!;

    public string? LogoUrl { get; set; }

    public string? WebsiteUrl { get; set; }

    public string? SponsorLevel { get; set; }

    public int SortOrder { get; set; }

    public virtual Event Event { get; set; } = null!;
}
