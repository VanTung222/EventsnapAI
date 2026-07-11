import { Link, NavLink } from 'react-router-dom';

export const UserHeader = () => (
  <header className="user-header">
    <div className="user-header-inner">
      <Link className="user-brand" to="/attendee/dashboard">EventSnap AI</Link>
      <nav className="user-nav" aria-label="User navigation">
        <NavLink to="/attendee/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink>
        <NavLink to="/attendee/profile" className={({ isActive }) => (isActive ? 'active' : '')}>Hồ sơ</NavLink>
        <NavLink to="/attendee/notifications" className={({ isActive }) => (isActive ? 'active' : '')}>Thông báo</NavLink>
        <NavLink to="/attendee/security" className={({ isActive }) => (isActive ? 'active' : '')}>Bảo mật</NavLink>
      </nav>
      <div className="user-actions">
        <Link className="secondary-btn" to="/events">Khám phá</Link>
        <div className="user-avatar" aria-label="Alex Nguyen avatar">AN</div>
      </div>
    </div>
  </header>
);

export const UserFooter = () => (
  <footer className="user-footer">
    <div className="user-footer-inner">
      <div>
        <strong>EventSnap AI</strong>
        <p>© 2026 EventSnap AI. Nền tảng quản lý sự kiện thông minh.</p>
      </div>
      <div>
        <strong>Sản phẩm</strong>
        <Link to="/events">Khám phá sự kiện</Link>
        <Link to="/attendee/dashboard">Dashboard</Link>
      </div>
      <div>
        <strong>Tài khoản</strong>
        <Link to="/attendee/profile">Hồ sơ</Link>
        <Link to="/attendee/security">Bảo mật</Link>
      </div>
      <div>
        <strong>Hỗ trợ</strong>
        <a href="#help">Trung tâm trợ giúp</a>
        <a href="#privacy">Chính sách bảo mật</a>
      </div>
    </div>
  </footer>
);