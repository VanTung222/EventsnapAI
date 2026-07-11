import { FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import eventHeroImage from '../../assets/images/futuristic-colorful_event.png';
import './EventDiscoveryPage.css';

type EventMode = 'all' | 'online' | 'offline';
type PriceMode = 'all' | 'free' | 'paid';
type ViewMode = 'grid' | 'list';
type LoadState = 'ready' | 'loading' | 'error';

interface DiscoveryEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  seatsLeft: number;
  status: string;
  mode: 'online' | 'offline';
  price: 'free' | 'paid';
  city: string;
}

const categories = [
  { label: 'Công nghệ', icon: 'AI' },
  { label: 'Workshop', icon: 'WK' },
  { label: 'Tuyển dụng', icon: 'HR' },
  { label: 'Tình nguyện', icon: 'VN' },
  { label: 'Âm nhạc', icon: 'MS' },
  { label: 'Thể thao', icon: 'SP' },
];

const discoveryEvents: DiscoveryEvent[] = [
  {
    id: 'ai-career-day-2026',
    title: 'AI Career Day 2026',
    category: 'Công nghệ',
    date: '18 tháng 7, 2026',
    time: '18:30',
    location: 'ĐH Bách Khoa, TP.HCM',
    organizer: 'BK Innovation Lab',
    seatsLeft: 42,
    status: 'Đang mở đăng ký',
    mode: 'offline',
    price: 'free',
    city: 'TP.HCM',
  },
  {
    id: 'react-campus-workshop',
    title: 'Workshop React Campus',
    category: 'Workshop',
    date: '19 tháng 7, 2026',
    time: '09:00',
    location: 'Innovation Hub',
    organizer: 'Frontend Vietnam',
    seatsLeft: 18,
    status: 'Miễn phí',
    mode: 'offline',
    price: 'free',
    city: 'TP.HCM',
  },
  {
    id: 'volunteer-connect-night',
    title: 'Volunteer Connect Night',
    category: 'Tình nguyện',
    date: '21 tháng 7, 2026',
    time: '19:00',
    location: 'Nhà văn hóa Sinh viên',
    organizer: 'Green Campus Club',
    seatsLeft: 9,
    status: 'Sắp đóng đăng ký',
    mode: 'offline',
    price: 'free',
    city: 'TP.HCM',
  },
  {
    id: 'remote-data-bootcamp',
    title: 'Remote Data Bootcamp',
    category: 'Công nghệ',
    date: '24 tháng 7, 2026',
    time: '20:00',
    location: 'Online qua Google Meet',
    organizer: 'Data Young Lab',
    seatsLeft: 120,
    status: 'Online',
    mode: 'online',
    price: 'paid',
    city: 'Online',
  },
  {
    id: 'campus-music-jam',
    title: 'Campus Music Jam',
    category: 'Âm nhạc',
    date: '26 tháng 7, 2026',
    time: '20:00',
    location: 'Sân khấu ngoài trời',
    organizer: 'Student Music Union',
    seatsLeft: 0,
    status: 'Waitlist',
    mode: 'offline',
    price: 'paid',
    city: 'TP.HCM',
  },
  {
    id: 'sports-tech-open',
    title: 'Sports Tech Open',
    category: 'Thể thao',
    date: '30 tháng 7, 2026',
    time: '07:30',
    location: 'Sân vận động Quận 7',
    organizer: 'Active Student Network',
    seatsLeft: 64,
    status: 'Còn chỗ',
    mode: 'offline',
    price: 'free',
    city: 'TP.HCM',
  },
];

