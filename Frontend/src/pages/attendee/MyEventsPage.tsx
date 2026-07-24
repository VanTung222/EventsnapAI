import { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserPages.css';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  status: string;
  statusColor: string;
  icon: string;
  buttonText: string;
  buttonIcon: string;
  isPending?: boolean;
}

const MyEventsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const tabs = [
    { id: 'upcoming', label: 'Sắp diễn ra' },
    { id: 'pending', label: 'Chờ duyệt' },
    { id: 'waitlist', label: 'Danh sách chờ' },
    { id: 'attended', label: 'Đã tham gia' },
    { id: 'cancelled', label: 'Đã hủy' },
    { id: 'absent', label: 'Vắng mặt' },
  ];

  // Mock data representing events for different tabs
  const eventsByTab: Record<string, Event[]> = {
    upcoming: [
      {
        id: 'upcoming-1',
        title: 'AI & Future of Work Summit 2024',
        date: '15:00 - 18:00, 20/11/2024',
        location: 'GEM Center, TP.HCM',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChKmtCn0DMNiDxtL9wzZxnZLoG4tOxZoweG6XhDdyToq1Vdhch3v0FSQ-VhhkdzF5aGX5bsnf0mhWOrgFhbW0mf9LX_4uX25CbDXquPGYJgVdDCMhW35hIVHQTeMpXWTY0JA6HrzxsLZWRS-cIqtt5B0WASGyAsAtdYsDjOCwUcG2CpZRDhe9qPTksAi5iDzk4hnXjvRwOrEprUc-wqjWtSKTOVx8KMkIns7iUov5KN9gQyzouwfJgUTdkdgj8LCHZOjVBW3mxPT0',
        status: 'Sắp diễn ra',
        statusColor: 'primary',
        icon: 'schedule',
        buttonText: 'Xem vé',
        buttonIcon: 'qr_code_2',
      },
    ],
    pending: [
      {
        id: 'pending-1',
        title: 'Mastering Prompt Engineering',
        date: '09:00 - 12:00, 25/11/2024',
        location: 'Online (Zoom)',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1yXkWy9JggXF-brJR9pp-14KggZpG_RWKLx4ofqRY4nFef6gThSR5c36d2i1K_7dfe52cSCFNPlLhe6tGTHuCStiYt9H-ZUe28SwhJwVzY2X7RxyRoHk5e8qk-Eramih72_sYVzzIuw_hluuHcm_LcZ9aYQZeLd1DCB77SD_mzM6sajP0AteF61hN7QurFetVILJCuAL8m66BGAYnBQ5juWtAGrhLI1mjQF_VlvVc92WpwYtKea-S2US7MjvAQrBRVW2dak20c7Q',
        status: 'Chờ duyệt',
        statusColor: 'tertiary-container',
        icon: 'desktop_windows',
        buttonText: 'Hủy đăng ký',
        buttonIcon: 'cancel',
        isPending: true,
      },
    ],
    waitlist: [],
    attended: [],
    cancelled: [],
    absent: [],
  };

  const currentEvents = eventsByTab[activeTab] || [];

  return (
    <>
      <main className="user-main">
        {/* Page Header */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="font-headline-xl text-3xl md:text-5xl text-on-surface font-bold mb-2">
            Sự kiện của tôi
          </h1>
          <p className="text-lg text-on-surface-variant font-body-lg">
            Quản lý và theo dõi tất cả các sự kiện bạn đã tham gia.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-outline-variant/50 overflow-x-auto hide-scrollbar">
          <div className="flex gap-6 min-w-max pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-label-md text-sm pb-2 px-1 transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-primary font-bold border-primary'
                    : 'text-on-surface-variant hover:text-primary border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="min-h-[400px]">
          {/* Empty State */}
          {currentEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center h-full glass-panel rounded-lg mt-8">
              <div className="w-24 h-24 bg-primary-fixed/30 rounded-full flex items-center justify-center mb-4 relative">
                <span className="material-symbols-outlined text-5xl text-primary">
                  calendar_month
                </span>
                <div className="absolute -right-2 -top-2 w-6 h-6 bg-error rounded-full flex items-center justify-center animate-pulse">
                  <span className="material-symbols-outlined text-white text-sm">
                    priority_high
                  </span>
                </div>
              </div>
              <h3 className="font-headline-md text-xl text-on-surface font-bold mb-2">
                Bạn chưa có sự kiện nào trong danh mục này
              </h3>
              <p className="text-on-surface-variant max-w-md mx-auto mb-6">
                Khám phá hàng ngàn sự kiện hấp dẫn và đăng ký tham gia ngay hôm nay.
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
            /* Bento Grid List (Events) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {currentEvents.map((event) => (
                <div
                  key={event.id}
                  className={`glass-panel rounded-lg overflow-hidden hover-lift flex flex-col group relative ${
                    event.isPending ? 'opacity-90' : ''
                  }`}
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-10" />
                  
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={event.imageUrl}
                      alt={event.title}
                    />
                    <div className="absolute top-3 right-3 bg-surface-glass backdrop-blur-md px-3 py-1 rounded-full border border-primary/20 flex items-center gap-1.5 shadow-sm">
                      {event.isPending ? (
                        <span className="material-symbols-outlined text-sm text-tertiary-container">
                          hourglass_empty
                        </span>
                      ) : (
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      )}
                      <span
                        className={`text-[12px] font-bold ${
                          event.isPending ? 'text-tertiary-container' : 'text-primary'
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-headline-md text-base md:text-lg text-on-surface font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="flex flex-col gap-1.5 mb-4 mt-auto pt-3 border-t border-outline-variant/30">
                      <div className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
                        <span className="material-symbols-outlined text-lg">schedule</span>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
                        <span className="material-symbols-outlined text-lg">{event.icon}</span>
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {event.buttonText === 'Xem vé' ? (
                      <Link
                        to="/attendee/ticket"
                        className="w-full py-2.5 font-bold text-sm rounded-full transition-colors flex items-center justify-center gap-1.5 border bg-primary-fixed-dim/30 text-primary hover:bg-primary hover:text-on-primary border-primary/10 text-center"
                      >
                        <span className="material-symbols-outlined text-lg">{event.buttonIcon}</span>
                        {event.buttonText}
                      </Link>
                    ) : (
                      <button
                        className={`w-full py-2.5 font-bold text-sm rounded-full transition-colors flex items-center justify-center gap-1.5 border ${
                          event.isPending
                            ? 'bg-surface-container text-on-surface-variant hover:bg-error-container hover:text-on-error-container border-outline-variant/50'
                            : 'bg-primary-fixed-dim/30 text-primary hover:bg-primary hover:text-on-primary border-primary/10'
                        }`}
                      >
                        <span className="material-symbols-outlined text-lg">{event.buttonIcon}</span>
                        {event.buttonText}
                      </button>
                    )}
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

export default MyEventsPage;
