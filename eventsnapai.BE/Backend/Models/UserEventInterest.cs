using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class UserEventInterest
{
    public long UserId { get; set; }

    public long CategoryId { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual EventCategory Category { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