const EventDiscoveryPage = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [mode, setMode] = useState<EventMode>('all');
  const [price, setPrice] = useState<PriceMode>('all');
  const [hasSeatOnly, setHasSeatOnly] = useState(false);
  const [location, setLocation] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [sortBy, setSortBy] = useState('soonest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [loadState, setLoadState] = useState<LoadState>('ready');

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedLocation = location.trim().toLowerCase();
    const normalizedOrganizer = organizer.trim().toLowerCase();

    return discoveryEvents
      .filter((event) => {
        const matchesQuery = !normalizedQuery || `${event.title} ${event.category} ${event.location}`.toLowerCase().includes(normalizedQuery);
        const matchesCategory = category === 'Tất cả' || event.category === category;
        const matchesMode = mode === 'all' || event.mode === mode;
        const matchesPrice = price === 'all' || event.price === price;
        const matchesSeat = !hasSeatOnly || event.seatsLeft > 0;
        const matchesLocation = !normalizedLocation || event.location.toLowerCase().includes(normalizedLocation) || event.city.toLowerCase().includes(normalizedLocation);
        const matchesOrganizer = !normalizedOrganizer || event.organizer.toLowerCase().includes(normalizedOrganizer);

        return matchesQuery && matchesCategory && matchesMode && matchesPrice && matchesSeat && matchesLocation && matchesOrganizer;
      })
      .sort((a, b) => {
        if (sortBy === 'seats') return b.seatsLeft - a.seatsLeft;
        if (sortBy === 'name') return a.title.localeCompare(b.title);
        return discoveryEvents.indexOf(a) - discoveryEvents.indexOf(b);
      });
  }, [category, hasSeatOnly, location, mode, organizer, price, query, sortBy]);

  const resetFilters = () => {
    setQuery('');
    setCategory('Tất cả');
    setMode('all');
    setPrice('all');
    setHasSeatOnly(false);
    setLocation('');
    setOrganizer('');
    setLoadState('ready');
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSheetOpen(false);
  };

  const handleFavorite = () => {
    setNotice('Vui lòng đăng nhập để lưu sự kiện yêu thích.');
    window.setTimeout(() => setNotice(''), 2600);
  };

  return (
    <div className="discovery-page">
      <header className="discovery-header">
        <Link className="discovery-brand" to="/">
          <span>ES</span>
          EventSnap AI
        </Link>
        <nav>
          <Link to="/events">Khám phá</Link>
          <Link to="/login">Đăng nhập</Link>
          <Link className="discovery-cta" to="/register">Bắt đầu miễn phí</Link>
        </nav>
      </header>

      <main>
        <section className="discovery-hero">
          <div>
            <p className="page-kicker">Event Discovery</p>
            <h1>Khám phá sự kiện phù hợp với lịch học, sở thích và cộng đồng của bạn.</h1>
            <p>Tìm workshop, tuyển dụng, tình nguyện, âm nhạc và hoạt động campus đang mở đăng ký trong một nơi duy nhất.</p>
          </div>
          <form className="discovery-search" onSubmit={handleSearch}>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo tên sự kiện, chủ đề hoặc địa điểm" aria-label="Tìm kiếm sự kiện" />
            <button type="submit">Tìm kiếm</button>
          </form>
        </section>

        <section className="category-rail" aria-label="Danh mục sự kiện">
          <button className={category === 'Tất cả' ? 'active' : ''} onClick={() => setCategory('Tất cả')} type="button">
            <span>ALL</span>
            Tất cả
          </button>
          {categories.map((item) => (
            <button className={category === item.label ? 'active' : ''} key={item.label} onClick={() => setCategory(item.label)} type="button">
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </section>

        {notice && <div className="login-notice" role="status">{notice}</div>}

        <section className="discovery-shell">
          <aside className={`filter-panel ${sheetOpen ? 'open' : ''}`} aria-label="Bộ lọc sự kiện">
            <div className="filter-heading">
              <strong>Bộ lọc</strong>
              <button type="button" onClick={() => setSheetOpen(false)}>Đóng</button>
            </div>
            <label>
              Ngày tổ chức
              <select defaultValue="upcoming">
                <option value="upcoming">Sắp diễn ra</option>
                <option value="weekend">Cuối tuần này</option>
                <option value="month">Trong tháng</option>
              </select>
            </label>
            <label>
              Danh mục
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option>Tất cả</option>
                {categories.map((item) => <option key={item.label}>{item.label}</option>)}
              </select>
            </label>
            <fieldset>
              <legend>Hình thức</legend>
              <label><input checked={mode === 'all'} onChange={() => setMode('all')} type="radio" /> Tất cả</label>
              <label><input checked={mode === 'online'} onChange={() => setMode('online')} type="radio" /> Online</label>
              <label><input checked={mode === 'offline'} onChange={() => setMode('offline')} type="radio" /> Offline</label>
            </fieldset>
            <fieldset>
              <legend>Chi phí</legend>
              <label><input checked={price === 'all'} onChange={() => setPrice('all')} type="radio" /> Tất cả</label>
              <label><input checked={price === 'free'} onChange={() => setPrice('free')} type="radio" /> Miễn phí</label>
              <label><input checked={price === 'paid'} onChange={() => setPrice('paid')} type="radio" /> Có phí</label>
            </fieldset>
            <label className="check-row">
              <input checked={hasSeatOnly} onChange={(event) => setHasSeatOnly(event.target.checked)} type="checkbox" />
              Còn chỗ
            </label>
            <label>
              Địa điểm
              <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="TP.HCM, online..." />
            </label>
            <label>
              Đơn vị tổ chức
              <input value={organizer} onChange={(event) => setOrganizer(event.target.value)} placeholder="Tên organizer" />
            </label>
            <div className="state-tools">
              <button type="button" onClick={resetFilters}>Xóa bộ lọc</button>
              <button type="button" onClick={() => setLoadState(loadState === 'error' ? 'ready' : 'error')}>Demo lỗi API</button>
            </div>
          </aside>

          <div className="events-content">
            <div className="results-toolbar">
              <button className="mobile-filter-button" type="button" onClick={() => setSheetOpen(true)}>Bộ lọc</button>
              <p><strong>{filteredEvents.length}</strong> kết quả công khai</p>
              <div className="toolbar-actions">
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sắp xếp sự kiện">
                  <option value="soonest">Sắp diễn ra</option>
                  <option value="seats">Còn nhiều chỗ</option>
                  <option value="name">Tên A đến Z</option>
                </select>
                <div className="view-toggle" aria-label="Đổi kiểu hiển thị">
                  <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')} type="button">▦</button>
                  <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')} type="button">☰</button>
                </div>
              </div>
            </div>

            {loadState === 'loading' && <SkeletonGrid />}
            {loadState === 'error' && (
              <div className="soft-error">
                <strong>Chưa tải được danh sách sự kiện.</strong>
                <p>Kết nối đang không ổn định. Bạn có thể thử lại sau vài giây.</p>
                <button type="button" onClick={() => setLoadState('ready')}>Thử lại</button>
              </div>
            )}
            {loadState === 'ready' && filteredEvents.length === 0 && (
              <div className="empty-events">
                <div className="empty-calendar" aria-hidden="true">
                  <span />
                </div>
                <h2>Không tìm thấy sự kiện phù hợp</h2>
                <p>Thử mở rộng thời gian, địa điểm hoặc xóa bớt bộ lọc.</p>
                <button type="button" onClick={resetFilters}>Xóa bộ lọc</button>
              </div>
            )}
            {loadState === 'ready' && filteredEvents.length > 0 && (
              <div className={`discovery-events ${viewMode}`}>
                {filteredEvents.map((event, index) => (
                  <article className="discovery-card" key={event.id}>
                    <Link className="event-poster" to={`/events/${event.id}`}>
                      <img src={eventHeroImage} alt={`Poster ${event.title}`} className={`poster-crop-${(index % 4) + 1}`} />
                      <span className="status-badge">{event.status}</span>
                    </Link>
                    <button className="heart-button" type="button" aria-label="Lưu sự kiện yêu thích" onClick={handleFavorite}>♡</button>
                    <div className="discovery-card-body">
                      <p className="event-category">{event.category}</p>
                      <h2><Link to={`/events/${event.id}`}>{event.title}</Link></h2>
                      <p>{event.date} lúc {event.time}</p>
                      <p>{event.location}</p>
                      <div className="card-meta">
                        <span>{event.organizer}</span>
                        <strong>{event.seatsLeft > 0 ? `${event.seatsLeft} chỗ còn lại` : 'Đang waitlist'}</strong>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

const SkeletonGrid = () => (
  <div className="skeleton-grid" aria-label="Đang tải sự kiện">
    {Array.from({ length: 6 }).map((_, index) => (
      <div className="skeleton-card" key={index}>
        <span />
        <i />
        <i />
        <i />
      </div>
    ))}
  </div>
);

export default EventDiscoveryPage;