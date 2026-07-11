import { useMemo, useState } from 'react';
import { UserFooter, UserHeader } from './UserChrome';
import './UserPages.css';

type NotificationCategory = 'all' | 'unread' | 'event' | 'account';

const notifications = [
  {
    id: 1,
    category: 'event',
    icon: 'confirmation_number',
    title: 'Vé Global AI Summit 2026 đã được xác nhận.',
    body: 'Mã QR check-in của bạn đã sẵn sàng trong ví vé.',
    time: '8 phút trước',
    unread: true,
  },
  {
    id: 2,
    category: 'event',
    icon: 'event_available',
    title: 'AI & Design Lab: Workshop bắt đầu vào chiều nay.',
    body: 'Hãy đến trước 15 phút để hoàn tất check-in.',
    time: '1 giờ trước',
    unread: true,
  },
  {
    id: 3,
    category: 'event',
    icon: 'favorite',
    title: 'Sự kiện bạn lưu vừa mở thêm 30 suất đăng ký.',
    body: 'Future Founder Forum hiện còn chỗ cho khách tham dự mới.',
    time: 'Hôm qua',
    unread: true,
  },
  {
    id: 4,
    category: 'account',
    icon: 'security',
    title: 'Đăng nhập mới từ Chrome trên Windows.',
    body: 'Nếu đây không phải bạn, hãy đổi mật khẩu ngay.',
    time: 'Thứ ba',
    unread: false,
  },
  {
    id: 5,
    category: 'account',
    icon: 'verified_user',
    title: 'Tài khoản của bạn đã bật thông báo email.',
    body: 'Bạn sẽ nhận được nhắc lịch trước sự kiện 24 giờ.',
    time: 'Tuần trước',
    unread: false,
  },
] as const;

const tabs: { id: NotificationCategory; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'unread', label: 'Chưa đọc' },
  { id: 'event', label: 'Sự kiện' },
  { id: 'account', label: 'Tài khoản' },
];

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState<NotificationCategory>('all');
  const [readIds, setReadIds] = useState<number[]>(notifications.filter((item) => !item.unread).map((item) => item.id));
  const [hiddenIds, setHiddenIds] = useState<number[]>([]);

  const visibleNotifications = useMemo(() => {
    return notifications
      .filter((item) => !hiddenIds.includes(item.id))
      .filter((item) => {
        const isUnread = !readIds.includes(item.id);
        if (activeTab === 'all') return true;
        if (activeTab === 'unread') return isUnread;
        return item.category === activeTab;
      });
  }, [activeTab, hiddenIds, readIds]);

  const unreadCount = notifications.filter((item) => !hiddenIds.includes(item.id) && !readIds.includes(item.id)).length;

  const markAllRead = () => setReadIds(notifications.map((item) => item.id));
  const markRead = (id: number) => setReadIds((current) => Array.from(new Set([...current, id])));
  const deleteNotification = (id: number) => setHiddenIds((current) => [...current, id]);

  return (
    <div className="user-app">
      <UserHeader />
      <main className="notification-shell">
        <section className="notification-header">
          <div>
            <span className="eyebrow">Notification Center</span>
            <h1>Trung tâm thông báo <span>{unreadCount}</span></h1>
            <p>Theo dõi vé, lịch sự kiện và thay đổi tài khoản trong một nơi.</p>
          </div>
          <button className="secondary-btn" onClick={markAllRead} type="button"><span className="ms">done_all</span>Đánh dấu tất cả đã đọc</button>
        </section>

        <section className="glass-card notification-panel">
          <div className="tabs" role="tablist" aria-label="Notification filters">
            {tabs.map((tab) => (
              <button className={activeTab === tab.id ? 'active' : ''} key={tab.id} onClick={() => setActiveTab(tab.id)} type="button">
                {tab.label}
              </button>
            ))}
          </div>

          <div className="notification-list">
            {visibleNotifications.map((item, index) => {
              const isUnread = !readIds.includes(item.id);
              return (
                <article className={`notification-item ${isUnread ? 'is-unread' : ''}`} key={item.id} onClick={() => markRead(item.id)}>
                  <div className={`notification-icon ${index === 0 && isUnread ? 'pulse' : ''}`}>
                    <span className="ms">{item.icon}</span>
                  </div>
                  <div className="notification-copy">
                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                  </div>
                  <time className="notification-time">{item.time}</time>
                  <div className="notification-actions">
                    {isUnread && <span className="unread-dot" aria-label="Chưa đọc" />}
                    <button className="icon-btn" title="Đánh dấu đã đọc" onClick={(event) => { event.stopPropagation(); markRead(item.id); }} type="button"><span className="ms">mark_email_read</span></button>
                    <button className="icon-btn" title="Xóa thông báo" onClick={(event) => { event.stopPropagation(); deleteNotification(item.id); }} type="button"><span className="ms">more_horiz</span></button>
                  </div>
                </article>
              );
            })}
            {visibleNotifications.length === 0 && <p className="empty-state">Không có thông báo phù hợp với bộ lọc này.</p>}
          </div>
        </section>
      </main>
      <UserFooter />
    </div>
  );
};

export default NotificationsPage;