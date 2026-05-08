import React from 'react';
import { Mail, Users, FileText } from 'lucide-react';

interface ContactInfoProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: Record<string, string>;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ formData, setFormData, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gray-50 rounded-3xl border border-gray-100">
      <div className="space-y-6">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 block">
            Nama Lengkap / Instansi
          </label>
          <div className="relative group">
            <Users className="absolute left-0 top-3 w-5 h-5 text-gray-300 group-focus-within:text-black transition-colors" />
            <input 
              type="text" 
              placeholder="Contoh: Budi Santoso / PT. Maju Jaya"
              value={formData.clientName}
              onChange={(e) => setFormData({...formData, clientName: e.target.value})}
              className="w-full bg-transparent border-b-2 border-gray-200 py-3 pl-8 focus:outline-none focus:border-black transition-all text-lg font-medium"
            />
            {errors.clientName && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.clientName}</p>}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 block">
            Alamat Email
          </label>
          <div className="relative group">
            <Mail className="absolute left-0 top-3 w-5 h-5 text-gray-300 group-focus-within:text-black transition-colors" />
            <input 
              type="email" 
              placeholder="nama@email.com"
              value={formData.clientEmail}
              onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
              className="w-full bg-transparent border-b-2 border-gray-200 py-3 pl-8 focus:outline-none focus:border-black transition-all text-lg font-medium"
            />
            {errors.clientEmail && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.clientEmail}</p>}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 block">
            WhatsApp / Telegram
          </label>
          <div className="relative group">
            <SmartphoneIcon className="absolute left-0 top-3 w-5 h-5 text-gray-300 group-focus-within:text-black transition-colors" />
            <input 
              type="tel" 
              placeholder="0812xxxxxx"
              value={formData.clientPhone}
              onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
              className="w-full bg-transparent border-b-2 border-gray-200 py-3 pl-8 focus:outline-none focus:border-black transition-all text-lg font-medium"
            />
            {errors.clientPhone && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.clientPhone}</p>}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 block">
            Pekerjaan / Jabatan
          </label>
          <div className="relative group">
            <FileText className="absolute left-0 top-3 w-5 h-5 text-gray-300 group-focus-within:text-black transition-colors" />
            <input 
              type="text" 
              placeholder="Contoh: Owner, Marketing, dll"
              value={formData.jobTitle}
              onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
              className="w-full bg-transparent border-b-2 border-gray-200 py-3 pl-8 focus:outline-none focus:border-black transition-all text-lg font-medium"
            />
          </div>
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 space-y-6 pt-6 border-t border-gray-200">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 block">
            URL Referensi / Proposal (PDF/Word Link)
          </label>
          <div className="relative group">
            <LinkIcon className="absolute left-0 top-3 w-5 h-5 text-gray-300 group-focus-within:text-black transition-colors" />
            <input 
              type="text" 
              placeholder="Contoh: https://website-lama.com atau link Google Drive proposal"
              value={formData.referenceUrl}
              onChange={(e) => setFormData({...formData, referenceUrl: e.target.value})}
              className="w-full bg-transparent border-b-2 border-gray-200 py-3 pl-8 focus:outline-none focus:border-black transition-all text-lg font-medium"
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-2 italic">
            * Lampirkan link (Google Drive/Dropbox) jika Anda memiliki dokumen proposal dalam format PDF atau Word.
          </p>
        </div>
      </div>
    </div>
  );
};

// Internal Helpers
const SmartphoneIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

const LinkIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export default ContactInfo;
