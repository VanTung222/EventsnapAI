import { Link } from 'react-router-dom';
import './UserPages.css';

const WaitlistStatusPage = () => {
  return (
    <>
      <main className="user-main">
        {/* Page Content Centered */}
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          
          {/* Main Card */}
          <div className="w-full glass-panel border border-outline-variant/30 rounded-2xl p-6 md:p-8 flex flex-col gap-6 items-center shadow-[0_12px_40px_rgba(0,0,0,0.03)] inner-glow relative overflow-hidden mt-4">
            
            {/* Header Icon */}
            <div className="w-16 h-16 rounded-full bg-primary-fixed/30 text-primary flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-3xl">hourglass_empty</span>
            </div>

            {/* Title & Event Subtitle */}
            <div className="text-center">
              <h1 className="font-headline-xl text-3xl md:text-4xl text-on-surface font-bold mb-1">
                Danh sách chờ
              </h1>
              <p className="text-sm md:text-base text-primary font-bold">
                Vietnam AI Summit 2024
              </p>
            </div>

            {/* Position Display Card */}
            <div className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 flex flex-col items-center justify-center">
              <span className="text-xs uppercase tracking-[0.15em] font-bold text-on-surface-variant mb-1">
                Vị trí của bạn
              </span>
              <span className="text-5xl font-black text-primary mb-2">
                #3
              </span>
              <span className="text-xs font-semibold text-on-surface-variant flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                Còn 2 người phía trước bạn
              </span>
            </div>

            {/* Stats Row */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Joined Waitlist */}
              <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 flex flex-col">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                  Đã tham gia hàng chờ
                </span>
                <span className="text-sm font-bold text-on-surface">
                  10:45 AM, 24/10/2024
                </span>
                <span className="text-xs text-on-surface-variant mt-1">
                  Đăng ký tự động
                </span>
              </div>

              {/* Event Starts In */}
              <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 flex flex-col">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                  Sự kiện diễn ra sau
                </span>
                <span className="text-sm font-bold text-on-surface">
                  3 ngày 14 giờ 22 phút
                </span>
                <span className="text-xs text-on-surface-variant mt-1">
                  Vé trống mở định kỳ
                </span>
              </div>
            </div>

            <hr className="w-full border-t border-outline-variant/20 my-2" />

            {/* Timeline Progress */}
            <div className="w-full flex flex-col gap-6 pl-4 md:pl-8 relative">
              {/* Vertical line connector */}
              <div className="absolute left-[23px] top-[14px] bottom-[14px] w-[2px] bg-outline-variant/40" />

              {/* Step 1: Joined */}
              <div className="flex gap-4 items-start relative">
                <div className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center z-10 shadow-sm">
                  <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-on-surface">Đã đăng ký hàng chờ</span>
                  <span className="text-xs text-on-surface-variant mt-0.5">Vị trí ban đầu: #15</span>
                </div>
              </div>

              {/* Step 2: Waiting */}
              <div className="flex gap-4 items-start relative">
                <div className="w-5 h-5 rounded-full bg-primary-fixed text-primary flex items-center justify-center z-10 shadow-sm border-2 border-primary">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-primary">Đang đợi chỗ trống</span>
                  <span className="text-xs text-on-surface-variant mt-0.5">Vị trí hiện tại: #3</span>
                </div>
              </div>

              {/* Step 3: Receive Ticket */}
              <div className="flex gap-4 items-start relative">
                <div className="w-5 h-5 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center z-10 shadow-sm">
                  <span className="w-2 h-2 bg-outline-variant rounded-full" />
                </div>
                <div className="flex flex-col opacity-60">
                  <span className="text-sm font-bold text-on-surface">Nhận vé chính thức</span>
                  <span className="text-xs text-on-surface-variant mt-0.5">Vui lòng kiểm tra email khi tới lượt</span>
                </div>
              </div>
            </div>

            <hr className="w-full border-t border-outline-variant/20 my-2" />

            {/* Call to Actions */}
            <div className="w-full flex flex-col md:flex-row gap-3">
              <Link
                to="/attendee/my-events"
                className="flex-1 bg-primary text-on-primary font-bold text-sm text-center py-3 rounded-full hover:opacity-90 transition-opacity shadow-sm border-none cursor-pointer"
              >
                Quản lý sự kiện
              </Link>
              <Link
                to="/events"
                className="flex-1 bg-transparent border border-outline-variant text-on-surface font-bold text-sm text-center py-3 rounded-full hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                Khám phá sự kiện khác
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default WaitlistStatusPage;
