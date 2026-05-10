import React from 'react';
import { 
  Globe, Layout, Users, Sparkles, Zap, Smartphone, ShoppingCart, Lock,
  Monitor, Code2, Palette, Info, Wallet
} from 'lucide-react';

import { InfoTooltip } from './Shared';

interface Step1Props {
  formData: any;
  setFormData: (data: any) => void;
  handleModuleToggle: (field: string, value: string) => void;
}

const Step1: React.FC<Step1Props> = ({ formData, setFormData, handleModuleToggle }) => {
  return (
    <div className="space-y-20">
      {/* 1. Website apa yang ingin dibangun? */}
      <section>
        <div className="mb-10">
          <h2 className="text-xl font-medium tracking-tight mb-4 flex items-center">
            1. Website apa yang ingin dibangun?
            <InfoTooltip text="Pilih jenis website yang paling mendekati tujuan utama Anda. Setiap jenis memiliki struktur dan fitur dasar yang berbeda." />
          </h2>
          <p className="text-sm text-gray-500">Pilih kategori utama website Anda untuk membantu kami menentukan struktur terbaik.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            { id: 'landing', label: 'Landing Page', desc: 'Satu halaman fokus untuk promosi produk/jasa tertentu.', icon: <Layout className="w-5 h-5" /> },
            { id: 'company', label: 'Company Profile', desc: 'Mengenalkan identitas, visi misi, dan layanan perusahaan.', icon: <Globe className="w-5 h-5" /> },
            { id: 'ecommerce', label: 'Toko Online / E-commerce', desc: 'Website untuk berjualan produk dengan fitur keranjang.', icon: <ShoppingCart className="w-5 h-5" /> },
            { id: 'portofolio', label: 'Portofolio Pribadi', desc: 'Memamerkan hasil karya, prestasi, dan CV digital.', icon: <Palette className="w-5 h-5" /> },
            { id: 'blog', label: 'Blog / Media Berita', desc: 'Fokus pada konten artikel, berita, dan publikasi rutin.', icon: <Monitor className="w-5 h-5" /> },
            { id: 'custom', label: 'Custom Web App', desc: 'Sistem aplikasi berbasis web dengan logika bisnis khusus.', icon: <Code2 className="w-5 h-5" /> },
            { id: 'community', label: 'Organisasi / Komunitas', desc: 'Wadah informasi untuk yayasan, sekolah, atau klub.', icon: <Users className="w-5 h-5" /> },
            { id: 'event', label: 'Event / Undangan', desc: 'Halaman khusus acara seperti seminar atau pernikahan.', icon: <Sparkles className="w-5 h-5" /> }
          ].map(type => (
            <label key={type.id} className={`group flex flex-col p-5 border rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl active:scale-[0.98] ${formData.websiteType === type.label ? 'border-black bg-black text-white' : 'border-gray-200 bg-white hover:border-gray-400'}`}>
              <input 
                type="radio" 
                name="websiteType" 
                value={type.label}
                checked={formData.websiteType === type.label}
                onChange={(e) => setFormData({...formData, websiteType: e.target.value})}
                className="hidden"
              />
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl transition-colors duration-300 ${formData.websiteType === type.label ? 'bg-white/20 text-white' : 'bg-gray-50 text-gray-400 group-hover:text-black group-hover:bg-gray-100'}`}>
                  {type.icon}
                </div>
                {formData.websiteType === type.label && <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" />}
              </div>
              <span className="font-semibold text-sm mb-2 block">{type.label}</span>
              <p className={`text-[11px] leading-relaxed transition-colors ${formData.websiteType === type.label ? 'text-gray-300' : 'text-gray-500'}`}>{type.desc}</p>
            </label>
          ))}
        </div>

        {formData.websiteType === 'Custom Web App' && (
          <div className="mt-8 animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Jelaskan Ide / Kebutuhan Sistem Anda:
            </label>
            <textarea 
              placeholder="Misal: Sistem manajemen stok, dashboard membership, aplikasi booking, dll..."
              value={formData.otherWebsiteType}
              onChange={(e) => setFormData({...formData, otherWebsiteType: e.target.value})}
              className="w-full border border-gray-200 p-4 focus:outline-none focus:border-black transition-all rounded-xl text-sm min-h-[120px] resize-none bg-gray-50 focus:bg-white"
            />
          </div>
        )}
      </section>

      {/* 2. Platform & Teknologi Dasar */}
      <section>
        <div className="mb-10">
          <h2 className="text-xl font-medium tracking-tight mb-4 flex items-center">
            2. Platform & Teknologi Dasar (Tech Stack)
            <InfoTooltip text="Teknologi yang digunakan mempengaruhi kecepatan, keamanan, dan kemudahan Anda mengelola website di masa depan." />
          </h2>
          <p className="text-sm text-gray-500">Pilih fondasi teknologi yang ingin Anda gunakan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              id: 'murah', 
              label: 'Paket Murah Meriah (Situs Statis)', 
              desc: 'Mulai Rp 500rb. Cocok untuk landing page sederhana tanpa banyak fitur rumit.', 
              benefits: ['Hemat Biaya', 'Loading Kilat', 'Gratis Hosting'],
              icon: <Wallet className="w-5 h-5" /> 
            },
            { 
              id: 'nocode', 
              label: 'No-Code / Page Builder', 
              desc: 'Mulai Rp 1.5jt. Mudah diedit sendiri oleh orang awam (Framer, Elementor, Webflow).', 
              benefits: ['Mudah Edit', 'Cepat Jadi', 'Visual Cantik'],
              icon: <Zap className="w-5 h-5" /> 
            },
            { 
              id: 'modern', 
              label: 'Modern Custom (React/NextJS)', 
              desc: 'Mulai Rp 5jt. Sangat cepat (High Performance). Standar startup modern. Sangat aman.', 
              benefits: ['Performa Tinggi', 'Skalabilitas', 'Sangat Aman'],
              icon: <Code2 className="w-5 h-5" /> 
            },
            { 
              id: 'cms', 
              label: 'CMS (WordPress/PHP)', 
              desc: 'Mulai Rp 2.5jt. Sangat populer. Ribuan plugin tersedia. Cocok untuk jangka panjang dan SEO.', 
              benefits: ['SEO Friendly', 'Kaya Fitur', 'Populer'],
              icon: <Layout className="w-5 h-5" /> 
            }
          ].map(stack => (
            <label key={stack.id} className={`group flex flex-col p-6 border rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl ${formData.techStack === stack.label ? 'border-black bg-black text-white' : 'border-gray-200 bg-white hover:border-gray-400'}`}>
              <input 
                type="radio" 
                name="techStack" 
                value={stack.label}
                checked={formData.techStack === stack.label}
                onChange={(e) => setFormData({...formData, techStack: e.target.value})}
                className="hidden"
              />
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl w-fit transition-colors ${formData.techStack === stack.label ? 'bg-white/20 text-white' : 'bg-gray-50 text-gray-400 group-hover:text-black group-hover:bg-gray-100'}`}>
                  {stack.icon}
                </div>
                <InfoTooltip 
                  text={
                    stack.id === 'murah' ? "Website statis (HTML/CSS) yang sangat ringan. Tidak bisa update konten sendiri dengan mudah, tapi sangat murah dan cepat." :
                    stack.id === 'nocode' ? "Platform drag-and-drop. Sangat cepat dideploy. Anda bisa mengedit teks/gambar sendiri tanpa coding." :
                    stack.id === 'modern' ? "Teknologi tercanggih saat ini. Sangat cepat, aman, dan bisa menangani ribuan pengunjung sekaligus." :
                    "CMS terpopuler di dunia. Sangat fleksibel dengan ribuan tema dan plugin untuk segala kebutuhan."
                  } 
                />
              </div>
              <span className="font-semibold text-sm mb-2 block">{stack.label}</span>
              <p className={`text-[11px] leading-relaxed transition-colors mb-4 ${formData.techStack === stack.label ? 'text-gray-300' : 'text-gray-500'}`}>{stack.desc}</p>
              
              <div className="mt-auto pt-4 border-t border-gray-100/20 flex flex-wrap gap-2">
                {stack.benefits.map((benefit: string) => (
                  <span key={benefit} className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${formData.techStack === stack.label ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {benefit}
                  </span>
                ))}
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* 3. Estetika & Kesan Visual */}
      <section>
        <div className="mb-10">
          <h2 className="text-xl font-medium tracking-tight mb-4 flex items-center">
            3. Estetika & Kesan Visual
            <InfoTooltip text="Visual yang tepat membantu membangun emosi pengunjung saat pertama kali melihat website Anda." />
          </h2>
          <p className="text-sm text-gray-500">Pilih gaya visual yang paling mewakili brand Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { id: 'minimalist', label: 'Minimalis & Bersih', desc: 'Banyak ruang kosong, fokus pada teks dan kerapihan (Apple Style).', icon: <Layout className="w-5 h-5" /> },
            { id: 'professional', label: 'Profesional & Korporat', desc: 'Kesan serius, terpercaya, dan kaku (Standar Perbankan/BUMN).', icon: <Lock className="w-5 h-5" /> },
            { id: 'vibrant', label: 'Ceria & Berwarna', desc: 'Penuh warna, animasi, dan ilustrasi (Standar Startup/Gen-Z).', icon: <Sparkles className="w-5 h-5" /> },
            { id: 'luxury', label: 'Mewah & Eksklusif', desc: 'Gelap/Emas, elegan, dan premium (Standar Jam Tangan/Properti).', icon: <Zap className="w-5 h-5" /> },
            { id: 'tech', label: 'Futuristik / Techy', desc: 'Kesan teknologi tinggi dengan garis tegas dan neon (SaaS/IT).', icon: <Smartphone className="w-5 h-5" /> }
          ].map(style => (
            <label key={style.id} className={`group flex flex-col p-5 border rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl ${formData.designStyle === style.label ? 'border-black bg-black text-white' : 'border-gray-200 bg-white hover:border-gray-400'}`}>
              <input 
                type="radio" 
                name="designStyle" 
                value={style.label}
                checked={formData.designStyle === style.label}
                onChange={(e) => setFormData({...formData, designStyle: e.target.value})}
                className="hidden"
              />
              <div className={`p-3 rounded-xl w-fit mb-4 transition-colors ${formData.designStyle === style.label ? 'bg-white/20 text-white' : 'bg-gray-50 text-gray-400 group-hover:text-black group-hover:bg-gray-100'}`}>
                {style.icon}
              </div>
              <span className="font-semibold text-sm mb-2 block">{style.label}</span>
              <p className={`text-[11px] leading-relaxed transition-colors ${formData.designStyle === style.label ? 'text-gray-300' : 'text-gray-500'}`}>{style.desc}</p>
            </label>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <h4 className="text-sm font-semibold mb-4 text-black flex items-center gap-2">
            Punya Warna Khusus? 
            <span className="text-[10px] font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full uppercase tracking-wider">Opsional</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-xs text-gray-500">Pilih warna yang dominan pada brand/logo Anda:</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Biru', class: 'bg-blue-600' },
                  { name: 'Merah', class: 'bg-red-600' },
                  { name: 'Hijau', class: 'bg-green-600' },
                  { name: 'Kuning', class: 'bg-yellow-400' },
                  { name: 'Hitam', class: 'bg-black' },
                  { name: 'Putih', class: 'bg-white border' },
                  { name: 'Lainnya', class: 'bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500' }
                ].map(color => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setFormData({...formData, primaryColor: color.name})}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${formData.primaryColor === color.name ? 'ring-2 ring-black ring-offset-2' : 'hover:bg-white'}`}
                  >
                    <div className={`w-4 h-4 rounded-full ${color.class}`}></div>
                    {color.name}
                  </button>
                ))}
              </div>
            </div>
            
            {formData.primaryColor === 'Lainnya' && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-xs text-gray-500">Tuliskan kode warna atau deskripsi warna impian Anda:</p>
                <input 
                  type="text" 
                  placeholder="Contoh: Biru muda dipadukan dengan putih bersih..."
                  value={formData.customColor}
                  onChange={(e) => setFormData({...formData, customColor: e.target.value})}
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors rounded-none text-sm"
                  required
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Step1;
