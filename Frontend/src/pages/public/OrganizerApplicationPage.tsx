import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrganizerApplicationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    eventType: '',
    email: '',
    phone: '',
    reason: '',
    portfolioLink: '',
    agreeTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      alert('Application submitted successfully! Our team will review it and get back to you shortly.');
      navigate('/');
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col relative overflow-x-hidden pb-12">
      <style>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 4px 20px rgba(30, 41, 59, 0.05);
        }
        .btn-gradient {
          background: linear-gradient(135deg, #0058be 0%, #004191 100%);
          transition: all 0.3s ease;
        }
        .btn-gradient:hover {
          box-shadow: 0 8px 24px rgba(0, 65, 145, 0.25);
          transform: translateY(-2px);
        }
        .ai-pulse {
          animation: pulse-glow 2s infinite;
        }
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(33, 112, 228, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(33, 112, 228, 0); }
          100% { box-shadow: 0 0 0 0 rgba(33, 112, 228, 0); }
        }
      `}</style>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-fixed-dim/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-secondary-fixed/30 rounded-full blur-[80px]" />
      </div>

      {/* Main Content */}
      <main className="flex-grow z-10 px-4 md:px-6 max-w-[1280px] mx-auto w-full mt-8">
        
        {/* Application Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-primary-fixed rounded-full mb-4 ai-pulse">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              storefront
            </span>
          </div>
          <h1 className="font-headline-xl text-3xl md:text-5xl text-on-surface mb-2 font-bold">
            Become an Organizer
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Unlock advanced AI tools to manage, analyze, and elevate your events. Apply now to get access to predictive analytics, automated ticketing, and dynamic audience engagement features.
          </p>
        </div>

        {/* Two Column Layout: Info/Benefits & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Benefits */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col gap-6 border border-outline-variant/30 shadow-sm">
              <h3 className="text-lg md:text-xl text-on-surface font-bold">Why upgrade?</h3>
              
              <div className="flex flex-col gap-6">
                {/* Benefit 1 */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-secondary-container">query_stats</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface mb-1">AI-Powered Insights</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Real-time attendance prediction and revenue forecasting based on market trends.
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-secondary-container">local_activity</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface mb-1">Smart Ticketing</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Dynamic pricing models that adjust automatically to maximize your event's profitability.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-secondary-container">diversity_3</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface mb-1">Audience CRM</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Built-in tools to segment your attendees and send targeted, AI-generated communications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col gap-4 border border-outline-variant/30 shadow-sm relative">
              <span className="material-symbols-outlined text-primary/20 text-5xl absolute top-4 right-4">
                format_quote
              </span>
              <p className="text-sm italic text-on-surface-variant leading-relaxed z-10">
                "EventSnap's organizer tools saved us 20 hours a week on admin and increased our ticket sales by 30% through smart pricing."
              </p>
              <div className="flex items-center gap-3 mt-2 z-10">
                <div className="w-10 h-10 rounded-full bg-primary-fixed-dim/30 flex items-center justify-center font-bold text-sm text-primary">
                  AT
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-on-surface">Alex Tran</span>
                  <span className="text-[11px] text-on-surface-variant">TechCon Vietnam</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="glass-panel border border-outline-variant/30 rounded-2xl p-6 md:p-8 flex flex-col gap-6"
            >
              <h3 className="text-lg md:text-xl text-on-surface font-bold">
                Organizer Application Form
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Organization/Company Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-on-surface">Organization/Company Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline"
                    placeholder="e.g. Innovate Events JSC"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>

                {/* Primary Event Type */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-on-surface">Primary Event Type *</label>
                  <select
                    required
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer text-on-surface"
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  >
                    <option value="" disabled>Select event type...</option>
                    <option value="technology">Technology</option>
                    <option value="art">Art & Culture</option>
                    <option value="networking">Networking</option>
                    <option value="education">Education</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="sports">Sports</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                {/* Contact Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-on-surface">Contact Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline"
                    placeholder="contact@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-on-surface">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline"
                    placeholder="+84 123 456 789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Reason for applying */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-on-surface">Reason for applying *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline resize-none"
                  placeholder="Briefly describe your experience and why you want to use EventSnap AI tools..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                />
              </div>

              {/* Evidence of Past Events (File upload / Link) */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface">Evidence of Past Events (Link or File)</label>
                
                {/* Drag and drop zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer relative ${
                    isDragOver ? 'border-primary bg-primary/5' : 'border-outline-variant/60 hover:bg-surface-container-low/30'
                  }`}
                >
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                  <div className="text-center">
                    <p className="text-xs font-bold text-on-surface">
                      {uploadedFile ? uploadedFile.name : 'Drag and drop files here or click to browse'}
                    </p>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">
                      PDF, JPG, PNG up to 10MB
                    </p>
                  </div>
                </div>

                {/* Or portfolio URL input */}
                <input
                  type="url"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline"
                  placeholder="Or provide a portfolio or past events link here..."
                  value={formData.portfolioLink}
                  onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                />
              </div>

              {/* Checkbox agreement */}
              <label className="flex items-start gap-2.5 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  required
                  className="rounded text-primary focus:ring-primary h-4.5 w-4.5 border-outline mt-0.5 cursor-pointer"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                />
                <span className="text-xs text-on-surface-variant leading-relaxed">
                  I agree to the Organizer Terms and Conditions and authorize EventSnap AI to review my event portfolio.
                </span>
              </label>

              {/* Submit Button */}
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gradient text-on-primary font-bold text-sm px-8 py-3 rounded-full flex items-center justify-center gap-1.5 shadow-md border-none cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  {!isSubmitting && <span className="material-symbols-outlined text-sm">send</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrganizerApplicationPage;
