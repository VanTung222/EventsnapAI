import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TicketDetailPage = () => {
  const navigate = useNavigate();
  const [maxBrightness, setMaxBrightness] = useState(false);

  const toggleBrightness = () => {
    setMaxBrightness((prev) => !prev);
  };

  return (
    <div className="bg-background text-on-surface font-body-md text-body-md min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative overflow-x-hidden">
      {/* Styles local to the Ticket Detail page */}
      <style>{`
        .ticket-cutout {
          position: relative;
        }
        
        .ticket-cutout::before, .ticket-cutout::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 32px;
          height: 32px;
          background-color: #f9f9ff; /* Matches theme('colors.background') */
          border-radius: 50%;
          transform: translateY(-50%);
          z-index: 10;
          box-shadow: inset 0px 4px 10px rgba(0,0,0,0.05);
        }
        
        .ticket-cutout::before {
          left: -16px;
        }
        
        .ticket-cutout::after {
          right: -16px;
        }
        
        .dash-border {
          border-top: 2px dashed #c2c6d5; /* Matches theme('colors.outline-variant') */
        }

        .gradient-bg {
          background: linear-gradient(135deg, #0058be 0%, #004191 100%);
        }

        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }

        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-fixed blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary-fixed blur-[120px]" />
      </div>

      {/* Main Container */}
      <main className="w-full max-w-[400px] z-10 flex flex-col gap-6 relative">
        {/* Header / Back Button */}
        <header className="flex items-center justify-between w-full mb-2">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors border border-outline-variant/30 cursor-pointer"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline-md text-2xl text-on-surface font-bold">My Ticket</h1>
          <div className="w-12" /> {/* Spacer for centering */}
        </header>

        {/* The Ticket Card */}
        <div className="w-full bg-surface-container-lowest rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden relative border border-outline-variant/30 flex flex-col">
          
          {/* Top Section: Event Details */}
          <div className="p-6 bg-surface-bright relative overflow-hidden">
            {/* Decorative AI Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNDMkM2RDUiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-50 z-0" />
            
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-surface-container-lowest shadow-sm">
                  <img
                    alt="Organizer Logo"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH1-kd2V4JtSsOTqlfXdp6ZayHo21LNlPQPu4o6eXKn7kLDwvYzxJf4ZNLJN2yBmue25bclwm6QPV4JdDmyX3kkJjXTWuO56mETynSmLpqVZGvQ4-Zi2eQv54ncWScfoirPdn1_WtVUAMsrrg6sGJ8rv28bRoUo6RQxr-HApzjqqpgpv5COlB4teQj3gfvTeYm3RLLvAOJ7GQXshuFfwFQKizIMDfLn7SqtIFj3PfbuvYvJfNki0umLFN6c__DjDhgNfP52ypkk1I"
                  />
                </div>
                <span className="px-3 py-1 bg-primary-fixed/30 text-primary font-label-sm text-[12px] font-bold rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">stars</span> VIP Access
                </span>
              </div>
              
              <div>
                <h2 className="font-headline-lg-mobile text-xl md:text-2xl text-on-surface mb-1 font-bold leading-tight">
                  Global AI Summit 2024
                </h2>
                <p className="font-body-md text-sm text-on-surface-variant">San Francisco, CA</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2 bg-surface-container-low p-4 rounded-lg border border-outline-variant/20">
                <div>
                  <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Date</p>
                  <p className="text-sm font-semibold text-on-surface">Oct 24, 2024</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Time</p>
                  <p className="text-sm font-semibold text-on-surface">09:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Separation Cutout */}
          <div className="ticket-cutout h-10 bg-surface-container-lowest relative flex items-center justify-center">
            <div className="w-full mx-6 dash-border" />
          </div>

          {/* Bottom Section: QR & Attendee Details */}
          <div className="p-6 pt-2 flex flex-col items-center gap-4 bg-surface-container-lowest">
            <div className="w-full flex justify-between items-center mb-2">
              <div>
                <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Attendee</p>
                <p className="text-base font-semibold text-on-surface">Alex Mercer</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Ticket ID</p>
                <p className="text-sm font-semibold text-on-surface">#AI-99201</p>
              </div>
            </div>

            {/* QR Code Area */}
            <div
              onClick={toggleBrightness}
              className={`relative w-48 h-48 bg-white rounded-lg p-2 shadow-sm border border-outline-variant/30 flex items-center justify-center group overflow-hidden transition-all duration-300 ${
                maxBrightness ? 'ring-8 ring-primary/20 brightness-110' : ''
              }`}
            >
              {/* Scanning line animation simulation */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-scan-line shadow-[0_0_8px_2px_rgba(33,112,228,0.5)] z-20 animate-scan opacity-0 group-hover:opacity-100" />
              
              <img
                alt="Ticket QR Code"
                className="w-full h-full object-contain mix-blend-multiply"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEKyuxxOun_-cIbFAkZl524PAuuS70NB6Cy76GD4qqoEEr114aLeXEOqXzhbhAeAIkIqSqPrTcDEIox6hgiX-2umDd0ZDDr7iOjFJpoTNrsWxW2Bi-QivNxUmIwEWyKSMvLjA3Dh_pVR-WD1ETjBZ-E2K9Vm16A2PiL-02az7pNTQlIFWN7dzOHE4aM6cv90K3w2oD1fbQl3V2QHr_Dw0xSAiPqjM1K_O8WhDYTdlfWSvp_QHG_Z6mmZiAwqC5JWoDcL3o-hVQef8"
              />

              {/* Increase brightness hint overlay */}
              {!maxBrightness && (
                <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-primary z-10 cursor-pointer">
                  <span className="material-symbols-outlined text-[32px] mb-1">light_mode</span>
                  <span className="text-[12px] font-bold">Tap for Max Brightness</span>
                </div>
              )}
            </div>

            <p className="text-[12px] font-bold text-on-surface-variant text-center mt-2 flex items-center gap-1.5 justify-center">
              <span className="material-symbols-outlined text-[16px]">info</span> Present this code at the main entrance.
            </p>
          </div>

          {/* Bottom decorative accent */}
          <div className="h-1 w-full gradient-bg" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 w-full mt-2">
          <button
            onClick={() => alert('PDF saved successfully!')}
            className="flex-1 glass-panel rounded-full py-3.5 px-6 flex items-center justify-center gap-2 font-bold text-sm text-on-surface hover:bg-surface-variant border border-outline-variant/30 transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined">download</span> Save PDF
          </button>
          <button
            onClick={() => alert('Added to Wallet successfully!')}
            className="flex-1 glass-panel rounded-full py-3.5 px-6 flex items-center justify-center gap-2 font-bold text-sm text-on-surface hover:bg-surface-variant border border-outline-variant/30 transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined">add_to_home_screen</span> Add to Wallet
          </button>
        </div>
      </main>
    </div>
  );
};

export default TicketDetailPage;
