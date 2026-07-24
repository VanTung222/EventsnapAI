import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrganizerAIScanner = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = Upload, 2 = Scanning, 3 = Review
  const [dragOver, setDragOver] = useState(false);
  
  // Extracted fields editable state
  const [extractedData, setExtractedData] = useState({
    eventName: 'Neon Nights: Synthwave Festival 2024',
    date: 'Oct 24, 2024',
    time: '20:00 - 02:00',
    location: 'The Warehouse (Sector 7?)',
    organizer: 'CyberLive Events Collective',
    ticketPrice: '',
  });

  const handleScanClick = () => {
    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleScanClick();
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Event created successfully from AI extracted data!');
    navigate('/organizer/events');
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* STEP 1: UPLOAD POSTER */}
      {step === 1 && (
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
              AI Poster Upload
            </h1>
            <p className="text-sm text-slate-400">
              Intelligent document ingestion for event generation.
            </p>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Upload Zone (Left Column) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-full border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center gap-4 transition-all relative min-h-[350px] bg-slate-950/20 ${
                  dragOver
                    ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(33,112,228,0.1)]'
                    : 'border-slate-800 hover:bg-slate-900/10'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                  <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                </div>
                <div className="text-center flex flex-col items-center gap-1">
                  <h3 className="text-lg font-bold text-white">Kéo thả poster sự kiện vào đây</h3>
                  <p className="text-sm text-slate-400">hoặc Click để chọn file</p>
                </div>
                <div className="flex gap-3 mt-2 z-10">
                  <label className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-bold px-6 py-2.5 rounded-full cursor-pointer transition-colors">
                    Browse Files
                    <input type="file" className="sr-only" onChange={handleScanClick} />
                  </label>
                  <button
                    onClick={handleScanClick}
                    className="bg-primary hover:bg-primary-container text-white text-xs font-bold px-6 py-2.5 rounded-full transition-colors cursor-pointer border-none"
                  >
                    Scan with AI
                  </button>
                </div>
                <span className="text-[11px] text-slate-500 mt-2">
                  Supports PNG, JPG, PDF up to 20MB
                </span>
              </div>
            </div>

            {/* AI Benefits Panel (Right Column) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="glass-panel border border-slate-800/60 rounded-2xl p-6 flex flex-col gap-6">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                  AI Benefits
                </h3>
                
                <div className="flex flex-col gap-5">
                  <div className="flex gap-3.5 items-start">
                    <span className="material-symbols-outlined text-primary mt-0.5">query_stats</span>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-0.5">Tự động trích xuất thông tin</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Smart extraction of Event Name, Date, Time, and Location coordinates.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <span className="material-symbols-outlined text-primary mt-0.5">sell</span>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-0.5">Phân loại sự kiện thông minh</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Categorizes events automatically based on visual and textual cues.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <span className="material-symbols-outlined text-primary mt-0.5">description</span>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-0.5">Tạo bản nháp ngay lập tức</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Generates a fully populated event draft ready for review and publishing.
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="border-t border-slate-900" />

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">Engine Status</span>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    Online & Ready
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Uploads */}
          <div className="flex flex-col gap-4 mt-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">history</span>
              Recent Uploads
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-3 flex flex-col gap-3 relative hover-lift group">
                <div className="relative h-28 w-full bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-600 text-3xl">picture_as_pdf</span>
                  <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-primary/20 text-[10px] text-emerald-400 font-bold">
                    98% Match
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white truncate">TechSummit 2024.pdf</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Processed 2 hrs ago</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-3 flex flex-col gap-3 relative hover-lift group">
                <div className="relative h-28 w-full bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-600 text-3xl">image</span>
                  <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-primary/20 text-[10px] text-emerald-400 font-bold">
                    95% Match
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white truncate">Symphony Gala.jpg</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Processed 5 hrs ago</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-3 flex flex-col gap-3 relative hover-lift group">
                <div className="relative h-28 w-full bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-600 text-3xl">image</span>
                  <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-primary/20 text-[10px] text-emerald-400 font-bold">
                    92% Match
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white truncate">Startup Mixer.png</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Processed yesterday</span>
                </div>
              </div>

              {/* Card 4: View All History */}
              <button
                onClick={() => alert('Viewing full upload history...')}
                className="bg-slate-900/20 border border-dashed border-slate-800 hover:bg-slate-900/40 rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer h-full min-h-[160px]"
              >
                <span className="material-symbols-outlined text-slate-500 text-3xl">history_edu</span>
                <span className="text-xs font-bold text-slate-400">View All History</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: SCANNING ANIMATION */}
      {step === 2 && (
        <div className="flex flex-col items-center justify-center min-h-[450px] gap-6 text-center">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Spinning gradient ring */}
            <div className="absolute inset-0 rounded-full border-4 border-slate-900" />
            <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
            <span className="material-symbols-outlined text-primary text-4xl animate-pulse">
              auto_awesome
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Analyzing Poster...</h2>
            <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
              Our AI is scanning visual text elements, layout configurations, and event coordinates. Please hold on.
            </p>
          </div>
        </div>
      )}

      {/* STEP 3: EXTRACTION REVIEW */}
      {step === 3 && (
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-3xl">verified</span>
                Extraction Review
              </h1>
              <p className="text-sm text-slate-400">
                Review and confirm AI-generated fields.
              </p>
            </div>
            
            <span className="bg-emerald-500/10 text-emerald-400 font-bold text-xs px-3.5 py-1.5 rounded-full border border-emerald-500/20 shrink-0 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              AI Processing Complete
            </span>
          </div>

          {/* Form and Preview Layout */}
          <form onSubmit={handleCreateEvent} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Poster Preview (Left Column) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="glass-panel border border-slate-800/60 rounded-2xl overflow-hidden shadow-sm flex flex-col relative">
                {/* Header label */}
                <div className="bg-slate-950/60 px-5 py-3 border-b border-slate-900 flex justify-between items-center z-10 relative">
                  <span className="text-xs font-bold text-slate-400">SOURCE MATERIAL</span>
                  <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/30 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">visibility</span> 98% Clarity
                  </span>
                </div>
                
                {/* Poster Image */}
                <div className="relative bg-slate-950 p-6 flex justify-center items-center">
                  <img
                    alt="Extracted Event Poster"
                    className="w-full max-w-[280px] h-[380px] object-cover rounded-lg border border-slate-800/60 shadow-md"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3413Dyh9vMCjJ4AU23VdVLpWLamz5AhrOtSYjhXQJuuhnDk9IxyZ37BatLpXIQWNSXrw4LPZuUh-44v-uDndovSN1Rwn9yrK2jjAMPafKiB1w5uj0-vzGRHMa5FXS5CUsygxK3M2P3-kITHkfRJMjrMcRz3mgpDNR6mkk6mE-S9ysJi3rP-FrGxCZrUFiNIpfegWBdZhtxw6A4zEG0vqN1JvaVP4IiUJe114Nk2U3UxTePkHdJ3e0l8Avy5N4_YisSOMf9B-viBc"
                  />
                  {/* Glass magnifying icon */}
                  <div className="absolute bottom-10 right-10 w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md flex items-center justify-center border border-slate-800 shadow-md text-slate-100 hover:scale-105 active:scale-95 transition-transform cursor-pointer">
                    <span className="material-symbols-outlined text-lg">zoom_in</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Extracted Data Fields (Right Column) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="glass-panel border border-slate-800/60 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
                
                {/* Panel Info Header */}
                <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                  <h3 className="text-base font-bold text-white">Extracted Data</h3>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Overall Confidence</span>
                    <span className="text-sm font-black text-primary">85% Match</span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-4">
                  {/* Event Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 flex justify-between items-center">
                      Event Name
                      <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                        99% Match
                      </span>
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-semibold"
                      value={extractedData.eventName}
                      onChange={(e) => setExtractedData({ ...extractedData, eventName: e.target.value })}
                    />
                  </div>

                  {/* Row: Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Date */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 flex justify-between items-center">
                        Date
                        <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                          98% Match
                        </span>
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-semibold"
                        value={extractedData.date}
                        onChange={(e) => setExtractedData({ ...extractedData, date: e.target.value })}
                      />
                    </div>

                    {/* Time */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 flex justify-between items-center">
                        Time
                        <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                          96% Match
                        </span>
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-semibold"
                        value={extractedData.time}
                        onChange={(e) => setExtractedData({ ...extractedData, time: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 flex justify-between items-center">
                      Location
                      <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/20 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">warning</span> 65% Match - Needs Review
                      </span>
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-semibold"
                      value={extractedData.location}
                      onChange={(e) => setExtractedData({ ...extractedData, location: e.target.value })}
                    />
                    <span className="text-[10px] text-amber-400 flex items-center gap-1 font-semibold pl-1 mt-0.5">
                      <span className="material-symbols-outlined text-xs">info</span> Text partially obscured in source image.
                    </span>
                  </div>

                  {/* Organizer */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 flex justify-between items-center">
                      Organizer
                      <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                        92% Match
                      </span>
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-semibold"
                      value={extractedData.organizer}
                      onChange={(e) => setExtractedData({ ...extractedData, organizer: e.target.value })}
                    />
                  </div>

                  {/* Ticket Price */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 flex justify-between items-center">
                      Ticket Price
                      <span className="bg-error/10 text-error text-[10px] font-bold px-2 py-0.5 rounded-full border border-error/20">
                        Not Found
                      </span>
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                      placeholder="Enter manual value"
                      value={extractedData.ticketPrice}
                      onChange={(e) => setExtractedData({ ...extractedData, ticketPrice: e.target.value })}
                    />
                  </div>
                </div>

                <hr className="border-t border-slate-900 my-1" />

                {/* Actions Row */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-bold px-6 py-3 rounded-full transition-colors cursor-pointer"
                  >
                    Re-analyze
                  </button>
                  
                  <div className="flex gap-3 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        alert('Draft saved successfully!');
                        navigate('/organizer/dashboard');
                      }}
                      className="w-full sm:w-auto bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-bold px-6 py-3 rounded-full transition-colors cursor-pointer"
                    >
                      Save Draft
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-primary hover:bg-primary-container text-white text-xs font-bold px-8 py-3 rounded-full transition-colors cursor-pointer border-none shadow-[0_4px_12px_rgba(33,112,228,0.2)]"
                    >
                      Create Event
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default OrganizerAIScanner;
