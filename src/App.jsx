import React, { useState } from 'react';
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Upload, 
  ExternalLink,
  Info,
  Heart,
  User,
  Mail,
  Phone
} from 'lucide-react';

/**
 * QUIETBUDDY - Anonymous Listening Service
 * Integrated with provided UPI QR Code
 */

// --- SUB-COMPONENTS ---

const GlobalDisclaimer = () => (
  <div className="bg-zinc-100 border-y border-zinc-200 py-3 px-4 text-center">
    <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
      Disclaimer: This is not therapy, medical advice, or crisis support.
    </p>
  </div>
);

const LandingPage = ({ navigate }) => (
  <div className="flex flex-col min-h-screen">
    <section className="px-6 py-20 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-light text-zinc-900 mb-6 tracking-tight">
        QuietBuddy
      </h1>
      <p className="text-xl text-zinc-600 font-light mb-10 leading-relaxed">
        A professional, anonymous space to be heard without judgment, advice, or diagnosis.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => navigate('booking')}
          className="bg-zinc-900 text-white px-8 py-4 rounded-sm hover:bg-zinc-800 transition-colors uppercase text-sm tracking-widest"
        >
          Book a Session
        </button>
        <button 
          onClick={() => navigate('crisis')}
          className="border border-zinc-300 px-8 py-4 rounded-sm hover:bg-zinc-50 transition-colors uppercase text-sm tracking-widest text-zinc-600"
        >
          In Crisis?
        </button>
      </div>
    </section>

    <section className="bg-white border-y border-zinc-200 py-16 px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-4 font-bold">What this is</h2>
          <ul className="space-y-4">
            <li className="flex gap-3 text-zinc-700">
              <CheckCircle className="w-5 h-5 text-zinc-400 shrink-0" />
              <span>A 1:1 human listening session.</span>
            </li>
            <li className="flex gap-3 text-zinc-700">
              <CheckCircle className="w-5 h-5 text-zinc-400 shrink-0" />
              <span>Anonymity by default.</span>
            </li>
            <li className="flex gap-3 text-zinc-700">
              <CheckCircle className="w-5 h-5 text-zinc-400 shrink-0" />
              <span>A neutral space to vent or reflect.</span>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-4 font-bold">What this is NOT</h2>
          <ul className="space-y-4">
            <li className="flex gap-3 text-zinc-500">
              <AlertCircle className="w-5 h-5 text-zinc-300 shrink-0" />
              <span className="line-through">Therapy or clinical counseling.</span>
            </li>
            <li className="flex gap-3 text-zinc-500">
              <AlertCircle className="w-5 h-5 text-zinc-300 shrink-0" />
              <span className="line-through">Crisis or emergency intervention.</span>
            </li>
            <li className="flex gap-3 text-zinc-500">
              <AlertCircle className="w-5 h-5 text-zinc-300 shrink-0" />
              <span className="line-through">Legal, medical, or life advice.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
);

