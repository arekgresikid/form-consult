import React, { useState, useEffect } from 'react';
import StatusModal from './StatusModal';

// Modular Step Components
import ProgressBar from './ConsultationForm/ProgressBar';
import ContactInfo from './ConsultationForm/ContactInfo';
import Step1 from './ConsultationForm/Step1';
import Step2 from './ConsultationForm/Step2';
import Step3 from './ConsultationForm/Step3';
import Step4 from './ConsultationForm/Step4';
import Step5 from './ConsultationForm/Step5';
import { ChevronUp, MessageCircle } from 'lucide-react';

const steps = [
  { id: 1, label: 'Konsep' },
  { id: 2, label: 'Visual' },
  { id: 3, label: 'Infrastruktur' },
  { id: 4, label: 'Fitur' },
  { id: 5, label: 'Finish' }
];

export default function ConsultationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = steps.length;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error',
    title: '',
    message: ''
  });

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    jobTitle: '',
    websiteType: '',
    otherWebsiteType: '',
    techStack: '',
    designStyle: '',
    primaryColor: '',
    customColor: '',
    logoStatus: '',
    logoNotes: '',
    contentStatus: '',
    contentNotes: '',
    preferredFont: '',
    hostingStatus: '',
    hostingPlan: '',
    domainStatus: '',
    domainName: '',
    domainExt: '.com',
    emailStatus: '',
    elements: [] as string[],
    ecommerceFeatures: [] as string[],
    securityFeatures: [] as string[],
    features: [] as string[],
    marketingOptions: [] as string[],
    budget: '',
    handoverFormat: '',
    referenceUrl: '',
    proposalLink: '',
    logoUrl: '',
    contentUrl: '',
    additionalNotes: '',
    hp_field: '' // Honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mathChallenge, setMathChallenge] = useState({ a: 0, b: 0, result: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generateWhatsAppLink = () => {
    const number = "6281330763633";
    let message = `*HALO ARIF, SAYA INGIN BERKONSULTASI*%0A%0A`;
    
    if (formData.clientName) message += `👤 *Nama:* ${formData.clientName}%0A`;
    if (formData.websiteType) message += `🌐 *Jenis Web:* ${formData.websiteType}%0A`;
    if (formData.techStack) message += `💻 *Tech Stack:* ${formData.techStack}%0A`;
    if (formData.designStyle) message += `🎨 *Gaya Desain:* ${formData.designStyle}%0A`;
    if (formData.budget) message += `💰 *Anggaran:* ${formData.budget}%0A`;
    if (formData.domainName) message += `🔗 *Domain:* ${formData.domainName}${formData.domainExt}%0A`;
    
    message += `%0A_Dikirim via Digital Project Brief System_`;
    
    return `https://wa.me/${number}?text=${message}`;
  };

  useEffect(() => {
    const generateChallenge = () => {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      setMathChallenge({ a, b, result: a + b });
    };
    generateChallenge();
  }, [currentStep]);

  // Prevent auto-focus and keyboard jump on mobile when switching steps
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Explicitly blur any active element to prevent keyboard from popping up
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [currentStep]);

  useEffect(() => {
    const saved = localStorage.getItem('consultationFormProgress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed.data }));
        setCurrentStep(parsed.step || 1);
      } catch (e) {
        console.error('Error loading saved progress');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('consultationFormProgress', JSON.stringify({
      data: formData,
      step: currentStep
    }));
  }, [formData, currentStep]);

  const validateStep = () => {
    return true; // All fields optional as requested
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepJump = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleModuleToggle = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev] === value ? '' : value
    }));
  };

  const handleElementToggle = (label: string) => {
    setFormData(prev => ({
      ...prev,
      elements: prev.elements.includes(label)
        ? prev.elements.filter(e => e !== label)
        : [...prev.elements, label]
    }));
  };

  const handleEcommerceToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      ecommerceFeatures: prev.ecommerceFeatures.includes(id)
        ? prev.ecommerceFeatures.filter(f => f !== id)
        : [...prev.ecommerceFeatures, id]
    }));
  };

  const handleSecurityToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      securityFeatures: prev.securityFeatures.includes(id)
        ? prev.securityFeatures.filter(f => f !== id)
        : [...prev.securityFeatures, id]
    }));
  };

  const handleFeatureToggle = (label: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(label)
        ? prev.features.filter(f => f !== label)
        : [...prev.features, label]
    }));
  };

  const handleMarketingToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      marketingOptions: prev.marketingOptions.includes(id)
        ? prev.marketingOptions.filter(o => o !== id)
        : [...prev.marketingOptions, id]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.hp_field) {
      console.log('Bot detected');
      return;
    }

    if (parseInt(userAnswer) !== mathChallenge.result) {
      // Generate new challenge if wrong
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      setMathChallenge({ a, b, result: a + b });
      setUserAnswer('');

      setModalConfig({
        isOpen: true,
        type: 'error',
        title: 'Jawaban Salah',
        message: `Buktikan Anda manusia! Jawaban Anda salah. Coba lagi dengan soal baru ini.`
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setModalConfig({
          isOpen: true,
          type: 'success',
          title: 'Berhasil Terkirim!',
          message: 'Terima kasih! Kami akan segera menghubungi Anda melalui WhatsApp atau Email untuk diskusi lebih lanjut.'
        });
        localStorage.removeItem('consultationFormProgress');
        setFormData({
            clientName: '', clientEmail: '', clientPhone: '', jobTitle: '',
            websiteType: '', otherWebsiteType: '', techStack: '', designStyle: '', primaryColor: '', customColor: '',
            logoStatus: '', logoNotes: '', contentStatus: '', contentNotes: '', preferredFont: '', 
            hostingStatus: '', hostingPlan: '',
            domainStatus: '', domainName: '', domainExt: '.com', emailStatus: '',
            elements: [], ecommerceFeatures: [], securityFeatures: [], features: [], marketingOptions: [],
            budget: '', handoverFormat: '', referenceUrl: '', proposalLink: '', 
            logoUrl: '', contentUrl: '', additionalNotes: '', hp_field: ''
        });
        setUserAnswer('');
        setCurrentStep(1);
      } else {
        throw new Error('Gagal mengirim form');
      }
    } catch (err) {
      setModalConfig({
        isOpen: true,
        type: 'error',
        title: 'Oops! Terjadi Kesalahan',
        message: 'Mohon maaf, terjadi gangguan sistem. Silakan coba lagi beberapa saat lagi atau hubungi kami langsung via WhatsApp.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua isian dan mulai dari awal?')) {
      localStorage.removeItem('consultationFormProgress');
      setFormData({
        clientName: '', clientEmail: '', clientPhone: '', jobTitle: '',
        websiteType: '', otherWebsiteType: '', techStack: '', designStyle: '', primaryColor: '', customColor: '',
        logoStatus: '', logoNotes: '', contentStatus: '', contentNotes: '', preferredFont: '', 
        hostingStatus: '', hostingPlan: '',
        domainStatus: '', domainName: '', domainExt: '.com', emailStatus: '',
        elements: [], ecommerceFeatures: [], securityFeatures: [], features: [], marketingOptions: [],
        budget: '', handoverFormat: '', referenceUrl: '', proposalLink: '', 
        logoUrl: '', contentUrl: '', additionalNotes: '', hp_field: ''
      });
      setUserAnswer('');
      setCurrentStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto py-12 px-4">
      <div className="space-y-12">
        
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          steps={steps} 
          onStepClick={handleStepJump}
        />

        <div className="relative min-h-[400px]">
          {currentStep === 1 && (
            <div className="space-y-12">
              <ContactInfo formData={formData} setFormData={setFormData} errors={errors} />
              <div className="border-t border-gray-100 pt-12">
                <Step1 
                  formData={formData} 
                  setFormData={setFormData} 
                  handleModuleToggle={handleModuleToggle} 
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <Step2 
              formData={formData} 
              setFormData={setFormData} 
              handleModuleToggle={handleModuleToggle} 
            />
          )}

          {currentStep === 3 && (
            <Step3 
              formData={formData} 
              setFormData={setFormData} 
              handleModuleToggle={handleModuleToggle} 
            />
          )}

          {currentStep === 4 && (
            <Step4 
              formData={formData} 
              setFormData={setFormData} 
              errors={errors} 
              handleModuleToggle={handleModuleToggle} 
            />
          )}

          {currentStep === 5 && (
            <Step5 
              formData={formData} 
              setFormData={setFormData} 
              handleElementToggle={handleElementToggle}
              handleEcommerceToggle={handleEcommerceToggle}
              handleSecurityToggle={handleSecurityToggle}
              handleFeatureToggle={handleFeatureToggle}
              handleMarketingToggle={handleMarketingToggle}
            />
          )}
        </div>

        {/* Math Challenge Anti-Bot (Only on Last Step) */}
        {currentStep === totalSteps && (
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="text-sm font-bold text-black uppercase tracking-widest mb-1">Verifikasi Manusia</h4>
                <p className="text-xs text-gray-500">Selesaikan penjumlahan sederhana ini untuk mengirim formulir.</p>
              </div>
              <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <span className="text-lg font-bold text-black min-w-[60px] text-center">{mathChallenge.a} + {mathChallenge.b} =</span>
                <input 
                  type="text" 
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="?"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-20 bg-gray-50 border-2 border-transparent focus:border-black rounded-lg py-2 px-3 text-center font-bold text-lg focus:outline-none transition-all"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-8 py-4 border-2 border-black text-black text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-gray-50 transition-all"
            >
              Kembali
            </button>
          )}
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-10 py-4 bg-black text-white text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Lanjut
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="ml-auto px-10 py-4 bg-black text-white text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:scale-100 active:scale-95"
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Konsultasi'}
            </button>
          )}
        </div>

        {/* Footer Reset Button */}
        <div className="pt-20 pb-8 flex justify-center">
          <button
            type="button"
            onClick={handleResetForm}
            className="px-6 py-2 text-gray-400 hover:text-red-500 text-[10px] font-bold uppercase tracking-widest transition-all opacity-40 hover:opacity-100 tracking-[0.2em]"
          >
            — Mulai Dari Awal (Reset Form) —
          </button>
        </div>

        <StatusModal 
          isOpen={modalConfig.isOpen}
          onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
          type={modalConfig.type}
          title={modalConfig.title}
          message={modalConfig.message}
        />

        {/* Honeypot Anti-Bot (Hidden) */}
        <input 
          type="text" 
          name="hp_field" 
          style={{ display: 'none' }} 
          tabIndex={-1} 
          autoComplete="off"
          value={formData.hp_field}
          onChange={(e) => setFormData({...formData, hp_field: e.target.value})}
        />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        {/* Back to Top */}
        <button
          type="button"
          onClick={scrollToTop}
          className={`p-4 bg-white text-black border-2 border-black rounded-full shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-95 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
          title="Kembali ke Atas"
        >
          <ChevronUp className="w-6 h-6" strokeWidth={2.5} />
        </button>

        {/* WhatsApp Button */}
        <a
          href={generateWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-[#25D366] text-white rounded-full shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5)] active:scale-95 flex items-center justify-center group relative"
          title="Konsultasi via WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="absolute right-full mr-4 px-3 py-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat WhatsApp
          </span>
        </a>
      </div>
    </form>
  );
}
