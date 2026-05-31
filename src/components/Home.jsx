import React, { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles, Clock, Users, ArrowRight, CheckCircle2, AlertCircle, ShoppingBag, Gift, FileText, Shield, Ticket, RefreshCw } from 'lucide-react';

export default function App() {
  const [totalSubmissions, setTotalSubmissions] = useState(52);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [dataConsent, setDataConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [refreshCountdown, setRefreshCountdown] = useState(5); // Tracks the countdown ticks visually
  const [error, setError] = useState('');
  const [activeModal, setActiveModal] = useState(null);

  // Pull the initial calculated count on mounting state loop
  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/griphill/stats');
        const data = await response.json();
        if (response.ok && data.success) {
          setTotalSubmissions(data.totalSubmissions);
        }
      } catch (err) {
        console.error('Failed to connect to stats engine.');
      }
    };
    fetchLiveStats();
  }, []);

  // AUTOMATED 5-SECOND REFRESH LIFECYCLE CONTROLLER
  useEffect(() => {
    if (!success) return;

    // 1. Ticker interval to update the countdown number on screen every second
    const countdownInterval = setInterval(() => {
      setRefreshCountdown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    // 2. Timeout to completely execute the page refresh after 5000ms
    const refreshTimeout = setTimeout(() => {
      window.location.reload();
    }, 5000);

    // Clean up timers if the component unmounts
    return () => {
      clearInterval(countdownInterval);
      clearTimeout(refreshTimeout);
    };
  }, [success]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVaultSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!dataConsent) {
      setError('You must authorize data usage consent parameters to register your position.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/griphill/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSuccess(true);
        setTotalSubmissions(data.totalSubmissions); 
      } else {
        setError(data.error || 'Failed to authorize your entry ticket.');
      }
    } catch (err) {
      setError('Connection timeout: Unable to reach the security vault server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020C17] text-gray-100 font-sans antialiased selection:bg-[#00A88F] selection:text-white flex flex-col justify-between relative">
      
      {/* 1. TOP TICKER */}
      <div className="bg-gradient-to-r from-[#002B49] via-[#00A88F] to-[#002B49] text-center py-2 px-4 text-[11px] font-bold tracking-widest uppercase text-white shadow-inner flex items-center justify-center gap-2 z-10">
        <Sparkles size={12} className="animate-pulse text-yellow-300" />
        <span>Grip Hill Launch Event: 100 Lucky Winners Will Receive Flat 50% Off or Premium Hampers</span>
      </div>

      {/* 2. MAIN LAYOUT HERO WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        
        {/* LEFT COLUMN: Media Video Presentation Panel */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="flex items-center gap-4">
            <img 
              src="Glogo.png" 
              alt="Grip Hill Logo" 
              className="w-16 h-16 object-contain rounded-full shadow-lg border border-white/10"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                <ShieldCheck className="text-[#00A88F]" size={12} />
                <span className="text-[9px] font-mono tracking-widest text-gray-400 uppercase">Grip Hill Operational Core</span>
              </div>
              <p className="text-xs font-bold font-mono tracking-wider text-[#00A88F] uppercase mt-1">Carry With Confidence</p>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            The next evolution of <span className="text-[#00A88F]">everyday carry</span> is hidden in plain sight.
          </h1>

          <div className="w-full bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative aspect-video group">
            <video 
              src="./Promo2.mp4" 
              className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" 
              controls 
              autoPlay 
              muted 
              loop
              playsInline
              controlsList="nodownload texttrack"
            />
          </div>

          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-2xl">
            We don’t do ordinary packaging, and we don’t run ordinary lines. Grip Hill is preparing a premium lifestyle cargo drop engineered to redefine personal mobility, premium structural utility, and daily fashion architecture. Our production lines are scale-ready—and to celebrate our launch, 100 lucky subscribers chosen at random from our global registration ledger will be awarded exclusive 50% discount vouchers and luxury milestone boxes.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-sm pt-1">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center gap-3">
              <Users className="text-[#00A88F] shrink-0" size={18} />
              <div>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Total Active Launch Entries</p>
                <p className="text-base font-black text-white font-mono">{totalSubmissions.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center gap-3">
              <Clock className="text-orange-400 shrink-0" size={18} />
              <div>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Draw Registration Closes</p>
                <p className="text-base font-black text-white font-mono">14h 32m 45s</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Input Registry Form */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-gray-800 relative">
            
            {success ? (
              <div className="text-center py-6 flex flex-col items-center justify-between min-h-[380px] animate-fadeIn">
                
                {/* Upper: Success Status */}
                <div className="space-y-3">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-[#00A88F]">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#002B49] tracking-tight">Entry Ticket Confirmed</h3>
                    <p className="text-[11px] text-gray-500 max-w-xs mx-auto leading-relaxed mt-1">
                      Your operational profile data has been safely logged within our launch entry registry ledger.
                    </p>
                  </div>
                </div>

                {/* Middle: Professional Highlight of the IT Partner */}
                <div className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-2.5 my-4">
                  <img 
                    src="logo_it.png" 
                    alt="R J R Infinity" 
                    className="h-10 object-contain drop-shadow-sm filter contrast-[1.05]"
                  />
                  <div className="text-center">
                    <p className="text-[9px] font-mono tracking-widest text-gray-400 uppercase">Infrastructure Managed By</p>
                    <p className="text-[11px] text-gray-700 font-bold mt-0.5">R J R Infinity</p>
                    <p className="text-[10px] text-gray-400 max-w-[240px] mx-auto leading-normal mt-1 font-light">
                      Securing backend ledger integrations and delivering enterprise-grade web application interfaces.
                    </p>
                  </div>
                </div>

                {/* Lower: Countdown Timer Box */}
                <div className="w-full pt-3 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400 font-mono">
                  <RefreshCw size={12} className="animate-spin text-[#00A88F]" />
                  <span>Resetting portal gateway in <strong className="text-gray-700 font-bold">{refreshCountdown}s</strong>...</span>
                </div>

              </div>
            ) : (
              <>
                <div className="text-center mb-5">
                  <h3 className="text-xl font-extrabold text-[#002B49] tracking-tight">Enter The Lucky 100 Draw</h3>
                  <p className="text-xs text-gray-400 mt-1">Submit your profile to qualify for 50% Off Launch Vouchers or Premium Hampers</p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-800 p-3 rounded-xl text-xs flex items-center gap-2 mb-4">
                    <AlertCircle className="text-red-500 shrink-0" size={14} />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleVaultSubmit} className="space-y-3.5 text-left">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                    <input 
                      type="text" required name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name"
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#002B49] bg-[#F8FAFC]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                      <input 
                        type="email" required name="email" value={formData.email} onChange={handleInputChange} placeholder="name@company.com"
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#002B49] bg-[#F8FAFC]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Contact Number</label>
                      <input 
                        type="tel" required name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 XXXXX XXXXX"
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#002B49] bg-[#F8FAFC]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Primary Delivery & Shipping Location</label>
                    <textarea 
                      required rows="2" name="address" value={formData.address} onChange={handleInputChange} placeholder="Provide your full shipping address markers..."
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#002B49] bg-[#F8FAFC] resize-none"
                    />
                  </div>

                  <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex items-start gap-2.5">
                    <input 
                      type="checkbox" 
                      id="dataConsent"
                      checked={dataConsent}
                      onChange={(e) => setDataConsent(e.target.checked)}
                      className="mt-0.5 rounded border-gray-300 text-[#00A88F] focus:ring-[#00A88F] h-3.5 w-3.5 cursor-pointer"
                    />
                    <label htmlFor="dataConsent" className="text-[10px] leading-snug text-gray-500 select-none cursor-pointer">
                      I explicitly authorize Grip Hill to securely verify and use my details to contact me if my entry is selected in the Lucky 100 Grand Draw.
                    </label>
                  </div>

                  <button 
                    type="submit" disabled={loading}
                    className="w-full text-white font-bold p-3 rounded-lg text-xs transition bg-[#002B49] hover:bg-opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Ticket size={14} />
                    {loading ? 'Submitting Entry...' : 'Submit Grand Draw Entry Ticket'}
                  </button>
                </form>

                <div className="mt-4 pt-3 border-t flex items-center justify-around text-[9px] font-mono text-gray-400">
                  <div className="flex items-center gap-1"><ShoppingBag size={10} /> 100 Lucky Vouchers</div>
                  <span>•</span>
                  <div className="flex items-center gap-1"><Gift size={10} /> Luxury Hamper Boxes</div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

{/* 3. BRAND AWARENESS COMPLIANT FOOTER */}
      <footer className="bg-[#01070F] text-gray-500 text-[11px] py-8 border-t border-white/5 w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <p className="font-bold text-gray-300 text-xs tracking-wide">GRIP HILL • CARRY WITH CONFIDENCE</p>
            <p className="font-light mt-0.5 max-w-md text-gray-400 leading-relaxed">
              Launch distributions managed in legal framework partnership with DIAGONICA LLP. Interface systems compiled exclusively by{" "}
              <a 
                href="https://rjrinfinity.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold text-white hover:text-[#00A88F] transition-colors underline decoration-dotted underline-offset-2 cursor-pointer"
              >
                R J R Infinity
              </a>.
            </p>
            <div className="flex gap-4 mt-2 text-[10px] font-semibold text-gray-400">
              <button onClick={() => setActiveModal('terms')} className="hover:text-[#00A88F] transition underline cursor-pointer">Terms & Conditions</button>
              <span>|</span>
              <button onClick={() => setActiveModal('privacy')} className="hover:text-[#00A88F] transition underline cursor-pointer">Privacy Policy</button>
              <span>|</span>
              <a href="mailto:info@diagonica.com" className="hover:text-[#00A88F] transition underline cursor-pointer">Support</a>
            </div>
          </div>
          
          <div className="flex gap-4 font-mono text-[10px] text-gray-500">
            <span>Secure Enterprise Connection</span>
            <span>•</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>

      {/* 4. MODALS FOR TERMS & PRIVACY */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden border border-gray-100">
            
            <div className="bg-[#002B49] text-white p-4 px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {activeModal === 'terms' ? <FileText size={16} className="text-[#00A88F]" /> : <Shield size={16} className="text-[#00A88F]" />}
                <h3 className="font-extrabold text-sm uppercase tracking-wide">
                  {activeModal === 'terms' ? 'Terms & Conditions of Lucky 100 Draw' : 'Founding Operations Privacy Policy'}
                </h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-white/60 hover:text-white bg-white/10 text-xs px-2.5 py-1 rounded-md transition font-mono cursor-pointer">ESC</button>
            </div>

            <div className="p-6 overflow-y-auto text-xs space-y-4 leading-relaxed text-gray-600 text-left font-sans">
              {activeModal === 'terms' ? (
                <>
                  <p className="font-bold text-gray-900">Effective Date: May 2026</p>
                  <h4 className="font-extrabold text-[#002B49] mt-2">1. Scope of Agreement</h4>
                  <p>This document governs entry allocation profiles for the Grip Hill Lucky 100 Launch Draw selection. Submitting a verified profile registers an entry token into the random assortment matrix.</p>
                  <h4 className="font-extrabold text-[#002B49]">2. Selection and Distribution Mechanics</h4>
                  <p>Exactly 100 unique profiles will be selected at random from the aggregate pool of global submissions once the validation window expires. Winning selections will unlock individual luxury gift hampers or 50% discount codes for the upcoming premier product drops.</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-gray-900">Effective Date: May 2026</p>
                  <h4 className="font-extrabold text-[#002B49] mt-2">1. Collected Payload Categories</h4>
                  <p>To register tickets securely, our system logs your full legal representative name, an active email link, phone verification parameters, and shipping markers for future prize delivery routing.</p>
                </>
              )}
            </div>

            <div className="bg-gray-50 p-3.5 px-6 border-t border-gray-100 flex justify-end">
              <button onClick={() => setActiveModal(null)} className="bg-[#002B49] text-white hover:bg-opacity-90 font-bold px-4 py-2 text-xs rounded-lg shadow-sm transition cursor-pointer">
                Acknowledge & Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}