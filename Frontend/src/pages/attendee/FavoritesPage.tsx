import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './UserPages.css';

interface FavoriteEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  organizer: string;
  imageUrl: string;
  status: 'upcoming' | 'ended';
  isLiked: boolean;
}

const FavoritesPage = () => {
  const [filterTab, setFilterTab] = useState<'all' | 'upcoming' | 'ended'>('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');

  const [events, setEvents] = useState<FavoriteEvent[]>([
    {
      id: 'fav-1',
      title: 'Hội nghị AI Đột Phá 2024',
      description: 'Khám phá những xu hướng trí tuệ nhân tạo mới nhất và cách chúng định hình tương lai của chúng ta.',
      date: '16 Tháng 11, 2026 - 09:00',
      category: 'Công nghệ',
      organizer: 'TechVision Corp',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChKmtCn0DMNiDxtL9wzZxnZLoG4tOxZoweG6XhDdyToq1Vdhch3v0FSQ-VhhkdzF5aGX5bsnf0mhWOrgFhbW0mf9LX_4uX25CbDXquPGYJgVdDCMhW35hIVHQTeMpXWTY0JA6HrzxsLZWRS-cIqtt5B0WASGyAsAtdYsDjOCwUcG2CpZRDhe9qPTksAi5iDzk4hnXjvRwOrEprUc-wqjWtSKTOVx8KMkIns7iUov5KN9gQyzouwfJgUTdkdgj8LCHZOjVBW3mxPT0',
      status: 'upcoming',
      isLiked: true,
    },
    {
      id: 'fav-2',
      title: 'Triển lãm Nghệ thuật Số & Ánh sáng',
      description: 'Sự giao thoa tuyệt vời giữa nghệ thuật truyền thống và công nghệ trình chiếu ánh sáng hiện đại.',
      date: '01/11/2026 - 18:30',
      category: 'Nghệ thuật',
      organizer: 'ArtTech Lab',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1yXkWy9JggXF-brJR9pp-14KggZpG_RWKLx4ofqRY4nFef6gThSR5c36d2i1K_7dfe52cSCFNPlLhe6tGTHuCStiYt9H-ZUe28SwhJwVzY2X7RxyRoHk5e8qk-Eramih72_sYVzzIuw_hluuHcm_LcZ9aYQZeLd1DCB77SD_mzM6sajP0AteF61hN7QurFetVILJCuAL8m66BGAYnBQ5juWtAGrhLI1mjQF_VlvVc92WpwYtKea-S2US7MjvAQrBRVW2dak20c7Q',
      status: 'ended',
      isLiked: true,
    },
    {
      id: 'fav-3',
      title: 'Khởi nghiệp & Kết nối Đầu tư',
      description: 'Gặp gỡ các nhà đầu tư thiên thần và những nhà sáng lập đầy tiềm năng trong không gian khởi nghiệp công nghệ.',
      date: '20 Tháng 11, 2026 - 19:00',
      category: 'Networking',
      organizer: 'StartupHub VN',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1-Odu9pzy85Rp_8LNaqHtO5Cnj-Q5NUx8-dnrL6HJVyuIEioW8lgyKnYsmdXqzLxzY6l1b15NqYNdwlp1BXkjEbNSF3bD9hMEliyTH4ThSVFKGIoBxAOYdTFEX0ooN__RcA3K1OA4STN7fewriBoRhPEfxW4WB2OWZcZ0ume4Ub9y9Y6ofncq2lxW72VB-cjdA9NLepsgyc-xjaEq8zC3H4zPgpqCqpcDLTweYlji_2Ym1heWdwDj-uD6tune-7unW76mCEFLtwQ',
      status: 'upcoming',
      isLiked: true,
    },
  ]);

  const toggleLike = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isLiked: !e.isLiked } : e))
    );
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Like filter (must be liked to show up, or can toggle off in UI)
      if (!event.isLiked) return false;

      // Status Tab filter
      if (filterTab === 'upcoming' && event.status !== 'upcoming') return false;
      if (filterTab === 'ended' && event.status !== 'ended') return false;

      // Category dropdown filter
      if (selectedCategory !== 'all' && event.category !== selectedCategory) return false;

      return true;
    });
  }, [events, filterTab, selectedCategory, selectedTime]);

  return (
    <>
      <main className="user-main">
        {/* Page Header */}
        <div className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-headline-xl text-3xl md:text-5xl text-on-surface font-bold mb-2">
              Sự kiện yêu thích
            </h1>
            <p className="text-lg text-on-surface-variant font-body-lg">
              Quản lý và theo dõi các sự kiện bạn đã lưu.
            </p>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'upcoming', label: 'Sắp tới' },
              { id: 'ended', label: 'Đã kết thúc' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id as any)}
                className={`px-4 py-2 rounded-full font-label-md text-sm transition-all border ${
                  filterTab === tab.id
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-high'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dropdowns */}
          <div className="flex gap-3">
            {/* Category Select */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-surface-container-low border border-outline-variant/30 text-on-surface-variant font-label-md text-sm px-4 py-2 pr-8 rounded-full outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer appearance-none"
              >
                <option value="all">Thể loại: Tất cả</option>
                <option value="Công nghệ">Công nghệ</option>
                <option value="Nghệ thuật">Nghệ thuật</option>
                <option value="Networking">Networking</option>
              </select>
              <span className="material-symbols-outlined text-sm text-outline absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                keyboard_arrow_down
              </span>
            </div>

            {/* Time Select */}
            <div className="relative">
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="bg-surface-container-low border border-outline-variant/30 text-on-surface-variant font-label-md text-sm px-4 py-2 pr-8 rounded-full outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer appearance-none"
              >
                <option value="all">Thời gian: Mọi lúc</option>
                <option value="today">Hôm nay</option>
                <option value="week">Tuần này</option>
                <option value="month">Tháng này</option>
              </select>
              <span className="material-symbols-outlined text-sm text-outline absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                keyboard_arrow_down
              </span>
            </div>
          </div>
        </div>

        {/* Grid List */}
        <div className="min-h-[400px]">
          {filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center h-full glass-panel rounded-lg mt-4">
              <div className="w-20 h-20 bg-primary-fixed/30 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>
                  heart_broken
                </span>
              </div>
              <h3 className="font-headline-md text-xl text-on-surface font-bold mb-2">
                Không tìm thấy sự kiện yêu thích nào
              </h3>
              <p className="text-on-surface-variant max-w-sm mx-auto mb-6">
                Hãy lướt xem các sự kiện và nhấn nút tim để lưu trữ các sự kiện yêu thích của bạn tại đây.
              </p>
              <Link
                to="/events"
                className="btn-gradient font-label-md text-sm text-on-primary px-6 py-3 rounded-full hover:opacity-90 transition-all hover-lift flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">explore</span>
                Khám phá sự kiện
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="glass-panel rounded-lg overflow-hidden hover-lift flex flex-col group relative"
                >
                  {/* Active Border Hover Reveal */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-10" />

                  {/* Image & Heart Button Overlay */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={event.imageUrl}
                      alt={event.title}
                    />
                    
                    {/* Dark overlay for ended events */}
                    {event.status === 'ended' && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="bg-surface-glass backdrop-blur-md px-4 py-1.5 rounded-full border border-outline-variant/30 flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm text-on-surface">
                            event_busy
                          </span>
                          <span className="text-xs font-bold text-on-surface">Đã kết thúc</span>
                        </div>
                      </div>
                    )}

                    {/* Heart Button */}
                    <button
                      onClick={() => toggleLike(event.id)}
                      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-surface-glass backdrop-blur-md flex items-center justify-center border border-outline-variant/30 shadow-sm hover:scale-110 active:scale-95 transition-all text-primary cursor-pointer"
                      aria-label="Remove from favorites"
                    >
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        favorite
                      </span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
                        {event.category}
                      </span>
                      <span className="text-xs font-semibold text-on-surface-variant">
                        {event.date}
                      </span>
                    </div>

                    <h3 className="font-headline-md text-base md:text-lg text-on-surface font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                      {event.title}
                    </h3>
                    
                    <p className="text-on-surface-variant text-sm line-clamp-3 mb-6">
                      {event.description}
                    </p>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-outline-variant/30">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary-fixed/50 flex items-center justify-center font-black text-[10px] text-primary">
                          {event.organizer.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-xs font-bold text-on-surface-variant">
                          {event.organizer}
                        </span>
                      </div>
                      
                      <Link
                        to={`/events/${event.id}`}
                        className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5"
                      >
                        Chi tiết
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default FavoritesPage;
