import { Link, useParams } from 'react-router-dom';
import eventHeroImage from '../../assets/images/futuristic-colorful_event.png';
import './EventDetailPage.css';

const events = {
  'ai-career-day-2026': {
    title: 'AI Career Day 2026',
    status: 'Đang mở đăng ký',
    date: '18 tháng 7, 2026',
    time: '18:30 đến 21:00',
    place: 'Hội trường A5, ĐH Bách Khoa, TP.HCM',
    price: 'Miễn phí',
    seats: '42 chỗ còn lại',
    deadline: '17 tháng 7, 2026',
    organizer: 'BK Innovation Lab',
    action: 'Đăng ký tham gia',
    changed: true,
  },
  'campus-music-jam': {
    title: 'Campus Music Jam',
    status: 'Waitlist',
    date: '26 tháng 7, 2026',
    time: '20:00 đến 22:30',
    place: 'Sân khấu ngoài trời',
    price: '70.000đ',
    seats: 'Đã đủ chỗ',
    deadline: '24 tháng 7, 2026',
    organizer: 'Student Music Union',
    action: 'Tham gia danh sách chờ',
    changed: false,
  },
};

const agenda = [
  ['18:30', 'Check-in QR và nhận tài liệu'],
  ['19:00', 'Talk: AI thay đổi cách sinh viên tìm việc'],
  ['20:00', 'Panel với organizer, startup và mentor'],
  ['20:45', 'Networking và hỏi đáp mở'],
];

const speakers = [
  ['Linh Trần', 'AI Product Lead tại NeoLab'],
  ['Quang Minh', 'Founder BK Innovation Lab'],
  ['Hà Nguyễn', 'Talent Partner tại TechWorks'],
];

const related = ['Workshop React Campus', 'Remote Data Bootcamp', 'Sports Tech Open'];

const EventDetailPage = () => {
  const { eventId } = useParams();
  const event = events[eventId as keyof typeof events] ?? events['ai-career-day-2026'];

  return (
    <div className="detail-page">
      <header className="detail-header">
        <Link className="detail-brand" to="/">
          <span>ES</span>
          EventSnap AI
        </Link>
        <nav>
          <Link to="/events">Khám phá sự kiện</Link>
          <Link to="/auth/login">Đăng nhập</Link>
        </nav>
      </header>

      <main>
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to="/events">Sự kiện</Link>
          <span>/</span>
          <strong>{event.title}</strong>
        </div>

        {event.changed && (
          <div className="change-banner" role="status">
            <strong>Thông tin vừa được cập nhật.</strong>
            <span>Địa điểm check-in chuyển sang cổng A5, vui lòng đến sớm 15 phút.</span>
          </div>
        )}

        <section className="detail-hero">
          <div className="detail-poster">
            <img src={eventHeroImage} alt={`Banner ${event.title}`} />
            <div className="poster-fallback">EventSnap AI</div>
          </div>

          <aside className="registration-card">
            <div className="detail-actions" aria-label="Tác vụ sự kiện">
              <button type="button">♡</button>
              <button type="button">↗</button>
              <button type="button">!</button>
            </div>
            <p>{event.status}</p>
            <h1>{event.title}</h1>
            <dl>
              <div><dt>Ngày giờ</dt><dd>{event.date}, {event.time}</dd></div>
              <div><dt>Địa điểm</dt><dd>{event.place}</dd></div>
              <div><dt>Giá vé</dt><dd>{event.price}</dd></div>
              <div><dt>Số chỗ</dt><dd>{event.seats}</dd></div>
              <div><dt>Hạn đăng ký</dt><dd>{event.deadline}</dd></div>
            </dl>
            <Link className="register-action" to="/auth/login">{event.action}</Link>
          </aside>
        </section>

        <section className="detail-content">
          <article className="detail-main">
            <section className="content-block">
              <h2>Giới thiệu sự kiện</h2>
              <p>
                {event.title} kết nối sinh viên với chuyên gia, organizer và cộng đồng công nghệ thông qua các phiên chia sẻ ngắn, thực hành có hướng dẫn và networking cuối chương trình.
              </p>
            </section>

            <section className="content-block agenda-block">
              <h2>Agenda</h2>
              {agenda.map(([time, title]) => (
                <div className="agenda-row" key={time}>
                  <span>{time}</span>
                  <p>{title}</p>
                </div>
              ))}
            </section>

            <section className="content-block speaker-block">
              <h2>Diễn giả</h2>
              <div className="speaker-grid">
                {speakers.map(([name, role], index) => (
                  <article key={name}>
                    <div className={`speaker-avatar avatar-${index + 1}`} />
                    <h3>{name}</h3>
                    <p>{role}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="content-block organizer-block">
              <h2>Đơn vị tổ chức</h2>
              <div className="organizer-card-detail">
                <span>BK</span>
                <div>
                  <strong>{event.organizer}</strong>
                  <p>Đơn vị chuyên tổ chức workshop, career day và chương trình đổi mới sáng tạo cho sinh viên.</p>
                </div>
              </div>
            </section>

            <section className="content-block map-block">
              <h2>Địa điểm và bản đồ</h2>
              <div className="mini-map">
                <span />
                <strong>{event.place}</strong>
              </div>
            </section>

            <section className="content-block policy-grid">
              <div>
                <h2>Điều kiện tham gia</h2>
                <p>Người tham gia cần có vé QR hợp lệ và check-in trong khung giờ được thông báo.</p>
              </div>
              <div>
                <h2>Chính sách hủy</h2>
                <p>Có thể hủy đăng ký trước hạn để nhường chỗ cho attendee trong danh sách chờ.</p>
              </div>
            </section>

            <section className="content-block related-events">
              <h2>Sự kiện liên quan</h2>
              <div>
                {related.map((item) => (
                  <Link to="/events/ai-career-day-2026" key={item}>{item}</Link>
                ))}
              </div>
            </section>
          </article>
        </section>
      </main>

      <div className="mobile-register-bar">
        <div>
          <strong>{event.price}</strong>
          <span>{event.seats}</span>
        </div>
        <Link to="/auth/login">{event.action}</Link>
      </div>
    </div>
  );
};

export default EventDetailPage;
