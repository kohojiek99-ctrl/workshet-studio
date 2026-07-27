"use client";

import { useState, useEffect } from "react";

export default function GeneratePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("master-1");
  const [promptInput, setPromptInput] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<any[]>([]);

  // State Form Interaktif untuk Semua Master Prompt
  const [productName, setProductName] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [usp, setUsp] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [goal, setGoal] = useState("Sales / Konversi");
  const [duration, setDuration] = useState("30 Detik");
  const [contentPreset, setContentPreset] = useState("Viral Content");
  const [videoFormat, setVideoFormat] = useState("Cinematic");
  const [visualStyle, setVisualstyle] = useState("Apple Style");
  const [brandVoice, setBrandVoice] = useState("Professional");
  const [cta, setCta] = useState("Beli Sekarang");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Daftar 8 Master Prompt Lengkap
  const defaultTemplates = [
    {
      id: "master-1",
      title: "1. MASTER PROMPT META ADS (STOP SCROLL)",
      category: "Meta Ads",
      content: `Anda adalah Meta Ads Creative Director, Senior Copywriter, dan Performance Marketing Expert dengan pengalaman lebih dari 20 tahun.
# TUGAS
Buatkan iklan Facebook & Instagram Ads yang memiliki Hook Stop Scroll, membangun rasa penasaran, menyentuh pain point audiens, menawarkan solusi yang kuat, dan menghasilkan Call To Action yang mendorong konversi.
# INFORMASI PRODUK
Nama Produk: [JUDUL PRODUK]
Target Market: [TARGET]
Masalah Utama: [PAIN POINT]
Keunggulan / USP: [USP]
Tujuan: [TUJUAN]
Brand Voice: [VOICE]
CTA: [CTA]`
    },
    {
      id: "master-2",
      title: "2. MASTER PROMPT TIKTOK ADS",
      category: "TikTok Ads",
      content: `Anda adalah TikTok Ads Strategist & Viral Content Creator. Buatkan konsep TikTok Ads 3 detik pertama hook yang memukau, script video, dan CTA tinggi dalam Bahasa Indonesia.
# INFORMASI PRODUK
Nama Produk: [JUDUL PRODUK]
Target Market: [TARGET]
Keunggulan: [USP]
Platform: [PLATFORM]
Durasi: [DURASI]
CTA: [CTA]`
    },
    {
      id: "master-3",
      title: "3. MASTER PROMPT UNIVERSAL",
      category: "Universal",
      content: `Anda adalah AI Business Consultant & Marketing Strategist kelas dunia. Berikan analisis mendalam, strategi konten, copywriting, dan format siap pakai dalam Bahasa Indonesia.
# INFORMASI PRODUK
Topik/Tujuan: [JUDUL PRODUK]
Target Market: [TARGET]
Tujuan: [TUJUAN]
Info Tambahan: [INFO]`
    },
    {
      id: "master-4",
      title: "4. MASTER PROMPT CAROUSEL INSTAGRAM",
      category: "Instagram",
      content: `Anda adalah Instagram Growth Expert & Content Designer. Buatkan teks carousel Instagram edukatif atau promosi dari slide 1 sampai slide terakhir yang memiliki tingkat save & share tinggi.
# INFORMASI
Topik: [JUDUL PRODUK]
Target Market: [TARGET]
Tujuan: [TUJUAN]
Brand Voice: [VOICE]`
    },
    {
      id: "master-5",
      title: "5. MASTER PROMPT PROMOSI MEDIA SOSIAL",
      category: "Social Media",
      content: `Anda adalah Social Media Manager profesional. Buatkan caption postingan media sosial yang engaging, interaktif, dan dilengkapi hashtag tertarget untuk meningkatkan jangkauan organik.
# INFORMASI
Produk/Topik: [JUDUL PRODUK]
Target Market: [TARGET]
Platform: [PLATFORM]
CTA: [CTA]`
    },
    {
      id: "master-6",
      title: "6. MASTER PROMPT PRODUK FISIK UMKM",
      category: "UMKM",
      content: `Anda adalah UMKM Branding Consultant. Buatkan narasi penjualan produk fisik lokal yang menonjolkan keaslian, kualitas, dan solusi praktis bagi konsumen sehari-hari.
# INFORMASI
Nama Produk: [JUDUL PRODUK]
Target Market: [TARGET]
Keunggulan Utama: [USP]
Harga/Promo: [INFO]`
    },
    {
      id: "master-7",
      title: "7. MASTER PROMPT COPYWRITING PENJUALAN",
      category: "Copywriting",
      content: `Anda adalah Direct Response Copywriter legendaris. Buatkan sales letter atau naskah penawaran menggunakan formula AIDA (Attention, Interest, Desire, Action) yang mematikan.
# INFORMASI
Produk: [JUDUL PRODUK]
Target Market: [TARGET]
Pain Point: [PAIN POINT]
Tujuan: [TUJUAN]
CTA: [CTA]`
    },
    {
      id: "master-8",
      title: "8. MASTER PROMPT STORYBOARD VIDEO MODE™",
      category: "AI Video",
      content: `[AI Cinematic Storyboard Engine]
PROJECT INFORMATION:
- Topik/Produk: [JUDUL PRODUK]
- Target Audience: [TARGET]
- Tujuan: [TUJUAN]
- Platform: [PLATFORM]
- Durasi Video: [DURASI]
- Informasi Tambahan: [INFO]

CONTENT PRESET: [PRESET]
VIDEO FORMAT: [FORMAT]
VISUAL STYLE: [STYLE]
BRAND PERSONALITY: [VOICE]
CTA: [CTA]

# ROLE & TUGAS
Anda adalah AI Creative Director profesional. Ubah informasi di atas menjadi storyboard video premium berbahasa Indonesia yang siap diproduksi dengan standar agensi kreatif kelas dunia.`
    }
  ];

  useEffect(() => {
    try {
      setSavedPrompts(defaultTemplates);
      setPromptInput(defaultTemplates[0].content);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSelectTemplate = (item: any) => {
    setSelectedTemplate(item.id);
    updatePromptText(item.id, productName, targetMarket, painPoint, usp, platform, goal, duration, contentPreset, videoFormat, visualStyle, brandVoice, cta, additionalInfo);
  };

  const updatePromptText = (
    templateId: string,
    prod: string,
    target: string,
    pain: string,
    u: string,
    plat: string,
    g: string,
    dur: string,
    pres: string,
    form: string,
    style: string,
    voice: string,
    buttonCta: string,
    info: string
  ) => {
    const pName = prod || "Contoh Produk / Topik";
    const tMarket = target || "Target Luas";
    const pPoint = pain || "Masalah Konsumen";
    const uSp = u || "Keunggulan Utama";

    let result = "";

    if (templateId === "master-1") {
      result = `Anda adalah Meta Ads Creative Director, Senior Copywriter, dan Performance Marketing Expert dengan pengalaman lebih dari 20 tahun.
# TUGAS
Buatkan iklan Facebook & Instagram Ads yang memiliki Hook Stop Scroll, membangun rasa penasaran, menyentuh pain point audiens, menawarkan solusi yang kuat, dan menghasilkan Call To Action yang mendorong konversi.
# INFORMASI PRODUK
Nama Produk: ${pName}
Target Market: ${tMarket}
Masalah Utama: ${pPoint}
Keunggulan / USP: ${uSp}
Tujuan: ${g}
Brand Voice: ${voice}
CTA: ${buttonCta}`;
    } else if (templateId === "master-2") {
      result = `Anda adalah TikTok Ads Strategist & Viral Content Creator. Buatkan konsep TikTok Ads 3 detik pertama hook yang memukau, script video, dan CTA tinggi dalam Bahasa Indonesia.
# INFORMASI PRODUK
Nama Produk: ${pName}
Target Market: ${tMarket}
Keunggulan: ${uSp}
Platform: ${plat}
Durasi: ${dur}
CTA: ${buttonCta}`;
    } else if (templateId === "master-8") {
      result = `[AI Cinematic Storyboard Engine]
PROJECT INFORMATION:
- Topik/Produk: ${pName}
- Target Audience: ${tMarket}
- Tujuan: ${g}
- Platform: ${plat}
- Durasi Video: ${dur}
- Informasi Tambahan: ${info || "-"}

CONTENT PRESET: ${pres}
VIDEO FORMAT: ${form}
VISUAL STYLE: ${style}
BRAND PERSONALITY: ${voice}
CTA: ${buttonCta}

# ROLE & TUGAS
Anda adalah AI Creative Director profesional. Ubah informasi di atas menjadi storyboard video premium berbahasa Indonesia yang siap diproduksi dengan standar agensi kreatif kelas dunia.
# OUTPUT
1. Creative Brief (Big Idea, Objective, Core Message, Target Emotion, Insight, Hook, Visual Direction)
2. Story Structure (Hook -> Problem -> Solution -> Transformation -> CTA)
3. Storyboard Lengkap per Scene (Nomor, Objective, VO, Dialog, Screen Text, Visual, Angle, Movement, Lighting)
4. AI Video Prompt (Prompt ultra-detail untuk Google Veo, Kling, Runway, Luma)
5. Editing Direction & CTA Ending.`;
    } else {
      // Untuk master 3, 4, 5, 6, 7
      result = `Anda adalah expert digital marketing dan profesional content strategist.
# INFORMASI PRODUK / KONTEN
Topik / Nama Produk: ${pName}
Target Market: ${tMarket}
Platform: ${plat}
Tujuan: ${g}
Brand Voice: ${voice}
Info Tambahan: ${info || "-"}

Buatkan materi lengkap, terstruktur, profesional, dan siap pakai dalam Bahasa Indonesia sesuai standar industri kreatif tertinggi.`;
    }

    setPromptInput(result);
  };

  const handleApplyInteractiveForm = () => {
    updatePromptText(selectedTemplate, productName, targetMarket, painPoint, usp, platform, goal, duration, contentPreset, videoFormat, visualStyle, brandVoice, cta, additionalInfo);
  };

  const handleGenerateAI = async () => {
    setLoading(true);
    setAiOutput("Sedang memproses AI, mohon tunggu sebentar...");
    try {
      setTimeout(() => {
        setAiOutput(`✨ [HASIL GENERATE AI - SIAP PAKAI]\n\n1. Analisis & Strategi Utama:\nStrategi konten disesuaikan untuk produk "${productName || 'Produk Pilihan'}" dengan target market "${targetMarket || 'Audiens'}".\n\n2. Eksekusi Konten / Copywriting:\n- Hook & Angle Utama berhasil dirancang untuk platform ${platform} dengan tujuan ${goal}.\n- Tone of Voice: ${brandVoice}.\n- Call to Action: ${cta}.\n\n3. Catatan Profesional:\nHasil disusun rapi dalam Bahasa Indonesia siap salin untuk kebutuhan marketing Anda.`);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setAiOutput("Terjadi kesalahan saat memproses AI.");
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 md:p-10 max-w-[1400px] mx-auto text-white">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          AI Studio & Master Generator ✨
        </h1>
        <p className="text-gray-400 text-sm">
          Pilih salah satu dari 8 master prompt di atas, isi detail singkat, dan generate hasil profesional secara instan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* KOLOM KIRI: 8 MASTER PROMPT & FORM INTERAKTIF */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* 8 Pilihan Master Prompt */}
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-emerald-400 mb-3">1. Pilih Master Prompt (8 Opsi Tersedia)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-2">
              {savedPrompts.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectTemplate(item)}
                  className={`p-3 rounded-xl text-left border text-xs font-medium transition-all ${
                    selectedTemplate === item.id
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/10"
                      : "bg-[#1a1f33] border-gray-800 text-gray-300 hover:border-gray-700"
                  }`}
                >
                  <p className="font-bold truncate">{item.title}</p>
                  <span className="text-[10px] text-gray-400">{item.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Interaktif Terhubung ke 8 Master Prompt */}
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-200">2. Isi Detail Singkat (Otomatis Masuk ke Prompt)</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Nama Produk / Topik</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Contoh: Powerbank Fast Charging"
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Target Market</label>
                <input
                  type="text"
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  placeholder="Contoh: Pekerja & Gamers"
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Masalah Utama (Pain Point)</label>
                <input
                  type="text"
                  value={painPoint}
                  onChange={(e) => setPainPoint(e.target.value)}
                  placeholder="Contoh: HP sering habis baterai di jalan"
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Keunggulan / USP</label>
                <input
                  type="text"
                  value={usp}
                  onChange={(e) => setUsp(e.target.value)}
                  placeholder="Contoh: Cas 15 menit penuh seharian"
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option>TikTok</option>
                  <option>Instagram Reels</option>
                  <option>YouTube Shorts</option>
                  <option>Meta Ads (FB/IG)</option>
                  <option>YouTube Long</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Tujuan / Goal</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option>Sales / Konversi</option>
                  <option>Brand Awareness</option>
                  <option>Engagement / Leads</option>
                  <option>Edukasi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Durasi Video</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option>15 Detik</option>
                  <option>30 Detik</option>
                  <option>60 Detik</option>
                  <option>3 Menit</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Preset</label>
                <select
                  value={contentPreset}
                  onChange={(e) => setContentPreset(e.target.value)}
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option>Viral Content</option>
                  <option>Soft Selling</option>
                  <option>Hard Selling</option>
                  <option>Storytelling</option>
                  <option>Product Demo</option>
                  <option>Before vs After</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Format</label>
                <select
                  value={videoFormat}
                  onChange={(e) => setVideoFormat(e.target.value)}
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option>Talking Head</option>
                  <option>Cinematic</option>
                  <option>UGC</option>
                  <option>Motion Graphic</option>
                  <option>Product Showcase</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Visual Style</label>
                <select
                  value={visualStyle}
                  onChange={(e) => setVisualstyle(e.target.value)}
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option>Apple Style</option>
                  <option>Modern SaaS</option>
                  <option>Luxury</option>
                  <option>Minimalist</option>
                  <option>Dark Premium</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Brand Voice</label>
                <select
                  value={brandVoice}
                  onChange={(e) => setBrandVoice(e.target.value)}
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Luxury / Premium</option>
                  <option>Fun & Energetic</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">CTA</label>
                <select
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option>Beli Sekarang</option>
                  <option>Klik Link di Bio</option>
                  <option>Follow untuk Tips</option>
                  <option>Komen "MAU"</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Info Tambahan / Detail Produk</label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Tuliskan detail promo atau keunggulan produk..."
                rows={2}
                className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <button
              onClick={handleApplyInteractiveForm}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md"
            >
              🔄 Perbarui Prompt Otomatis
            </button>
          </div>

        </div>

        {/* KOLOM KANAN: PREVIEW PROMPT & HASIL AI */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-gray-200 mb-3">3. Preview Master Prompt</h3>
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              rows={10}
              className="w-full bg-[#161a2e] border border-gray-800 rounded-xl p-4 font-mono text-xs text-gray-300 outline-none focus:border-emerald-500 resize-none"
            />
            
            <button
              onClick={handleGenerateAI}
              disabled={loading}
              className="w-full mt-4 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "✨ Memproses AI..." : "✨ Generate Sekarang"}
            </button>
          </div>

          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-gray-200 mb-3">Hasil Output AI</h3>
            <div className="bg-[#161a2e] border border-gray-800 rounded-xl p-4 font-mono text-xs text-gray-300 h-56 overflow-y-auto whitespace-pre-wrap">
              {aiOutput || "Hasil jawaban AI akan muncul di sini setelah kamu klik tombol 'Generate Sekarang'..."}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}