const BookingFlow = ({ 
  bookingStep, 
  setBookingStep, 
  sessionType, 
  setSessionType, 
  formData, 
  setFormData, 
  handleFileChange, 
  handleBookingSubmit, 
  isSending, 
  pricing 
}) => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-12">
          {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${bookingStep >= s ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                      {s}
                  </div>
                  {s < 3 && <div className={`w-12 h-[1px] ${bookingStep > s ? 'bg-zinc-900' : 'bg-zinc-200'}`} />}
              </div>
          ))}
          <span className="ml-4 text-xs uppercase tracking-[0.2em] font-bold text-zinc-400">
              {bookingStep === 1 ? 'Select Package' : bookingStep === 2 ? 'Your Details' : 'Payment'}
          </span>
      </div>

      {bookingStep === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-light mb-8">Choose your session</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <button 
              onClick={() => { setSessionType('30min'); setBookingStep(2); }}
              className="p-8 border border-zinc-200 bg-white rounded-sm text-left hover:border-zinc-900 transition-all group"
            >
              <Clock className="w-6 h-6 mb-4 text-zinc-400 group-hover:text-zinc-900" />
              <div className="text-xl font-medium mb-1">30 Minutes</div>
              <div className="text-zinc-500">Intensive human listening</div>
              <div className="mt-6 text-2xl font-light">₹299 INR</div>
            </button>
            <button 
              onClick={() => { setSessionType('45min'); setBookingStep(2); }}
              className="p-8 border border-zinc-200 bg-white rounded-sm text-left hover:border-zinc-900 transition-all group"
            >
              <Clock className="w-6 h-6 mb-4 text-zinc-400 group-hover:text-zinc-900" />
              <div className="text-xl font-medium mb-1">45 Minutes</div>
              <div className="text-zinc-500">Extended reflection space</div>
              <div className="mt-6 text-2xl font-light">₹499 INR</div>
            </button>
          </div>
        </div>
      )}

      {bookingStep === 2 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl">
          <button onClick={() => setBookingStep(1)} className="text-xs uppercase tracking-widest text-zinc-400 mb-6 hover:text-zinc-900">← Change Package</button>
          <h2 className="text-3xl font-light mb-8">Tell us about yourself</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Full Name</label>
              <div className="relative">
                  <User className="absolute left-4 top-4 w-4 h-4 text-zinc-300" />
                  <input 
                      type="text"
                      className="w-full border border-zinc-200 p-4 pl-12 rounded-sm focus:outline-none focus:border-zinc-900 bg-white"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Gmail / Email</label>
              <div className="relative">
                  <Mail className="absolute left-4 top-4 w-4 h-4 text-zinc-300" />
                  <input 
                      type="email"
                      className="w-full border border-zinc-200 p-4 pl-12 rounded-sm focus:outline-none focus:border-zinc-900 bg-white"
                      placeholder="yourname@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Phone Number</label>
              <div className="relative">
                  <Phone className="absolute left-4 top-4 w-4 h-4 text-zinc-300" />
                  <input 
                      type="tel"
                      className="w-full border border-zinc-200 p-4 pl-12 rounded-sm focus:outline-none focus:border-zinc-900 bg-white"
                      placeholder="+91 1234567890"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
              </div>
              <p className="text-[10px] text-zinc-400 mt-2 italic flex gap-1 items-center">
                  <Info className="w-3 h-3" /> Note: Your phone number will never be used for promotions or marketing.
              </p>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Topic (Optional)</label>
              <textarea 
                  className="w-full border border-zinc-200 p-4 rounded-sm focus:outline-none focus:border-zinc-900 bg-white h-24"
                  placeholder="Anything on your mind?"
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
              />
            </div>

            <button 
              disabled={!formData.name || !formData.email || !formData.phone}
              onClick={() => setBookingStep(3)}
              className="w-full bg-zinc-900 text-white py-4 rounded-sm uppercase text-sm tracking-widest font-bold disabled:opacity-20 hover:bg-zinc-800 transition-all"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      {bookingStep === 3 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl">
          <button onClick={() => setBookingStep(2)} className="text-xs uppercase tracking-widest text-zinc-400 mb-6 hover:text-zinc-900">← Back to Details</button>
          <h2 className="text-3xl font-light mb-2">Payment</h2>
          <p className="text-zinc-500 text-sm mb-8">Scan the QR code to complete the transfer of <span className="text-zinc-900 font-bold">{pricing[sessionType]}</span>.</p>
          
          <div className="bg-white border border-zinc-200 p-8 rounded-sm mb-8 text-center flex flex-col items-center shadow-sm">
              {/* UPDATED: QR Code Image Container */}
              <div className="w-64 h-64 border border-zinc-100 p-2 mb-6 bg-white overflow-hidden flex items-center justify-center">
                  <img 
                    src="/qr-code.jpeg" 
                    alt="Payment QR Code" 
                    className="w-full h-full object-contain"
                  />
              </div>

              <div className="w-full text-left space-y-6">
                  <div>
                      <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Upload Payment Screenshot</label>
                      <div className="relative border-2 border-dashed border-zinc-100 rounded-sm p-8 text-center hover:bg-zinc-50 transition-colors cursor-pointer group">
                          <input 
                              type="file"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={handleFileChange}
                              accept="image/*"
                          />
                          {formData.screenshot ? (
                              <div className="flex flex-col items-center text-green-600">
                                  <CheckCircle className="w-8 h-8 mb-2" />
                                  <span className="text-xs font-medium">{formData.screenshotName}</span>
                              </div>
                          ) : (
                              <div className="flex flex-col items-center text-zinc-400 group-hover:text-zinc-600">
                                  <Upload className="w-8 h-8 mb-2" />
                                  <span className="text-xs">Click to upload image</span>
                              </div>
                          )}
                      </div>
                  </div>

                  <button 
                      disabled={!formData.screenshot || isSending}
                      onClick={handleBookingSubmit}
                      className="w-full bg-zinc-900 text-white py-4 rounded-sm uppercase text-sm tracking-widest font-bold disabled:opacity-20 hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                  >
                      {isSending ? (
                          <>
                              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                              Processing...
                          </>
                      ) : (
                          'Confirm Booking'
                      )}
                  </button>
                  <p className="text-[10px] text-zinc-400 text-center uppercase tracking-widest">Confirmation link will be sent to {formData.email}</p>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ConfirmationPage = ({ formData, navigate }) => (
  <div className="max-w-xl mx-auto px-6 py-24 text-center animate-in fade-in duration-1000">
    <div className="flex justify-center mb-8">
      <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center shadow-lg">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>
    </div>
    <h2 className="text-3xl font-light mb-4">Payment Verification Sent</h2>
    <p className="text-zinc-600 mb-10 leading-relaxed text-lg">
      We've received your booking details and payment receipt.
    </p>

    <div className="bg-white border border-zinc-200 p-8 rounded-sm text-left mb-10 shadow-sm">
      <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-6 flex items-center gap-2">
        <Clock className="w-4 h-4" /> What happens next?
      </h3>
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center text-xs font-bold text-zinc-500 shrink-0">1</div>
          <div>
            <p className="text-zinc-900 font-medium text-sm">Reviewing Receipt</p>
            <p className="text-xs text-zinc-500">A mail has been sent to you as an official confirmation. Please check spam too. Our team will verify the transaction within 30-60 minutes.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center text-xs font-bold text-zinc-500 shrink-0">2</div>
          <div>
            <p className="text-zinc-900 font-medium text-sm">Secure Meeting Link</p>
            <p className="text-xs text-zinc-500">A Google Meet or private link will be sent to <strong>{formData.email}</strong>.</p>
          </div>
        </div>
      </div>
    </div>

    <button 
      onClick={() => navigate('landing')}
      className="text-sm text-zinc-400 hover:text-zinc-900 uppercase tracking-widest transition-colors font-medium"
    >
      Back to Home
    </button>
  </div>
);

const CrisisPage = ({ navigate }) => (
  <div className="max-w-2xl mx-auto px-6 py-20">
    <div className="bg-zinc-900 text-white p-12 rounded-sm text-center shadow-2xl">
      <Heart className="w-12 h-12 mx-auto mb-6 text-zinc-700" />
      <h2 className="text-3xl font-light mb-6 tracking-tight">Support is Available.</h2>
      <p className="text-zinc-400 mb-10 leading-relaxed max-w-lg mx-auto">
        QuietBuddy is for non-crisis listening only. If you need urgent support, please use these confidential services.
      </p>
      
      <div className="space-y-4 text-left border-t border-zinc-800 pt-10">
          <a href="tel:988" className="flex justify-between items-center p-5 bg-zinc-800/50 rounded-sm hover:bg-zinc-800 transition-all border border-zinc-800">
            <div className="flex flex-col">
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">USA & Canada</span>
              <span className="text-lg">Call or Text 988</span>
            </div>
            <ExternalLink className="w-5 h-5 text-zinc-500" />
          </a>
          <a href="https://www.befrienders.org/" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center p-5 bg-zinc-800/50 rounded-sm hover:bg-zinc-800 transition-all border border-zinc-800">
            <div className="flex flex-col">
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">International</span>
              <span className="text-lg">Befrienders Worldwide</span>
            </div>
            <ExternalLink className="w-5 h-5 text-zinc-500" />
          </a>
      </div>

      <button 
        onClick={() => navigate('landing')}
        className="mt-12 text-zinc-600 hover:text-white text-xs tracking-widest uppercase transition-colors"
      >
        Return to QuietBuddy
      </button>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [sessionType, setSessionType] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    screenshot: null, 
    screenshotName: ''
  });

  const [isSending, setIsSending] = useState(false);

  const EMAILJS_SERVICE_ID = "service_hfou4lb";
  const EMAILJS_TEMPLATE_ID = "template_ocy5wwp";
  const EMAILJS_PUBLIC_KEY = "dPEG_BVQoPIKjZmC6";
  const ADMIN_EMAIL = "admin@quietbuddy.com";

  const pricing = {
    '30min': '₹299',
    '45min': '₹499'
  };

  const navigate = (page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
    if (page === 'booking') {
      setBookingStep(1);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ 
          ...prev, 
          screenshot: reader.result, 
          screenshotName: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBookingSubmit = async () => {
    if (!formData.email || !formData.screenshot) return;
    setIsSending(true);

    const data = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: {
        to_name: formData.name,
        to_email: formData.email,
        from_name: "QuietBuddy Team",
        session_duration: sessionType === '30min' ? '30 Minutes' : '45 Minutes',
        price: pricing[sessionType],
        user_phone: formData.phone,
        user_topic: formData.topic || "N/A",
        admin_email: ADMIN_EMAIL,
      }
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate('confirmation');
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      navigate('confirmation');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-zinc-800 font-sans selection:bg-zinc-200">
      <GlobalDisclaimer />
      
      <header className="px-6 py-6 border-b border-zinc-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('landing')}
          >
            <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white text-sm font-light">QB</span>
            </div>
            <span className="text-xl font-light tracking-tight group-hover:text-zinc-500 transition-colors">QuietBuddy</span>
          </div>
          
          <nav className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
            <button onClick={() => navigate('landing')} className={`hover:text-zinc-900 transition-colors ${currentPage === 'landing' ? 'text-zinc-900' : ''}`}>Home</button>
            <button onClick={() => navigate('booking')} className={`hover:text-zinc-900 transition-colors ${currentPage === 'booking' ? 'text-zinc-900' : ''}`}>Booking</button>
            <button onClick={() => navigate('crisis')} className={`hover:text-zinc-900 transition-colors ${currentPage === 'crisis' ? 'text-zinc-900' : ''}`}>Safety</button>
          </nav>
        </div>
      </header>

      <main className="min-h-[70vh]">
        {currentPage === 'landing' && <LandingPage navigate={navigate} />}
        {currentPage === 'booking' && (
          <BookingFlow 
            bookingStep={bookingStep}
            setBookingStep={setBookingStep}
            sessionType={sessionType}
            setSessionType={setSessionType}
            formData={formData}
            setFormData={setFormData}
            handleFileChange={handleFileChange}
            handleBookingSubmit={handleBookingSubmit}
            isSending={isSending}
            pricing={pricing}
          />
        )}
        {currentPage === 'confirmation' && <ConfirmationPage formData={formData} navigate={navigate} />}
        {currentPage === 'crisis' && <CrisisPage navigate={navigate} />}
      </main>

      <footer className="bg-zinc-100 py-20 px-6 border-t border-zinc-200 mt-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <h3 className="text-xl font-light">QuietBuddy</h3>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              A minimalist, professional space for human connection. Simple, anonymous listening.
            </p>
            <div className="text-[10px] text-zinc-400 space-y-1 uppercase tracking-widest font-bold">
              <p>© 2024 QuietBuddy</p>
              <p>Inquiry: {ADMIN_EMAIL}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-zinc-900 font-bold mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-medium">
              <li><button onClick={() => navigate('booking')} className="hover:text-zinc-900 transition-colors">Start Booking</button></li>
              <li><button onClick={() => navigate('crisis')} className="hover:text-zinc-900 transition-colors">Emergency Resources</button></li>
              <li><button onClick={() => navigate('landing')} className="hover:text-zinc-900 transition-colors">Privacy Policy</button></li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-sm border border-zinc-200 shadow-sm self-start">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-zinc-900 font-bold mb-6 flex items-center gap-2">
              <Shield className="w-4 h-4 text-zinc-400" /> Professional Code
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed italic border-l-2 border-zinc-100 pl-4">
              "We provide a calm ear for those who need to speak. We do not judge, we do not diagnose, and we do not prescribe. We simply listen."
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;