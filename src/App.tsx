import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, Search, Settings, 
  CheckCircle2, X, ShieldCheck, 
  Loader2, Upload, ChevronDown, ChevronUp
} from 'lucide-react';

const RobuxIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2L2 7.5V16.5L12 22L22 16.5V7.5L12 2ZM14.5 14.5H9.5V9.5H14.5V14.5Z" />
  </svg>
);

const RobloxLogoIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.31976 2.65625L1.83984 21.0664L20.2499 24.5463L23.7298 6.13617L5.31976 2.65625ZM13.8 15.2L9.1 14.3L8.2 9.6L12.9 10.5L13.8 15.2Z" />
  </svg>
);

const packages = [
  { robux: '5,250', old: '4,500', price: 'P3,400.00' },
  { robux: '2,000', old: '1,700', price: 'P1,360.00' },
  { robux: '1,000', old: '800', price: 'P680.00' },
  { robux: '500', old: '400', price: 'P350.00' },
];

const limitedItems = [
  { name: 'Fractured Domino Crown', robux: '24,000', old: '22,500', price: 'P13.6K' },
  { name: 'Wings of the Pactbreaker', robux: '11,000', old: '10,000', price: 'P6,800.00' }
];

const faqs = [
  { q: "What are Robux?", a: "Robux is the virtual currency of Roblox that can be used to purchase upgrades for your avatar or buy special abilities in experiences." },
  { q: "Why haven't my Robux arrived?", a: "Sometimes transactions can take up to 5-10 minutes to process due to high server load. Please wait or try restarting your app to see the updated balance." },
  { q: "Are Robux refundable?", a: "No, all purchases are final and non-refundable according to the Terms of Use." }
];

const loadingTexts = [
  "Verifying account details...",
  "Contacting secure server...",
  "Authorizing transaction...",
  "Finalizing balance..."
];

type ViewState = 'main' | 'warning' | 'checkout' | 'processing' | 'success';

