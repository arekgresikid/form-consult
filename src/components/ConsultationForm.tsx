import React, { useState } from 'react';
import { CheckSquare, Square, Info, Newspaper } from 'lucide-react';
import StatusModal from './StatusModal';

const InfoTooltip = ({ text }: { text: React.ReactNode }) => (
  <div className="group relative inline-flex items-center ml-2 align-middle">
    <Info className="w-4 h-4 text-gray-400 hover:text-black transition-colors cursor-help" />
    <div className="pointer-events-none absolute bottom-full z-50 mb-2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1 w-64 max-w-[calc(100vw-3rem)] p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl font-normal tracking-wide leading-relaxed invisible group-hover:visible -left-20 sm:left-1/2 sm:-translate-x-1/2">
      {text}
      <div className="absolute top-full left-24 sm:left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
    </div>
  </div>
);

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    websiteType: '',
    otherWebsiteType: '',
    mainColor: '',
    customColor: '',
    logoStatus: '',
    logoNotes: '',
    contentStatus: '',
    contentNotes: '',
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
    techStack: '',
    clientName: '',
    clientEmail: '',
    clientPhone: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'loading';
    title: string;
    message: React.ReactNode;
  }>({
    isOpen: false,
    type: 'loading',
    title: '',
    message: ''
  });

  const showModal = (type: 'success' | 'error' | 'loading', title: string, message: React.ReactNode) => {
    setModalConfig({ isOpen: true, type, title, message });
  };

  React.useEffect(() => {
    (window as any).onTurnstileSuccess = (token: string) => {
      setTurnstileToken(token);
    };
    return () => {
      delete (window as any).onTurnstileSuccess;
    };
  }, []);

  const handleArrayToggle = (field: keyof typeof formData, value: string) => {
    setFormData(prev => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]
      };
    });
  };

  const handleElementToggle = (element: string) => handleArrayToggle('elements', element);
  const handleFeatureToggle = (feature: string) => handleArrayToggle('features', feature);
  const handleEcommerceToggle = (feature: string) => handleArrayToggle('ecommerceFeatures', feature);
  const handleSecurityToggle = (feature: string) => handleArrayToggle('securityFeatures', feature);
  const handleMarketingToggle = (option: string) => handleArrayToggle('marketingOptions', option);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const newErrors: Record<string, string> = {};
    if (!formData.websiteType) newErrors.websiteType = 'Silakan pilih jenis website yang ingin dibangun.';
    if (formData.websiteType === 'lainnya' && !formData.otherWebsiteType) newErrors.otherWebsiteType = 'Silakan jelaskan jenis website Anda.';
    
    if (formData.websiteType !== 'paket_murah' && !formData.techStack) newErrors.techStack = 'Silakan pilih platform atau teknologi yang diinginkan.';

    if (formData.domainStatus === 'Belum Punya (Bantu Belikan)' && !formData.domainName) {
      newErrors.domainName = 'Nama domain tidak boleh kosong.';
    } else if (formData.domainStatus === 'Belum Punya (Bantu Belikan)' && !/^[a-z0-9-]+$/.test(formData.domainName)) {
      newErrors.domainName = 'Nama domain hanya boleh berisi huruf kecil, angka, dan tanda hubung (-).';
    }

    if (!formData.clientName) newErrors.clientName = 'Nama lengkap wajib diisi.';
    if (!formData.clientEmail) {
      newErrors.clientEmail = 'Email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Format email tidak valid.';
    }
    if (!formData.clientPhone) newErrors.clientPhone = 'Nomor WhatsApp wajib diisi.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const errorList = Object.values(newErrors).map((err, i) => (
        <div key={i} className="flex items-start gap-2 text-left">
          <span>•</span> <span>{err}</span>
        </div>
      ));
      showModal('error', 'Formulir Belum Lengkap', <div className="space-y-1 mt-2">{errorList}</div>);
      return;
    }

    if (!turnstileToken && import.meta.env.PROD) {
      showModal('error', 'Keamanan Diperlukan', 'Silakan selesaikan verifikasi keamanan (Turnstile) sebelum mengirim.');
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    showModal('loading', 'Sedang Mengirim...', 'Mohon tunggu sebentar, formulir Anda sedang kami proses.');
    
    try {
      const response = await fetch('/api/submit-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken })
      });
            const result = await response.json();
      if (result.success) {
        showModal('success', 'Berhasil Terkirim!', 'Terima kasih! Formulir konsultasi Anda telah berhasil kami terima. Kami akan segera menghubungi Anda.');
      } else {
        showModal('error', 'Gagal Mengirim', result.message || 'Terjadi kesalahan sistem saat mencoba mengirim data.');
      }
    } catch (error) {
      console.error(error);
      showModal('error', 'Kesalahan Koneksi', 'Gagal terhubung ke server. Pastikan koneksi internet Anda stabil.');
    } finally {
      setIsSubmitting(false);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-16">
      
      {/* 1. Website apa yang ingin dibangun? */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            1. Website apa yang ingin dibangun?
            <InfoTooltip text="Pilih jenis website sesuai dengan rencana utama usaha Anda. Jika bingung, pilih yang paling mendekati." />
          </h2>
          <p className="text-sm text-gray-500">Pilih jenis website yang paling mewakili kebutuhan Anda.</p>
          {errors.websiteType && <p className="text-red-500 text-xs mt-2">{errors.websiteType}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'paket_murah', label: 'Paket Murah Meriah Sehari Jadi', desc: 'Website statis (HTML, CSS, JS). Siapkan logo, teks, dan gambar Anda, kami rakit dengan desain standar. Hanya Rp 300.000 sudah termasuk Domain .my.id / .biz.id!', isPromo: true },
            { id: 'profil', label: 'Profil Perusahaan', desc: 'Misal: Profil untuk salon, pabrik, atau agensi.' },
            { id: 'toko', label: 'Toko Online', desc: 'Misal: Toko online seperti Shopee tapi sederhana.' },
            { id: 'blog', label: 'Blog / Portofolio', desc: 'Misal: Kumpulan tulisan atau galeri karya pribadi.' },
            { id: 'landing', label: 'Landing Page Promo', desc: 'Misal: Halaman tunggal untuk jualan satu produk.' },
            { id: 'organisasi', label: 'Organisasi / Komunitas', desc: 'Misal: Website yayasan atau komunitas hobi.' },
            { id: 'lainnya', label: 'Lainnya', desc: 'Isi sendiri kebutuhan spesifik Anda.' }
          ].map(item => (
            <React.Fragment key={item.id}>
            <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${formData.websiteType === item.id ? (item.isPromo ? 'border-red-500 bg-red-50' : 'border-black bg-[#fafafa]') : (item.isPromo ? 'border-red-200 bg-red-50/50 hover:border-red-400' : 'border-gray-200 hover:border-gray-400')} ${item.isPromo ? 'md:col-span-2' : ''}`}>
              <input 
                type="radio" 
                name="websiteType" 
                value={item.id}
                checked={formData.websiteType === item.id}
                onChange={(e) => setFormData({...formData, websiteType: e.target.value})}
                className={`mt-1 w-4 h-4 focus:ring-black shrink-0 ${item.isPromo ? 'text-red-600 border-red-300 accent-red-600' : 'text-black border-gray-300 accent-black'}`}
              />
              <div className="w-full">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-medium ${item.isPromo ? 'text-red-700' : 'text-black'}`}>{item.label}</span>
                  {item.isPromo && <span className="px-2 py-0.5 text-[10px] font-bold bg-red-600 text-white rounded-full uppercase tracking-wider">Promo</span>}
                </div>
                <p className={`text-xs ${item.isPromo ? 'text-red-600/80 font-medium' : 'text-gray-500'}`}>{item.desc}</p>
              </div>
            </label>
            {item.id === 'paket_murah' && formData.websiteType === 'paket_murah' && (
              <div className="md:col-span-2 p-5 bg-red-50 border border-red-200 rounded-xl space-y-3 relative overflow-hidden -mt-2 mb-2">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-red-100 rounded-bl-full z-0 opacity-80"></div>
                 <h4 className="text-red-800 font-semibold text-sm flex items-center gap-2 relative z-10">
                   <div className="w-2 h-2 bg-red-600 rounded-full"></div> 
                   Detail Paket Murah Meriah (Rp 300.000)
                 </h4>
                 <ul className="text-red-800 space-y-2 text-xs leading-relaxed relative z-10">
                   <li>• <b>Hosting:</b> GitHub Pages, Cloudflare Pages, Vercel, & Netlify (Sangat Cepat & Tanpa Biaya Server Bulanan).</li>
                   <li>• <b>Waktu Pengerjaan:</b> Super cepat! Minimal 5 jam selesai. Maksimal 2x24 jam sejak pembayaran.</li>
                   <li>• <b>Fasilitas Halaman:</b> Sudah termasuk 3 Halaman dasar (contoh: Beranda, Tentang Kami, Kebijakan Privasi/Ketentuan Layanan).</li>
                   <li>• <b>Garansi Kepuasan:</b> Termasuk revisi hingga 3 kali.</li>
                   <li>• <b>Terima Beres:</b> Diserahkan beserta akun utuh (100% milik Anda) dan disediakan panduan/tutorial singkat yang sangat mudah dipahami.</li>
                 </ul>
              </div>
            )}
            </React.Fragment>
          ))}
        </div>
        {formData.websiteType === 'lainnya' && (
          <div className="mt-4">
            <input 
              type="text" 
              placeholder="Jelaskan website yang Anda inginkan..."
              value={formData.otherWebsiteType}
              onChange={(e) => setFormData({...formData, otherWebsiteType: e.target.value})}
              className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors rounded-none text-sm"
              required
            />
            {errors.otherWebsiteType && <p className="text-red-500 text-xs mt-1">{errors.otherWebsiteType}</p>}
          </div>
        )}
      </section>

      {/* 2. Platform & Teknologi Dasar */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            2. Platform & Teknologi Dasar (Tech Stack)
            <InfoTooltip text="Kami mendukung berbagai teknologi. Anda bebas memilih yang paling Anda kuasai agar mudah dikelola ke depannya." />
          </h2>
          <p className="text-sm text-gray-500">Pilih teknologi atau CMS yang Anda inginkan (sangat ramah pengguna & kami bisa bantu setup).</p>
          {errors.techStack && <p className="text-red-500 text-xs mt-2">{errors.techStack}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'cms', label: 'Sistem CMS (CMS Populer)', desc: 'WordPress, Joomla, Magento. Sangat mudah digunakan untuk pemula / orang awam. Tidak perlu coding.' },
            { id: 'modern_js', label: 'Modern JavaScript (React / Next.js / Vite)', desc: 'React JS, Next JS, Vite. Sangat cepat, modern, dan paling fleksibel jika butuh custom logika.' },
            { id: 'mobile', label: 'Aplikasi Mobile (React Native)', desc: 'Untuk versi Aplikasi Android & iOS. Cocok bagi startup dengan target pengguna smartphone.' },
            { id: 'auto', label: 'Bebas / Pilih Otomatis (Rekomendasi)', desc: 'Biarkan kami yang memilihkan teknologi paling optimal dan ramah pengguna berdasarkan kebutuhan formulir ini.' }
          ].map(item => (
            <label key={item.id} className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${formData.techStack === item.id ? 'border-black bg-[#fafafa]' : 'border-gray-200 hover:border-gray-400'}`}>
              <input 
                type="radio" 
                name="techStack" 
                value={item.id}
                checked={formData.techStack === item.id}
                onChange={(e) => setFormData({...formData, techStack: e.target.value})}
                className="mt-1 w-4 h-4 text-black border-gray-300 focus:ring-black accent-black shrink-0"
              />
              <div className="w-full">
                <span className="font-medium text-black">{item.label}</span>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* 3. Warna utama */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            3. Warna utama yang diinginkan?
            <InfoTooltip text="Warna utama biasanya akan mendominasi tombol, garis, dan elemen penting. Pilih sesuai karakter brand Anda." />
          </h2>
          <p className="text-sm text-gray-500">Warna akan mempengaruhi kesan pertama pengunjung terhadap merek Anda.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { id: 'biru', label: 'Biru', desc: 'Kesannya profesional, teknologi, terpercaya.' },
            { id: 'hijau', label: 'Hijau', desc: 'Kesannya alami, segar, pertumbuhan.' },
            { id: 'merah', label: 'Merah', desc: 'Kesannya berani, enerjik, makanan.' },
            { id: 'kuning', label: 'Kuning', desc: 'Kesannya ceria, hangat, ramah.' },
            { id: 'bebas', label: 'Bebas / Warna Brand Sendiri', desc: 'Masukkan warna kustom Anda.' }
          ].map(item => (
            <label key={item.id} className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.mainColor === item.id ? 'border-black bg-[#fafafa]' : 'border-gray-200 hover:border-gray-400'}`}>
               <input 
                type="radio" 
                name="mainColor" 
                value={item.id}
                checked={formData.mainColor === item.id}
                onChange={(e) => setFormData({...formData, mainColor: e.target.value})}
                className="mt-1 w-4 h-4 text-black border-gray-300 focus:ring-black accent-black"
              />
              <div>
                <span className="font-medium text-black">{item.label}</span>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            </label>
          ))}
        </div>
        {formData.mainColor === 'bebas' && (
          <div className="mt-4">
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
      </section>

      {/* 4. Aset Desain & Konten */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            4. Aset Desain & Konten (Logo, Gambar, Teks)
            <InfoTooltip text="Siapkan materi pendukung seperti file gambar resolusi tinggi dan teks tulisan. Kami bisa bantu menyediakan gambar/teks contoh, atau sekalian mendesain logo khusus." />
          </h2>
          <p className="text-sm text-gray-500">Ketersediaan bahan-bahan merek yang akan dimasukkan ke dalam website.</p>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-3">Status Logo Usaha (Termasuk Ikon Web/Favicon)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'sudah_ada', label: 'Sudah Punya Logo', desc: 'Siap dilampirkan (JPG/PNG/Vector).' },
                { id: 'bantu_buatkan', label: 'Bantu Buatkan (+Biaya)', desc: 'Dibuatkan desain logo profesional (Ada biaya tambahan tersendiri).' },
                { id: 'teks_saja', label: 'Pakai Teks Saja Dulu', desc: 'Sederhana, cukup tulis nama usaha saja tanpa ikon logo.' }
              ].map(item => (
                <label key={item.id} className={`flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${formData.logoStatus === item.id ? 'border-black bg-[#fafafa]' : 'border-gray-200 hover:border-gray-400'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="logoStatus" 
                      value={item.id}
                      checked={formData.logoStatus === item.id}
                      onChange={(e) => setFormData({...formData, logoStatus: e.target.value})}
                      className="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black shrink-0"
                    />
                    <span className="font-medium text-black text-sm">{item.label}</span>
                  </div>
                  <p className={`text-xs mt-1.5 pl-7 ${formData.logoStatus === item.id ? 'text-gray-700' : 'text-gray-500'}`}>{item.desc}</p>
                </label>
              ))}
            </div>
            {formData.logoStatus === 'sudah_ada' && (
              <div className="mt-3">
                <input 
                  type="text" 
                  placeholder="Masukkan link Google Drive / Dropbox yang berisi Logo (opsional)"
                  value={formData.logoNotes}
                  onChange={(e) => setFormData({...formData, logoNotes: e.target.value})}
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors rounded-none text-sm"
                />
              </div>
            )}
            {formData.logoStatus === 'bantu_buatkan' && (
              <div className="mt-4 bg-gray-50 p-4 border border-gray-200 rounded-xl">
                <label className="block text-sm font-medium text-black mb-2">
                  Ceritakan detail logo yang Anda inginkan:
                </label>
                <textarea 
                  placeholder="Misal: Warna dominan biru, ikon bergambar burung elang, gaya minimalis elegan..."
                  value={formData.logoNotes}
                  onChange={(e) => setFormData({...formData, logoNotes: e.target.value})}
                  className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors rounded-lg text-sm min-h-[100px] resize-y bg-white"
                />
              </div>
            )}
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">Kesiapan Konten (Foto Produk, Teks Profil, dll)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'siap', label: 'Konten Sudah Siap', desc: 'Saya sudah menyiapkan semua teks, foto, dan video yang akan dimasukkan.' },
                { id: 'belum', label: 'Belum Siap Sepenuhnya', desc: 'Mohon dibantu menggunakan teks bayangan (Lorem Ipsum) atau foto ilustrasi sementara.' }
              ].map(item => (
                <label key={item.id} className={`flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${formData.contentStatus === item.id ? 'border-black bg-[#fafafa]' : 'border-gray-200 hover:border-gray-400'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="contentStatus" 
                      value={item.id}
                      checked={formData.contentStatus === item.id}
                      onChange={(e) => setFormData({...formData, contentStatus: e.target.value})}
                      className="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black shrink-0"
                    />
                    <span className="font-medium text-black text-sm">{item.label}</span>
                  </div>
                  <p className={`text-xs mt-1.5 pl-7 ${formData.contentStatus === item.id ? 'text-gray-700' : 'text-gray-500'}`}>{item.desc}</p>
                </label>
              ))}
            </div>
            {formData.contentStatus === 'siap' && (
              <div className="mt-3">
                <input 
                  type="text" 
                  placeholder="Masukkan link Google Drive / Folder yang berisi Konten (opsional)"
                  value={formData.contentNotes}
                  onChange={(e) => setFormData({...formData, contentNotes: e.target.value})}
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors rounded-none text-sm"
                />
              </div>
            )}
            {formData.contentStatus === 'belum' && (
              <div className="mt-3">
                <input 
                  type="text" 
                  placeholder="Catatan tambahan: Bagian mana yang butuh dibantu (misal: butuh dibantu tulis artikel)"
                  value={formData.contentNotes}
                  onChange={(e) => setFormData({...formData, contentNotes: e.target.value})}
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors rounded-none text-sm"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Hosting */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            5. Hosting (Tempat Menyimpan Website)
            <InfoTooltip text="Hosting adalah fondasi web Anda di internet. Hosting Modern biasanya ditujukan untuk web frontend ringan & stabil. Tradisional cPanel populer untuk PHP/WordPress." />
          </h2>
          <p className="text-sm text-gray-500">Hosting adalah "tanah" tempat web Anda diam. Pilih jenis tanah yang cocok, ada yang gratis ada pula yang berbayar.</p>
        </div>

        <div className="flex flex-col gap-4 mb-4">
           {[
             { id: 'terima_beres', label: 'Terima Beres (Lebih Praktis Kami yang Urus)', desc: 'Kami akan memilih server terbaik, Anda cukup bayar satu paket komplit tanpa pusing.' },
             { id: 'modern', label: 'Hosting Modern (Netlify, Vercel, GitHub Pages)', desc: 'Hosting kekinian untuk masa depan (Seringkali GRATIS atau jauh lebih murah).' },
             { id: 'cpanel', label: 'Hosting Tradisional (Niagahoster, Rumahweb)', desc: 'Penyewaan server lokal menggunakan cPanel yang sudah lazim (Biasanya langganan bulanan/tahunan).' }
           ].map(status => (
            <label key={status.id} className={`flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${formData.hostingStatus === status.id ? 'border-black bg-[#fafafa]' : 'border-gray-200 hover:border-gray-400'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  name="hostingStatus" 
                  value={status.id}
                  checked={formData.hostingStatus === status.id}
                  onChange={(e) => setFormData({...formData, hostingStatus: e.target.value})}
                  className="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black shrink-0"
                />
                <span className="font-medium text-black line-clamp-1">{status.label}</span>
              </div>
              <p className={`text-xs mt-1.5 pl-7 ${formData.hostingStatus === status.id ? 'text-gray-700' : 'text-gray-500'}`}>{status.desc}</p>
            </label>
           ))}
        </div>

        {formData.hostingStatus === 'terima_beres' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'standar', name: 'Paket Pemula', price: '± Rp 50rb/bln', for: 'Blog, Profil UKM', spec: 'Aman untuk pengunjung di bawah 1.000/hari' },
              { id: 'bisnis', name: 'Paket Bisnis', price: '± Rp 150rb/bln', for: 'Toko Online, Portal', spec: 'Cepat & Tangguh menahan pesanan banyak' }
            ].map(plan => (
              <label key={plan.id} className={`p-4 border rounded-xl cursor-pointer transition-all ${formData.hostingPlan === plan.id ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-gray-400 bg-white'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <input 
                      type="radio" 
                      name="hostingPlan" 
                      value={plan.id}
                      checked={formData.hostingPlan === plan.id}
                      onChange={(e) => setFormData({...formData, hostingPlan: e.target.value})}
                      className="w-4 h-4 text-black border-gray-300 focus:ring-white accent-white"
                    />
                    <span className="font-medium">{plan.name}</span>
                  </div>
                  <div className={`pl-7 text-xs ${formData.hostingPlan === plan.id ? 'text-gray-300' : 'text-gray-500'} space-y-2`}>
                    <p className={`inline-block px-2 py-1 rounded-md mb-1 font-semibold ${formData.hostingPlan === plan.id ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>{plan.price}</p>
                    <p>⭐ Cocok untuk: <b>{plan.for}</b></p>
                    <p>🚀 {plan.spec}</p>
                  </div>
              </label>
            ))}
          </div>
        )}

        {formData.hostingStatus === 'modern' && (
          <div className="mt-2 p-5 bg-[#fafafa] rounded-xl border border-gray-200">
            <h4 className="text-sm font-medium mb-3">Panduan Hosting Modern: Vercel vs Netlify vs GitHub Pages</h4>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">Hosting modern (Jamstack) menawarkan performa tingkat dunia dengan jaringan CDN global yang memastikan website Anda diakses sangat cepat dari manapun, dan seringkali Anda <b>tidak perlu bayar biaya sewa server bulanan</b>. Cocok untuk web Company Profile, Portofolio & Landing Page ringan.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
              <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-sm">
                <span className="font-semibold text-black mb-1 flex items-center gap-2"><div className="w-2 h-2 bg-black rounded-full"></div> Vercel</span>
                <p className="text-xs text-gray-500 mb-3 border-b border-gray-100 pb-2">Standar emas untuk framework modern seperti Next.js.</p>
                <div className="space-y-3 mt-3">
                  <div>
                    <span className="text-green-600 font-semibold mb-1 block text-xs">✅ Keunggulan</span>
                    <ul className="text-gray-600 space-y-1 text-xs leading-relaxed">
                      <li>• Performa paling optimal</li>
                      <li>• Global Edge Network (CDN) sangat andal</li>
                      <li>• Pembaruan langsung terlihat secara otomatis</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-blue-600 font-semibold mb-1 block text-xs">Biaya Perkiraan</span>
                    <p className="text-gray-600 text-[11px] leading-relaxed"><b>Gratis (Paket Hobby)</b> selamanya & cukup untuk UMKM. Paket Tim/Pro mulai dari $20/bln bila traffic sangat tinggi.</p>
                  </div>
                  <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                     <span className="text-black font-semibold mb-1 block text-xs">💡 Kapan Memilih Vercel?</span>
                     <p className="text-gray-600 text-[11px] leading-relaxed text-justify">Cocok untuk startup, aplikasi web interaktif, dan web yang mengejar skor Google Pagespeed tercepat.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-sm">
                 <span className="font-semibold text-black mb-1 flex items-center gap-2"><div className="w-2 h-2 bg-teal-500 rounded-full"></div> Netlify</span>
                 <p className="text-xs text-gray-500 mb-3 border-b border-gray-100 pb-2">Pelopor platform tangguh yang sangat fleksibel.</p>
                <div className="space-y-3 mt-3">
                   <div>
                    <span className="text-green-600 font-semibold mb-1 block text-xs">✅ Keunggulan</span>
                    <ul className="text-gray-600 space-y-1 text-xs leading-relaxed">
                      <li>• Sistem form contact bawaan sangat baik</li>
                      <li>• Fitur split-test (A/B testing) mudah</li>
                      <li>• Deployment instan untuk web statis</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-blue-600 font-semibold mb-1 block text-xs">Biaya Perkiraan</span>
                    <p className="text-gray-600 text-[11px] leading-relaxed"><b>Gratis (Starter)</b> dengan kuota bandwidth per bulan (100GB). Paket Pro mulai dari $19/bln.</p>
                  </div>
                  <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                     <span className="text-black font-semibold mb-1 block text-xs">💡 Kapan Memilih Netlify?</span>
                     <p className="text-gray-600 text-[11px] leading-relaxed text-justify">Sangat direkomendasikan untuk landing page promosi dan web portofolio dengan banyak pengisian formulir data masuk.</p>
                  </div>
                </div>
              </div>

               <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-sm">
                <span className="font-semibold text-black mb-1 flex items-center gap-2"><div className="w-2 h-2 bg-gray-600 rounded-full"></div> GitHub Pages</span>
                <p className="text-xs text-gray-500 mb-3 border-b border-gray-100 pb-2">Solusi mutlak bawaan repositori dari Microsoft.</p>
                <div className="space-y-3 mt-3">
                  <div>
                    <span className="text-green-600 font-semibold mb-1 block text-xs">✅ Keunggulan</span>
                    <ul className="text-gray-600 space-y-1 text-xs leading-relaxed">
                      <li>• Menyatu dengan penyimpanan GitHub</li>
                      <li>• 100% Gratis selamanya tanpa pusing</li>
                      <li>• Keamanan server disokong langsung GitHub</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-blue-600 font-semibold mb-1 block text-xs">Biaya Perkiraan</span>
                    <p className="text-gray-600 text-[11px] leading-relaxed"><b>Gratis Total</b>. Hanya dibatasi limit pemakaian ringan (100GB/bulan). Cocok banget untuk tekan biaya.</p>
                  </div>
                  <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                     <span className="text-black font-semibold mb-1 block text-xs">💡 Kapan Memilih GitHub Pages?</span>
                     <p className="text-gray-600 text-[11px] leading-relaxed text-justify">Pilihan super aman untuk web dokumen, blog statis ringan (Jekyll/Hugo), dan halaman pamer portofolio sederhana.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-4 border border-red-100 rounded-lg">
                 <span className="text-red-700 font-semibold mb-2 block text-sm">❌ Catatan Kekurangan Hosting Modern Secara Umum:</span>
                 <ul className="text-red-800 space-y-2 text-xs leading-relaxed">
                   <li>• Kurang ramah jika ada kebutuhan database PHP/MySQL tradisional (seperti cPanel biasa). Diperlukan integrasi terpisah (misal Firebase).</li>
                   <li>• <b>Tidak menyediakan Webmail / Email Bisnis gratis dari server (cPanel)</b>. Anda harus menggunakan <i>Email Forwarding</i> (Gratis) atau beli layanan Google Workspace/Titan Mail secara terpisah.</li>
                 </ul>
            </div>
          </div>
        )}

        {formData.hostingStatus === 'cpanel' && (
          <div className="mt-2 p-5 bg-[#fafafa] rounded-xl border border-gray-200">
            <h4 className="text-sm font-medium mb-3">Keunggulan & Kekurangan Hosting Tradisional (Niagahoster, JagoanHosting, dll)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="bg-white p-4 border border-gray-100 rounded-lg">
                <span className="text-green-600 font-semibold mb-2 block">✅ Kelebihan</span>
                <ul className="text-gray-600 space-y-2 text-xs leading-relaxed">
                  <li>• Sangat ramah pemula, banyak teknisi Indonesia yang paham.</li>
                  <li>• Ada fitur Email Bisnis langsung 1 paket (admin@webanda.com).</li>
                  <li>• Cocok sekali untuk website instan seperti WordPress/PHP.</li>
                </ul>
              </div>
              <div className="bg-white p-4 border border-gray-100 rounded-lg">
                <span className="text-red-500 font-semibold mb-2 block">❌ Kekurangan</span>
                <ul className="text-gray-600 space-y-2 text-xs leading-relaxed">
                  <li>• Harus rutin <b>bayar tiap bulan/tahun</b>. Lupa bayar = Web dihapus.</li>
                  <li>• Jika tiba-tiba webnya sangat ramai (viral), butuh biaya besar untuk upgrade kapasitas agar tidak lumpuh.</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed bg-white p-3 border border-gray-100 rounded-lg"><b>Info:</b> Bila Anda memilih ini, Anda harus memberikan info Login panel hosting kepada kami nantinya agar bisa diunggah ke internet.</p>
          </div>
        )}
      </section>

      {/* 6. Domain */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            6. Nama Domain (Alamat Website)
            <InfoTooltip text="Domain sebaiknya singkat, mudah dieja, dan menggunakan nama brand Anda, contoh: www.brandanda.com. Ekstensi .id atau .co.id menambah kepercayaan masyarakat lokal." />
          </h2>
          <p className="text-sm text-gray-500">Domain adalah papan alamat yang diketik orang, misal: www.kueenak.com</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
           {['Belum Punya (Bantu Belikan)', 'Sudah Punya'].map(status => (
            <label key={`domain-${status}`} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer flex-1 transition-all ${formData.domainStatus === status ? 'border-black bg-[#fafafa]' : 'border-gray-200 hover:border-gray-400'}`}>
              <input 
                type="radio" 
                name="domainStatus" 
                value={status}
                checked={formData.domainStatus === status}
                onChange={(e) => setFormData({...formData, domainStatus: e.target.value})}
                className="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black shrink-0"
              />
              <span className="font-medium text-black">{status}</span>
            </label>
           ))}
        </div>

        {formData.domainStatus === 'Belum Punya (Bantu Belikan)' && (
          <div className="space-y-4">
             <label className="block text-sm font-medium mb-1">Rancang Alamat Domain Impian Anda</label>
             <div className={`flex bg-[#fafafa] border ${errors.domainName ? 'border-red-500' : 'border-gray-200'} rounded-xl overflow-hidden focus-within:border-black transition-colors w-full`}>
                <span className="flex items-center pl-4 pr-2 text-gray-500 bg-gray-100 border-r border-gray-200 text-sm">www.</span>
                <input 
                  type="text" 
                  placeholder="namausaha"
                  value={formData.domainName}
                  onChange={(e) => setFormData({...formData, domainName: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')})}
                  className="w-full px-4 py-3 bg-transparent focus:outline-none text-sm"
                />
                <select 
                  value={formData.domainExt}
                  onChange={(e) => setFormData({...formData, domainExt: e.target.value})}
                  className="bg-gray-100 border-l border-gray-200 px-3 py-3 text-gray-700 outline-none hover:bg-gray-200 cursor-pointer text-sm font-medium appearance-none"
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

      {/* 7. Email Bisnis Profesional */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            7. Email Bisnis Profesional
            <InfoTooltip text="Memiliki email admin@brandanda.com memberikan kesan bahwa bisnis Anda serius. Membutuhkan pengaturan khusus di pengaturan domain." />
          </h2>
          <p className="text-sm text-gray-500">Buat klien Anda lebih percaya dengan menggunakan email berakhiran nama usaha Anda sendiri (misal: info@usahayanda.com).</p>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { id: 'gratis', label: 'Email Gratis (Gmail biasa)', desc: 'Menggunakan email seperti biasa, misal: usahaanda@gmail.com. Paling murah dan praktis.' },
            { id: 'forwarding', label: 'Email Forwarding (Penerusan Email)', desc: 'Email masuk ke admin@brandanda.com otomatis diteruskan dan masuk kotak masuk Gmail pribadi Anda. Seringkali gratis menggunakan layanan pihak ketiga.' },
            { id: 'bawaan_hosting', label: 'Bawaan Hosting (Gratis bila pakai cPanel)', desc: 'Bisa dibuat bila Anda menyewa Web Hosting Tradisional (cPanel). Kuota bergantung pada kapasitas server.' },
            { id: 'premium', label: 'Email Premium (Google Workspace / Titan)', desc: 'Lebih tangguh, aman, dan tanpa spam. Butuh biaya langganan tambahan sekitar Rp 30rb - Rp 100rb per bulan/user.' }
          ].map(status => (
            <label key={status.id} className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.emailStatus === status.id ? 'border-black bg-[#fafafa]' : 'border-gray-200 hover:border-gray-400'}`}>
              <input 
                type="radio" 
                name="emailStatus" 
                value={status.id}
                checked={formData.emailStatus === status.id}
                onChange={(e) => setFormData({...formData, emailStatus: e.target.value})}
                className="mt-1 w-4 h-4 text-black border-gray-300 focus:ring-black accent-black shrink-0"
              />
              <div>
                <span className="font-medium text-black">{status.label}</span>
                <p className={`text-xs mt-1 ${formData.emailStatus === status.id ? 'text-gray-700' : 'text-gray-500'}`}>{status.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* 8. Komponen UI */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            8. Elemen & Komponen yang Diinginkan
            <InfoTooltip text="Pilih blok atau komponen apa saja yang sifatnya wajib ada pada halaman website Anda nantinya." />
          </h2>
          <p className="text-sm text-gray-500">Pilih bagian apa saja yang ingin ditampilkan di dalam website Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'menu', label: 'Menu & Submenu Navigasi', desc: 'Misal: Tombol di atas (Beranda, Layanan) yang kalau diklik muncul menu ke bawah.' },
            { id: 'slider', label: 'Slider & Banner Gambar', desc: 'Gambar besar di halaman depan yang otomatis bergeser seperti papan reklame.' },
            { id: 'galeri', label: 'Galeri Foto & Portfolio', desc: 'Kumpulan foto produk atau kegiatan yang bisa diklik untuk diperbesar ukurannya.' },
            { id: 'blog', label: 'Halaman Blog', desc: 'Seperti koran online. Tempat Anda menulis kabar, promo, atau artikel terbaru.', icon: <Newspaper className="w-5 h-5 text-gray-400 group-hover:text-black mb-1" /> },
            { id: 'modal', label: 'Modal / Popup Promo', desc: 'Jendela kecil yang tiba-tiba muncul di tengah layar saat web pertama kali dibuka.' },
            { id: 'form-kontak', label: 'Buku Tamu / Form Kontak', desc: 'Kotak isian agar pelanggan bisa kirim pesan langsung dari website Anda.' },
            { id: 'halaman-kontak', label: 'Halaman Kontak & Peta', desc: 'Berisi info nomor HP, jam buka, dan tempelan jalur langsung ke aplikasi Google Maps.' },
            { id: 'testimoni', label: 'Testimoni Pelanggan', desc: 'Kutipan pujian dan bintang lima dari pembeli untuk meyakinkan pengunjung baru.' },
            { id: 'footer', label: 'Footer (Bagian Bawah)', desc: 'Bagian dasar website. Biasanya isinya link media sosial, syarat ketentuan, dan alamat.' },
            { id: 'dashboard', label: 'Dashboard Admin', desc: '(Hanya bila perlu) Halaman "rahasia" untuk Anda login dan mengubah foto sendiri.' },
            { id: 'tabel', label: 'Tabel Paket Harga (Pricing)', desc: 'Tampilan perbandingan harga dan fitur produk Anda dalam kolom-kolom rapi.' },
            { id: 'faq', label: 'Tanya Jawab (FAQ)', desc: 'Daftar pertanyaan berulang dari pelanggan yang jawabannya bisa ditekan buka-tutup.' }
          ].map(item => (
            <label key={item.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-400 transition-colors group">
              <div onClick={() => handleElementToggle(item.label)} className="text-gray-300 group-hover:text-black transition-colors mt-0.5 shrink-0">
                {formData.elements.includes(item.label) 
                  ? <CheckSquare className="text-black w-5 h-5" strokeWidth={1.5} />
                  : <Square className="w-5 h-5" strokeWidth={1.5} />
                }
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {'icon' in item && item.icon}
                  <span className="font-medium text-black text-sm">{item.label}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* 9. Fitur Transaksi & Penjualan (Hanya untuk Toko Online) */}
      <section>
         <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            9. Pembayaran & Transaksi (Bila Jualan Online)
            <InfoTooltip text="Atur metode bagaimana pembeli menyelesaikan pembayaran. Integrasi Payment Gateway memudahkan pengecekan otomatis, namun biasanya dipotong biaya admin per transaksi." />
          </h2>
          <p className="text-sm text-gray-500">Bagaimana Anda ingin melayani pembeli di website Anda?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { id: 'Checkout via WhatsApp', desc: 'Pembeli klik pesanan lalu meluncur otomatis ke nomor WhatsApp admin.' },
            { id: 'Hitung Ongkir Otomatis', desc: 'Sistem dapat menghitung biaya kirim (JNE, SiCepat, dll) secara otomatis.' },
            { id: 'Payment Gateway (Bayar Otomatis)', desc: 'Integrasi transfer VA, QRIS, GoPay pakai Midtrans atau Xendit.' },
            { id: 'Keranjang Belanja', desc: 'Pembeli bisa masukkan banyak barang sebelum mulai proses bayar.' },
            { id: 'Invoice Otomatis', desc: 'Cetak nota struk otomatis dikirimkan ke email pembeli.' },
            { id: 'Sistem Diskon / Kupon', desc: 'Mendapat fitur pembuatan kode potongan harga untuk event promo.' }
          ].map(item => (
            <label key={item.id} className="flex flex-col gap-2 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-400 transition-colors group">
              <div className="flex items-center gap-3">
                 <div onClick={() => handleEcommerceToggle(item.id)} className="text-gray-300 group-hover:text-black transition-colors">
                  {formData.ecommerceFeatures.includes(item.id) 
                    ? <CheckSquare className="text-black w-5 h-5" strokeWidth={1.5} />
                    : <Square className="w-5 h-5" strokeWidth={1.5} />
                  }
                </div>
                <span className="font-medium text-black text-sm">{item.id}</span>
              </div>
              <p className="text-xs text-gray-500 pl-8">{item.desc}</p>
            </label>
          ))}
        </div>
      </section>

      {/* 10. Keamanan & Performa */}
      <section>
         <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            10. Keamanan, Performa & Legalitas
            <InfoTooltip text="Kami sarankan setidaknya menggunakan SSL (Gembok Hijau) untuk faktor keamanan minimum, dan Keamanan Anti Spam apabila memiliki Form Kontak." />
          </h2>
          <p className="text-sm text-gray-500">Aspek krusial untuk menjaga agar website Anda aman dari gangguan hacker dan tuntutan hukum.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'Gembok Hijau (Sertifikat SSL)', desc: 'Agar browser tidak memblokir web Anda dan tidak ditandai "Not Secure".' },
            { id: 'Pelindung Anti Spam', desc: 'Mencegah robot (bot) mengirim promo judi/spam pada form kontak.' },
            { id: 'Sistem Backup Mingguan', desc: 'Untuk menyelamatkan data bila terjadi eror, virus, atau tak sengaja terhapus.' },
            { id: 'Halaman Kebijakan Privasi', desc: 'Syarat mutlak standar global bila web Anda meminta email/no HP orang.' }
          ].map(item => (
            <label key={item.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-400 transition-colors group">
              <div onClick={() => handleSecurityToggle(item.id)} className="text-gray-300 group-hover:text-black transition-colors mt-0.5">
                {formData.securityFeatures.includes(item.id) 
                  ? <CheckSquare className="text-black w-5 h-5" strokeWidth={1.5} />
                  : <Square className="w-5 h-5" strokeWidth={1.5} />
                }
              </div>
              <div>
                <span className="font-medium text-black text-sm">{item.id}</span>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* 11. Fitur Tambahan */}
      <section>
         <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            11. Fitur Pemanis Tambahan (Opsional)
            <InfoTooltip text="Lengkapi fungsi website Anda dengan aksesoris tambahan yang memanjakan pengunjung." />
          </h2>
          <p className="text-sm text-gray-500">Pemanis agar website Anda lebih canggih dan mudah ditemukan.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'wa-icon', label: 'Pintasan Chat WhatsApp', desc: 'Ikon logo WA melayang di pojok layar, pengunjung bisa langsung klik dan chat.' },
            { id: 'ai-assistant', label: 'Integrasi Chatbot & AI', desc: 'Asisten pintar (robot) untuk balas pertanyaan dasar.' },
            { id: 'scroll', label: 'Tombol Scroll Ke Atas', desc: 'Tombol cepat kembali ke halaman paling atas agar tidak pegal.' },
            { id: 'dark-mode', label: 'Mode Tampilan Gelap', desc: 'Opsi ganti warna website menjadi gelap agar tidak silau di malam hari.' },
            { id: 'multilingual', label: 'Translasi 2 Bahasa', desc: 'Tombol untuk ubah otomatis teks website ke bahasa Inggris atau lainnya.' },
            { id: 'social-share', label: 'Tombol Berbagi Otomatis', desc: 'Mudahkan pelanggan sebar website Anda ke grup WA/Facebook.' },
            { id: 'seo', label: 'Kunci Masuk Google (SEO)', desc: 'Optimasi agar web Anda gampang dicari dan berpeluang tampil di halaman depan.' },
            { id: 'analytics', label: 'Laporan Pengunjung', desc: 'Fitur pelacak jumlah orang buka web Anda tiap minggu.' }
          ].map(item => (
            <label key={item.id} className="flex flex-col gap-2 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-400 transition-colors group">
              <div className="flex items-center gap-3">
                 <div onClick={() => handleFeatureToggle(item.label)} className="text-gray-300 group-hover:text-black transition-colors">
                  {formData.features.includes(item.label) 
                    ? <CheckSquare className="text-black w-5 h-5" strokeWidth={1.5} />
                    : <Square className="w-5 h-5" strokeWidth={1.5} />
                  }
                </div>
                <span className="font-medium text-black text-sm">{item.label}</span>
              </div>
              <p className="text-xs text-gray-500 pl-8">{item.desc}</p>
            </label>
          ))}
        </div>
        {formData.features.includes('Integrasi Chatbot & AI') && (
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 text-orange-800 rounded-xl text-sm leading-relaxed">
            <span className="font-semibold block mb-1">Penting: Biaya Tambahan untuk Chatbot & AI</span>
            Pembuatan asisten pintar/Chatbot AI memerlukan API pihak ketiga (seperti OpenAI atau Google Gemini) yang memiliki skema langganan atau biaya per penggunaan di luar dari harga pembuatan website standar.
          </div>
        )}
      </section>

      {/* 12. Periklanan & Promosi (Marketing) */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            12. Tujuan Jangka Panjang (Pemasaran & Promosi)
            <InfoTooltip text="Website harus disebarluaskan agar mendatangkan kunjungan. Opsi seperti SEO atau Google Ads membantu menembus halaman atas hasil pencarian." />
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">Punya website itu seperti punya ruko di gang sepi. Agar ramai, kita butuh sebar brosur (Iklan) atau pasang plang arah (SEO). Ingat, membuat web <span className="font-semibold text-black">belum tentu langsung viral di hari pertama</span>. Ini butuh proses dan biaya di luar pembuatan website.</p>
        </div>

        <div className="bg-[#fafafa] border border-gray-200 rounded-xl p-5 mb-4">
            <h4 className="text-sm font-medium mb-3">Apa strategi Anda untuk meramaikan website ini nanti?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'seo_lanjut', label: 'SEO Lanjutan', desc: 'Sabar membangun kualitas di Google (butuh waktu 3-6 bulan).' },
              { id: 'iklan_ads', label: 'Iklan Berbayar (Google/FB Ads)', desc: 'Langsung tampil di atas Google/IG tapi bayar harian.' },
              { id: 'sosmed', label: 'Sebar di Sosmed', desc: 'Promosi manual lewat Instagram, TikTok, WA.' },
              { id: 'belum_tahu', label: 'Belum Terpikirkan', desc: 'Fokus buat web dulu, urusan promosi nanti.' }
            ].map(item => (
              <label key={item.id} className="flex items-start gap-3 p-4 border border-gray-200 bg-white rounded-xl cursor-pointer hover:border-gray-400 transition-colors group">
                <input 
                  type="checkbox" 
                  checked={formData.marketingOptions.includes(item.id)}
                  onChange={() => handleMarketingToggle(item.id)}
                  className="mt-0.5 w-4 h-4 text-black border-gray-300 focus:ring-black accent-black rounded"
                />
                <div>
                  <span className="font-medium text-black text-sm">{item.label}</span>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              </label>
            ))}
            </div>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed bg-white p-3 border border-gray-100 rounded-lg">
                💡 <b>Perlu Dipahami:</b> Biaya untuk pasang Iklan Google Ads atau Jasa SEO (Optimasi level ahli) merupakan tagihan yang terpisah dari biaya jasa pembuatan website awal. Personalisasi seperti artikel spesifik di Google butuh riset mendalam.
            </p>
        </div>
      </section>

      {/* 13. Anggaran */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            13. Anggaran Pembuatan (Di luar biaya promosi)
            <InfoTooltip text="Dengan mengetahui detail dana yang disiapkan, kami dapat membantu menyaring opsi layanan atau komponen yang paling tidak memberatkan modal awal Anda." />
          </h2>
          <p className="text-sm text-gray-500">Membantu kami memberikan solusi dan teknologi yang paling sesuai kantong Anda.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            '< Rp 1 Juta', 
            'Rp 1 Juta - 3 Juta', 
            'Rp 3 Juta - 7 Juta', 
            '> Rp 7 Juta'
          ].map(budget => (
            <label key={budget} className={`flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${formData.budget === budget ? 'border-black bg-black text-white' : 'border-gray-200 text-black hover:border-gray-400'}`}>
              <input 
                type="radio" 
                name="budget" 
                value={budget}
                checked={formData.budget === budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                className="hidden"
              />
              <span className={`font-medium text-sm ${formData.budget === budget ? 'text-white' : ''}`}>{budget}</span>
            </label>
           ))}
        </div>
      </section>

      {/* 14. Serah Terima & Panduan */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            14. Serah Terima & Panduan Penggunaan
            <InfoTooltip text="Karena ini merupakan aset sepenuhnya milik Anda, kami menjamin penyerahan akses secara terbuka tanpa ada batasan untuk Anda ambil alih." />
          </h2>
          <p className="text-sm text-gray-500">Agar Anda tidak kebingungan saat mengelola website nanti.</p>
        </div>

        {formData.hostingStatus === 'terima_beres' || formData.domainStatus === 'Belum Punya (Bantu Belikan)' ? (
          <div className="mb-6 p-5 bg-blue-50/50 border border-blue-100 rounded-xl">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Penting Seputar Opsi "Terima Beres"</h4>
            <p className="text-xs text-blue-800 leading-relaxed">
              Karena Anda memilih agar kami mengurus Hosting/Domain Anda, kami akan membuatkan <b>email dan akun pendaftaran yang benar-benar baru & khusus</b> atas nama Anda. 
              Semua hak akses, username, dan password akan diserahkan 100% kepada Anda setelah website selesai. Kami tidak menahan kepemilikan aset digital Anda.
            </p>
          </div>
        ) : null}

        <h4 className="text-sm font-medium mb-3">Bagaimana Anda ingin menerima panduan cara pakai website Anda?</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: 'pdf', label: 'Buku Panduan PDF', desc: 'Bisa didownload dan dibaca kapan saja secara offline.' },
            { id: 'web', label: 'Halaman Panduan Khusus', desc: 'Panduan rahasia beserta video di dalam website Anda sendiri.' },
            { id: 'video', label: 'Panggilan Video (Zoom/GMeet)', desc: 'Meeting langsung agar bisa tanya jawab secara riil.' }
          ].map(item => (
             <label key={item.id} className={`flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${formData.handoverFormat === item.id ? 'border-black bg-black text-white' : 'border-gray-200 text-black hover:border-gray-400 bg-white'}`}>
              <div className="flex items-center gap-3 mb-2">
                 <input 
                  type="radio" 
                  name="handoverFormat" 
                  value={item.id}
                  checked={formData.handoverFormat === item.id}
                  onChange={(e) => setFormData({...formData, handoverFormat: e.target.value})}
                  className={`w-4 h-4 border-gray-300 focus:ring-black accent-black ${formData.handoverFormat === item.id ? 'accent-white' : ''}`}
                />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              <p className={`text-xs pl-7 ${formData.handoverFormat === item.id ? 'text-gray-300' : 'text-gray-500'}`}>{item.desc}</p>
            </label>
          ))}
        </div>
      </section>

      {/* 15. Data Diri & Kontak */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            15. Data Diri & Kontak
            <InfoTooltip text="Informasi ini kami gunakan agar dapat menghubungi Anda kembali untuk mengirimkan estimasi total harga dan waktu pengerjaan." />
          </h2>
          <p className="text-sm text-gray-500">Isi dengan lengkap agar kami dapat merespons secepatnya.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Nama Lengkap / Nama Bisnis</label>
            <input 
              type="text" 
              placeholder="Misal: Budi Santoso"
              value={formData.clientName}
              onChange={(e) => setFormData({...formData, clientName: e.target.value})}
              className={`w-full p-3 bg-[#fafafa] border ${errors.clientName ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-black transition-colors rounded-xl text-sm`}
            />
            {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">WhatsApp / No. HP Aktif</label>
            <input 
              type="tel" 
              placeholder="Misal: 081234567890"
              value={formData.clientPhone}
              onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
              className={`w-full p-3 bg-[#fafafa] border ${errors.clientPhone ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-black transition-colors rounded-xl text-sm`}
            />
            {errors.clientPhone && <p className="text-red-500 text-xs mt-1">{errors.clientPhone}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-black">Alamat Email Aktif</label>
            <input 
              type="email" 
              placeholder="Misal: email@usahaanda.com"
              value={formData.clientEmail}
              onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
              className={`w-full p-3 bg-[#fafafa] border ${errors.clientEmail ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-black transition-colors rounded-xl text-sm`}
            />
            {errors.clientEmail && <p className="text-red-500 text-xs mt-1">{errors.clientEmail}</p>}
          </div>
        </div>
      </section>

      {/* Turnstile Widget (Only in Production) */}
      {import.meta.env.PROD && (
        <div className="pt-8 flex justify-center md:justify-start">
          <div 
            className="cf-turnstile" 
            data-sitekey="0x4AAAAAABh0uR4HC9nKVVTQ"
            data-callback="onTurnstileSuccess"
          ></div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-4 bg-black text-white text-sm font-medium tracking-widest uppercase rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Form Konsultasi'}
        </button>
      </div>
      <StatusModal 
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
      />
    </form>
  );
}
