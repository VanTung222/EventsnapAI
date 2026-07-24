import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventRegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: 'Nguyễn Văn Hoàng',
    email: 'hoang.nguyen@techcorp.vn',
    phone: '',
    organization: 'TechCorp Vietnam',
    topic: '',
    specialRequest: '',
    agreeTerms: false,
    agreeCancellation: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Đăng ký sự kiện thành công!');
      navigate('/attendee/my-events');
    }, 2000);
  };

  const toggleWaitlistDemo = () => {
    setIsSoldOut((prev) => !prev);
    if (!isSoldOut) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-md text-body-md min-h-screen antialiased relative overflow-x-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-fixed/30 blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-secondary-container/50 blur-[100px] mix-blend-multiply" />
      </div>

      {/* Simplified Header for Focused Flow */}
      <header className="w-full px-6 py-4 flex items-center justify-between z-10 relative bg-surface/50 backdrop-blur-md border-b border-outline-variant/20 sticky top-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span className="font-label-md text-sm font-semibold">Quay lại sự kiện</span>
        </button>
        <div className="text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate('/attendee/dashboard')}>
          EventSnap AI
        </div>
        <div className="w-[100px]" /> {/* Spacer for centering */}
      </header>

      {/* Main Content */}
      <main className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-6 md:py-12 flex flex-col lg:flex-row gap-6 z-10 relative items-start">
        {/* Left Column: Form Section */}
        <div className="flex-1 w-full max-w-3xl flex flex-col gap-6">
          {/* Header & Progress */}
          <div className="flex flex-col gap-2 mb-4">
            <h1 className="text-2xl md:text-3xl text-on-surface font-bold">
              Hoàn tất đăng ký của bạn
            </h1>
            {/* Progress Bar */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2 flex-1">
                <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <span className="text-sm font-semibold text-primary">Thông tin</span>
                <div className="h-[2px] flex-1 bg-primary/20 rounded-full" />
              </div>
              <div className="flex items-center gap-2 flex-1 opacity-50">
                <div className="w-6 h-6 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <span className="text-sm font-semibold text-on-surface-variant">Xác nhận</span>
              </div>
            </div>
          </div>

          {/* Main Form Card */}
          <form
            onSubmit={handleSubmit}
            className="glass-panel border border-outline-variant/30 rounded-2xl p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden"
            id="registration-form"
          >
            {/* AI Auto-fill Notice */}
            <div className="bg-primary-fixed/20 border border-primary-fixed rounded-2xl p-4 flex gap-4 items-start">
              <span className="material-symbols-outlined text-primary mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <div>
                <h4 className="text-sm font-bold text-on-surface mb-1">Hồ sơ thông minh được kích hoạt</h4>
                <p className="text-on-surface-variant text-sm">
                  Chúng tôi đã tự động điền thông tin từ hồ sơ EventSnap AI của bạn để giúp quá trình đăng ký nhanh chóng hơn.
                </p>
              </div>
            </div>

            {/* Personal Information */}
            <fieldset className="flex flex-col gap-4 border-none p-0 m-0">
              <legend className="text-xl font-bold text-on-surface mb-4">Thông tin cá nhân</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name (Auto-filled) */}
                <div className="flex flex-col gap-1 relative group">
                  <label className="text-sm font-semibold text-on-surface flex justify-between items-center">
                    Họ và tên *
                    <span className="text-primary text-[11px] flex items-center gap-1 bg-primary-fixed/50 px-2 py-0.5 rounded-full">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span> Đã điền
                    </span>
                  </label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface font-body-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                {/* Email (Auto-filled) */}
                <div className="flex flex-col gap-1 relative">
                  <label className="text-sm font-semibold text-on-surface flex justify-between items-center">
                    Địa chỉ Email *
                    <span className="text-primary text-[11px] flex items-center gap-1 bg-primary-fixed/50 px-2 py-0.5 rounded-full">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span> Đã điền
                    </span>
                  </label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface font-body-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-on-surface">Số điện thoại *</label>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-on-surface font-body-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder:text-outline"
                    placeholder="Nhập số điện thoại"
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* Organization */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-on-surface">Tổ chức / Công ty</label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface font-body-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  />
                </div>
              </div>
            </fieldset>

            <hr className="border-t border-outline-variant/20" />

            {/* Custom Questions */}
            <fieldset className="flex flex-col gap-4 border-none p-0 m-0">
              <legend className="text-xl font-bold text-on-surface mb-4">Khảo sát trước sự kiện</legend>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-on-surface">
                  Bạn quan tâm nhất đến chủ đề nào trong hội nghị AI này?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-1">
                  {[
                    { id: 'genai', label: 'Generative AI' },
                    { id: 'ml', label: 'Machine Learning' },
                    { id: 'ethics', label: 'AI Ethics & Policy' },
                  ].map((topic) => (
                    <label
                      key={topic.id}
                      className={`flex items-center gap-2.5 p-3 border rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors ${
                        formData.topic === topic.id ? 'border-primary bg-primary/5' : 'border-outline-variant/30'
                      }`}
                    >
                      <input
                        className="text-primary focus:ring-primary h-4 w-4 border-outline"
                        name="topic"
                        type="radio"
                        value={topic.id}
                        checked={formData.topic === topic.id}
                        onChange={() => setFormData({ ...formData, topic: topic.id })}
                      />
                      <span className="text-sm font-medium text-on-surface">{topic.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-2">
                <label className="text-sm font-semibold text-on-surface">
                  Yêu cầu hỗ trợ đặc biệt hoặc chế độ ăn uống (nếu có)
                </label>
                <textarea
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-on-surface font-body-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder:text-outline resize-none"
                  placeholder="Ví dụ: Ăn chay, dị ứng đậu phộng..."
                  rows={3}
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                />
              </div>
            </fieldset>

            {/* Policies & Terms */}
            <div className="flex flex-col gap-3 bg-surface-container-low/50 p-4 rounded-xl border border-outline-variant/20 mt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-1">
                  <input
                    type="checkbox"
                    className="rounded text-primary focus:ring-primary h-5 w-5 border-2 border-outline transition-all cursor-pointer"
                    required
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  />
                </div>
                <span className="text-sm text-on-surface-variant leading-snug">
                  Tôi đồng ý với{' '}
                  <a className="text-primary hover:underline font-bold" href="#terms">
                    Điều khoản Dịch vụ
                  </a>{' '}
                  và{' '}
                  <a className="text-primary hover:underline font-bold" href="#privacy">
                    Chính sách Bảo mật
                  </a>{' '}
                  của EventSnap AI.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-1">
                  <input
                    type="checkbox"
                    className="rounded text-primary focus:ring-primary h-5 w-5 border-2 border-outline transition-all cursor-pointer"
                    required
                    checked={formData.agreeCancellation}
                    onChange={(e) => setFormData({ ...formData, agreeCancellation: e.target.checked })}
                  />
                </div>
                <span className="text-sm text-on-surface-variant leading-snug">
                  Tôi đã đọc và chấp nhận <strong>Chính sách Hủy vé</strong> (Miễn phí hủy trước 48 giờ. Không hoàn tiền sau thời gian này).
                </span>
              </label>
            </div>

            {/* Desktop Submit Action */}
            <div className="hidden lg:flex justify-end mt-4">
              <button
                disabled={isSubmitting}
                className="bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full px-12 py-3.5 font-bold text-sm shadow-[0_4px_20px_rgba(0,65,145,0.3)] hover:-translate-y-1 transition-all flex items-center gap-2 relative overflow-hidden group cursor-pointer"
                id="submit-btn-desktop"
                type="submit"
              >
                <span className={`btn-text transition-opacity duration-200 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  Hoàn tất đăng ký
                </span>
                <span className={`material-symbols-outlined btn-icon transition-transform group-hover:translate-x-1 duration-200 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  arrow_forward
                </span>
                
                {/* Loading State Overlay */}
                {isSubmitting && (
                  <div className="absolute inset-0 bg-primary-container flex items-center justify-center transition-opacity">
                    <span className="material-symbols-outlined animate-spin-custom">progress_activity</span>
                    <span className="ml-2 font-bold">Đang xử lý...</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Sticky Event Summary */}
        <aside className="w-full lg:w-[400px]">
          <div className="sticky top-[100px] glass-panel border border-outline-variant/30 rounded-2xl overflow-hidden flex flex-col inner-glow">
            {/* Poster Image */}
            <div className="relative h-[200px] w-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="AI Tech Conference Hall"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1-Odu9pzy85Rp_8LNaqHtO5Cnj-Q5NUx8-dnrL6HJVyuIEioW8lgyKnYsmdXqzLxzY6l1b15NqYNdwlp1BXkjEbNSF3bD9hMEliyTH4ThSVFKGIoBxAOYdTFEX0ooN__RcA3K1OA4STN7fewriBoRhPEfxW4WB2OWZcZ0ume4Ub9y9Y6ofncq2lxW72VB-cjdA9NLepsgyc-xjaEq8zC3H4zPgpqCqpcDLTweYlji_2Ym1heWdwDj-uD6tune-7unW76mCEFLtwQ"
              />
              <div className="absolute top-4 right-4 bg-surface-glass backdrop-blur-md px-3 py-1 rounded-full border border-surface-container-lowest/50 flex items-center gap-1.5 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-error ai-pulse" />
                <span className="text-[12px] font-bold text-on-surface">
                  {isSoldOut ? 'Đã hết vé' : 'Sắp hết chỗ'}
                </span>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-6 flex flex-col gap-4">
              <h2 className="text-lg md:text-xl text-on-surface font-bold leading-tight">
                Vietnam AI Summit 2024: Tương lai của Trí tuệ Nhân tạo
              </h2>
              
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-start gap-2.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-on-surface">Thứ Sáu, 15 Tháng 11, 2024</span>
                    <span className="text-xs text-on-surface-variant mt-0.5">08:00 AM - 17:00 PM (GMT+7)</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-2.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-on-surface">GEM Center</span>
                    <span className="text-xs text-on-surface-variant mt-0.5">8 Nguyễn Bỉnh Khiêm, Đa Kao, Quận 1, TP.HCM</span>
                  </div>
                </div>
              </div>

              <hr className="border-t border-outline-variant/20 my-1" />

              {/* Capacity Indicator */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-variant">Tình trạng vé</span>
                <div className="flex flex-col items-end">
                  <span className={`text-sm font-bold ${isSoldOut ? 'text-outline' : 'text-error'}`}>
                    {isSoldOut ? 'Hết vé' : 'Còn 12 vé'}
                  </span>
                  <div className="w-24 h-1.5 bg-surface-variant rounded-full mt-1 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${isSoldOut ? 'w-full bg-outline' : 'w-[90%] bg-error'}`} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-on-surface">Tổng cộng</span>
                <span className="text-xl text-primary font-black">Miễn phí</span>
              </div>
            </div>
          </div>

          {/* Demo trigger for Waitlist */}
          <div className="mt-6 text-center">
            <button
              onClick={toggleWaitlistDemo}
              className="text-xs font-semibold text-outline hover:text-primary transition-colors underline bg-transparent border-none cursor-pointer"
              type="button"
            >
              [Demo] Giả lập sự kiện {isSoldOut ? 'còn vé' : 'hết vé'}
            </button>
          </div>
        </aside>
      </main>

      {/* Mobile Sticky Submit Button */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-surface/90 backdrop-blur-xl border-t border-outline-variant/30 lg:hidden z-20 pb-[env(safe-area-inset-bottom,16px)]">
        <button
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full px-6 py-3.5 font-bold text-sm shadow-md flex items-center justify-center gap-2 relative overflow-hidden group cursor-pointer"
          form="registration-form"
          id="submit-btn-mobile"
          type="submit"
        >
          <span className={`btn-text transition-opacity ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
            Hoàn tất đăng ký
          </span>
          <span className={`material-symbols-outlined btn-icon ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
            arrow_forward
          </span>
          
          {/* Loading State Overlay */}
          {isSubmitting && (
            <div className="absolute inset-0 bg-primary-container flex items-center justify-center transition-opacity">
              <span className="material-symbols-outlined animate-spin-custom">progress_activity</span>
            </div>
          )}
        </button>
      </div>

      {/* Waitlist Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center z-50 bg-on-background/40 backdrop-blur-sm px-4">
          <div className="glass-panel border border-outline-variant/30 rounded-2xl p-6 max-w-md w-full shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex flex-col gap-4 relative inner-glow m-auto animate-[fadeIn_0.2s_ease-out]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors bg-transparent border-none cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center mb-1">
              <span className="material-symbols-outlined">hourglass_empty</span>
            </div>
            <h3 className="text-xl text-on-surface font-bold">Rất tiếc, sự kiện đã hết vé</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Do nhu cầu tham gia cao, toàn bộ vé cho <strong>Vietnam AI Summit 2024</strong> đã được đăng ký. Tuy nhiên, bạn có thể tham gia danh sách chờ (Waitlist). Chúng tôi sẽ ưu tiên thông báo cho bạn ngay khi có người hủy vé.
            </p>
            <div className="mt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  navigate('/attendee/waitlist-status');
                }}
                className="w-full bg-secondary text-on-secondary rounded-full px-6 py-3 font-bold text-sm shadow-sm hover:bg-on-surface hover:text-white transition-colors cursor-pointer border-none"
                type="button"
              >
                Tham gia Danh sách chờ
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-transparent border border-outline-variant text-on-surface rounded-full px-6 py-3 font-bold text-sm hover:bg-surface-variant transition-colors cursor-pointer"
                type="button"
              >
                Tìm sự kiện khác
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventRegistrationPage;