export default function App() {
  const [view, setView] = useState<ViewState>('main');
  const [selectedPkg, setSelectedPkg] = useState<any>(null);
  const [processingStep, setProcessingStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [robuxBalance, setRobuxBalance] = useState("0");

  const startCheckout = (pkg: any) => {
    setSelectedPkg(pkg);
    setView('warning');
  };

  const handlePayment = () => {
    setView('processing');
    setProcessingStep(0);
    setProgress(0);
    
    const steps = loadingTexts.length;
    const timePerStep = 1800;
    let currentStep = 0;
    
    // Smooth progress bar animation
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + (100 / (steps * 18)), 100)); 
    }, 100);

    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        clearInterval(interval);
        clearInterval(stepInterval);
        setTimeout(() => {
          setView('success');
          setRobuxBalance(selectedPkg?.robux || "0");
        }, 500);
      } else {
        setProcessingStep(currentStep);
      }
    }, timePerStep);
  };

  const TopBar = () => (
    <div className="sticky top-0 bg-white z-40">
      <div className="flex items-center justify-between px-3 md:px-6 py-2 border-b">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button className="p-1 hover:bg-gray-100 rounded-md transition-colors shrink-0">
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
          </button>
          <div className="font-bold text-[1.1rem] sm:text-2xl tracking-[0.05em] flex items-center shrink-0">
            R<RobloxLogoIcon className="w-4 h-4 sm:w-5 sm:h-5 -mt-0.5 mx-[1px]" />BLOX
          </div>
          <button className="bg-gray-800 text-white text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded font-bold uppercase tracking-wider ml-1 sm:ml-2 shrink-0">
            Select
          </button>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-4 ml-auto shrink-0">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 border border-gray-300 shadow-sm overflow-hidden items-center justify-center shrink-0">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-400 rounded-full mt-2 sm:mt-3 mx-auto"></div>
          </div>
          <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors shrink-0">
            <Search className="w-5 h-5 text-gray-800" />
          </button>
          <button className="flex items-center gap-1.5 font-bold hover:bg-gray-100 px-1 sm:px-2 py-1.5 rounded-md transition-colors shrink-0">
            <RobuxIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" /> 
            <span className="text-sm sm:text-base">{robuxBalance}</span>
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors shrink-0">
            <Settings className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </div>
      {/* Subnav */}
      <div className="flex px-4 md:px-6 overflow-x-auto border-b text-sm font-medium hide-scrollbar">
        {['Charts', 'Marketplace', 'Create'].map(tab => (
          <button key={tab} className="px-4 py-3 text-gray-500 hover:text-gray-800 whitespace-nowrap">
            {tab}
          </button>
        ))}
        <button className="px-4 py-3 border-b-[3px] border-gray-900 text-gray-900 font-bold whitespace-nowrap">
          Robux
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* --- Main View --- */}
      <div style={{ display: view === 'main' || view === 'warning' ? 'block' : 'none' }}>
        <TopBar />
        
        <div className="max-w-4xl mx-auto pb-24 relative overflow-hidden">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          {/* Hero Banner */}
          <div className="px-4 sm:px-6 py-8 md:py-12 relative z-10">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
                Enjoy up to<br />25% more<br />Robux
              </h1>
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded shadow-sm text-sm font-medium hover:bg-gray-50 bg-white">
                <Upload className="w-4 h-4" /> Send
              </button>
            </div>

            {/* Limited Time Items */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl sm:text-2xl font-medium tracking-tight">Limited-time avatar items</h2>
                <span className="bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-full font-bold">
                  11 days left
                </span>
              </div>
              
              <div className="space-y-4">
                {limitedItems.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 sm:p-5 bg-gray-50 rounded-2xl">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#dbdedd] rounded-xl flex-shrink-0 relative overflow-hidden shadow-inner flex items-center justify-center">
                      {/* Fake item placeholder pattern */}
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 transform rotate-12 rounded opacity-50 block mix-blend-multiply" />
                    </div>
                    <div className="flex-1 flex flex-col pt-1">
                      <h3 className="font-semibold text-lg sm:text-xl leading-snug mb-1">{item.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mb-auto">
                        Roblox <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 ml-1 fill-blue-500 stroke-white" />
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1.5">
                          <RobuxIcon className="w-5 h-5 text-gray-700" />
                          <span className="font-bold text-lg sm:text-xl">{item.robux}</span>
                          <span className="text-xs sm:text-sm text-gray-400 font-medium line-through ml-1">{item.old}</span>
                        </div>
                        <button 
                          onClick={() => startCheckout(item)}
                          className="bg-[#e4e4e5] hover:bg-[#d4d4d5] px-4 py-1.5 rounded font-medium text-sm sm:text-base transition-colors"
                        >
                          {item.price}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Packages */}
            <div className="mt-12">
              <h2 className="text-2xl font-medium tracking-tight mb-2">Robux packages</h2>
              <p className="text-gray-500 text-sm mb-6">By purchasing Robux, you agree to our Terms of Use, including the arbitration clause and revocation policy.</p>

              <div className="space-y-3">
                {packages.map((pkg, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors bg-white shadow-sm">
                    <div className="flex items-center gap-2">
                      <RobuxIcon className="w-5 h-5 text-gray-600" />
                      <span className="font-bold text-lg">{pkg.robux}</span>
                      <span className="text-gray-400 text-sm font-medium line-through flex items-center ml-1">
                        <RobuxIcon className="w-3 h-3 mr-0.5" /> {pkg.old}
                      </span>
                    </div>
                    <button 
                      onClick={() => startCheckout(pkg)}
                      className="bg-[#e2e8f0] hover:bg-[#cbd5e1] px-4 sm:px-6 py-2 rounded font-semibold text-gray-800 transition-colors"
                    >
                      {pkg.price}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Fake subscription area */}
            <div className="mt-8 border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <RobuxIcon className="w-6 h-6" />
                <h3 className="text-xl font-bold">New on Roblox</h3>
                <a href="#" className="ml-auto text-sm text-gray-500 underline">Learn more</a>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div>
                  <h4 className="font-bold text-lg">Roblox Plus</h4>
                  <ul className="text-sm text-gray-600 mt-2 space-y-2">
                    <li className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-200 rounded-full" /> 10% off in-game items</li>
                    <li className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-200 rounded-full" /> Free private servers</li>
                  </ul>
                </div>
                <div className="text-right">
                  <div className="font-bold">P269.00</div>
                  <div className="text-xs text-gray-500">/ month</div>
                </div>
              </div>
              <button className="w-full mt-6 py-3 border border-gray-300 rounded font-semibold hover:bg-gray-50">
                Try it for free
              </button>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 mb-8">
              <h2 className="text-2xl font-bold tracking-tight mb-6">FAQ</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex justify-between items-center p-4 text-left font-semibold hover:bg-gray-50 transition-colors"
                    >
                      {faq.q}
                      {openFaq === i ? <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0 ml-2" /> : <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-2" />}
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-4 text-gray-600 text-sm leading-relaxed"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- Warning Modal --- */}
      <AnimatePresence>
        {view === 'warning' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-[400px] overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-bold text-lg">Warning</h3>
                <button onClick={() => setView('main')} className="p-1 hover:bg-gray-100 rounded-full"><X className="w-5 h-5 text-gray-500" /></button>
              </div>
              <div className="p-6 text-gray-700 text-[15px] leading-relaxed space-y-4">
                <p>This purchase involves the exchange of real money.</p>
                <p>I agree that I am at least 18 years of age, and am the parent or legal guardian of the account owner. I authorize this purchase and agree to the Terms of Use.</p>
              </div>
              <div className="p-4 border-t flex justify-end gap-3 bg-gray-50/50">
                <button onClick={() => setView('main')} className="px-5 py-2.5 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 text-gray-700 transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={() => setView('checkout')} 
                  className="px-5 py-2.5 bg-gray-900 text-white rounded-lg font-semibold hover:bg-black transition-colors"
                >
                  OK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Checkout & Processing & Success --- */}
      {(view === 'checkout' || view === 'processing' || view === 'success') && (
        <div className="min-h-screen bg-white">
          <div className="bg-white border-b px-4 py-3 sticky top-0 flex justify-between items-center z-10 shadow-sm">
            <div className="font-bold text-xl tracking-[0.05em] flex items-center">
              R<RobloxLogoIcon className="w-4 h-4 -mt-0.5 mx-[1px]" />BLOX
            </div>
            <div className="flex items-center gap-1.5 font-bold text-gray-800 bg-gray-100 px-3 py-1.5 rounded-md">
              <RobuxIcon className="w-4 h-4" /> {robuxBalance}
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto p-4 py-8">
            <div className="flex items-center gap-2.5 mb-6">
              <ShieldCheck className="w-6 h-6 text-gray-700" />
              <h1 className="text-2xl font-semibold tracking-tight">Secure checkout</h1>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <RobuxIcon className="w-6 h-6 text-gray-700" />
                  </div>
                  <span className="text-2xl font-bold">{selectedPkg?.robux}</span>
                </div>
                <span className="text-xl font-bold text-gray-800">{selectedPkg?.price}</span>
              </div>
              <div className="mt-4 inline-flex px-2.5 py-1 bg-gray-100 text-xs rounded-full text-gray-600 font-medium">
                +200 bonus
              </div>
            </div>

            <h2 className="text-gray-500 font-medium mb-4 ml-1">Select payment type:</h2>

            <div className="space-y-3">
              {[
                { name: 'GCash', imgProps: { bg: 'bg-blue-500', initials: 'G' } },
                { name: 'Credit / Debit Card', imgProps: { bg: 'bg-gradient-to-r from-orange-400 to-red-500', initials: 'CC' } },
                { name: 'GrabPay', imgProps: { bg: 'bg-green-600', initials: 'GP' } },
                { name: 'PayPal', imgProps: { bg: 'bg-blue-700', initials: 'P' } }
              ].map((method) => (
                <button 
                  key={method.name}
                  onClick={handlePayment}
                  disabled={view !== 'checkout'}
                  className="w-full flex items-center justify-between p-4 sm:p-5 bg-white border border-gray-200 rounded-xl hover:border-gray-400 hover:shadow-sm text-left transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold ${method.imgProps.bg}`}>
                      {method.imgProps.initials}
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">{method.name}</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border border-gray-300 group-hover:border-gray-400" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Processing Overlay */}
          <AnimatePresence>
            {view === 'processing' && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50 text-gray-900 px-4"
              >
                <Loader2 className="w-10 h-10 animate-spin text-gray-400 mb-6" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-center">{loadingTexts[processingStep] || "Completing..."}</h2>
                
                <div className="w-full max-w-xs mt-8 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-gray-900 h-2.5 rounded-full transition-all duration-300 ease-out" 
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="text-sm text-gray-500 mt-6 font-medium text-center">Please do not close the app or navigate away.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Overlay (The Ragebait) */}
          <AnimatePresence>
            {view === 'success' && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              >
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, y: 20 }} 
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                  className="bg-white text-gray-900 p-8 rounded-2xl max-w-[360px] w-full text-center shadow-2xl relative overflow-hidden"
                >
                   {/* Confetti-like background decor */}
                   <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                     <RobuxIcon className="w-32 h-32 transform rotate-12 translate-x-8 -translate-y-8" />
                   </div>

                   <motion.div 
                     initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
                     className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
                   >
                     <CheckCircle2 className="w-12 h-12" />
                   </motion.div>
                   
                   <h2 className="text-2xl font-bold mb-3 tracking-tight">Purchase Successful!</h2>
                   <p className="text-gray-600 mb-8 leading-relaxed">
                     You have successfully purchased <strong className="text-gray-900">{selectedPkg?.robux} Robux</strong> for {selectedPkg?.price}. 
                   </p>
                   
                   <button 
                     onClick={() => {
                        setView('main');
                        setSelectedPkg(null);
                     }}
                     className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-black transition-colors shadow-md hover:shadow-lg mt-auto active:scale-95 duration-150"
                   >
                     Awesome, back to Home
                   </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

