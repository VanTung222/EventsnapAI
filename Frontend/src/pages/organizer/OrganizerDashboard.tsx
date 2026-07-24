import { Link } from 'react-router-dom';

interface PendingReview {
  id: string;
  eventTitle: string;
  timeAgo: string;
  type: string;
}

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  registered: number;
  capacity: number;
  status: string;
}

const OrganizerDashboard = () => {
  const pendingReviews: PendingReview[] = [
    {
      id: 'rev-1',
      eventTitle: 'Global Tech Summit 2024',
      timeAgo: '10m ago',
      type: 'Ticket Tier: VIP Pass Review',
    },
    {
      id: 'rev-2',
      eventTitle: 'Web3 Developer Meeting',
      timeAgo: '1h ago',
      type: 'Sponsor Application Review',
    },
    {
      id: 'rev-3',
      eventTitle: 'AI in Healthcare Conference',
      timeAgo: '3h ago',
      type: 'Speaker Profile Update Review',
    },
  ];

  const upcomingEvents: UpcomingEvent[] = [
    {
      id: 'event-1',
      title: 'Frontend Masters Conference',
      date: '24 Oct 2024',
      registered: 425,
      capacity: 500,
      status: 'Published',
    },
    {
      id: 'event-2',
      title: 'Startup Pitch Night',
      date: '02 Nov 2024',
      registered: 98,
      capacity: 200,
      status: 'Published',
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Chào buổi chiều, Alex
          </h1>
          <p className="text-sm text-slate-400">
            Dưới đây là tổng quan hoạt động sự kiện của bạn ngày hôm nay.
          </p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              className="bg-slate-900 border border-slate-800 text-sm text-white px-4 py-2 pl-9 rounded-full outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-500 w-full sm:w-48"
              placeholder="Search..."
            />
            <span className="material-symbols-outlined text-slate-500 text-[18px] absolute left-3 top-1/2 -translate-y-1/2">
              search
            </span>
          </div>

          <Link
            to="/organizer/ai-scanner"
            className="bg-gradient-to-r from-primary to-primary-container text-white text-xs font-bold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity flex items-center gap-1.5 shrink-0"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Tạo sự kiện
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Events */}
        <div className="bg-slate-900/60 border border-slate-800/60 p-4 rounded-xl flex flex-col justify-between h-28 relative overflow-hidden">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tổng sự kiện</span>
          <span className="text-3xl font-black text-white mt-1">12</span>
          <span className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">calendar_month</span> Toàn thời gian
          </span>
        </div>

        {/* Active Events */}
        <div className="bg-slate-900/60 border border-slate-800/60 p-4 rounded-xl flex flex-col justify-between h-28 relative overflow-hidden">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sự kiện đang mở</span>
          <span className="text-3xl font-black text-white mt-1">5</span>
          <span className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Active now
          </span>
        </div>

        {/* Total Registrations */}
        <div className="bg-slate-900/60 border border-slate-800/60 p-4 rounded-xl flex flex-col justify-between h-28 relative overflow-hidden">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tổng Lượt đăng ký</span>
          <span className="text-3xl font-black text-white mt-1">1,240</span>
          <span className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5 font-bold">
            <span className="material-symbols-outlined text-xs">trending_up</span> +12% tuần này
          </span>
        </div>

        {/* Check-In Rate */}
        <div className="bg-slate-900/60 border border-slate-800/60 p-4 rounded-xl flex flex-col justify-between h-28 relative overflow-hidden">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tỷ lệ check-in</span>
          <span className="text-3xl font-black text-white mt-1">85%</span>
          <span className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">qr_code_scanner</span> Quét vé tại chỗ
          </span>
        </div>

        {/* Rating */}
        <div className="bg-slate-900/60 border border-slate-800/60 p-4 rounded-xl flex flex-col justify-between h-28 relative overflow-hidden">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Đánh giá</span>
          <span className="text-3xl font-black text-white mt-1 flex items-center gap-1">
            4.8<span className="material-symbols-outlined text-amber-400 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </span>
          <span className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">reviews</span> Khảo sát phản hồi
          </span>
        </div>
      </div>

      {/* Line Chart & Reviews Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Registration Trend Chart Panel (Left) */}
        <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800/40 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">show_chart</span>
              Registration Trend
            </h3>
            <span className="text-[11px] font-bold text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-800">
              30 Ngày qua
            </span>
          </div>

          {/* SVG Glow Line Chart */}
          <div className="w-full h-64 bg-slate-950/40 rounded-xl border border-slate-900 relative flex items-center justify-center p-2 overflow-hidden">
            {/* Ambient inner grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-5 pointer-events-none">
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
            </div>

            <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2170e4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#2170e4" stopOpacity="0.0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Shaded Area */}
              <path
                d="M 0,200 L 0,160 Q 100,120 180,150 T 360,110 Q 420,70 500,40 L 500,200 Z"
                fill="url(#chartGradient)"
              />

              {/* Glowing Line */}
              <path
                d="M 0,160 Q 100,120 180,150 T 360,110 Q 420,70 500,40"
                fill="none"
                stroke="#2170e4"
                strokeWidth="3"
                filter="url(#glow)"
              />
            </svg>
            <span className="absolute text-xs font-semibold text-slate-500">
              Interactive Line Chart visualization
            </span>
          </div>
        </div>

        {/* Pending Reviews Sidebar (Right) */}
        <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800/40 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">pending_actions</span>
              Chờ duyệt
            </h3>
            <span className="text-[10px] font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">
              3 Mới
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {pendingReviews.map((review) => (
              <div
                key={review.id}
                onClick={() => alert(`Reviewing application for: ${review.eventTitle}`)}
                className="bg-slate-950/50 hover:bg-slate-900/70 border border-slate-800/60 p-3.5 rounded-xl transition-all cursor-pointer group flex flex-col gap-1"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white group-hover:text-primary transition-colors truncate max-w-[70%]">
                    {review.eventTitle}
                  </span>
                  <span className="text-[10px] text-slate-500 shrink-0">{review.timeAgo}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  {review.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events Table */}
      <div className="bg-slate-900/40 border border-slate-800/40 rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">calendar_today</span>
            Sự kiện sắp diễn ra
          </h3>
          <Link
            to="/organizer/events"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5"
          >
            Xem tất cả
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </Link>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Tên sự kiện</th>
                <th className="py-3 px-4">Ngày</th>
                <th className="py-3 px-4">Đăng ký</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {upcomingEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-slate-900/60 text-sm hover:bg-slate-900/20 transition-colors"
                >
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-slate-400">desktop_windows</span>
                    {event.title}
                  </td>
                  <td className="py-4 px-4 text-slate-300 font-semibold">{event.date}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-300">
                        {event.registered}/{event.capacity}
                      </span>
                      <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[11px] font-bold bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      • {event.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link
                      to={`/organizer/events`}
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      Quản lý
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
