import React from 'react';
import { 
  Zap, Server, ShieldCheck
} from 'lucide-react';
import { InfoTooltip } from './Shared';

interface Step3Props {
  formData: any;
  setFormData: (data: any) => void;
  handleModuleToggle: (field: string, value: string) => void;
}

const Step3: React.FC<Step3Props> = ({ formData, setFormData, handleModuleToggle }) => {
  return (
    <div className="space-y-20">
      {/* 6. Infrastruktur & Hosting */}
      <section>
        <div className="mb-10">
          <h2 className="text-xl font-medium tracking-tight mb-4 flex items-center">
            6. Infrastruktur & Hosting
            <InfoTooltip text="Hosting adalah fondasi web Anda di internet. Hosting Modern biasanya ditujukan untuk web frontend ringan & stabil. Tradisional cPanel populer untuk PHP/WordPress." />
          </h2>
          <p className="text-sm text-gray-500">Hosting adalah "tanah" tempat web Anda diam. Pilih jenis tanah yang cocok, ada yang gratis ada pula yang berbayar.</p>
        </div>

        <div className="flex flex-col gap-4 mb-4">
           {[
            { id: 'modern', label: 'Modern Hosting (Cloud/Vercel/Netlify)', desc: 'Cocok untuk NextJS/React. Sangat cepat, stabil, dan biasanya GRATIS untuk trafik kecil.', icon: <Zap className="w-5 h-5" /> },
            { id: 'cpanel', label: 'Traditional Hosting (cPanel)', desc: 'Populer untuk WordPress/PHP. Berbayar tahunan (± Rp 300rb - 1jt+).', icon: <Server className="w-5 h-5" /> },
            { id: 'terima_beres', label: 'Bantu Carikan / Terima Beres', desc: 'Kami carikan yang terbaik sesuai budget dan spesifikasi web Anda.', icon: <ShieldCheck className="w-5 h-5" /> },
            { id: 'pribadi', label: 'Server Pribadi (VPS)', desc: 'Untuk kebutuhan sistem besar dan trafik tinggi. Perlu biaya bulanan dan maintenance ahli.', icon: <Server className="w-5 h-5" /> }
          ].map(status => (
            <label key={status.id} className={`flex items-start gap-4 p-5 border rounded-2xl cursor-pointer transition-all ${formData.hostingStatus === status.id ? 'border-black bg-[#fafafa]' : 'border-gray-100 hover:border-gray-400'}`}>
              <input 
                type="radio" 
                name="hostingStatus" 
                value={status.id}
                checked={formData.hostingStatus === status.id}
                onChange={() => handleModuleToggle('hostingStatus', status.id)}
                className="mt-1 w-4 h-4 text-black border-gray-300 focus:ring-black accent-black shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`${formData.hostingStatus === status.id ? 'text-black' : 'text-gray-400'}`}>
                    {status.icon}
                  </div>
                  <span className="font-semibold text-sm">{status.label}</span>
                </div>
                <p className={`text-[11px] ${formData.hostingStatus === status.id ? 'text-gray-700' : 'text-gray-500'}`}>{status.desc}</p>
              </div>
            </label>
          ))}
        </div>

        {(formData.hostingStatus === 'cpanel' || formData.hostingStatus === 'pribadi') && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Spesifikasi / Provider Hosting yang Diinginkan:
            </label>
            <textarea 
              placeholder="Misal: Niagahoster Paket Personal, atau VPS DigitalOcean 2GB RAM..."
              value={formData.hostingPlan}
              onChange={(e) => setFormData({...formData, hostingPlan: e.target.value})}
              className="w-full border border-gray-200 p-4 focus:outline-none focus:border-black transition-all rounded-xl text-sm min-h-[100px] resize-none bg-gray-50 focus:bg-white"
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default Step3;
