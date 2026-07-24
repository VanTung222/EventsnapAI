using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EventFavorite
{
    public long UserId { get; set; }

    public long EventId { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Event Event { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
