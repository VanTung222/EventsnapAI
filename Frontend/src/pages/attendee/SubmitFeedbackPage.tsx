import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RatingCategory {
  key: string;
  label: string;
}

const SubmitFeedbackPage = () => {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState<Record<string, number>>({
    overall: 0,
    organization: 0,
    content: 0,
    speaker: 0,
    venue: 0,
    utility: 0,
  });

  const [hovers, setHovers] = useState<Record<string, number>>({
    overall: 0,
    organization: 0,
    content: 0,
    speaker: 0,
    venue: 0,
    utility: 0,
  });

  const [comments, setComments] = useState('');
  const [joinFuture, setJoinFuture] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const ratingCategories: RatingCategory[] = [
    { key: 'overall', label: 'Overall Experience' },
    { key: 'organization', label: 'Organization & Flow' },
    { key: 'content', label: 'Quality of Content' },
    { key: 'speaker', label: 'Speaker Delivery' },
    { key: 'venue', label: 'Venue & Facilities' },
    { key: 'utility', label: 'Practical Utility' },
  ];

  const handleRatingClick = (category: string, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleRatingHover = (category: string, value: number) => {
    setHovers((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen relative flex items-center justify-center p-6 md:p-12 overflow-x-hidden">
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes pop-in {
          0% { transform: scale(0.5); opacity: 0; }
          80% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .animate-pop-in {
          animation: pop-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .star-interactive {
          transition: all 0.2s ease-in-out;
          cursor: pointer;
        }
        .star-interactive:hover {
          transform: scale(1.15) translateY(-2px);
        }
      `}</style>

      {/* Ambient Background Decorations */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Feedback Card */}
      <main className="w-full max-w-[800px] relative z-10 flex flex-col bg-surface-container-lowest/80 backdrop-blur-xl rounded-2xl border border-outline-variant/30 shadow-[0px_4px_20px_rgba(30,41,59,0.05)] overflow-hidden transition-all duration-500">
        
        {/* Header Section with Photo */}
        <header className="relative w-full h-48 md:h-64 flex items-end justify-start p-6 md:p-8">
          {/* Event Photo Background */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3413Dyh9vMCjJ4AU23VdVLpWLamz5AhrOtSYjhXQJuuhnDk9IxyZ37BatLpXIQWNSXrw4LPZuUh-44v-uDndovSN1Rwn9yrK2jjAMPafKiB1w5uj0-vzGRHMa5FXS5CUsygxK3M2P3-kITHkfRJMjrMcRz3mgpDNR6mkk6mE-S9ysJi3rP-FrGxCZrUFiNIpfegWBdZhtxw6A4zEG0vqN1JvaVP4IiUJe114Nk2U3UxTePkHdJ3e0l8Avy5N4_YisSOMf9B-viBc')",
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-background-deep/80 via-background-deep/30 to-transparent" />
          
          {/* Header Text */}
          <div className="relative z-20 w-full">
            <div className="flex items-center gap-1 mb-2">
              <span className="material-symbols-outlined text-primary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>
                celebration
              </span>
              <span className="font-label-md text-[12px] font-bold text-primary-fixed-dim uppercase tracking-wider">
                Event Concluded
              </span>
            </div>
            <h1 className="font-headline-xl text-3xl md:text-5xl text-on-primary font-bold">Thank You!</h1>
            <p className="text-sm text-surface-variant max-w-lg mt-1 leading-snug">
              We hope you found the 'Global Tech Summit 2024' valuable. Your insights help us engineer better experiences.
            </p>
          </div>
        </header>

        {/* Feedback Form Content */}
        <div className="p-6 md:p-8 flex flex-col gap-6 relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Section 1: Ratings */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl text-on-surface font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">bar_chart</span>
                Evaluate Your Experience
              </h2>
              
              {/* Bento Grid style for ratings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ratingCategories.map((category) => {
                  const rating = ratings[category.key];
                  const hoverVal = hovers[category.key];
                  const activeStars = hoverVal || rating;

                  return (
                    <div
                      key={category.key}
                      className="flex items-center justify-between p-4 bg-surface-container/50 rounded-xl border border-outline-variant/20 hover:border-primary/30 transition-colors"
                    >
                      <span className="text-sm font-semibold text-on-surface-variant">
                        {category.label}
                      </span>
                      
                      <div className="flex gap-1 text-outline-variant">
                        {[1, 2, 3, 4, 5].map((starValue) => (
                          <span
                            key={starValue}
                            onMouseEnter={() => handleRatingHover(category.key, starValue)}
                            onMouseLeave={() => handleRatingHover(category.key, 0)}
                            onClick={() => handleRatingClick(category.key, starValue)}
                            className={`material-symbols-outlined star-interactive text-xl ${
                              starValue <= activeStars ? 'text-primary' : 'text-outline-variant'
                            }`}
                            style={{
                              fontVariationSettings: starValue <= activeStars ? "'FILL' 1" : "'FILL' 0",
                            }}
                          >
                            star
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-full h-px bg-outline-variant/30" />

            {/* Section 2: Text Comments */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-on-surface flex items-center gap-2" htmlFor="comments">
                <span className="material-symbols-outlined text-secondary text-sm">edit_note</span>
                Additional Comments
              </label>
              <div className="relative">
                <textarea
                  id="comments"
                  className="w-full bg-surface-container-low/50 border border-outline-variant/50 rounded-xl p-4 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none outline-none"
                  placeholder="What did you like most? What could be improved?"
                  rows={4}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
                <div className="absolute inset-0 pointer-events-none rounded-xl shadow-[inset_0_0_20px_rgba(33,112,228,0.02)]" />
              </div>
            </div>

            {/* Section 3: Binary Question */}
            <div className="flex flex-col gap-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
              <span className="text-sm font-bold text-on-surface">Would you join similar events in the future?</span>
              <div className="flex gap-4">
                <label className="flex-1 cursor-pointer group">
                  <input
                    className="peer sr-only"
                    name="join_future"
                    type="radio"
                    value="yes"
                    checked={joinFuture === 'yes'}
                    onChange={() => setJoinFuture('yes')}
                  />
                  <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-outline-variant/50 bg-surface text-on-surface-variant peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary peer-checked:font-bold transition-all hover:bg-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                    <span className="text-sm font-semibold">Yes, definitely</span>
                  </div>
                </label>
                <label className="flex-1 cursor-pointer group">
                  <input
                    className="peer sr-only"
                    name="join_future"
                    type="radio"
                    value="no"
                    checked={joinFuture === 'no'}
                    onChange={() => setJoinFuture('no')}
                  />
                  <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-outline-variant/50 bg-surface text-on-surface-variant peer-checked:bg-surface-variant peer-checked:text-on-surface peer-checked:border-outline peer-checked:font-bold transition-all hover:bg-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">thumb_down</span>
                    <span className="text-sm font-semibold">No, probably not</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex justify-end pt-2">
              <button
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-surface-tint text-on-primary py-3 px-8 rounded-full font-bold text-sm shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-pointer border-none"
                type="submit"
              >
                Submit Evaluation
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </form>
        </div>

        {/* Success State Overlay */}
        {isSuccess && (
          <div className="absolute inset-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md flex flex-col items-center justify-center p-8 animate-[fadeIn_0.3s_ease-out]">
            <div className="relative flex items-center justify-center w-32 h-32 mb-6">
              {/* Pulse rings */}
              <div className="absolute inset-0 border-2 border-primary rounded-full animate-pulse-ring" style={{ animationDelay: '0.2s' }} />
              <div className="absolute inset-0 border-2 border-primary rounded-full animate-pulse-ring" style={{ animationDelay: '1s' }} />
              
              {/* Check icon */}
              <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center animate-pop-in">
                <span className="material-symbols-outlined text-[48px] text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl text-on-surface text-center font-bold mb-2 transition-all">
              Feedback Received
            </h2>
            <p className="text-sm text-on-surface-variant text-center max-w-md mb-6 leading-relaxed">
              Your insights have been successfully processed by EventSnap AI. Thank you for contributing to a better event ecosystem.
            </p>
            
            <button
              onClick={() => navigate('/attendee/dashboard')}
              className="text-primary font-bold text-sm hover:underline cursor-pointer bg-transparent border-none"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SubmitFeedbackPage;
