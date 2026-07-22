"use client";

import { useState } from "react";

export default function PromptsPage() {
  const [activeTab, setActiveTab] = useState("storyboard"); 
  const [isGenerating, setIsGenerating] = useState(false);

  // === STATE STORYBOARD BUILDER ===
  const [formBoard, setFormBoard] = useState({
    topik: "", tujuan: "", platform: "", audiens: "",
    karakter: "", gaya: "", warna: "", mood: "",
    slide: "", brand: "", catatan: ""
  });
  const [resultBoard, setResultBoard] = useState<{master: string, caption: string, hashtag: string} | null>(null);

  // === STATE HOOK GENERATOR ===
  const [productName, setProductName] = useState("");
  const [generatedHook, setGeneratedHook] = useState("");

  // === STATE LANDING PAGE BUILDER ===
  const [formLP, setFormLP] = useState({
    produk: "", manfaat: "", penawaran: "", target: ""
  });
  const [resultLP, setResultLP] = useState<{headline: string, body: string, cta: string} | null>(null);

  // === FUNGSI COPY TO CLIPBOARD ===
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Teks berhasil disalin! 📋");
  };

  // === FUNGSI UTAMA MENEMBAK API OPENAI ===
  const callOpenAI = async (promptText: string) => {
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      return data.result;
    } catch (error) {
      alert("Gagal meracik prompt dengan AI: " + error);
      return null;
    }
  };

  // === 1. GENERATE STORYBOARD VIA OPENAI ===
  const handleGenerateStoryboard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formBoard.topik) return;
    setIsGenerating(true);

    const promptText = `Bertindaklah sebagai Creative Director ahli afiliasi dan sosial media. Buat storyboard konten untuk platform ${formBoard.platform || 'Sosial Media'} dengan topik "${formBoard.topik}".
Tujuan konten: ${formBoard.tujuan || 'Campuran'}.
Target Audiens: ${formBoard.audiens || 'Umum'}.

Arahan Visual:
- Karakter Utama: ${formBoard.karakter || 'Tidak spesifik'}
- Gaya Visual: ${formBoard.gaya || 'Modern & Clean'}
- Warna & Mood: ${formBoard.warna || 'Sesuai brand'}, ${formBoard.mood || 'Menarik'}
- Jumlah Slide/Scene: ${formBoard.slide || 'Secukupnya'}

Catatan: ${formBoard.catatan || 'Buat semenarik mungkin, fokus pada hasil akhir (sales outcomes).'}`;

    const aiResult = await callOpenAI(promptText);

    if (aiResult) {
      setResultBoard({
        master: aiResult,
        caption: `Rahasia sukses bikin konten ${formBoard.topik} akhirnya terbongkar! 😍✨\n\nNggak nyangka ternyata sesimpel ini kalau tau polanya. Jangan lupa save postingan ini biar nggak hilang ya!\n\n@${formBoard.brand || 'namabrandkamu'}`,
        hashtag: `#${formBoard.topik.replace(/\s+/g, '')} #${formBoard.platform?.replace(/\s+/g, '') || 'Konten'} #Viral #FYP #Affiliate`
      });
    }
    setIsGenerating(false);
  };

  // === 2. GENERATE HOOK 5S VIA OPENAI ===
  const handleGenerateHook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName) return;
    setIsGenerating(true);

    const promptText = `Buat draf script video pendek berdurasi 5 detik untuk produk/aset "${productName}". 
Fokuskan pada hasil akhir (sales outcomes) yang instan dan langsung memikat perhatian di detik pertama. 
Berikan format: 
1. Arahan Visual
2. Teks Layar Utama yang mencolok
3. Caption singkat untuk TikTok/Reels yang mengarah ke keranjang kuning.`;

    const aiResult = await callOpenAI(promptText);

    if (aiResult) {
      setGeneratedHook(aiResult);
    }
    setIsGenerating(false);
  };

  // === 3. GENERATE LANDING PAGE COPY VIA OPENAI ===
  const handleGenerateLP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formLP.produk) return;
    setIsGenerating(true);

    const promptText = `Buatkan struktur copywriting landing page dengan konversi tinggi untuk produk/jasa: "${formLP.produk}".
Manfaat / Hasil Akhir yang dijanjikan: "${formLP.manfaat || 'Solusi instan bebas ribet'}".
Target Audiens: "${formLP.target || 'Umum'}".
Penawaran / Promo: "${formLP.penawaran || 'Promo spesial hari ini'}".

Berikan hasil dalam 3 bagian terpisah dengan jelas:
1. Headline yang memantik emosi dan fokus hasil akhir.
2. Body Copy yang menjelaskan solusi dan keuntungan.
3. Call to Action (CTA) yang kuat untuk segera membeli.`;

    const aiResult = await callOpenAI(promptText);

    if (aiResult) {
      setResultLP({
        headline: `🔥 Hasil AI Landing Page Copy untuk ${formLP.produk}`,
        body: aiResult,
        cta: `👉 Amankan Penawaran Spesial Ini Sekarang:\n${formLP.penawaran || 'Diskon Spesial Terbatas Khusus Hari Ini!'}\n\n[ KLIK DI SINI UNTUK KLAIM PROMO ]`
      });
    }
    setIsGenerating(false);
  };

  return (
    <div className="p-8 text-white min-h-screen">
      {/* Header & Tabs */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold mb-6">AI Prompt Studio 🧠</h1>
        
        <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-px">
          <button
            onClick={() => setActiveTab("storyboard")}
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === "storyboard" ? "border-emerald-500 text-emerald-400" : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            Storyboard Builder
          </button>
          <button
            onClick={() => setActiveTab("hook")}
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === "hook" ? "border-emerald-500 text-emerald-400" : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            Hook Generator (5s)
          </button>
          <button
            onClick={() => setActiveTab("landingpage")}
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === "landingpage" ? "border-emerald-500 text-emerald-400" : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            LP Copy Builder
          </button>
        </div>
      </div>

      {/* =======================
          TAB 1: STORYBOARD BUILDER 
          ======================= */}
      {activeTab === "storyboard" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#1a1f33] p-6 rounded-2xl border border-gray-800 shadow-sm h-fit">
            <form onSubmit={handleGenerateStoryboard} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-emerald-400 font-semibold border-b border-gray-800 pb-2 flex items-center gap-2">💡 INFORMASI PROYEK</h3>
                <div className="grid grid-cols-1 gap-4">
                  <input type="text" placeholder="Topik / Ide Utama (Wajib)" required className="w-full bg-[#111424] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none text-sm" value={formBoard.topik} onChange={(e) => setFormBoard({...formBoard, topik: e.target.value})} />
                  <input type="text" placeholder="Tujuan Konten (Opsional)" className="w-full bg-[#111424] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none text-sm" value={formBoard.tujuan} onChange={(e) => setFormBoard({...formBoard, tujuan: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Platform (Opsional)" className="w-full bg-[#111424] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none text-sm" value={formBoard.platform} onChange={(e) => setFormBoard({...formBoard, platform: e.target.value})} />
                    <input type="text" placeholder="Target Audiens (Opsional)" className="w-full bg-[#111424] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none text-sm" value={formBoard.audiens} onChange={(e) => setFormBoard({...formBoard, audiens: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-emerald-400 font-semibold border-b border-gray-800 pb-2 flex items-center gap-2">🎨 ARAHAN VISUAL</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Karakter Utama" className="w-full bg-[#111424] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none text-sm" value={formBoard.karakter} onChange={(e) => setFormBoard({...formBoard, karakter: e.target.value})} />
                  <input type="text" placeholder="Gaya Visual (Cinematic, 3D...)" className="w-full bg-[#111424] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none text-sm" value={formBoard.gaya} onChange={(e) => setFormBoard({...formBoard, gaya: e.target.value})} />
                  <input type="text" placeholder="Warna Dominan" className="w-full bg-[#111424] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none text-sm" value={formBoard.warna} onChange={(e) => setFormBoard({...formBoard, warna: e.target.value})} />
                  <input type="text" placeholder="Mood Visual" className="w-full bg-[#111424] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none text-sm" value={formBoard.mood} onChange={(e) => setFormBoard({...formBoard, mood: e.target.value})} />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-emerald-400 font-semibold border-b border-gray-800 pb-2 flex items-center gap-2">📄 PENGATURAN</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Jumlah Slide" className="w-full bg-[#111424] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none text-sm" value={formBoard.slide} onChange={(e) => setFormBoard({...formBoard, slide: e.target.value})} />
                  <input type="text" placeholder="Nama Akun / Brand" className="w-full bg-[#111424] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none text-sm" value={formBoard.brand} onChange={(e) => setFormBoard({...formBoard, brand: e.target.value})} />
                  <textarea placeholder="Catatan Tambahan..." rows={2} className="col-span-2 w-full bg-[#111424] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none text-sm" value={formBoard.catatan} onChange={(e) => setFormBoard({...formBoard, catatan: e.target.value})} />
                </div>
              </div>
              <button type="submit" disabled={isGenerating} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                {isGenerating ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    AI Sedang Meracik Prompt...
                  </>
                ) : "Generate Hasil"}
              </button>
            </form>
          </div>
          <div className="bg-[#1a1f33] p-6 rounded-2xl border border-gray-800 shadow-sm min-h-[500px] flex flex-col">
            <h3 className="text-lg font-serif font-bold mb-6">Hasil Generate AI</h3>
            {resultBoard ? (
              <div className="space-y-6 flex-1">
                <div className="bg-[#111424] border border-gray-700 rounded-xl overflow-hidden">
                  <div className="bg-gray-800/50 px-4 py-2 flex justify-between items-center border-b border-gray-700">
                    <span className="font-semibold text-emerald-400 text-sm flex items-center gap-2">✅ MASTER PROMPT</span>
                    <button onClick={() => copyToClipboard(resultBoard.master)} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md transition-colors">Copy</button>
                  </div>
                  <div className="p-4 text-sm text-gray-300 whitespace-pre-wrap">{resultBoard.master}</div>
                </div>
                <div className="bg-[#111424] border border-gray-700 rounded-xl overflow-hidden">
                  <div className="bg-gray-800/50 px-4 py-2 flex justify-between items-center border-b border-gray-700">
                    <span className="font-semibold text-emerald-400 text-sm flex items-center gap-2">✅ Caption</span>
                    <button onClick={() => copyToClipboard(resultBoard.caption)} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md transition-colors">Copy</button>
                  </div>
                  <div className="p-4 text-sm text-gray-300 whitespace-pre-wrap">{resultBoard.caption}</div>
                </div>
                <div className="bg-[#111424] border border-gray-700 rounded-xl overflow-hidden">
                  <div className="bg-gray-800/50 px-4 py-2 flex justify-between items-center border-b border-gray-700">
                    <span className="font-semibold text-emerald-400 text-sm flex items-center gap-2">✅ Hashtag</span>
                    <button onClick={() => copyToClipboard(resultBoard.hashtag)} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md transition-colors">Copy</button>
                  </div>
                  <div className="p-4 text-sm text-gray-300 whitespace-pre-wrap">{resultBoard.hashtag}</div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-600 border-2 border-dashed border-gray-700 rounded-xl">
                <span className="text-4xl mb-2">📄</span><p className="text-sm">Isi form di samping untuk mulai generate dengan AI</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =======================
          TAB 2: HOOK GENERATOR 
          ======================= */}
      {activeTab === "hook" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-[#1a1f33] p-6 rounded-2xl border border-gray-800 shadow-sm h-fit">
            <form onSubmit={handleGenerateHook}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Nama Produk / Aset</label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required placeholder="Misal: Powerbank 10.000mAh..." className="w-full bg-[#111424] border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors" />
              </div>
              <button type="submit" disabled={isGenerating} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                {isGenerating ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    AI Meracik Hook...
                  </>
                ) : "Generate Hook"}
              </button>
            </form>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1a1f33] p-6 rounded-2xl border border-gray-800 shadow-sm min-h-[250px]">
              <h3 className="text-lg font-serif font-bold mb-4">✨ Hasil AI Hook</h3>
              {generatedHook ? (
                <div className="bg-[#111424] p-5 rounded-xl border border-gray-700 whitespace-pre-line text-gray-300">{generatedHook}</div>
              ) : (
                <div className="flex items-center justify-center h-40 text-gray-600 border-2 border-dashed border-gray-700 rounded-xl">Hasil hook AI akan muncul di sini...</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =======================
          TAB 3: LANDING PAGE BUILDER 
          ======================= */}
      {activeTab === "landingpage" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#1a1f33] p-6 rounded-2xl border border-gray-800 shadow-sm h-fit">
            <form onSubmit={handleGenerateLP} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-emerald-400 font-semibold border-b border-gray-800 pb-2 flex items-center gap-2">🛒 INFO PRODUK & PENAWARAN</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Nama Produk / Jasa</label>
                    <input type="text" placeholder="Misal: Template Notion, Kelas Bisnis..." required className="w-full bg-[#111424] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none text-sm" value={formLP.produk} onChange={(e) => setFormLP({...formLP, produk: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Hasil Akhir yang Dijanjikan (Manfaat Utama)</label>
                    <textarea placeholder="Misal: Bikin kerjaan selesai 2x lebih cepat tanpa perlu pusing mulai dari nol..." rows={2} className="w-full bg-[#111424] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none text-sm" value={formLP.manfaat} onChange={(e) => setFormLP({...formLP, manfaat: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Target Audiens</label>
                      <input type="text" placeholder="Misal: Karyawan sibuk" className="w-full bg-[#111424] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none text-sm" value={formLP.target} onChange={(e) => setFormLP({...formLP, target: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Promo / Harga Khusus</label>
                      <input type="text" placeholder="Misal: Diskon 50% hari ini" className="w-full bg-[#111424] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none text-sm" value={formLP.penawaran} onChange={(e) => setFormLP({...formLP, penawaran: e.target.value})} />
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" disabled={isGenerating} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                {isGenerating ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    AI Menyusun Copywriting...
                  </>
                ) : "Generate Landing Page Copy"}
              </button>
            </form>
          </div>
          
          <div className="bg-[#1a1f33] p-6 rounded-2xl border border-gray-800 shadow-sm min-h-[500px] flex flex-col">
            <h3 className="text-lg font-serif font-bold mb-6">Hasil AI Landing Page</h3>
            {resultLP ? (
              <div className="space-y-6 flex-1">
                <div className="bg-[#111424] border border-gray-700 rounded-xl overflow-hidden">
                  <div className="bg-gray-800/50 px-4 py-2 flex justify-between items-center border-b border-gray-700">
                    <span className="font-semibold text-emerald-400 text-sm flex items-center gap-2">🔥 Headline (Judul)</span>
                    <button onClick={() => copyToClipboard(resultLP.headline)} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md transition-colors">Copy</button>
                  </div>
                  <div className="p-4 text-sm text-gray-300 whitespace-pre-wrap">{resultLP.headline}</div>
                </div>
                <div className="bg-[#111424] border border-gray-700 rounded-xl overflow-hidden">
                  <div className="bg-gray-800/50 px-4 py-2 flex justify-between items-center border-b border-gray-700">
                    <span className="font-semibold text-emerald-400 text-sm flex items-center gap-2">📝 Body Copy (Isi)</span>
                    <button onClick={() => copyToClipboard(resultLP.body)} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md transition-colors">Copy</button>
                  </div>
                  <div className="p-4 text-sm text-gray-300 whitespace-pre-wrap">{resultLP.body}</div>
                </div>
                <div className="bg-[#111424] border border-gray-700 rounded-xl overflow-hidden">
                  <div className="bg-gray-800/50 px-4 py-2 flex justify-between items-center border-b border-gray-700">
                    <span className="font-semibold text-emerald-400 text-sm flex items-center gap-2">🎯 Call to Action (Tombol Beli)</span>
                    <button onClick={() => copyToClipboard(resultLP.cta)} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md transition-colors">Copy</button>
                  </div>
                  <div className="p-4 text-sm text-gray-300 whitespace-pre-wrap">{resultLP.cta}</div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-600 border-2 border-dashed border-gray-700 rounded-xl">
                <span className="text-4xl mb-2">🛒</span><p className="text-sm">Isi form di samping untuk meracik Landing Page dengan AI</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}