"use client";

import { useState, useEffect } from "react";

export default function GeneratePage() {
  const [savedPrompts, setSavedPrompts] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [promptInput, setPromptInput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Form States
  const [productName, setProductName] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [usp, setUsp] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [goal, setGoal] = useState("Sales / Konversi");
  const [brandVoice, setBrandVoice] = useState("Professional");
  const [cta, setCta] = useState("Beli Sekarang");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [videoDuration, setVideoDuration] = useState("5 Detik"); 
  const [contentPreset, setContentPreset] = useState("Viral Content");
  const [videoFormat, setVideoFormat] = useState("Cinematic");
  const [visualStyle, setVisualstyle] = useState("Apple Style");
  const [imageUrl, setImageUrl] = useState("");

  // Ambil data prompt dari localStorage & Dengarkan sinyal update
  const loadPrompts = () => {
    const savedData = localStorage.getItem("worksheet_master_prompts");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setSavedPrompts(parsed);
      if (parsed.length > 0 && (!selectedTemplate || !parsed.find((p: any) => p.id === selectedTemplate))) {
        setSelectedTemplate(parsed[0].id);
      }
    }
  };

  useEffect(() => {
    loadPrompts();

    // Event listener biar otomatis sinkron saat halaman Prompts diubah
    window.addEventListener("prompts_updated", loadPrompts);
    return () => {
      window.removeEventListener("prompts_updated", loadPrompts);
    };
  }, []);

  const currentTemplateObj = savedPrompts.find((i) => i.id === selectedTemplate) || savedPrompts[0];
  const isVideoMode = currentTemplateObj?.type === "video";
  const isImageMode = currentTemplateObj?.type === "image";

  // Update Teks Prompt Otomatis berdasarkan Form
  useEffect(() => {
    if (!currentTemplateObj) return;

    const pName = productName || "Produk Pilihan";
    const tMarket = targetMarket || "Audiens Umum";
    const pPoint = painPoint || "Masalah Konsumen";
    const uSp = usp || "Keunggulan Produk";
    const info = additionalInfo || "-";

    let result = "";

    if (isVideoMode) {
      result = `${currentTemplateObj.content}
- Platform: ${platform}
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
    } else if (isImageMode) {
      result = `${currentTemplateObj.content}
- Nama Produk: ${pName}
- Referensi Foto / Aset Produk: ${imageUrl || "Gunakan foto produk standar unggulan"}
- Visual Style: ${visualStyle}
- Target Market: ${tMarket}
- Informasi Tambahan: ${info}

# TUGAS
Anda adalah Visual Director dan AI Prompt Engineer. Buatkan prompt generasi gambar serta konsep visual yang menjual dan estetik.`;
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
- Info Tambahan: ${info}

Buatkan materi lengkap, profesional, dan siap pakai dalam Bahasa Indonesia.`;
    }

    setPromptInput(result);
  }, [
    currentTemplateObj, productName, targetMarket, painPoint, usp, 
    platform, goal, brandVoice, cta, additionalInfo, videoDuration, 
    contentPreset, videoFormat, visualStyle, imageUrl
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
          Semua Master Prompt di bawah ini terhubung langsung secara real-time dari menu Prompts Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* KOLOM KIRI: PILIH MASTER PROMPT & FORM */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-emerald-400 mb-3">1. Pilih Master Prompt (Sinkron Otomatis)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-2">
              {savedPrompts.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedTemplate(item.id)}
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
                Mode: {currentTemplateObj?.category || "General"}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Masalah Utama (Pain Point)</label>
                <input
                  type="text"
                  value={painPoint}
                  onChange={(e) => setPainPoint(e.target.value)}
                  placeholder="Contoh: Kulit kusam"
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Keunggulan / USP</label>
                <input
                  type="text"
                  value={usp}
                  onChange={(e) => setUsp(e.target.value)}
                  placeholder="Contoh: Hasil 7 hari"
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
              rows={16}
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