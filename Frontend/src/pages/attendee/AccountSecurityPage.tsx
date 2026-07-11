import { useState } from 'react';
import { UserFooter, UserHeader } from './UserChrome';
import './UserPages.css';

type ModalKind = 'logout' | 'disable' | null;

const sessions = [
  { device: 'MacBook Pro', browser: 'Chrome', location: 'San Francisco, CA, USA', lastActive: 'Đang hoạt động', current: true, icon: 'laptop_mac' },
  { device: 'iPhone 15', browser: 'Safari', location: 'Da Nang, Việt Nam', lastActive: '2 giờ trước', current: false, icon: 'smartphone' },
  { device: 'Windows PC', browser: 'Edge', location: 'Ho Chi Minh City, Việt Nam', lastActive: 'Hôm qua', current: false, icon: 'desktop_windows' },
];

const AccountSecurityPage = () => {
  const [modal, setModal] = useState<ModalKind>(null);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);

  return (
    <div className="user-app">
      <UserHeader />
      <main className="user-main security-page">
        <section className="security-layout">
          <aside className="security-sidebar glass-card">
            <span className="eyebrow">Settings</span>
            <a className="active" href="#password"><span className="ms">lock</span>Account & Security</a>
            <a href="#linked"><span className="ms">link</span>Liên kết tài khoản</a>
            <a href="#sessions"><span className="ms">devices</span>Phiên đăng nhập</a>
            <a href="#preferences"><span className="ms">notifications</span>Thông báo</a>
          </aside>

          <div className="security-content">
            <div className="user-page-title compact-title">
              <div>
                <span className="eyebrow">Account Center</span>
                <h1>Account & Security</h1>
                <p>Quản lý mật khẩu, tài khoản liên kết, phiên đăng nhập và các thiết lập email.</p>
              </div>
            </div>

            <section className="security-section glass-card" id="password">
              <div className="section-heading-row">
                <div>
                  <h2><span className="ms">password</span>Đổi mật khẩu</h2>
                  <p>Cập nhật mật khẩu mạnh để bảo vệ tài khoản EventSnap AI.</p>
                </div>
              </div>
              <div className="password-grid">
                <label className="security-input">Mật khẩu hiện tại<input type="password" placeholder="••••••••" /></label>
                <label className="security-input">Mật khẩu mới<input type="password" placeholder="Tối thiểu 8 ký tự" /></label>
                <label className="security-input">Xác nhận mật khẩu mới<input type="password" placeholder="Nhập lại mật khẩu mới" /></label>
              </div>
              <button className="primary-btn" type="button"><span className="ms">sync_lock</span>Cập nhật mật khẩu</button>
            </section>

            <div className="security-bento">
              <section className="security-section glass-card" id="linked">
                <h2><span className="ms">hub</span>Liên kết tài khoản</h2>
                <div className="linked-row">
                  <div className="linked-provider"><span className="google-mark">G</span><div><strong>Google</strong><p>Chưa liên kết</p></div></div>
                  <button className="danger-btn subtle" type="button">Kết nối</button>
                </div>
              </section>

              <section className="security-section glass-card" id="preferences">
                <h2><span className="ms">tune</span>Tùy chọn</h2>
                <label className="toggle-row">Email cập nhật sự kiện<input checked={emailUpdates} onChange={(event) => setEmailUpdates(event.target.checked)} type="checkbox" /><span /></label>
                <label className="toggle-row">Nhắc lịch trước sự kiện<input checked={eventReminders} onChange={(event) => setEventReminders(event.target.checked)} type="checkbox" /><span /></label>
              </section>
            </div>

            <section className="security-section glass-card" id="sessions">
              <div className="section-heading-row">
                <div>
                  <h2><span className="ms">devices</span>Phiên đăng nhập</h2>
                  <p>Thiết bị và trình duyệt đang hoặc đã truy cập tài khoản của bạn.</p>
                </div>
                <button className="secondary-btn" onClick={() => setModal('logout')} type="button"><span className="ms">logout</span>Đăng xuất tất cả thiết bị</button>
              </div>
              <div className="session-list">
                {sessions.map((session) => (
                  <article className="session-row" key={`${session.device}-${session.browser}`}>
                    <span className="session-device"><span className="ms">{session.icon}</span></span>
                    <div>
                      <strong>{session.device} · {session.browser}</strong>
                      <p>{session.location} · {session.lastActive}</p>
                    </div>
                    {session.current && <span className="current-pill">Hiện tại</span>}
                  </article>
                ))}
              </div>
            </section>

            <section className="danger-zone" id="danger">
              <div>
                <h2><span className="ms">warning</span>Vô hiệu hóa tài khoản</h2>
                <p>Hành động này sẽ khóa quyền truy cập và ẩn hồ sơ của bạn khỏi hệ thống.</p>
              </div>
              <button className="danger-btn" onClick={() => setModal('disable')} type="button"><span className="ms">block</span>Vô hiệu hóa tài khoản</button>
            </section>
          </div>
        </section>
      </main>

      {modal && (
        <div className="confirm-backdrop" role="presentation">
          <section className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
            <div className="confirm-icon"><span className="ms">warning</span></div>
            <h2 id="confirm-title">{modal === 'logout' ? 'Đăng xuất tất cả thiết bị?' : 'Vô hiệu hóa tài khoản?'}</h2>
            <p>{modal === 'logout' ? 'Bạn sẽ cần đăng nhập lại trên mọi thiết bị, trừ phiên hiện tại.' : 'Tài khoản sẽ bị khóa cho đến khi quản trị viên hỗ trợ khôi phục.'}</p>
            <div className="confirm-actions">
              <button className="secondary-btn" onClick={() => setModal(null)} type="button">Hủy</button>
              <button className="danger-btn" onClick={() => setModal(null)} type="button">Xác nhận</button>
            </div>
          </section>
        </div>
      )}

      <UserFooter />
    </div>
  );
};

export default AccountSecurityPage;