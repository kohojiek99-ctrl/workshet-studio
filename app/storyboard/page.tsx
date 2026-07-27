"default client";
"use client";

import { useState } from "react";

export default function StoryboardGeneratorPage() {
  // State untuk Pilihan Master Prompt (1 - 8)
  const [selectedPromptId, setSelectedPromptId] = useState("1");

  // State untuk Input Dinamis Interaktif
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [usp, setUsp] = useState("");
  const [benefit, setBenefit] = useState("");
  const [promo, setPromo] = useState("");
  const [price, setPrice] = useState("");
  
  // State khusus Storyboard / Pilihan Dropdown / Checkbox
  const [topic, setTopic] = useState("");
  const [brandVoice, setBrandVoice] = useState("Professional");
  const [platform, setPlatform] = useState("TikTok");
  const [duration, setDuration] = useState("30 Detik");
  const [contentPreset, setContentPreset] = useState("Viral Content");
  const [videoFormat, setVideoFormat] = useState("Cinematic");
  const [visualStyle, setVisualstyle] = useState("Apple Style");
  const [goal, setGoal] = useState("Sales");
  const [cta, setCta] = useState("Beli Sekarang");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [generatedResult, setGeneratedResult] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Daftar 8 Master Prompt & Kategori Formnya
  const masterPromptsList = [
    { id: "1", title: "1. MASTER PROMPT META ADS (STOP SCROLL)", type: "ads" },
    { id: "2", title: "2. MASTER PROMPT TIKTOK ADS", type: "ads" },
    { id: "3", title: "3. MASTER PROMPT UNIVERSAL", type: "universal" },
    { id: "4", title: "4. MASTER PROMPT CAROUSEL INSTAGRAM", type: "carousel" },
    { id: "5", title: "5. MASTER PROMPT PROMOSI MEDIA SOSIAL", type: "social" },
    { id: "6", title: "6. MASTER PROMPT PRODUK FISIK UMKM", type: "umkm" },
    { id: "7", title: "7. MASTER PROMPT BANNER • SPANDUK • FLYER", type: "design" },
    { id: "8", title: "8. MASTER PROMPT STORYBOARD VIDEO MODE™", type: "storyboard" },
  ];

  // Fungsi Generate Otomatis Berdasarkan Pilihan User
  const handleGeneratePrompt = () => {
    let result = "";

    if (selectedPromptId === "1") {
      result = `Anda adalah Meta Ads Creative Director, Senior Copywriter, Consumer Psychologist, dan Performance Marketing Expert dengan pengalaman lebih dari 20 tahun.
# TUGAS
Buatkan iklan Facebook & Instagram Ads yang memiliki Hook Stop Scroll, membangun rasa penasaran, menyentuh pain point audiens, membangun kepercayaan, menawarkan solusi yang kuat, dan menghasilkan Call To Action yang mendorong konversi.
# INFORMASI PRODUK
Nama Produk: ${productName || "[JUDUL PRODUK]"}
Kategori: ${category || "[KATEGORI]"}
Target Market: ${targetMarket || "[TARGET MARKET]"}
Masalah Utama Audiens: ${painPoint || "[PAIN POINT]"}
Keunggulan Produk: ${usp || "[USP]"}
Benefit: ${benefit || "[BENEFIT]"}
Promo: ${promo || "[PROMO]"}
Harga: ${price || "[HARGA]"}
Brand Voice: ${brandVoice}
Tujuan Iklan: ${goal}
# OUTPUT
Buatkan:
1. 10 Stop Scroll Hook, 2. 5 Primary Text, 3. 5 Headline, 4. 5 Description, 5. 5 CTA, 6. Caption Meta Ads, 7. Emotional Trigger, 8. Psychological Trigger, 9. Angle Marketing terbaik, 10. Rekomendasi Visual, 11. Prompt AI Image, 12. Rekomendasi warna & layout, 13. Saran A/B Testing, 14. Optimasi CTR & Conversion (Bahasa Indonesia natural & persuasive).`;
    } else if (selectedPromptId === "8") {
      result = `[AI Cinematic Storyboard Engine]
PROJECT INFORMATION:
- Topik: ${topic || productName || "Promosi Produk"}
- Target Audience: ${targetMarket || "Umum"}
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
      result = `Anda adalah expert digital marketing dan content creator profesional. 
Topik/Produk: ${productName || topic || "Produk Pilihan"}
Target Market: ${targetMarket || "Audiens Luas"}
Platform: ${platform}
Tujuan: ${goal}
Brand Voice / Style: ${brandVoice}

Buatkan materi lengkap, terstruktur, profesional, dan siap pakai dalam Bahasa Indonesia sesuai standar industri kreatif tertinggi.`;
    }

    setGeneratedResult(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResult);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-8 md:p-10 max-w-[1400px] mx-auto text-white">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          ⚡ Interactive Master Prompt & Storyboard Generator
        </h1>
        <p className="text-gray-400 text-sm">
          Pilih master prompt, isi field atau klik opsi yang tersedia, dan generate prompt otomatis tanpa ketik manual!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* KOLOM KIRI: PILIHAN & INPUT INTERAKTIF */}
        <div className="lg:col-span-7 bg-[#111424] border border-gray-800 rounded-2xl p-6 space-y-6">
          
          {/* Pilih Master Prompt */}
          <div>
            <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              1. Pilih Master Prompt
            </label>
            <select
              value={selectedPromptId}
              onChange={(e) => setSelectedPromptId(e.target.value)}
              className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-3 text-sm text-white font-medium outline-none focus:border-emerald-500"
            >
              {masterPromptsList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <hr className="border-gray-800" />

          {/* Form Input Cepat */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-200">2. Lengkapi Informasi & Pilihan (Tinggal Klik/Isi)</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Nama Produk / Topik</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => { setProductName(e.target.value); setTopic(e.target.value); }}
                  placeholder="Contoh: Powerbank Fast Charging"
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Target Market</label>
                <input
                  type="text"
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  placeholder="Contoh: Pekerja & Gamers 20-35 tahun"
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option>TikTok</option>
                  <option>Instagram Reels</option>
                  <option>YouTube Shorts</option>
                  <option>Meta Ads (FB/IG)</option>
                  <option>YouTube Long</option>
                  <option>LinkedIn</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Tujuan / Goal</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option>Sales / Konversi</option>
                  <option>Brand Awareness</option>
                  <option>Engagement / Leads</option>
                  <option>Edukasi</option>
                  <option>Product Launch</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Durasi Video</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option>15 Detik</option>
                  <option>30 Detik</option>
                  <option>60 Detik</option>
                  <option>3 Menit</option>
                </select>
              </div>
            </div>

            {selectedPromptId === "8" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Content Preset</label>
                    <select
                      value={contentPreset}
                      onChange={(e) => setContentPreset(e.target.value)}
                      className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                    >
                      <option>Viral Content</option>
                      <option>Soft Selling</option>
                      <option>Hard Selling</option>
                      <option>Storytelling</option>
                      <option>Product Demo</option>
                      <option>Before vs After</option>
                      <option>Problem Solution</option>
                      <option>Cinematic Brand Film</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Video Format</label>
                    <select
                      value={videoFormat}
                      onChange={(e) => setVideoFormat(e.target.value)}
                      className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
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
                      className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                    >
                      <option>Apple Style</option>
                      <option>Modern SaaS</option>
                      <option>Luxury</option>
                      <option>Minimalist</option>
                      <option>Dark Premium</option>
                      <option>Futuristic</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Brand Personality</label>
                <select
                  value={brandVoice}
                  onChange={(e) => setBrandVoice(e.target.value)}
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Luxury / Premium</option>
                  <option>Fun & Energetic</option>
                  <option>Bold & Modern</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Call To Action (CTA)</label>
                <select
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option>Beli Sekarang</option>
                  <option>Klik Link di Bio</option>
                  <option>Follow untuk Tips Lainnya</option>
                  <option>Komen "MAU"</option>
                  <option>Download Sekarang</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Informasi Tambahan / USP Produk</label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Tuliskan detail promo, keunggulan khusus, atau pain point audiens..."
                rows={3}
                className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500 resize-none"
              />
            </div>
          </div>

          <button
            onClick={handleGeneratePrompt}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            ✨ Generate Master Prompt Otomatis
          </button>
        </div>

        {/* KOLOM KANAN: HASIL PROMPT SIAP SALIN */}
        <div className="lg:col-span-5 bg-[#111424] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-200">Hasil Prompt Siap Pakai</h3>
              {generatedResult && (
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all"
                >
                  {isCopied ? "✅ Tersalin!" : "📋 Salin Prompt"}
                </button>
              )}
            </div>

            <div className="bg-[#161a2e] border border-gray-800/80 rounded-xl p-4 font-mono text-xs text-gray-300 h-[450px] overflow-y-auto whitespace-pre-wrap">
              {generatedResult || "Silakan atur form di sebelah kiri lalu klik tombol 'Generate Master Prompt Otomatis' untuk melihat hasil instannya di sini..."}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-400">
              Prompt ini sudah dikonfigurasi otomatis dalam <span className="text-emerald-400 font-semibold">Bahasa Indonesia</span> penuh.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}