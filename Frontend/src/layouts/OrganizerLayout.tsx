import { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { AppBrand, AppFooter } from '../components/AppChrome';

const OrganizerLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { to: '/organizer/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { to: '/organizer/events', label: 'Events', icon: 'event' },
    { to: '/organizer/ai-scanner', label: 'AI Scanner', icon: 'auto_awesome' },
    { to: '/organizer/check-in', label: 'Check-In', icon: 'qr_code_scanner' },
    { to: '#', label: 'Organizations', icon: 'corporate_fare', isMock: true },
    { to: '#', label: 'Staff', icon: 'group', isMock: true },
    { to: '#', label: 'Notifications', icon: 'notifications', isMock: true },
    { to: '#', label: 'Settings', icon: 'settings', isMock: true },
  ];

  const handleMockClick = (label: string) => {
    alert(`${label} page is mocked in this organizer preview.`);
  };

  return (
    <div className="bg-[#0b0f19] text-slate-100 min-h-screen flex flex-col font-body-md relative overflow-x-hidden antialiased">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px]" />
      </div>

      {/* Local styles for layout */}
      <style>{`
        .active-nav-item {
          background-color: rgba(33, 112, 228, 0.15);
          border-left: 4px solid #2170e4;
          color: #ffffff;
        }
        .inactive-nav-item {
          color: #94a3b8;
          border-left: 4px solid transparent;
        }
        .inactive-nav-item:hover {
          background-color: rgba(255, 255, 255, 0.03);
          color: #ffffff;
        }
      `}</style>

      {/* Top navbar on Mobile */}
      <header className="lg:hidden w-full px-6 py-4 flex items-center justify-between border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <AppBrand dark />
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-slate-100 p-2 cursor-pointer bg-transparent border-none"
        >
          <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </header>

      <div className="flex flex-1 relative z-10">
        {/* Sidebar Left Column */}
        <aside
          className={`w-64 bg-slate-950/85 backdrop-blur-xl border-r border-slate-900 flex flex-col h-screen fixed top-0 left-0 z-30 transition-transform duration-300 lg:translate-x-0 lg:sticky ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-900 flex flex-col gap-1">
            <AppBrand dark />
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest pl-1">
              Organizer Portal
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow py-4 flex flex-col gap-1 overflow-y-auto">
            {menuItems.map((item, index) => {
              if (item.isMock) {
                return (
                  <button
                    key={index}
                    onClick={() => handleMockClick(item.label)}
                    className="w-full text-left px-5 py-3 flex items-center gap-3.5 transition-all text-sm font-semibold inactive-nav-item bg-transparent border-none cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    {item.label}
                  </button>
                );
              }

              return (
                <NavLink
                  key={index}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-5 py-3 flex items-center gap-3.5 transition-all text-sm font-semibold ${
                      isActive ? 'active-nav-item' : 'inactive-nav-item'
                    }`
                  }
                >
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Button "+ New Event" */}
          <div className="p-4 border-t border-slate-900">
            <Link
              to="/organizer/ai-scanner"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-gradient-to-r from-primary to-primary-container text-white py-3.5 rounded-full font-bold text-sm shadow-[0_4px_16px_rgba(33,112,228,0.25)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              New Event
            </Link>
          </div>
        </aside>

        {/* Backdrop for mobile drawer */}
        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-20 lg:hidden"
          />
        )}

        {/* Right Main Content Canvas */}
        <div className="flex-1 min-w-0 flex flex-col">
          <main className="flex-grow p-6 md:p-8 lg:p-10 w-full max-w-[1200px] mx-auto">
            <Outlet />
          </main>
          <AppFooter variant="organizer" />
        </div>
      </div>
    </div>
  );
};

export default OrganizerLayout;
