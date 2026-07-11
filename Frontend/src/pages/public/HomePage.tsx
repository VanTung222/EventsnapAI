import { Link } from 'react-router-dom';
import eventHeroImage from '../../assets/images/futuristic-colorful_event.png';
import './HomePage.css';

const categories = ['Công nghệ', 'Workshop', 'Tuyển dụng', 'Tình nguyện', 'Âm nhạc', 'Thể thao'];

const featuredEvents = [
  {
    title: 'Neo-Tokyo Music Fest',
    description: 'Trải nghiệm âm nhạc điện tử kết hợp thị giác AI trong không gian campus hiện đại.',
    date: '26-28, 2045',
    place: 'Cybernetic Arena, Neo-Tokyo',
    status: 'Đang mở đăng ký',
    tag: 'Âm nhạc',
  },
  {
    title: 'Future of Work 2026',
    description: 'Hội thảo định hình tương lai công việc với các công cụ tự động hóa thông minh.',
    date: '15, 2026',
    place: 'Innovation Hub, District 1',
    status: 'Sắp đóng',
    tag: 'Workshop',
  },
  {
    title: 'Code for Good Hackathon',
    description: 'Giải quyết các vấn đề xã hội thông qua giải pháp phần mềm sáng tạo trong 48 giờ.',
    date: '01-03, 2026',
    place: 'Tech Campus, HCMC',
    status: 'Sắp diễn ra',
    tag: 'Công nghệ',
  },
];

const steps = [
  ['description', 'Tải poster', 'Upload hình ảnh sự kiện định dạng JPG/PNG.'],
  ['document_scanner', 'AI trích xuất', 'Nhận diện ngày, giờ, địa điểm và nội dung.'],
  ['edit_note', 'Xác nhận & Đăng', 'Kiểm tra thông tin và đưa sự kiện lên hệ thống.'],
  ['qr_code_scanner', 'Register & QR', 'Người dùng đăng ký và check-in bằng mã QR.'],
];

