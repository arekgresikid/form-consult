import React from 'react';
import { 
  Globe, ShieldCheck, HelpCircle
} from 'lucide-react';
import { InfoTooltip } from './Shared';

interface Step4Props {
  formData: any;
  setFormData: (data: any) => void;
  errors: Record<string, string>;
  handleModuleToggle: (field: string, value: string) => void;
}

const Step4: React.FC<Step4Props> = ({ formData, setFormData, errors, handleModuleToggle }) => {
  return (
    <div className="space-y-20">
      {/* 7. Alamat Website (Domain) */}
      <section>
        <div className="mb-10">
          <h2 className="text-xl font-medium tracking-tight mb-4 flex items-center">
            7. Alamat Website (Domain)
            <InfoTooltip text="Domain adalah alamat unik Anda (misal: www.usahaanda.com). Kami bisa bantu mendaftarkan nama yang Anda inginkan." />
          </h2>
          <p className="text-sm text-gray-500">Tentukan alamat website yang Anda inginkan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
           {[
            { id: 'Belum Punya (Bantu Belikan)', label: 'Belum Punya', desc: 'Saya butuh bantuan untuk mencarikan dan membeli domain.', icon: <HelpCircle className="w-5 h-5" /> },
            { id: 'Sudah Punya', label: 'Sudah Punya', desc: 'Saya sudah memiliki domain sendiri, tinggal hubungkan saja.', icon: <Globe className="w-5 h-5" /> },
            { id: 'Numpang (Subdomain Gratis)', label: 'Subdomain Gratis', desc: 'Gunakan nama gratisan (misal: usahaanda.framer.ai atau .vercel.app).', icon: <ShieldCheck className="w-5 h-5" /> }
          ].map(status => (
            <label key={status.id} className={`flex flex-col p-5 border rounded-2xl cursor-pointer transition-all ${formData.domainStatus === status.id ? 'border-black bg-[#fafafa]' : 'border-gray-100 hover:border-gray-400'}`}>
              <div className="flex items-center gap-3 mb-3">
                 <input 
                  type="radio" 
                  name="domainStatus" 
                  value={status.id}
                  checked={formData.domainStatus === status.id}
                  onChange={() => handleModuleToggle('domainStatus', status.id)}
                  className="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black shrink-0"
                />
                <div className="flex items-center gap-2">
                   <div className={`${formData.domainStatus === status.id ? 'text-black' : 'text-gray-400'}`}>
                    {status.icon}
                  </div>
                  <span className="font-semibold text-sm">{status.label}</span>
                </div>
              </div>
              <p className={`text-[10px] pl-7 ${formData.domainStatus === status.id ? 'text-gray-700' : 'text-gray-500'}`}>{status.desc}</p>
            </label>
          ))}
        </div>

        {formData.domainStatus === 'Belum Punya (Bantu Belikan)' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-400">
             <div className="flex items-center gap-2 border-b border-gray-300 py-3 focus-within:border-black transition-colors group">
                <span className="text-gray-400 font-medium">www.</span>
                <input 
                  type="text" 
                  placeholder="namausahasaya"
                  value={formData.domainName}
                  onChange={(e) => setFormData({...formData, domainName: e.target.value})}
                  className="flex-1 focus:outline-none rounded-none text-sm font-medium"
                />
                <select 
                  value={formData.domainExt}
                  onChange={(e) => setFormData({...formData, domainExt: e.target.value})}
                  className="bg-transparent text-sm font-bold focus:outline-none cursor-pointer"
                >
                  <option value=".com">.com</option>
                  <option value=".id">.id</option>
                  <option value=".co.id">.co.id</option>
                  <option value=".net">.net</option>
                  <option value=".org">.org</option>
                  <option value=".my.id">.my.id</option>
                  <option value=".biz.id">.biz.id</option>
                  <option value=".store">.store</option>
                </select>
             </div>
             {errors.domainName && <p className="text-red-500 text-xs mt-1">{errors.domainName}</p>}
             <div className="text-xs text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed mt-4">
               <b className="text-sm block mb-3 text-black">Panduan Memilih Ekstensi & Perkiraan Harga:</b>
               <div className="space-y-4">
                 <div>
                   <p className="mb-0.5">• <b className="text-gray-800">.com / .net / .org</b> <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded ml-1">± Rp 160.000 / thn (belum pajak)</span></p>
                   <p className="pl-3">Paling umum dan familiar bagi masyarakat di seluruh dunia. Selalu jadikan pilihan utama jika namanya masih tersedia. Cocok untuk go-internasional.</p>
                 </div>
                 <div>
                   <p className="mb-0.5">• <b className="text-gray-800">.id</b> <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded ml-1">± Rp 250.000 / thn (belum pajak)</span></p>
                   <p className="pl-3">Identitas kuat buatan Indonesia. Terlihat eksklusif, singkat, dan pilihan nama yang tersedia biasanya masih sangat banyak dibanding <i>.com</i>.</p>
                 </div>
                 <div>
                   <p className="mb-0.5">• <b className="text-gray-800">.co.id</b> <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded ml-1">± Rp 300.000 / thn (belum pajak)</span></p>
                   <p className="pl-3">Sangat direkomendasikan untuk PT atau CV karena wajib menggunakan syarat legalitas perusahaan (SIUP/NIB) dan KTP. Meningkatkan kepercayaan konsumen dengan drastis karena bukan website penipu.</p>
                 </div>
                 <div>
                   <p className="mb-0.5">• <b className="text-gray-800">.my.id / .biz.id</b> <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded ml-1">Tahun ke-1 Rp 3.000, perpanjangan ± Rp 22.000 / thn (belum pajak)</span></p>
                   <p className="pl-3">Pilihan hemat. Sangat murah meriah, cocok untuk web personal, portofolio, dan usaha kecil yang ingin segera online.</p>
                 </div>
                 <div>
                   <p className="mb-0.5">• <b className="text-gray-800">.store / .shop</b> <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded ml-1">Tahun ke-1 ± Rp 50.000, perpanjangan ± Rp 800.000 / thn (belum pajak)</span></p>
                   <p className="pl-3">Ekstensi modern untuk menekankan bahwa website Anda adalah sebuah toko online, walau memang agak kurang lazim bagi masyarakat umum biasa.</p>
                 </div>
               </div>
             </div>
          </div>
        )}
        {formData.domainStatus === 'Sudah Punya' && (
          <div className="space-y-4">
             <input 
                type="text" 
                placeholder="Masukkan alamat website Anda (contoh: www.usahasaya.com)"
                value={formData.domainName}
                onChange={(e) => setFormData({...formData, domainName: e.target.value})}
                className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors rounded-none text-sm"
              />
          </div>
        )}
      </section>
    </div>
  );
};

export default Step4;
