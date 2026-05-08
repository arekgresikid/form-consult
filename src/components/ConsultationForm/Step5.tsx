import React from 'react';
import { 
  Layout, Share2, Server, ShieldCheck, Image, Newspaper, Sparkles, FileText, Globe, Users, 
  BarChart3, MessageCircle, CheckSquare, Square, Search, Target, HelpCircle, Wallet, Video, Cpu
} from 'lucide-react';
import { InfoTooltip } from './Shared';

interface Step5Props {
  formData: any;
  setFormData: (data: any) => void;
  handleElementToggle: (label: string) => void;
  handleEcommerceToggle: (id: string) => void;
  handleSecurityToggle: (id: string) => void;
  handleFeatureToggle: (label: string) => void;
  handleMarketingToggle: (id: string) => void;
}

const Step5: React.FC<Step5Props> = ({ 
  formData, setFormData, 
  handleElementToggle, handleEcommerceToggle, handleSecurityToggle, 
  handleFeatureToggle, handleMarketingToggle 
}) => {
  return (
    <div className="space-y-20">
      {/* 8. Email Bisnis Profesional */}
      <section>
        <div className="mb-10">
          <h2 className="text-xl font-medium tracking-tight mb-4 flex items-center">
            8. Email Bisnis Profesional
            <InfoTooltip text="Memiliki email admin@brandanda.com memberikan kesan bahwa bisnis Anda serius. Membutuhkan pengaturan khusus di pengaturan domain." />
          </h2>
          <p className="text-sm text-gray-500">Buat klien Anda lebih percaya dengan menggunakan email berakhiran nama usaha Anda sendiri (misal: info@usahayanda.com).</p>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { id: 'gratis', label: 'Email Gratis (Gmail biasa)', desc: 'Menggunakan email seperti biasa, misal: usahaanda@gmail.com. Paling murah dan praktis.', icon: <Layout className="w-5 h-5" /> },
            { id: 'forwarding', label: 'Email Forwarding (Penerusan Email)', desc: 'Email masuk ke admin@brandanda.com otomatis diteruskan dan masuk kotak masuk Gmail pribadi Anda. Seringkali gratis menggunakan layanan pihak ketiga.', icon: <Share2 className="w-5 h-5" /> },
            { id: 'bawaan_hosting', label: 'Bawaan Hosting (Gratis bila pakai cPanel)', desc: 'Bisa dibuat bila Anda menyewa Web Hosting Tradisional (cPanel). Kuota bergantung pada kapasitas server.', icon: <Server className="w-5 h-5" /> },
            { id: 'premium', label: 'Email Premium (Google Workspace / Titan)', desc: 'Lebih tangguh, aman, dan tanpa spam. Butuh biaya langganan tambahan sekitar Rp 30rb - Rp 100rb per bulan/user.', icon: <ShieldCheck className="w-5 h-5" /> }
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
                <div className="flex items-center gap-2">
                  <div className={`${formData.emailStatus === status.id ? 'text-black' : 'text-gray-400'}`}>
                    {status.icon}
                  </div>
                  <span className="font-medium text-black">{status.label}</span>
                </div>
                <p className={`text-xs mt-1 ${formData.emailStatus === status.id ? 'text-gray-700' : 'text-gray-500'}`}>{status.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* 9. Elemen & Komponen yang Diinginkan */}
      <section>
        <div className="mb-10">
          <h2 className="text-xl font-medium tracking-tight mb-4 flex items-center">
            9. Elemen & Komponen yang Diinginkan
            <InfoTooltip text="Pilih blok atau komponen apa saja yang sifatnya wajib ada pada halaman website Anda nantinya." />
          </h2>
          <p className="text-sm text-gray-500">Pilih bagian apa saja yang ingin ditampilkan di dalam website Anda. Semakin banyak komponen, struktur website akan semakin lengkap.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { id: 'hero', label: 'Hero Section (Headline)', desc: 'Bagian paling atas dengan judul besar, teks pembuka, dan tombol utama (CTA).', icon: <Target className="w-5 h-5" /> },
            { id: 'menu', label: 'Menu & Navigasi', desc: 'Baris navigasi di atas untuk pindah antar halaman atau bagian website.', icon: <Layout className="w-5 h-5" /> },
            { id: 'slider', label: 'Slider / Carousel', desc: 'Banner gambar yang bisa bergeser otomatis untuk menampilkan promo atau foto utama.', icon: <Image className="w-5 h-5" /> },
            { id: 'services', label: 'Grid Layanan / Produk', desc: 'Penjelasan singkat apa yang Anda tawarkan dalam bentuk kolom-kolom ikon/gambar.', icon: <Layout className="w-5 h-5" /> },
            { id: 'steps', label: 'Alur Kerja (Step-by-Step)', desc: 'Urutan langkah cara kerja atau proses pemesanan (1, 2, 3).', icon: <CheckSquare className="w-5 h-5" /> },
            { id: 'galeri', label: 'Galeri & Portfolio', desc: 'Kumpulan foto hasil karya atau dokumentasi kegiatan yang bisa diklik.', icon: <Image className="w-5 h-5" /> },
            { id: 'blog', label: 'Halaman Berita / Blog', desc: 'Area untuk memposting artikel, tips, atau kabar terbaru dari perusahaan.', icon: <Newspaper className="w-5 h-5" /> },
            { id: 'testimoni', label: 'Testimoni & Review', desc: 'Kutipan kepuasan pelanggan beserta foto/nama untuk membangun kepercayaan.', icon: <Users className="w-5 h-5" /> },
            { id: 'pricing', label: 'Tabel Harga (Pricing)', desc: 'Perbandingan paket harga yang rapi agar klien mudah memilih layanan.', icon: <BarChart3 className="w-5 h-5" /> },
            { id: 'partners', label: 'Logo Partner / Klien', desc: 'Barisan logo perusahaan atau brand yang pernah bekerja sama.', icon: <ShieldCheck className="w-5 h-5" /> },
            { id: 'stats', label: 'Statistik & Counter', desc: 'Angka keberhasilan (misal: 500+ Klien) yang bisa bergerak saat dilihat.', icon: <Target className="w-5 h-5" /> },
            { id: 'team', label: 'Profil Tim / Founder', desc: 'Foto dan penjelasan singkat mengenai orang-orang di balik bisnis Anda.', icon: <Users className="w-5 h-5" /> },
            { id: 'faq', label: 'Tanya Jawab (FAQ)', desc: 'Daftar pertanyaan yang sering diajukan dengan sistem buka-tutup (accordion).', icon: <MessageCircle className="w-5 h-5" /> },
            { id: 'form-kontak', label: 'Formulir Kontak', desc: 'Isian Nama/Email agar pengunjung bisa kirim pesan langsung ke email Anda.', icon: <FileText className="w-5 h-5" /> },
            { id: 'maps', label: 'Peta Lokasi (Google Maps)', desc: 'Peta interaktif agar pelanggan mudah menemukan alamat fisik Anda.', icon: <Globe className="w-5 h-5" /> },
            { id: 'newsletter', label: 'Newsletter Subscription', desc: 'Kotak langganan email untuk pengumpulan database calon pelanggan.', icon: <FileText className="w-5 h-5" /> },
            { id: 'social-feed', label: 'Social Media Feed', desc: 'Tampilan otomatis postingan terbaru dari Instagram atau TikTok Anda.', icon: <Share2 className="w-5 h-5" /> },
            { id: 'footer', label: 'Footer Lengkap', desc: 'Bagian paling bawah berisi alamat, link sosmed, dan hak cipta.', icon: <Layout className="w-5 h-5" /> }
          ].map(item => (
            <label 
              key={item.id} 
              className={`flex items-start gap-4 p-5 border rounded-2xl cursor-pointer transition-all duration-300 group ${formData.elements.includes(item.label) ? 'border-black bg-black/5 shadow-sm' : 'border-gray-100 hover:border-gray-300 hover:shadow-md'}`}
            >
              <div 
                onClick={(e) => {
                  e.preventDefault();
                  handleElementToggle(item.label);
                }} 
                className={`mt-1 shrink-0 transition-transform duration-300 ${formData.elements.includes(item.label) ? 'scale-110' : 'group-hover:scale-110'}`}
              >
                {formData.elements.includes(item.label) 
                  ? <CheckSquare className="text-black w-6 h-6" strokeWidth={2.5} />
                  : <Square className="text-gray-300 w-6 h-6" strokeWidth={2} />
                }
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`${formData.elements.includes(item.label) ? 'text-black' : 'text-gray-400'}`}>
                    {item.icon}
                  </div>
                  <span className={`font-bold text-sm tracking-tight ${formData.elements.includes(item.label) ? 'text-black' : 'text-gray-700'}`}>
                    {item.label}
                  </span>
                </div>
                <p className={`text-[11px] leading-relaxed ${formData.elements.includes(item.label) ? 'text-gray-900' : 'text-gray-500'}`}>
                  {item.desc}
                </p>
              </div>
            </label>
          ))}
        </div>

        {/* Real-time Visual Flow Preview */}
        {formData.elements.length > 0 && (
          <div className="mt-10 p-8 bg-gray-50 border border-dashed border-gray-300 rounded-3xl animate-in fade-in zoom-in duration-500">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">Estimasi Alur Halaman Website Anda</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {formData.elements.map((el: string, index: number) => (
                <React.Fragment key={el}>
                  <div className="px-5 py-3 bg-white border border-black/10 rounded-xl shadow-sm flex items-center gap-2 group hover:border-black transition-all">
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                    <span className="text-xs font-bold text-black uppercase tracking-tight">{el}</span>
                  </div>
                  {index < formData.elements.length - 1 && (
                    <div className="text-gray-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-8 text-center italic">*Urutan komponen dapat disesuaikan kembali saat proses desain berlangsung.</p>
          </div>
        )}
      </section>

      {/* 10. Pembayaran & Transaksi */}
      <section>
         <div className="mb-10">
          <h2 className="text-xl font-medium tracking-tight mb-4 flex items-center">
            10. Pembayaran & Transaksi (Bila Jualan Online)
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

      {/* 11. Keamanan & Performa */}
      <section>
         <div className="mb-10">
          <h2 className="text-xl font-medium tracking-tight mb-4 flex items-center">
            11. Keamanan, Performa & Legalitas
            <InfoTooltip text="Kami sarankan setidaknya menggunakan SSL (Gembok Hijau) untuk faktor keamanan minimum, dan Keamanan Anti Spam apabila memiliki Form Kontak." />
          </h2>
          <p className="text-sm text-gray-500">Aspek krusial untuk menjaga agar website Anda aman dari gangguan hacker dan tuntutan hukum.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'Gembok Hijau (Sertifikat SSL)', desc: 'Agar browser tidak memblokir web Anda dan tidak ditandai "Not Secure".', icon: <ShieldCheck className="w-5 h-5" /> },
            { id: 'Pelindung Anti Spam', desc: 'Mencegah robot (bot) mengirim promo judi/spam pada form kontak.', icon: <ShieldCheck className="w-5 h-5" /> },
            { id: 'Sistem Backup Mingguan', desc: 'Untuk menyelamatkan data bila terjadi eror, virus, atau tak sengaja terhapus.', icon: <Server className="w-5 h-5" /> },
            { id: 'Halaman Kebijakan Privasi', desc: 'Syarat mutlak standar global bila web Anda meminta email/no HP orang.', icon: <FileText className="w-5 h-5" /> }
          ].map(item => (
            <label key={item.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-400 transition-colors group">
              <div onClick={() => handleSecurityToggle(item.id)} className="text-gray-300 group-hover:text-black transition-colors mt-0.5">
                {formData.securityFeatures.includes(item.id) 
                  ? <CheckSquare className="text-black w-5 h-5" strokeWidth={1.5} />
                  : <Square className="w-5 h-5" strokeWidth={1.5} />
                }
              </div>
              <div>
                <div className="flex items-center gap-2">
                   <div className={`${formData.securityFeatures.includes(item.id) ? 'text-black' : 'text-gray-400'}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-black text-sm">{item.id}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* 12. Fitur Pemanis Tambahan */}
      <section>
         <div className="mb-10">
          <h2 className="text-xl font-medium tracking-tight mb-4 flex items-center">
            12. Fitur Pemanis Tambahan (Opsional)
            <InfoTooltip text="Lengkapi fungsi website Anda dengan aksesoris tambahan yang memanjakan pengunjung." />
          </h2>
          <p className="text-sm text-gray-500">Pemanis agar website Anda lebih canggih dan mudah ditemukan.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'wa-icon', label: 'Pintasan Chat WhatsApp', desc: 'Ikon logo WA melayang di pojok layar, pengunjung bisa langsung klik dan chat.', icon: <MessageCircle className="w-5 h-5" /> },
            { id: 'ai-assistant', label: 'Integrasi Chatbot & AI', desc: 'Asisten pintar (robot) untuk balas pertanyaan dasar.', icon: <Cpu className="w-5 h-5" /> },
            { id: 'scroll', label: 'Tombol Scroll Ke Atas', desc: 'Tombol cepat kembali ke halaman paling atas agar tidak pegal.', icon: <Target className="w-5 h-5" /> },
            { id: 'dark-mode', label: 'Mode Tampilan Gelap', desc: 'Opsi ganti warna website menjadi gelap agar tidak silau di malam hari.', icon: <Sparkles className="w-5 h-5" /> },
            { id: 'multilingual', label: 'Translasi 2 Bahasa', desc: 'Tombol untuk ubah otomatis teks website ke bahasa Inggris atau lainnya.', icon: <Globe className="w-5 h-5" /> },
            { id: 'social-share', label: 'Tombol Berbagi Otomatis', desc: 'Mudahkan pelanggan sebar website Anda ke grup WA/Facebook.', icon: <Share2 className="w-5 h-5" /> },
            { id: 'seo', label: 'Kunci Masuk Google (SEO)', desc: 'Optimasi agar web Anda gampang dicari dan berpeluang tampil di halaman depan.', icon: <Search className="w-5 h-5" /> },
            { id: 'analytics', label: 'Laporan Pengunjung', desc: 'Fitur pelacak jumlah orang buka web Anda tiap minggu.', icon: <BarChart3 className="w-5 h-5" /> }
          ].map(item => (
            <label key={item.id} className="flex flex-col gap-2 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-400 transition-colors group">
              <div className="flex items-center gap-3">
                 <div onClick={() => handleFeatureToggle(item.label)} className="text-gray-300 group-hover:text-black transition-colors">
                  {formData.features.includes(item.label) 
                    ? <CheckSquare className="text-black w-5 h-5" strokeWidth={1.5} />
                    : <Square className="w-5 h-5" strokeWidth={1.5} />
                  }
                </div>
                <div className="flex items-center gap-2">
                  <div className={`${formData.features.includes(item.label) ? 'text-black' : 'text-gray-400'}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-black text-sm">{item.label}</span>
                </div>
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

      {/* 13. Tujuan Jangka Panjang */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            13. Tujuan Jangka Panjang (Pemasaran & Promosi)
            <InfoTooltip text="Website harus disebarluaskan agar mendatangkan kunjungan. Opsi seperti SEO atau Google Ads membantu menembus halaman atas hasil pencarian." />
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">Punya website itu seperti punya ruko di gang sepi. Agar ramai, kita butuh sebar brosur (Iklan) atau pasang plang arah (SEO). Ingat, membuat web <span className="font-semibold text-black">belum tentu langsung viral di hari pertama</span>. Ini butuh proses dan biaya di luar pembuatan website.</p>
        </div>

        <div className="bg-[#fafafa] border border-gray-200 rounded-xl p-5 mb-4">
            <h4 className="text-sm font-medium mb-3">Apa strategi Anda untuk meramaikan website ini nanti?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'seo_lanjut', label: 'SEO Lanjutan', desc: 'Sabar membangun kualitas di Google (butuh waktu 3-6 bulan).', icon: <Search className="w-5 h-5" /> },
              { id: 'iklan_ads', label: 'Iklan Berbayar (Google/FB Ads)', desc: 'Langsung tampil di atas Google/IG tapi bayar harian.', icon: <Target className="w-5 h-5" /> },
              { id: 'sosmed', label: 'Sebar di Sosmed', desc: 'Promosi manual lewat Instagram, TikTok, WA.', icon: <Share2 className="w-5 h-5" /> },
              { id: 'belum_tahu', label: 'Belum Terpikirkan', desc: 'Fokus buat web dulu, urusan promosi nanti.', icon: <HelpCircle className="w-5 h-5" /> }
            ].map(item => (
              <label key={item.id} className="flex items-start gap-3 p-4 border border-gray-200 bg-white rounded-xl cursor-pointer hover:border-gray-400 transition-colors group">
                <input 
                  type="checkbox" 
                  checked={formData.marketingOptions.includes(item.id)}
                  onChange={() => handleMarketingToggle(item.id)}
                  className="mt-0.5 w-4 h-4 text-black border-gray-300 focus:ring-black accent-black rounded"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`${formData.marketingOptions.includes(item.id) ? 'text-black' : 'text-gray-400'}`}>
                      {item.icon}
                    </div>
                    <span className="font-medium text-black text-sm">{item.label}</span>
                  </div>
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

      {/* 14. Anggaran */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            14. Anggaran Pembuatan (Di luar biaya promosi)
            <InfoTooltip text="Dengan mengetahui detail dana yang disiapkan, kami dapat membantu menyaring opsi layanan atau komponen yang paling tidak memberatkan modal awal Anda." />
          </h2>
          <p className="text-sm text-gray-500">Membantu kami memberikan solusi dan teknologi yang paling sesuai kantong Anda.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: '< Rp 1 Juta', icon: <Wallet className="w-5 h-5" /> },
            { label: 'Rp 1 Juta - 3 Juta', icon: <Wallet className="w-5 h-5" /> },
            { label: 'Rp 3 Juta - 7 Juta', icon: <Wallet className="w-5 h-5" /> },
            { label: '> Rp 7 Juta', icon: <Wallet className="w-5 h-5" /> }
          ].map(budget => (
            <label key={budget.label} className={`flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${formData.budget === budget.label ? 'border-black bg-black text-white' : 'border-gray-200 text-black hover:border-gray-400'}`}>
              <input 
                type="radio" 
                name="budget" 
                value={budget.label}
                checked={formData.budget === budget.label}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2">
                <div className={`${formData.budget === budget.label ? 'text-white' : 'text-gray-400'}`}>
                  {budget.icon}
                </div>
                <span className={`font-medium text-sm ${formData.budget === budget.label ? 'text-white' : ''}`}>{budget.label}</span>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* 15. Serah Terima & Panduan Penggunaan */}
      <section>
        <div className="mb-8">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            15. Serah Terima & Panduan Penggunaan
            <InfoTooltip text="Kami memastikan Anda tidak hanya menerima website, tapi juga tahu cara mengoperasikannya secara mandiri." />
          </h2>
          <p className="text-sm text-gray-500">Pilih bagaimana Anda ingin kami membekali Anda agar mahir mengelola website sendiri.</p>
        </div>

        {formData.hostingStatus === 'terima_beres' || formData.domainStatus === 'Belum Punya (Bantu Belikan)' ? (
          <div className="mb-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-900 mb-1">Jaminan Kepemilikan Aset</h4>
              <p className="text-xs text-blue-800/80 leading-relaxed">
                Semua akun pendaftaran (Hosting/Domain) akan menggunakan data Anda dan diserahkan 100% (Username & Password). Kami tidak menahan kepemilikan aset digital Anda.
              </p>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { id: 'pdf', label: 'E-Book Panduan (PDF)', desc: 'Dokumen tertulis dengan screenshot langkah demi langkah. Cocok untuk dibaca santai.', icon: <FileText className="w-5 h-5" /> },
            { id: 'video_recorded', label: 'Video Tutorial Eksklusif', desc: 'Rekaman layar khusus menjelaskan cara ganti tulisan, gambar, dan posting blog.', icon: <Video className="w-5 h-5" /> },
            { id: 'zoom', label: 'Live Training (Multi-Platform)', desc: 'Sesi privat via Zoom, Meet, WhatsApp, Email, atau Messenger untuk tanya jawab riil.', icon: <Users className="w-5 h-5" /> },
            { id: 'web_guide', label: 'Halaman Panduan di Web', desc: 'Dibuatkan halaman khusus "Cara Pakai" yang hanya bisa diakses oleh Anda di dalam web.', icon: <Globe className="w-5 h-5" /> },
            { id: 'maintenance', label: 'Dukungan & Perawatan (1 Bulan)', desc: 'Bantuan teknis gratis selama 30 hari pertama setelah serah terima selesai.', icon: <Server className="w-5 h-5" /> }
          ].map(item => (
            <label 
              key={item.id} 
              className={`flex items-start gap-4 p-5 border rounded-2xl cursor-pointer transition-all ${formData.handoverFormat === item.id ? 'border-black bg-black text-white shadow-xl translate-y-[-2px]' : 'border-gray-100 bg-white hover:border-gray-300'}`}
            >
              <div className="mt-1">
                <input 
                  type="radio" 
                  name="handoverFormat" 
                  value={item.id}
                  checked={formData.handoverFormat === item.id}
                  onChange={(e) => setFormData({...formData, handoverFormat: e.target.value})}
                  className={`w-4 h-4 accent-white ${formData.handoverFormat === item.id ? '' : 'accent-black'}`}
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className={`${formData.handoverFormat === item.id ? 'text-white' : 'text-gray-400'}`}>
                    {item.icon}
                  </div>
                  <span className="font-bold text-sm">{item.label}</span>
                </div>
                <p className={`text-[11px] leading-relaxed ${formData.handoverFormat === item.id ? 'text-gray-300' : 'text-gray-500'}`}>{item.desc}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
           <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Daftar Paket Serah Terima Standar:</h4>
           <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Akses Full Panel Hosting & Domain',
                'Kredensial Login Admin Website',
                'File Source Code (Format .zip)',
                'Aset Gambar & Ikon Original',
                'Akun Email Bisnis (Bila Dipesan)',
                'Sertifikat Lisensi Aset (Bila Ada)'
              ].map(check => (
                <li key={check} className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckSquare className="w-4 h-4 text-green-500" />
                  {check}
                </li>
              ))}
           </ul>
        </div>
      </section>

      {/* 16. Catatan Akhir & Link Dokumen Tambahan */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-2 flex items-center">
            16. Catatan Akhir & Link Dokumen Tambahan
            <InfoTooltip text="Gunakan bagian ini untuk melampirkan link Google Drive tambahan atau catatan khusus yang belum terakomodasi di bagian sebelumnya." />
          </h2>
          <p className="text-sm text-gray-500">Apakah ada hal lain yang ingin Anda sampaikan atau lampirkan?</p>
        </div>

        <div className="space-y-4">
          <textarea 
            placeholder="Misal: Saya ingin warna tombolnya spesifik #FF5500, atau link folder aset tambahan: https://drive.google.com/..."
            value={formData.additionalNotes || ''}
            onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
            className="w-full border border-gray-200 p-4 focus:outline-none focus:border-black transition-all rounded-2xl text-sm min-h-[120px] resize-none bg-gray-50 focus:bg-white"
          />
        </div>
      </section>
    </div>
  );
};

export default Step5;