const HomePage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <Link className="landing-logo" to="/">EventSnap AI</Link>
        <input className="nav-toggle" id="landing-nav" type="checkbox" aria-label="Mở menu" />
        <label className="hamburger" htmlFor="landing-nav" aria-hidden="true">
          <span />
          <span />
          <span />
        </label>
        <nav className="landing-nav" aria-label="Điều hướng chính">
          <Link className="active" to="/events">Khám phá sự kiện</Link>
          <a href="#organizer">Dành cho Organizer</a>
          <a href="#how-it-works">Cách hoạt động</a>
          <a href="#about">Giới thiệu</a>
        </nav>
        <div className="landing-auth">
          <Link to="/login">Đăng nhập</Link>
          <Link className="start-link" to="/register">Bắt đầu miễn phí</Link>
        </div>
      </header>

      <main>
        <section className="landing-hero">
          <div className="hero-bg-grid" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="ai-pill">
                <span className="ms">auto_awesome</span>
                AI-Powered Event Management
              </div>
              <h1>Khám phá, tạo và quản lý sự kiện thông minh hơn với AI.</h1>
              <p>Biến poster của bạn thành sự kiện thực tế chỉ trong tích tắc. Tiết kiệm 90% thời gian thiết lập với sức mạnh của trí tuệ nhân tạo.</p>
              <div className="hero-actions">
                <Link className="primary-cta" to="/register">
                  Bắt đầu ngay
                  <span className="ms">rocket_launch</span>
                </Link>
                <a className="demo-cta" href="#how-it-works">
                  <span className="ms">play_circle</span>
                  Xem Demo
                </a>
              </div>
              <form className="hero-search" role="search">
                <span className="ms">search</span>
                <input aria-label="Tìm kiếm sự kiện" placeholder="Tìm kiếm sự kiện, hội thảo..." />
                <select aria-label="Danh mục">
                  <option>Tất cả danh mục</option>
                  <option>Công nghệ</option>
                  <option>Âm nhạc</option>
                </select>
                <button type="submit" aria-label="Tìm kiếm"><span className="ms">arrow_forward</span></button>
              </form>
            </div>

            <div className="hero-visual" aria-label="AI chuyển poster thành thông tin sự kiện">
              <div className="visual-card-main">
                <img src={eventHeroImage} alt="Minh họa sự kiện công nghệ tương lai" />
                <span className="scan-line" />
                <div className="visual-shade" />
                <div className="processing-module">
                  <div>
                    <span />
                    <strong>AI Processing</strong>
                  </div>
                  <i><b /></i>
                  <small>Extracting metadata...</small>
                </div>
                <div className="detected-module">
                  <span className="ms">check</span>
                  <div>
                    <strong>Neo-Tokyo Fest</strong>
                    <small>Oct 26-28, 2045</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="category-band" id="discover">
          {categories.map((category) => (
            <Link to="/events" key={category}>{category}</Link>
          ))}
        </section>

        <section className="featured-section" id="events">
          <div className="section-topline">
            <h2>Sự kiện nổi bật tuần này</h2>
            <Link to="/events">Xem tất cả <span className="ms">arrow_forward</span></Link>
          </div>
          <div className="featured-grid">
            {featuredEvents.map((event, index) => (
              <article className="featured-card" key={event.title}>
                <Link className="card-image" to="/events/ai-career-day-2026">
                  <img className={`crop-${index + 1}`} src={eventHeroImage} alt={`Poster ${event.title}`} />
                  <span><span className="ms">{index === 1 ? 'hourglass_empty' : index === 2 ? 'event' : 'check_circle'}</span>{event.status}</span>
                </Link>
                <div className="card-body">
                  <div className="tag-row">
                    <span>{event.tag}</span>
                    {index === 0 && <span>AI Curated</span>}
                    {index === 2 && <span>Miễn phí</span>}
                  </div>
                  <h3><Link to="/events/ai-career-day-2026">{event.title}</Link></h3>
                  <p>{event.description}</p>
                  <div className="card-meta">
                    <span><span className="ms">calendar_today</span>{event.date}</span>
                    <span><span className="ms">location_on</span>{event.place}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="workflow-section" id="how-it-works">
          <div className="center-heading">
            <h2>Tạo sự kiện trong tích tắc</h2>
            <p>Quy trình thông minh giúp bạn chuyển đổi từ ý tưởng thiết kế sang trang quản lý sự kiện hoàn chỉnh chỉ với 4 bước đơn giản.</p>
          </div>
          <div className="steps-grid">
            {steps.map(([icon, title, text], index) => (
              <article className="step-item" key={title}>
                <div className="step-icon"><span className="ms">{icon}</span></div>
                <span className="step-number">{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="organizer-section" id="organizer">
          <div className="organizer-heading">
            <h2>Công cụ mạnh mẽ cho Organizer</h2>
            <p>Mọi thứ bạn cần để vận hành sự kiện chuyên nghiệp, quy tụ trong một nền tảng.</p>
          </div>
          <div className="organizer-grid">
            <article className="dashboard-card">
              <div className="feature-icon"><span className="ms">dashboard</span></div>
              <h3>Smart Dashboard</h3>
              <p>Theo dõi lượt đăng ký, doanh thu và dữ liệu tương tác theo thời gian thực với biểu đồ trực quan được phân tích bởi AI.</p>
              <div className="chart-bars" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </article>
            <article className="mini-feature-card">
              <div className="feature-icon muted"><span className="ms">qr_code</span></div>
              <h3>Fast Check-in</h3>
              <p>Quét mã QR siêu tốc, giảm thiểu ùn tắc tại cửa ra vào.</p>
            </article>
            <article className="mini-feature-card ai-card">
              <div className="feature-icon"><span className="ms">analytics</span></div>
              <h3>AI Feedback Analysis</h3>
              <p>Tự động tổng hợp và phân tích cảm xúc từ phản hồi của người tham gia.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="landing-footer" id="about">
        <div className="footer-brand">
          <strong>EventSnap AI</strong>
          <p>Nền tảng quản lý sự kiện thông minh, tối ưu hóa quy trình bằng sức mạnh của trí tuệ nhân tạo.</p>
          <small>© 2026 EventSnap AI. Nền tảng quản lý sự kiện thông minh.</small>
        </div>
        <div>
          <strong>Sản phẩm</strong>
          <Link to="/events">Về chúng tôi</Link>
          <a href="#how-it-works">Cách hoạt động</a>
          <a href="#pricing">Bảng giá</a>
        </div>
        <div>
          <strong>Tài nguyên</strong>
          <a href="#help">Trung tâm trợ giúp</a>
          <a href="#blog">Blog công nghệ</a>
          <a href="#api">Hướng dẫn API</a>
        </div>
        <div>
          <strong>Pháp lý & Liên hệ</strong>
          <a href="#terms">Điều khoản sử dụng</a>
          <a href="#privacy">Chính sách bảo mật</a>
          <a href="#contact">Liên hệ</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;