"use client";

import { useState, useEffect } from "react";

export default function GeneratePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("master-8");
  const [promptInput, setPromptInput] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<any[]>([]);
  
  // State untuk efek Tombol Copy
  const [isCopied, setIsCopied] = useState(false);

  // State Form Interaktif Umum
  const [productName, setProductName] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [usp, setUsp] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [goal, setGoal] = useState("Sales / Konversi");
  const [brandVoice, setBrandVoice] = useState("Professional");
  const [cta, setCta] = useState("Beli Sekarang");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // State Khusus Video (Master 8)
  const [videoDuration, setVideoDuration] = useState("5 Detik"); 
  const [contentPreset, setContentPreset] = useState("Viral Content");
  const [videoFormat, setVideoFormat] = useState("Cinematic");
  const [visualStyle, setVisualstyle] = useState("Apple Style");

  // State Khusus Foto / Gambar
  const [imageUrl, setImageUrl] = useState("");

  const defaultTemplates = [
    {
      id: "master-1",
      title: "1. MASTER PROMPT META ADS (STOP SCROLL)",
      category: "Meta Ads",
      type: "text",
      content: `Anda adalah Meta Ads Creative Director, Senior Copywriter, dan Performance Marketing Expert. Buatkan iklan Facebook & Instagram Ads dengan Hook Stop Scroll yang kuat, menyentuh pain point, dan menghasilkan konversi tinggi dalam Bahasa Indonesia.`
    },
    {
      id: "master-2",
      title: "2. MASTER PROMPT TIKTOK ADS",
      category: "TikTok Ads",
      type: "text",
      content: `Anda adalah TikTok Ads Strategist & Viral Content Creator. Buatkan konsep TikTok Ads 3 detik pertama hook yang memukau, script video, dan CTA tinggi dalam Bahasa Indonesia.`
    },
    {
      id: "master-3",
      title: "3. MASTER PROMPT UNIVERSAL",
      category: "Universal",
      type: "text",
      content: `Anda adalah AI Business Consultant & Marketing Strategist kelas dunia. Berikan analisis mendalam, strategi konten, copywriting, dan format siap pakai dalam Bahasa Indonesia.`
    },
    {
      id: "master-4",
      title: "4. MASTER PROMPT CAROUSEL INSTAGRAM",
      category: "Instagram",
      type: "text",
      content: `Anda adalah Instagram Growth Expert & Content Designer. Buatkan teks carousel Instagram edukatif atau promosi dari slide 1 sampai slide terakhir yang memiliki tingkat save & share tinggi.`
    },
    {
      id: "master-5",
      title: "5. MASTER PROMPT PROMOSI MEDIA SOSIAL",
      category: "Social Media",
      type: "text",
      content: `Anda adalah Social Media Manager profesional. Buatkan caption postingan media sosial yang engaging, interaktif, dan dilengkapi hashtag tertarget.`
    },
    {
      id: "master-6",
      title: "6. MASTER PROMPT FOTO PRODUK / VISUAL ASSET",
      category: "Image/Photo",
      type: "image",
      content: `Anda adalah AI Midjourney / DALL-E Prompt Engineer kelas dunia. Buatkan prompt visual estetis tingkat tinggi untuk produk berdasarkan referensi foto/aset yang diunggah.`
    },
    {
      id: "master-7",
      title: "7. MASTER PROMPT COPYWRITING PENJUALAN",
      category: "Copywriting",
      type: "text",
      content: `Anda adalah Direct Response Copywriter legendaris. Buatkan sales letter atau naskah penawaran menggunakan formula AIDA yang mematikan.`
    },
    {
      id: "master-8",
      title: "8. MASTER PROMPT STORYBOARD VIDEO MODE™",
      category: "AI Video",
      type: "video",
      content: `[AI Cinematic Storyboard Engine]
PROJECT INFORMATION:
- Topik/Produk: [PRODUK]
- Target Audience: [TARGET]
- Tujuan: [TUJUAN]
- Durasi Video: [DURASI]`
    }
  ];

  // Load Templates: Ambil default & coba ambil data custom dari localStorage (Koneksi ke halaman Prompts)
  useEffect(() => {
    try {
      const localData = localStorage.getItem("custom_prompts"); // Sesuaikan nama key dengan yang ada di halaman Prompts lu
      if (localData) {
        const parsedCustom = JSON.parse(localData);
        if (Array.isArray(parsedCustom) && parsedCustom.length > 0) {
          setSavedPrompts([...defaultTemplates, ...parsedCustom]);
          return;
        }
      }
    } catch (error) {
      console.log("Gagal load custom prompts", error);
    }
    // Jika tidak ada di local storage, pakai default saja
    setSavedPrompts(defaultTemplates);
  }, []);

  const handleSelectTemplate = (item: any) => {
    setSelectedTemplate(item.id);
  };

  const updatePromptText = (item: any) => {
    if (!item) return;
    const pName = productName || "Produk Pilihan";
    const tMarket = targetMarket || "Audiens Umum";
    const pPoint = painPoint || "Masalah Konsumen";
    const uSp = usp || "Keunggulan Produk";
    const info = additionalInfo || "-";

    let result = "";

    if (item.type === "video") {
      result = `[AI Cinematic Storyboard Engine]
PROJECT INFORMATION:
- Topik/Produk: ${pName}
- Target Audience: ${tMarket}
- Tujuan: ${goal}
- Platform: ${platform}
- Durasi Video: ${videoDuration}
- Informasi Tambahan: ${info}

CONTENT PRESET: ${contentPreset}
VIDEO FORMAT: ${videoFormat}
VISUAL STYLE: ${visualStyle}
BRAND PERSONALITY: ${brandVoice}
CTA: ${cta}

# ROLE & TUGAS
Anda adalah AI Creative Director profesional. Ubah informasi di atas menjadi storyboard video premium berbahasa Indonesia dengan standar agensi dunia.
# OUTPUT
1. Creative Brief (Big Idea, Hook, Visual Direction)
2. Story Structure & Storyboard Lengkap per Scene
3. AI Video Prompt (Prompt ultra-detail untuk Veo, Kling, Runway, Luma berdurasi ${videoDuration})
4. Editing Direction & CTA Ending.`;
    } else if (item.type === "image") {
      result = `[AI Visual & Photo Asset Generator]
- Nama Produk: ${pName}
- Referensi Foto / Aset Produk: ${imageUrl || "Gunakan foto produk standar unggulan"}
- Visual Style: ${visualStyle}
- Target Market: ${tMarket}
- Informasi Tambahan: ${info}

# TUGAS
Anda adalah Visual Director dan AI Prompt Engineer. Buatkan prompt generasi gambar (untuk Midjourney, DALL-E, atau Stable Diffusion) serta konsep visual yang menjual, estetik, dan sesuai dengan brand personality (${brandVoice}).`;
    } else {
      result = `${item.content}
# INFORMASI UTAMA
- Nama Produk / Topik: ${pName}
- Target Market: ${tMarket}
- Masalah Utama (Pain Point): ${pPoint}
- Keunggulan (USP): ${uSp}
- Platform: ${platform}
- Tujuan: ${goal}
- Brand Voice: ${brandVoice}
- CTA: ${cta}
- Info Tambahan: ${info}

Buatkan materi lengkap, profesional, dan siap pakai dalam Bahasa Indonesia.`;
    }

    setPromptInput(result);
  };

  // Efek Real-time Otomatis
  useEffect(() => {
    const currentActiveTemplate = savedPrompts.find((i) => i.id === selectedTemplate) || savedPrompts[7] || defaultTemplates[7];
    updatePromptText(currentActiveTemplate);
  }, [
    selectedTemplate, savedPrompts, productName, targetMarket, painPoint, 
    usp, platform, goal, brandVoice, cta, additionalInfo, videoDuration, 
    contentPreset, videoFormat, visualStyle, imageUrl
  ]);

  const currentTemplateObj = savedPrompts.find((i) => i.id === selectedTemplate) || savedPrompts[7] || defaultTemplates[7];
  const isVideoMode = currentTemplateObj?.type === "video";
  const isImageMode = currentTemplateObj?.type === "image";

  // Dummy fungsi Generate AI (Tetap seperti sebelumnya)
  const handleGenerateAI = async () => {
    setLoading(true);
    setAiOutput("Sedang memproses AI, mohon tunggu sebentar...");
    try {
      setTimeout(() => {
        setAiOutput(`✨ [HASIL GENERATE AI - SIAP PAKAI]\n\n1. Analisis & Konsep Utama:\nBerhasil memproses materi untuk "${productName || 'Produk'}" menggunakan ${currentTemplateObj.title}.\n\n${isVideoMode ? `- Durasi Video: ${videoDuration}\n- Visual Style: ${visualStyle}\n- Format: ${videoFormat}` : ''}\n${isImageMode ? `- Referensi Foto: ${imageUrl || 'Menggunakan foto default'}\n- Style Visual: ${visualStyle}` : ''}\n\n2. Hasil Eksekusi:\nSeluruh naskah, struktur, dan prompt AI telah disusun secara profesional dalam Bahasa Indonesia.\n\n*Catatan: Kamu bisa langsung mengedit teks ini!`);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setAiOutput("Terjadi kesalahan saat memproses AI.");
      setLoading(false);
    }
  };

  // 🔥 FUNGSI COPY TO CLIPBOARD
  const handleCopyOutput = () => {
    if (!aiOutput) return;
    navigator.clipboard.writeText(aiOutput);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Pesan "Tersalin!" hilang setelah 2 detik
  };

  return (
    <div className="p-4 sm:p-8 md:p-10 max-w-[1400px] mx-auto text-white">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          AI Studio & Master Generator ✨
        </h1>
        <p className="text-gray-400 text-sm">
          Pilih master prompt sesuai kebutuhan (Copywriting, Foto Produk, atau Video Storyboard) dan form akan menyesuaikan otomatis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* KOLOM KIRI: MASTER PROMPT & FORM DINAMIS */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-emerald-400 mb-3">1. Pilih Master Prompt</h3>
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

          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-200">2. Isi Detail Sesuai Mode Aktif</h3>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full font-bold uppercase">
                Mode: {currentTemplateObj?.category || "Unknown"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Nama Produk / Topik</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Contoh: Serum Wajah Glowing"
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Target Market</label>
                <input
                  type="text"
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  placeholder="Contoh: Wanita 20-35 tahun"
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {isImageMode && (
              <div className="bg-[#161a2e] p-4 rounded-xl border border-indigo-500/30 space-y-2">
                <label className="block text-xs text-indigo-300 font-bold">🖼️ Link / URL Foto Produk Sendiri (Opsional)</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/foto-produk-saya.jpg"
                  className="w-full bg-[#111424] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {!isVideoMode && !isImageMode && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Masalah Utama (Pain Point)</label>
                  <input
                    type="text"
                    value={painPoint}
                    onChange={(e) => setPainPoint(e.target.value)}
                    placeholder="Contoh: Kulit kusam & jerawat"
                    className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Keunggulan / USP</label>
                  <input
                    type="text"
                    value={usp}
                    onChange={(e) => setUsp(e.target.value)}
                    placeholder="Contoh: Cerah dalam 7 hari"
                    className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Platform</label>
                <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500">
                  <option>TikTok</option><option>Instagram Reels</option><option>YouTube Shorts</option><option>Meta Ads (FB/IG)</option><option>Website / Landing Page</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Tujuan / Goal</label>
                <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500">
                  <option>Sales / Konversi</option><option>Brand Awareness</option><option>Engagement / Leads</option><option>Edukasi</option>
                </select>
              </div>
              {isVideoMode ? (
                <div>
                  <label className="block text-xs text-emerald-400 font-bold mb-1">Durasi Video AI</label>
                  <select value={videoDuration} onChange={(e) => setVideoDuration(e.target.value)} className="w-full bg-[#1a1f33] border border-emerald-500/50 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500">
                    <option>5 Detik</option><option>10 Detik</option><option>15 Detik</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Brand Voice</label>
                  <select value={brandVoice} onChange={(e) => setBrandVoice(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500">
                    <option>Professional</option><option>Friendly</option><option>Luxury / Premium</option><option>Fun & Energetic</option>
                  </select>
                </div>
              )}
            </div>

            {isVideoMode && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Preset Konten</label>
                  <select value={contentPreset} onChange={(e) => setContentPreset(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500">
                    <option>Viral Content</option><option>Storytelling</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Format Video</label>
                  <select value={videoFormat} onChange={(e) => setVideoFormat(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500">
                    <option>Cinematic</option><option>UGC Style</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Visual Style</label>
                  <select value={visualStyle} onChange={(e) => setVisualstyle(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500">
                    <option>Apple Style</option><option>Minimalist</option>
                  </select>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isVideoMode && (
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Brand Voice</label>
                  <select value={brandVoice} onChange={(e) => setBrandVoice(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500">
                    <option>Professional</option><option>Friendly</option>
                  </select>
                </div>
              )}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Call to Action (CTA)</label>
                <select value={cta} onChange={(e) => setCta(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500">
                  <option>Beli Sekarang</option><option>Klik Link di Bio</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Info Tambahan / Detail Khusus</label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Tuliskan catatan khusus..."
                rows={2}
                className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-emerald-500 resize-none"
              />
            </div>
          </div>

        </div>

        {/* KOLOM KANAN: PREVIEW PROMPT & HASIL AI */}
        <div className="lg:col-span-6 space-y-6 flex flex-col">
          
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

          {/* KOTAK HASIL OUTPUT AI YANG BISA DI-EDIT DAN DI-COPY */}
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-200">Hasil Output AI</h3>
              
              {/* TOMBOL COPY */}
              <button
                onClick={handleCopyOutput}
                disabled={!aiOutput} // Disable kalau output masih kosong
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isCopied
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-[#1a1f33] text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500"
                } ${!aiOutput && "opacity-50 cursor-not-allowed"}`}
              >
                {isCopied ? "✅ Tersalin!" : "📋 Salin Hasil"}
              </button>
            </div>
            
            {/* TEXTAREA AGAR HASIL AI BISA DI-EDIT USER */}
            <textarea
              value={aiOutput}
              onChange={(e) => setAiOutput(e.target.value)}
              placeholder="Hasil jawaban AI akan muncul di sini... Setelah muncul, kamu bisa langsung mengetik dan mengedit teks di kotak ini."
              className="w-full flex-1 min-h-[200px] bg-[#161a2e] border border-gray-800 rounded-xl p-4 font-mono text-xs text-gray-300 whitespace-pre-wrap outline-none focus:border-emerald-500 resize-none"
            />
          </div>

        </div>

      </div>
    </div>
  );
}