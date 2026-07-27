"use client";

import { useState, useEffect } from "react";

export default function GeneratePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("master-8");
  const [promptInput, setPromptInput] = useState("");
  const [savedPrompts, setSavedPrompts] = useState<any[]>([]);
  
  // State untuk efek Animasi Salin
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

  useEffect(() => {
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

  // 🚀 FUNGSI UTAMA: SALIN PROMPT DAN OTOMATIS BUKA CUSTOM GPT PROMPTCINEMA LU
  const handleCopyAndOpenGPT = () => {
    if (!promptInput) return;
    
    // 1. Salin teks ke clipboard
    navigator.clipboard.writeText(promptInput);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);

    // 2. Membuka Custom GPT PromptCinema Studio™ Pro di tab baru browser
    const customGPTUrl = "https://chatgpt.com/g/g-6a51bd07e8a081918f285736213bdf14-promptcinema-studiotm-pro"; 
    window.open(customGPTUrl, "_blank");
  };

  return (
    <div className="p-4 sm:p-8 md:p-10 max-w-[1400px] mx-auto text-white">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          AI Studio & Master Generator ✨
        </h1>
        <p className="text-gray-400 text-sm">
          Isi form interaktif di bawah, sistem akan meracik Master Prompt secara instan untuk dieksekusi di Custom GPT eksklusif Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* KOLOM KIRI: FORM & MASTER PROMPT PILIHAN */}
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
              <h3 className="text-sm font-bold text-gray-200">2. Isi Detail Sesuai Kebutuhan</h3>
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

        {/* KOLOM KANAN: PREVIEW MASTER PROMPT & TOMBOL EKSEKUSI KE CUSTOM GPT */}
        <div className="lg:col-span-6 space-y-6 flex flex-col">
          
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-200">3. Hasil Racikan Master Prompt</h3>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Siap Salin & Eksekusi</span>
            </div>
            
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              rows={14}
              className="w-full bg-[#161a2e] border border-gray-800 rounded-xl p-4 font-mono text-xs text-gray-300 outline-none focus:border-emerald-500 resize-none mb-4"
            />

            {/* TOMBOL UTAMA: SALIN DAN LANGSUNG BUKA CUSTOM GPT PROMPTCINEMA */}
            <button
              onClick={handleCopyAndOpenGPT}
              className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isCopied ? "✅ Master Prompt Tersalin & Membuka GPTs..." : "🚀 Salin Master Prompt & Buka PromptCinema Pro"}
            </button>
            <p className="text-center text-[11px] text-gray-400 mt-2">
              💡 Klik tombol di atas untuk menyalin prompt secara otomatis sekaligus membuka Custom GPT PromptCinema Studio™ Pro Anda di tab baru.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}