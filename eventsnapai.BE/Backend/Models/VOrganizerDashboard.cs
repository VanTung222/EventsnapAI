using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class VOrganizerDashboard
{
    public long? OwnerId { get; set; }

    public long? TotalEvents { get; set; }

    public long? ActiveEvents { get; set; }

    public long? UpcomingEvents { get; set; }

    public decimal? TotalConfirmedAttendees { get; set; }

    public decimal? TotalCheckedInAttendees { get; set; }

    public decimal? AverageCheckinRatePercent { get; set; }
}
