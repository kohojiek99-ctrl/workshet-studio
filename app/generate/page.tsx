"use client";

import { useState, useEffect } from "react";

export default function GeneratePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("master-8");
  const [promptInput, setPromptInput] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<any[]>([]);

  // State Form Interaktif untuk Storyboard / Master Prompt
  const [productName, setProductName] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [goal, setGoal] = useState("Sales / Konversi");
  const [duration, setDuration] = useState("30 Detik");
  const [contentPreset, setContentPreset] = useState("Viral Content");
  const [videoFormat, setVideoFormat] = useState("Cinematic");
  const [visualStyle, setVisualstyle] = useState("Apple Style");
  const [brandVoice, setBrandVoice] = useState("Professional");
  const [cta, setCta] = useState("Beli Sekarang");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const defaultTemplates = [
    {
      id: "master-8",
      title: "MASTER PROMPT STORYBOARD VIDEO MODE™",
      category: "AI Video",
      content: `[AI Cinematic Storyboard Engine]
PROJECT INFORMATION:
- Topik/Produk: [PRODUK]
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
Anda adalah AI Creative Director profesional. Ubah informasi di atas menjadi storyboard video premium berbahasa Indonesia yang siap diproduksi dengan standar agensi kreatif kelas dunia.
# OUTPUT
1. Creative Brief (Big Idea, Objective, Core Message, Target Emotion, Insight, Hook, Visual Direction)
2. Story Structure (Hook -> Problem -> Solution -> Transformation -> CTA)
3. Storyboard Lengkap per Scene (Nomor, Objective, VO, Dialog, Screen Text, Visual, Camera Angle, Movement, Lens, Lighting, Composition, Expression, Transition, SFX, Music)
4. AI Video Prompt (Prompt ultra-detail untuk Google Veo, Kling AI, Runway, Luma, Pika, Hailuo)
5. Editing Direction (Pace, cut, subtitle, B-roll, color grading)
6. CTA Ending yang kuat sesuai tujuan.`
    },
    {
      id: "master-1",
      title: "MASTER PROMPT META ADS (STOP SCROLL)",
      category: "Meta Ads",
      content: `Anda adalah Meta Ads Creative Director, Senior Copywriter, dan Performance Marketing Expert. Buatkan iklan Facebook & Instagram Ads dengan Hook Stop Scroll yang kuat, menyentuh pain point, dan menghasilkan konversi tinggi dalam Bahasa Indonesia.
Informasi:
- Nama Produk: [PRODUK]
- Target Market: [TARGET]
- Masalah Utama: [PAIN POINT]
- Keunggulan / USP: [USP]
- Tujuan: [TUJUAN]`
    },
    {
      id: "master-2",
      title: "MASTER PROMPT TIKTOK ADS",
      category: "TikTok Ads",
      content: `Anda adalah TikTok Ads Strategist & Viral Content Creator. Buatkan konsep TikTok Ads 3 detik pertama hook yang memukau, script video, dan CTA tinggi dalam Bahasa Indonesia.
Informasi:
- Nama Produk: [PRODUK]
- Target Market: [TARGET]
- Keunggulan: [USP]`
    },
    {
      id: "master-3",
      title: "MASTER PROMPT UNIVERSAL",
      category: "Universal",
      content: `Anda adalah AI Business Consultant & Marketing Strategist kelas dunia. Berikan analisis mendalam, strategi konten, copywriting, dan format siap pakai dalam Bahasa Indonesia.
Informasi:
- Topik/Tujuan: [PRODUK]
- Target Market: [TARGET]`
    }
  ];

  useEffect(() => {
    try {
      const local = localStorage.getItem("promptItems");
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedPrompts(parsed);
          setPromptInput(parsed[0].content);
          return;
        }
      }
      setSavedPrompts(defaultTemplates);
      setPromptInput(defaultTemplates[0].content);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSelectTemplate = (item: any) => {
    setSelectedTemplate(item.id);
    setPromptInput(item.content);
  };

  const handleApplyInteractiveForm = () => {
    let result = "";
    if (selectedTemplate === "master-8" || selectedTemplate.includes("storyboard") || selectedTemplate.includes("STORYBOARD")) {
      result = `[AI Cinematic Storyboard Engine]
PROJECT INFORMATION:
- Topik/Produk: ${productName || "Produk Pilihan"}
- Target Audience: ${targetMarket || "Audiens Umum"}
- Tujuan: ${goal}
- Platform: ${platform}
- Durasi Video: ${duration}
- Informasi Tambahan: ${additionalInfo || "-"}

CONTENT PRESET: ${contentPreset}
VIDEO FORMAT: ${videoFormat}
VISUAL STYLE: ${visualStyle}
BRAND PERSONALITY: ${brandVoice}
CTA: ${cta}

# ROLE & TUGAS
Anda adalah AI Creative Director profesional. Ubah informasi di atas menjadi storyboard video premium berbahasa Indonesia yang siap diproduksi dengan standar agensi kreatif kelas dunia.
# OUTPUT
1. Creative Brief (Big Idea, Objective, Core Message, Target Emotion, Insight, Hook, Visual Direction)
2. Story Structure (Hook -> Problem -> Solution -> Transformation -> CTA)
3. Storyboard Lengkap per Scene (Nomor, Objective, VO, Dialog, Screen Text, Visual, Camera Angle, Movement, Lens, Lighting, Composition, Expression, Transition, SFX, Music)
4. AI Video Prompt (Prompt ultra-detail untuk Google Veo, Kling AI, Runway, Luma, Pika, Hailuo)
5. Editing Direction (Pace, cut, subtitle, B-roll, color grading)
6. CTA Ending yang kuat sesuai tujuan.`;
    } else {
      result = `Anda adalah expert digital marketing profesional. 
Topik/Produk: ${productName || "Produk Utama"}
Target Market: ${targetMarket || "Target Luas"}
Platform: ${platform}
Tujuan: ${goal}
Brand Voice: ${brandVoice}
Info Tambahan: ${additionalInfo || "-"}

Buatkan materi lengkap, terstruktur, profesional, dan siap pakai dalam Bahasa Indonesia sesuai standar industri kreatif tertinggi.`;
    }

    setPromptInput(result);
  };

  const handleGenerateAI = async () => {
    setLoading(true);
    setAiOutput("Sedang memproses AI, mohon tunggu sebentar...");
    try {
      setTimeout(() => {
        setAiOutput(`✨ [HASIL GENERATE AI - SIAP PAKAI]\n\n1. Creative Brief & Strategi:\nBig Idea berfokus pada keunggulan ${productName || 'produk'} untuk menarik perhatian ${targetMarket || 'audiens'} di platform ${platform}.\n\n2. Struktur Konten & Storyboard:\n- Hook (0-3s): Visual memukau dengan gaya ${visualStyle}.\n- Body: Penyampaian pesan secara ${contentPreset} menggunakan format ${videoFormat}.\n- Call to Action: ${cta}.\n\n3. AI Video Prompt (Ultra-Detail):\nCinematic commercial look, photorealistic, 8k resolution, professional lighting, smooth camera movement, color grading premium ala agensi dunia.`);
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
          AI Studio & Storyboard Generator ✨
        </h1>
        <p className="text-gray-400 text-sm">
          Pilih template, isi form interaktif tanpa ketik manual, dan generate hasil profesional dalam Bahasa Indonesia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* KOLOM KIRI: TEMPLATE & FORM INTERAKTIF */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-emerald-400 mb-3">1. Pilih Master Prompt / Template</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2">
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
                  <span className="text-[10px] text-gray-400">{item.category || "General"}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-200">2. Isi Detail Singkat (Tinggal Klik & Pilih)</h3>

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
                <label className="block text-xs text-gray-400 mb-1">Brand Personality</label>
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
              🔄 Pasang Pilihan ke Master Prompt
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
              rows={8}
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
            <div className="bg-[#161a2e] border border-gray-800 rounded-xl p-4 font-mono text-xs text-gray-300 h-48 overflow-y-auto whitespace-pre-wrap">
              {aiOutput || "Hasil jawaban AI akan muncul di sini setelah kamu klik tombol 'Generate Sekarang'..."}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}