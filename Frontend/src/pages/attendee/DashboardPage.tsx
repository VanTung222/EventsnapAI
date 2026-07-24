import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import eventHeroImage from '../../assets/images/futuristic-colorful_event.png';
import './UserPages.css';

const stats = [
  ['confirmation_number', 'Sự kiện đã đăng ký', '12'],
  ['event', 'Sắp tham gia', '3'],
  ['bookmark', 'Sự kiện đã lưu', '28'],
  ['notifications', 'Thông báo chưa đọc', '5'],
];

const upcomingEvents = [
  ['Tech Innovators Meetup', '05 Tháng 11, 2026', 'Hội thảo', 'Công nghệ'],
  ['Design & UX Conference 26', '12 Tháng 11, 2026', 'Hội nghị', 'Thiết kế'],
];

const recommendations = [
  ['Future Sounds Fest', 'Lễ hội âm nhạc điện tử kết hợp trình diễn công nghệ ánh sáng AI.', 'Giải trí', '95%'],
  ['Startup Networking Night', 'Cơ hội kết nối với các nhà sáng lập và quỹ đầu tư mạo hiểm hàng đầu.', 'Kinh doanh', '88%'],
  ['Culinary Masterclass', 'Học hỏi kỹ thuật nấu ăn từ các đầu bếp đạt sao Michelin.', 'Ẩm thực', '82%'],
];

const targetDate = new Date('2026-10-28T09:00:00+07:00').getTime();

const DashboardPage = () => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const countdown = useMemo(() => {
    const diff = Math.max(0, targetDate - now);
    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000) / 60_000);
    return [
      ['Ngày', days],
      ['Giờ', hours],
      ['Phút', minutes],
    ];
  }, [now]);

  const today = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <>
      <main className="user-main">
        <section className="user-page-title">
          <div>
            <p>{today}</p>
            <h1>Chào buổi sáng, <span style={{ color: 'var(--user-primary)' }}>Alex</span></h1>
          </div>
          <div className="user-avatar"><span>AN</span></div>
        </section>

        <section className="dashboard-next glass-card">
          <div className="next-copy">
            <span className="status-pill"><span className="ms">bolt</span>Sắp diễn ra</span>
            <h2>Global AI Summit 2026</h2>
            <div className="event-meta-list">
              <span><span className="ms">calendar_today</span>28 Tháng 10, 2026, 09:00 AM</span>
              <span><span className="ms">location_on</span>Trung tâm Hội nghị Quốc gia, Hà Nội</span>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link className="primary-btn" to="/events/ai-career-day-2026"><span className="ms">confirmation_number</span>Xem vé</Link>
              <Link className="secondary-btn" to="/events/ai-career-day-2026">Chi tiết</Link>
            </div>
          </div>
          <div className="countdown-box">
            <p>Thời gian đếm ngược</p>
            <div className="countdown-grid">
              {countdown.map(([label, value]) => (
                <div className="countdown-cell" key={label}>
                  <strong>{String(value).padStart(2, '0')}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="stats-grid">
          {stats.map(([icon, label, value], index) => (
            <article className="stat-card glass-card hover-lift" key={label}>
              <div className="stat-icon"><span className="ms">{icon}</span>{index === 3 && <span className="pulse-dot" />}</div>
              <div><p>{label}</p><strong>{value}</strong></div>
            </article>
          ))}
        </section>

        <section className="dashboard-split">
          <div>
            <div className="section-head">
              <h2 className="section-title">Sự kiện sắp tới của tôi</h2>
              <Link className="es-forgot-link" to="/events">Xem tất cả</Link>
            </div>
            <div className="event-list">
              {upcomingEvents.map(([title, date, tagA, tagB], index) => (
                <article className="my-event-item glass-card hover-lift" key={title}>
                  <div className="my-event-thumb"><img src={eventHeroImage} alt={title} style={{ objectPosition: index ? '70% center' : 'center' }} /></div>
                  <div>
                    <h3>{title}</h3>
                    <p><span className="ms" style={{ fontSize: 16 }}>calendar_today</span> {date}</p>
                    <div className="tag-list"><span>{tagA}</span><span>{tagB}</span></div>
                  </div>
                  <Link className="icon-btn" to="/events/ai-career-day-2026" aria-label="Xem chi tiết"><span className="ms">arrow_forward</span></Link>
                </article>
              ))}
            </div>
          </div>

          <aside className="calendar-card glass-card">
            <div className="calendar-top">
              <h2 className="section-title">Lịch trình</h2>
              <div style={{ display: 'flex', gap: 8 }}><button className="icon-btn"><span className="ms">chevron_left</span></button><button className="icon-btn"><span className="ms">chevron_right</span></button></div>
            </div>
            <p className="calendar-month">Tháng 10 2026</p>
            <div className="calendar-grid">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => <span className="day-name" key={day}>{day}</span>)}
              {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
                <span className={`${day === 24 ? 'selected' : ''} ${day === 25 || day === 28 ? 'has-event' : ''}`} key={day}>{day}</span>
              ))}
            </div>
          </aside>
        </section>

        <section>
          <div className="section-head">
            <h2 className="section-title">Đề xuất cho bạn <span className="pulse-dot" style={{ position: 'static', display: 'inline-block', marginLeft: 8 }} /></h2>
          </div>
          <div className="recommend-row">
            {recommendations.map(([title, desc, tag, match], index) => (
              <article className="rec-card glass-card hover-lift" key={title}>
                <div className="rec-image"><img src={eventHeroImage} alt={title} style={{ objectPosition: index === 1 ? '70% center' : 'center' }} /><span className="match-pill">Phù hợp {match}</span></div>
                <div className="rec-body"><h3>{title}</h3><p>{desc}</p><div className="tag-list"><span>{tag}</span></div></div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default DashboardPage;