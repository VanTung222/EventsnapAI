import { useState } from 'react';

interface CheckInLog {
  id: string;
  name: string;
  time: string;
  match?: number;
}

const CheckInDashboard = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [logs, setLogs] = useState<CheckInLog[]>([
    { id: 'log-1', name: 'Nguyễn Văn A', time: '18:05', match: 98 },
    { id: 'log-2', name: 'Trần Thị B', time: '18:02', match: 95 },
    { id: 'log-3', name: 'Lê Văn C', time: '17:58' },
  ]);

  const handleSimulateScan = () => {
    const names = ['Hoàng Long', 'Phạm Minh', 'Bùi Quỳnh', 'Vũ Nam'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const timeNow = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const randomMatch = Math.floor(Math.random() * 15) + 85; // 85% to 99%

    const newLog: CheckInLog = {
      id: `log-${Date.now()}`,
      name: randomName,
      time: timeNow,
      match: randomMatch,
    };

    setLogs((prev) => [newLog, ...prev]);
    setIsScannerOpen(false);
    alert(`Scanned ticket successfully for: ${randomName}`);
  };

  return (
    <div className="flex flex-col gap-6 w-full text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
            Check-in Dashboard
          </h1>
          <span className="bg-emerald-500/10 text-emerald-400 font-bold text-xs px-3.5 py-1.5 rounded-full border border-emerald-500/20 shrink-0 flex items-center gap-1.5 w-max mt-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Session: Active
          </span>
        </div>

        <div className="flex gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={() => setIsScannerOpen(true)}
            className="flex-1 sm:flex-none bg-primary hover:bg-primary-container text-white text-xs font-bold px-6 py-2.5 rounded-full flex items-center justify-center gap-1.5 cursor-pointer border-none shadow-[0_4px_12px_rgba(33,112,228,0.2)]"
          >
            <span className="material-symbols-outlined text-base">qr_code_scanner</span>
            Open Scanner
          </button>
          <button
            onClick={() => alert('Session closed successfully.')}
            className="flex-1 sm:flex-none bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-bold px-6 py-2.5 rounded-full flex items-center justify-center gap-1.5 cursor-pointer text-white"
          >
            <span className="material-symbols-outlined text-base">close</span>
            Close Session
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Checked In */}
        <div className="bg-slate-900/60 border border-slate-800/60 p-4 rounded-xl flex flex-col justify-between h-28 relative overflow-hidden">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Đã check-in</span>
          <span className="text-3xl font-black text-white mt-1">450</span>
          <span className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5 font-bold">
            <span className="material-symbols-outlined text-xs">trending_up</span> +15% vs last hour
          </span>
        </div>

        {/* Not Arrived */}
        <div className="bg-slate-900/60 border border-slate-800/60 p-4 rounded-xl flex flex-col justify-between h-28 relative overflow-hidden">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Chưa đến</span>
          <span className="text-3xl font-black text-white mt-1">50</span>
          <span className="text-[10px] text-slate-500 mt-1">
            Est. arrival next 30m: 40
          </span>
        </div>

        {/* Check-in Rate */}
        <div className="bg-slate-900/60 border border-slate-800/60 p-4 rounded-xl flex flex-col justify-between h-28 relative overflow-hidden">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tỷ lệ check-in</span>
          <div className="flex justify-between items-end mt-1">
            <span className="text-3xl font-black text-white">90%</span>
            <div className="w-16 h-1.5 bg-slate-850 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-primary rounded-full w-[90%]" />
            </div>
          </div>
          <span className="text-[10px] text-slate-500">
            Target rate: 95%
          </span>
        </div>
      </div>

      {/* Arrival Trends Chart and Activity Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Real-time Arrival (Left Column) */}
        <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800/40 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Real-time Arrival
            </h3>
            <span className="bg-slate-950/60 px-3 py-1 rounded-full border border-slate-900 text-[10px] font-bold text-slate-400">
              Live Updates
            </span>
          </div>

          {/* SVG Glow wave chart */}
          <div className="w-full h-64 bg-slate-950/40 rounded-xl border border-slate-900 relative flex items-center justify-center p-2 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="checkinGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2170e4" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#2170e4" stopOpacity="0.0" />
                </linearGradient>
                <filter id="checkinGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Shaded Area */}
              <path
                d="M 0,200 L 0,150 Q 80,180 150,110 T 300,160 Q 400,60 500,40 L 500,200 Z"
                fill="url(#checkinGradient)"
              />

              {/* Glowing wave Line */}
              <path
                d="M 0,150 Q 80,180 150,110 T 300,160 Q 400,60 500,40"
                fill="none"
                stroke="#2170e4"
                strokeWidth="2.5"
                filter="url(#checkinGlow)"
              />
            </svg>

            {/* Timestamps label row */}
            <div className="absolute bottom-2 left-6 right-6 flex justify-between text-[10px] font-bold text-slate-500">
              <span>17:00</span>
              <span>17:30</span>
              <span>18:00</span>
              <span>18:30</span>
              <span className="text-primary animate-pulse">Now</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Log Feed (Right Column) */}
        <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800/40 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">history</span>
              Hoạt động gần đây
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-slate-950/50 border border-slate-800/60 p-3.5 rounded-xl flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-sm">person</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{log.name} vừa check-in</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">{log.time}</span>
                  </div>
                </div>

                {log.match && (
                  <span className="bg-emerald-500/10 text-emerald-400 font-bold text-[9px] px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
                    {log.match}% Match
                  </span>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => alert('Viewing all check-in logs...')}
            className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-bold py-2.5 rounded-full text-slate-300 transition-colors cursor-pointer"
          >
            View All Logs
          </button>
        </div>

      </div>

      {/* Simulator Modal for Scan Ticket */}
      {isScannerOpen && (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center z-50 bg-slate-950/60 backdrop-blur-sm px-4">
          <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 max-w-sm w-full shadow-lg flex flex-col gap-4 relative animate-[fadeIn_0.2s_ease-out]">
            <button
              onClick={() => setIsScannerOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-2xl">qr_code_scanner</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-1">Simulate Ticket Scanner</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scan ticket QR codes at the main gate. Click "Simulate Scan" to register a random attendee.
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={handleSimulateScan}
                className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-full font-bold text-sm border-none cursor-pointer shadow-sm"
              >
                Simulate Scan
              </button>
              <button
                onClick={() => setIsScannerOpen(false)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-300 py-3 rounded-full font-bold text-sm cursor-pointer hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckInDashboard;
