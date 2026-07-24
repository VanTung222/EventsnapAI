using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class SystemSetting
{
    public string SettingKey { get; set; } = null!;

    public string SettingValue { get; set; } = null!;

    public string? Description { get; set; }

    public bool IsPublic { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual User? UpdatedByNavigation { get; set; }
}
