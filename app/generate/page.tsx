"use client";

import { useState, useEffect } from "react";

export default function GeneratePage() {
  const [savedPrompts, setSavedPrompts] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [promptInput, setPromptInput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Form States (Universal)
  const [productName, setProductName] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [usp, setUsp] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [goal, setGoal] = useState("Sales / Konversi");
  const [brandVoice, setBrandVoice] = useState("Professional");
  const [cta, setCta] = useState("Beli Sekarang");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Form States Khusus Video/Storyboard
  const [videoDuration, setVideoDuration] = useState("5 Detik");
  const [contentPreset, setContentPreset] = useState("Viral Content");
  const [videoFormat, setVideoFormat] = useState("Cinematic");
  const [visualStyle, setVisualstyle] = useState("Apple Style");

  const loadPrompts = () => {
    const savedData = localStorage.getItem("worksheet_master_prompts");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedPrompts(parsed);
          if (!selectedTemplate || !parsed.find((p: any) => p.id === selectedTemplate)) {
            setSelectedTemplate(parsed[0].id);
          }
          return;
        }
      } catch (e) {
        console.error("Error parsing prompts", e);
      }
    }

    // Default Fallback
    const defaultPrompts = [
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
    setSavedPrompts(defaultPrompts);
    setSelectedTemplate(defaultPrompts[0].id);
    localStorage.setItem("worksheet_master_prompts", JSON.stringify(defaultPrompts));
  };

  useEffect(() => {
    loadPrompts();
    window.addEventListener("prompts_updated", loadPrompts);
    return () => {
      window.removeEventListener("prompts_updated", loadPrompts);
    };
  }, []);

  const currentTemplateObj = savedPrompts.find((i) => i.id === selectedTemplate) || savedPrompts[0];
  const isVideoMode = currentTemplateObj?.type === "video";
  const isImageMode = currentTemplateObj?.type === "image";

  // Generator Logika Racikan Prompt Berdasarkan Mode
  useEffect(() => {
    if (!currentTemplateObj) return;

    const pName = productName || "Produk / Topik Pilihan";
    const tMarket = targetMarket || "Audiens Umum";
    const pPoint = painPoint || "Masalah Konsumen";
    const uSp = usp || "Keunggulan Utama";
    const info = additionalInfo || "Tidak ada catatan tambahan";

    let result = "";

    if (isVideoMode) {
      result = `${currentTemplateObj.content}

# DETAIL PROJECT STORYBOARD
- Topik / Produk: ${pName}
- Target Audience: ${tMarket}
- Durasi Video: ${videoDuration}
- Content Preset: ${contentPreset}
- Video Format: ${videoFormat}
- Visual Style: ${visualStyle}
- Catatan Tambahan: ${info}

# TUGAS AI
Bertindaklah sebagai AI Video Director profesional. Berdasarkan master prompt dan detail project di atas, susun storyboard lengkap beserta prompt generasi video AI per scene.`;
    } else if (isImageMode) {
      result = `${currentTemplateObj.content}

# DETAIL VISUAL ASSET
- Nama Objek / Produk: ${pName}
- Target Market / Nuansa: ${tMarket}
- Visual Style: ${visualStyle}
- Detail Tambahan: ${info}

# TUGAS AI
Bertindaklah sebagai AI Image Prompt Engineer. Buatkan prompt generasi gambar (untuk Midjourney, DALL-E, Flux) yang sangat detail, estetik, dan menjual.`;
    } else {
      result = `${currentTemplateObj.content}

# INFORMASI UTAMA
- Nama Produk / Topik: ${pName}
- Target Market: ${tMarket}
- Masalah Utama (Pain Point): ${pPoint}
- Keunggulan (USP): ${uSp}
- Platform: ${platform}
- Tujuan: ${goal}
- Brand Voice: ${brandVoice}
- CTA: ${cta}
- Catatan Tambahan: ${info}

# TUGAS AI
Gunakan instruksi master prompt di atas untuk merumuskan hasil akhir yang profesional, tajam, dan siap pakai dalam Bahasa Indonesia.`;
    }

    setPromptInput(result);
  }, [
    currentTemplateObj, productName, targetMarket, painPoint, usp, 
    platform, goal, brandVoice, cta, additionalInfo, videoDuration, 
    contentPreset, videoFormat, visualStyle
  ]);

  const handleCopyAndOpenGPT = () => {
    if (!promptInput) return;
    navigator.clipboard.writeText(promptInput);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);

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
          Formulir di bawah ini otomatis menyesuaikan dengan kategori & tipe master prompt yang Anda pilih.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* KOLOM KIRI: PILIH MASTER PROMPT & FORM DINAMIS */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-emerald-400 mb-3">1. Pilih Master Prompt (Sinkron Otomatis)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-2">
              {savedPrompts.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedTemplate(item.id)}
                  className={`p-3 rounded-xl text-left border text-xs font-medium transition-all cursor-pointer ${
                    selectedTemplate === item.id
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/10"
                      : "bg-[#1a1f33] border-gray-800 text-gray-300 hover:border-gray-700"
                  }`}
                >
                  <p className="font-bold truncate">{item.title}</p>
                  <span className="text-[10px] text-gray-400 uppercase">{item.category} • {item.type || "text"}</span>
                </button>
              ))}
            </div>
          </div>

          {/* BAGIAN 2: FORM DINAMIS BERDASARKAN TIPE PROMPT */}
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-200">2. Isi Detail Sesuai Kebutuhan</h3>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full font-bold uppercase">
                Mode: {currentTemplateObj?.type || "text"} ({currentTemplateObj?.category})
              </span>
            </div>

            {/* FORM KHUSUS VIDEO / STORYBOARD */}
            {isVideoMode ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Topik / Nama Produk Video</label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Contoh: Powerbank MagSafe"
                      className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Target Audience</label>
                    <input
                      type="text"
                      value={targetMarket}
                      onChange={(e) => setTargetMarket(e.target.value)}
                      placeholder="Contoh: Tech Enthusiast & Traveler"
                      className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Durasi Video</label>
                    <select value={videoDuration} onChange={(e) => setVideoDuration(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none">
                      <option>5 Detik</option><option>15 Detik</option><option>30 Detik</option><option>60 Detik</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Content Preset</label>
                    <select value={contentPreset} onChange={(e) => setContentPreset(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none">
                      <option>Viral Content</option><option>Cinematic Commercial</option><option>Product Showcase</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Visual Style</label>
                    <select value={visualStyle} onChange={(e) => setVisualstyle(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none">
                      <option>Apple Style</option><option>Cyberpunk Neon</option><option>Clean Minimalist</option><option>Warm Cinematic</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : isImageMode ? (
              /* FORM KHUSUS IMAGE / PHOTO ASSET */
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Nama Objek / Produk</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Contoh: Botol Parfum Mewah di atas Batu Marmer"
                    className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Target Market / Nuansa</label>
                    <input
                      type="text"
                      value={targetMarket}
                      onChange={(e) => setTargetMarket(e.target.value)}
                      placeholder="Contoh: Elegan, Mewah, Eksklusif"
                      className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Visual Style</label>
                    <select value={visualStyle} onChange={(e) => setVisualstyle(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none">
                      <option>Photorealistic 8K</option><option>Studio Lighting</option><option>Moody Dark Aesthetic</option><option>Macro Shot</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              /* FORM STANDAR COPYWRITING / ADS */
              <div className="space-y-4">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Masalah Utama (Pain Point)</label>
                    <input
                      type="text"
                      value={painPoint}
                      onChange={(e) => setPainPoint(e.target.value)}
                      placeholder="Contoh: Kulit kusam & flek hitam"
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Platform</label>
                    <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none">
                      <option>TikTok</option><option>Instagram Reels</option><option>YouTube Shorts</option><option>Meta Ads</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Tujuan</label>
                    <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none">
                      <option>Sales / Konversi</option><option>Brand Awareness</option><option>Engagement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Call to Action</label>
                    <select value={cta} onChange={(e) => setCta(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none">
                      <option>Beli Sekarang</option><option>Klik Link di Bio</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs text-gray-400 mb-1">Catatan / Informasi Tambahan (Opsional)</label>
              <input
                type="text"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Contoh: Diskon khusus hari ini gratis ongkir"
                className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"
              />
            </div>

          </div>
        </div>

        {/* KOLOM KANAN: PREVIEW & TOMBOL EKSEKUSI */}
        <div className="lg:col-span-6 space-y-6 flex flex-col">
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-200">3. Hasil Racikan Master Prompt</h3>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Sinkron Aktif</span>
            </div>
            
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              rows={18}
              className="w-full bg-[#161a2e] border border-gray-800 rounded-xl p-4 font-mono text-xs text-gray-300 outline-none focus:border-emerald-500 resize-none mb-4"
            />

            <button
              onClick={handleCopyAndOpenGPT}
              className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isCopied ? "✅ Master Prompt Tersalin & Membuka GPTs..." : "🚀 Salin Master Prompt & Buka Custom GPT"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}