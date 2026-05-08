import React from 'react';
import { 
  Image, FileText, CheckCircle2, Layout, Smartphone, Link as LinkIcon
} from 'lucide-react';
import { InfoTooltip } from './Shared';

interface Step2Props {
  formData: any;
  setFormData: (data: any) => void;
  handleModuleToggle: (field: string, value: string) => void;
}

const Step2: React.FC<Step2Props> = ({ formData, setFormData, handleModuleToggle }) => {
  return (
    <div className="space-y-20">
      {/* 4. Aset Desain & Konten */}
      <section>
        <div className="mb-10">
          <h2 className="text-xl font-medium tracking-tight mb-4 flex items-center">
            4. Aset Desain & Konten (Logo, Gambar, Teks)
            <InfoTooltip text="Siapkan materi pendukung seperti file gambar resolusi tinggi dan teks tulisan. Kami bisa bantu menyediakan gambar/teks contoh, atau sekalian mendesain logo khusus." />
          </h2>
          <p className="text-sm text-gray-500">Beritahu kami aset apa saja yang sudah Anda miliki atau butuhkan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Logo Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-black uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              Identitas Logo
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'sudah', label: 'Sudah Ada Logo', desc: 'Saya sudah punya file logo (vektor/PNG transparan).', icon: <CheckCircle2 className="w-5 h-5" /> },
                { id: 'belum', label: 'Belum Ada Logo', desc: 'Buatkan logo sederhana atau gunakan teks nama brand saja.', icon: <Layout className="w-5 h-5" /> },
                { id: 'custom', label: 'Jasa Desain Logo', desc: 'Saya butuh jasa desain logo profesional secara terpisah.', icon: <Smartphone className="w-5 h-5" /> }
              ].map(status => (
                <button
                  key={status.id}
                  type="button"
                  onClick={() => handleModuleToggle('logoStatus', status.id)}
                  className={`flex items-start gap-4 p-4 border rounded-2xl transition-all text-left ${formData.logoStatus === status.id ? 'border-black bg-black text-white shadow-lg scale-[1.02]' : 'border-gray-100 bg-gray-50/50 hover:border-gray-300'}`}
                >
                  <div className={`mt-0.5 ${formData.logoStatus === status.id ? 'text-white' : 'text-gray-400'}`}>
                    {status.icon}
                  </div>
                  <div>
                    <span className="font-semibold text-sm block">{status.label}</span>
                    <p className={`text-[10px] mt-1 ${formData.logoStatus === status.id ? 'text-gray-300' : 'text-gray-500'}`}>{status.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {(formData.logoStatus === 'belum' || formData.logoStatus === 'custom') && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Detail Logo yang Diinginkan:
                </label>
                <textarea 
                  placeholder="Misal: Warna dominan biru, ikon bergambar burung elang, gaya minimalis elegan..."
                  value={formData.logoNotes}
                  onChange={(e) => setFormData({...formData, logoNotes: e.target.value})}
                  className="w-full border border-gray-200 p-4 focus:outline-none focus:border-black transition-all rounded-xl text-sm min-h-[120px] resize-none bg-gray-50 focus:bg-white"
                />
              </div>
            )}
            
            {formData.logoStatus === 'sudah' && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <LinkIcon className="w-3 h-3" />
                  Link Logo (Google Drive/Dropbox/Lainnya):
                </label>
                <input 
                  type="text" 
                  placeholder="https://drive.google.com/..."
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
                  className="w-full border border-gray-200 p-3 focus:outline-none focus:border-black transition-all rounded-xl text-sm bg-gray-50 focus:bg-white shadow-sm"
                />
                <p className="text-[10px] text-gray-400 mt-2 italic">Pastikan akses link sudah diset ke "Siapa saja yang memiliki link".</p>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-black uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              Materi Tulisan & Gambar
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'siap', label: 'Materi Sudah Siap', desc: 'Teks deskripsi dan foto-foto produk sudah tersedia.', icon: <FileText className="w-5 h-5" /> },
                { id: 'dibantu', label: 'Bantu Buatkan Konten', desc: 'Saya butuh bantuan penulisan teks (Copywriting) & gambar.', icon: <Image className="w-5 h-5" /> },
                { id: 'draft', label: 'Masih Draft/Konsep', desc: 'Data masih berantakan, perlu dirapikan bersama.', icon: <Layout className="w-5 h-5" /> }
              ].map(status => (
                <button
                  key={status.id}
                  type="button"
                  onClick={() => handleModuleToggle('contentStatus', status.id)}
                  className={`flex items-start gap-4 p-4 border rounded-2xl transition-all text-left ${formData.contentStatus === status.id ? 'border-black bg-black text-white shadow-lg scale-[1.02]' : 'border-gray-100 bg-gray-50/50 hover:border-gray-300'}`}
                >
                  <div className={`mt-0.5 ${formData.contentStatus === status.id ? 'text-white' : 'text-gray-400'}`}>
                    {status.icon}
                  </div>
                  <div>
                    <span className="font-semibold text-sm block">{status.label}</span>
                    <p className={`text-[10px] mt-1 ${formData.contentStatus === status.id ? 'text-gray-300' : 'text-gray-500'}`}>{status.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {(formData.contentStatus === 'dibantu' || formData.contentStatus === 'draft') && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Catatan Materi & Konten:
                </label>
                <textarea 
                  placeholder="Ceritakan tentang profil usaha Anda, layanan apa saja yang ditonjolkan, dll..."
                  value={formData.contentNotes}
                  onChange={(e) => setFormData({...formData, contentNotes: e.target.value})}
                  className="w-full border border-gray-200 p-4 focus:outline-none focus:border-black transition-all rounded-xl text-sm min-h-[120px] resize-none bg-gray-50 focus:bg-white"
                />
              </div>
            )}

            {formData.contentStatus === 'siap' && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <LinkIcon className="w-3 h-3" />
                  Link Materi (Google Drive/Dropbox/Lainnya):
                </label>
                <input 
                  type="text" 
                  placeholder="https://drive.google.com/..."
                  value={formData.contentUrl}
                  onChange={(e) => setFormData({...formData, contentUrl: e.target.value})}
                  className="w-full border border-gray-200 p-3 focus:outline-none focus:border-black transition-all rounded-xl text-sm bg-gray-50 focus:bg-white shadow-sm"
                />
                <p className="text-[10px] text-gray-400 mt-2 italic">Lampirkan link folder berisi teks (Word) dan gambar/foto produk.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Tipografi */}
      <section>
        <div className="mb-10">
          <h2 className="text-xl font-medium tracking-tight mb-4 flex items-center">
            5. Tipografi (Jenis Huruf)
            <InfoTooltip text="Font memberikan karakter pada website. Serif terlihat klasik/elegan, Sans Serif terlihat modern/minimalis." />
          </h2>
          <p className="text-sm text-gray-500">Pilih karakter tulisan yang Anda sukai.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'modern', label: 'Modern Sans', desc: 'Bersih, futuristik, and mudah dibaca (Inter/Roboto).', sample: 'The quick brown fox' },
            { id: 'elegant', label: 'Elegant Serif', desc: 'Klasik, mewah, and berwibawa (Playfair Display).', sample: 'The quick brown fox' },
            { id: 'playful', label: 'Friendly Round', desc: 'Ramah, santai, and ceria (Quicksand/Outfit).', sample: 'The quick brown fox' },
            { id: 'minimal', label: 'Geometric', desc: 'Simetris, rapi, and sistematis (Montserrat/Poppins).', sample: 'The quick brown fox' },
            { id: 'display', label: 'Unique Display', desc: 'Artistik, berani, and menonjol untuk judul.', sample: 'The quick brown fox' }
          ].map(font => (
            <label key={font.id} className={`group p-5 border rounded-2xl cursor-pointer transition-all ${formData.preferredFont === font.id ? 'border-black bg-[#fafafa]' : 'border-gray-200 hover:border-gray-400'}`}>
              <input 
                type="radio" 
                name="preferredFont" 
                value={font.id}
                checked={formData.preferredFont === font.id}
                onChange={(e) => setFormData({...formData, preferredFont: e.target.value})}
                className="hidden"
              />
              <div className="space-y-3">
                <div className={`text-2xl mb-1 ${
                  font.id === 'modern' ? 'font-sans' : 
                  font.id === 'elegant' ? 'font-serif' : 
                  'font-medium'
                }`}>
                  {font.sample}
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full transition-colors ${formData.preferredFont === font.id ? 'bg-black' : 'bg-gray-300 group-hover:bg-gray-400'}`}></div>
                  <span className={`font-medium transition-colors ${formData.preferredFont === font.id ? 'text-black' : 'text-gray-700'}`}>{font.label}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{font.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Step2;
