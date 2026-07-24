import { useState } from 'react';

const EventOverview = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'registration', label: 'Đăng ký' },
    { id: 'checkin', label: 'Check-in' },
    { id: 'announcements', label: 'Thông báo' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'reports', label: 'Báo cáo' },
    { id: 'settings', label: 'Cài đặt' },
  ];

  const lifecycleSteps = [
    { label: 'Draft Created', date: 'Sept 01, 2024', done: true },
    { label: 'Sent for Review', date: 'Sept 15, 2024', done: true },
    { label: 'Published', date: 'Sept 20, 2024', done: true },
    { label: 'Registration Open', date: 'Current Phase', done: true, active: true },
    { label: 'Event Live', date: 'Oct 24, 2024', done: false },
  ];

  return (
    <div className="flex flex-col gap-6 w-full text-slate-100">
      {/* Event Header Banner */}
      <div className="glass-panel border border-slate-800/60 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden">
        {/* Background glow overlay */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        
        {/* Poster Image Thumbnail */}
        <div className="w-20 h-28 shrink-0 overflow-hidden rounded-lg border border-slate-800 shadow-md">
          <img
            alt="Event Thumbnail"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3413Dyh9vMCjJ4AU23VdVLpWLamz5AhrOtSYjhXQJuuhnDk9IxyZ37BatLpXIQWNSXrw4LPZuUh-44v-uDndovSN1Rwn9yrK2jjAMPafKiB1w5uj0-vzGRHMa5FXS5CUsygxK3M2P3-kITHkfRJMjrMcRz3mgpDNR6mkk6mE-S9ysJi3rP-FrGxCZrUFiNIpfegWBdZhtxw6A4zEG0vqN1JvaVP4IiUJe114Nk2U3UxTePkHdJ3e0l8Avy5N4_YisSOMf9B-viBc"
          />
        </div>

        {/* Title, badge, and description */}
        <div className="flex-grow flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-500/10 text-emerald-400 font-bold text-[10px] px-2.5 py-1 rounded-full border border-emerald-500/20">
              • Published
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              Oct 24 - Oct 26, 2024
            </span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
            Neo-Tokyo Music Fest
          </h1>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-2xl">
            A three-day immersive audio-visual experience featuring top electronic artists in a cyberpunk-inspired setting. High-density crowd management protocols active.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex md:flex-col gap-2 shrink-0 w-full md:w-auto mt-2 md:mt-0">
          <button
            onClick={() => alert('Editing Event...')}
            className="flex-1 md:flex-none bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-bold px-6 py-2.5 rounded-full flex items-center justify-center gap-1.5 cursor-pointer text-white"
          >
            <span className="material-symbols-outlined text-base">edit</span>
            Edit Event
          </button>
          <button
            onClick={() => alert('Copied shareable link to clipboard!')}
            className="flex-1 md:flex-none bg-primary hover:bg-primary-container text-white text-xs font-bold px-6 py-2.5 rounded-full flex items-center justify-center gap-1.5 cursor-pointer border-none"
          >
            <span className="material-symbols-outlined text-base">share</span>
            Share Link
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="border-b border-slate-900 overflow-x-auto hide-scrollbar">
        <div className="flex gap-6 min-w-max pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm pb-3 px-1 transition-colors border-b-2 font-bold ${
                activeTab === tab.id
                  ? 'text-primary border-primary'
                  : 'text-slate-500 hover:text-white border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2">
          
          {/* Left Column: Progress & Metrics */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Registration Progress Panel */}
            <div className="glass-panel border border-slate-800/60 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-500">
                    Registration Progress
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                    Current trajectory implies full capacity by Oct 15.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-white">850</span>
                  <span className="text-lg font-bold text-slate-500">/1000</span>
                </div>
              </div>

              {/* Progress Bar container */}
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                <div className="h-full bg-gradient-to-r from-primary to-cyan-500 rounded-full w-[85%]" />
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-xs">trending_up</span>
                  +12% Vs Last week
                </span>
                <span className="text-slate-500 font-semibold">85% Filled</span>
              </div>
            </div>

            {/* Waitlist & No-Show Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Waitlist */}
              <div className="bg-slate-900/40 border border-slate-800/60 p-5 rounded-2xl flex flex-col justify-between h-32 relative overflow-hidden">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-slate-400">hourglass_empty</span>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">WAITLIST</span>
                    <span className="text-2xl font-black text-white mt-1">142</span>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold pl-8">
                  +24 today
                </span>
              </div>

              {/* Predicted No-Show Rate */}
              <div className="bg-slate-900/40 border border-slate-800/60 p-5 rounded-2xl flex flex-col justify-between h-32 relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-slate-400">query_stats</span>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">PREDICTED NO-SHOW RATE</span>
                      <span className="text-2xl font-black text-white mt-1">8.4%</span>
                    </div>
                  </div>
                  <span className="bg-primary/10 text-primary text-[9px] font-bold px-2 py-0.5 rounded-full border border-primary/20 shrink-0">
                    92% Confidence
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 leading-normal pl-8">
                  Based on current weather forecasts & historical data.
                </span>
              </div>
            </div>

            {/* Event Lifecycle Timeline */}
            <div className="glass-panel border border-slate-800/60 rounded-2xl p-6 flex flex-col gap-6">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">timeline</span>
                Event Lifecycle
              </h3>

              {/* Timeline Container (horizontal on desk, vertical on mob) */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-4 justify-between relative pl-4 md:pl-0">
                {/* Horizontal progress bar in background */}
                <div className="hidden md:block absolute left-2 right-2 top-2 h-[2px] bg-slate-800 z-0" />
                
                {lifecycleSteps.map((step, idx) => (
                  <div key={idx} className="flex md:flex-col gap-4 md:gap-2 items-start md:items-center relative z-10">
                    {/* Circle Node */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border-2 shadow-sm ${
                        step.active
                          ? 'bg-slate-950 border-primary text-primary'
                          : step.done
                          ? 'bg-primary border-primary text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-600'
                      }`}
                    >
                      {step.active ? (
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                      ) : step.done ? (
                        <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                      ) : (
                        <span className="w-1 h-1 bg-slate-800 rounded-full" />
                      )}
                    </div>

                    {/* Step Labels */}
                    <div className="flex flex-col md:items-center text-left md:text-center">
                      <span className={`text-xs font-bold ${step.active ? 'text-primary' : 'text-white'}`}>
                        {step.label}
                      </span>
                      <span className="text-[10px] text-slate-500 mt-0.5">
                        {step.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Alerts & Insights */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-panel border border-slate-800/60 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-900 pb-3">
                <span className="material-symbols-outlined text-amber-500">lightbulb</span>
                Alerts & Insights
              </h3>

              <div className="flex flex-col gap-4">
                {/* Alert 1 (Capacity Warning) */}
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex gap-3 items-start">
                  <span className="material-symbols-outlined text-rose-400 shrink-0">warning</span>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider mb-1">
                      Capacity Warning
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                      VIP section registrations exceed physical layout limits by 5%. Adjust seating chart.
                    </p>
                  </div>
                </div>

                {/* Alert 2 (Marketing Opportunity) */}
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 flex gap-3 items-start">
                  <span className="material-symbols-outlined text-cyan-400 shrink-0">auto_awesome</span>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                      Marketing Opportunity
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                      High interest detected from out-of-state IPs. Suggest targeted email campaign for partner hotels.
                    </p>
                  </div>
                </div>

                {/* Alert 3 (Speaker Update) */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-3 items-start">
                  <span className="material-symbols-outlined text-slate-400 shrink-0">person_add</span>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Speaker Updated
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                      DJ Kael's tech rider has been updated. Requires review by A/V team.
                    </p>
                    <span className="text-[9px] text-slate-600 mt-1">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Mock Tab View */
        <div className="flex items-center justify-center min-h-[300px] border border-slate-900 border-dashed rounded-2xl mt-4">
          <span className="text-slate-500 text-sm font-semibold">
            {tabs.find((t) => t.id === activeTab)?.label} section is mocked in this overview.
          </span>
        </div>
      )}
    </div>
  );
};

export default EventOverview;
