import { Link, NavLink } from 'react-router-dom';

type ChromeVariant = 'public' | 'user' | 'organizer';

type AppHeaderProps = {
  variant?: Extract<ChromeVariant, 'public' | 'user'>;
};

type AppFooterProps = {
  variant?: ChromeVariant;
};

const publicNav = [
  { to: '/events', label: 'Khám phá sự kiện' },
  { to: '/organizer-apply', label: 'Dành cho Organizer' },
  { to: '/attendee/dashboard', label: 'Attendee Portal' },
];

const userNav = [
  { to: '/attendee/dashboard', label: 'Dashboard' },
  { to: '/attendee/my-events', label: 'Sự kiện của tôi' },
  { to: '/attendee/favorites', label: 'Yêu thích' },
  { to: '/attendee/profile', label: 'Hồ sơ' },
  { to: '/attendee/notifications', label: 'Thông báo' },
  { to: '/attendee/security', label: 'Bảo mật' },
];

const footerGroups = [
  {
    title: 'Sản phẩm',
    links: [
      { to: '/events', label: 'Khám phá sự kiện' },
      { to: '/organizer-apply', label: 'Dành cho Organizer' },
      { to: '/attendee/dashboard', label: 'Dashboard' },
    ],
  },
  {
    title: 'Tài khoản',
    links: [
      { to: '/auth/login', label: 'Đăng nhập' },
      { to: '/auth/register', label: 'Đăng ký' },
      { to: '/attendee/profile', label: 'Hồ sơ' },
    ],
  },
  {
    title: 'Hỗ trợ',
    links: [
      { to: '#help', label: 'Trung tâm trợ giúp' },
      { to: '#privacy', label: 'Chính sách bảo mật' },
      { to: '#terms', label: 'Điều khoản' },
    ],
  },
];

const isHashLink = (to: string) => to.startsWith('#');

const ChromeLink = ({ to, label }: { to: string; label: string }) => {
  if (isHashLink(to)) return <a href={to}>{label}</a>;
  return <Link to={to}>{label}</Link>;
};

export const AppBrand = ({ dark = false }: { dark?: boolean }) => (
  <Link className={dark ? 'app-brand app-brand-dark' : 'app-brand'} to="/">
    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
    <span>EventSnap AI</span>
  </Link>
);

export const AppHeader = ({ variant = 'public' }: AppHeaderProps) => {
  if (variant === 'user') {
    return (
      <header className="user-header">
        <div className="user-header-inner">
          <AppBrand />
          <nav className="user-nav" aria-label="User navigation">
            {userNav.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>{item.label}</NavLink>
            ))}
          </nav>
          <div className="user-actions">
            <Link className="secondary-btn" to="/events">Khám phá</Link>
            <div className="user-avatar" aria-label="Alex Nguyen avatar">AN</div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="app-public-header">
      <div className="app-public-header-inner">
        <AppBrand />
        <nav className="app-public-nav" aria-label="Public navigation">
          {publicNav.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>{item.label}</NavLink>
          ))}
        </nav>
        <div className="app-public-actions">
          <Link className="app-login-link" to="/auth/login">Đăng nhập</Link>
          <Link className="app-primary-link" to="/auth/register">Bắt đầu miễn phí</Link>
        </div>
      </div>
    </header>
  );
};

export const AppFooter = ({ variant = 'public' }: AppFooterProps) => {
  if (variant === 'user') {
    return (
      <footer className="user-footer">
        <div className="user-footer-inner">
          <div>
            <strong>EventSnap AI</strong>
            <p>© 2026 EventSnap AI. Nền tảng quản lý sự kiện thông minh.</p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <strong>{group.title}</strong>
              {group.links.map((link) => <ChromeLink key={`${group.title}-${link.to}`} to={link.to} label={link.label} />)}
            </div>
          ))}
        </div>
      </footer>
    );
  }

  if (variant === 'organizer') {
    return (
      <footer className="organizer-footer">
        <span>© 2026 EventSnap AI. Công cụ tổ chức sự kiện thông minh.</span>
        <div>
          <a href="#support">Hỗ trợ</a>
          <a href="#privacy">Bảo mật</a>
          <a href="#terms">Điều khoản</a>
        </div>
      </footer>
    );
  }

  return (
    <footer className="app-public-footer">
      <div>
        <strong>EventSnap AI</strong>
        <span>© 2026 EventSnap AI. Nền tảng quản lý sự kiện thông minh.</span>
      </div>
      <nav aria-label="Footer navigation">
        <Link to="/events">Khám phá</Link>
        <Link to="/organizer-apply">Organizer</Link>
        <a href="#privacy">Bảo mật</a>
        <a href="#terms">Điều khoản</a>
      </nav>
    </footer>
  );
};