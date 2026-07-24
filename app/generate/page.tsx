"use client";

import { useState, useEffect } from "react";

export default function GeneratePage() {
  const [savedPrompts, setSavedPrompts] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const defaultTemplates = [
    { title: "Hook TikTok Fomo", content: "Buatkan 5 hook video pendek (TikTok/Reels) untuk mempromosikan [PRODUK]. Gunakan gaya bahasa anak muda, berikan efek penasaran yang tinggi dan FOMO (Fear of missing out) di 3 detik pertama." },
    { title: "Caption Jualan Elegan", content: "Buatkan caption Instagram untuk produk [PRODUK]. Gunakan format AIDA (Attention, Interest, Desire, Action). Bahasanya elegan, profesional, tapi tetap mengundang orang untuk klik link di bio." },
    { title: "Ide Konten 7 Hari", content: "Berikan saya ide kalender konten selama 7 hari untuk niche [NICHE/TOPIK]. Formatnya: Hari, Topik, Format (Video/Carousel), dan Call to Action." }
  ];

  useEffect(() => {
    const localPrompts = localStorage.getItem('promptItems');
    if (localPrompts) setSavedPrompts(JSON.parse(localPrompts));
  }, []);

  const handleGenerate = async () => {
    if (inputText.trim() === "") return alert("Isi promptnya dulu bro!");

    setIsGenerating(true);
    setOutputText("");

    try {
      // Manggil server kita sendiri (yang bakal nerusin ke OpenAI pakai kunci Vercel lu)
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputText })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Gagal nyambung ke server");
      }

      setOutputText(data.result);
    } catch (error: any) {
      setOutputText(`❌ Gagal Generate Bro!\n\nError: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto min-h-screen flex flex-col">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2 flex items-center gap-2">
            AI Studio ✨
          </h1>
          <p className="text-gray-400">
            Pilih template, edit prompt, dan langsung generate hasilnya di sini.
          </p>
        </div>
        {/* Tombol API Key dihapus karena kuncinya udah aman nongkrong di Vercel */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl">
           <span className="text-emerald-400 text-sm font-medium">✅ Terhubung ke OpenAI</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 h-full">
        
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-5">
            <h2 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Template Bawaan</h2>
            <div className="flex flex-col gap-3">
              {defaultTemplates.map((tpl, i) => (
                <button 
                  key={i} 
                  onClick={() => setInputText(tpl.content)}
                  className="text-left p-3 rounded-xl bg-[#1a1f33] border border-gray-700/50 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all group"
                >
                  <p className="text-sm font-medium text-white group-hover:text-emerald-400 mb-1">{tpl.title}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{tpl.content}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-5 flex-1 overflow-y-auto max-h-[400px] no-scrollbar">
            <h2 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Prompt Saya (Library)</h2>
            <div className="flex flex-col gap-3">
              {savedPrompts.length === 0 ? (
                <p className="text-xs text-gray-600 text-center py-4">Belum ada prompt yang disimpan di Library.</p>
              ) : (
                savedPrompts.map((p) => (
                  <button 
                    key={p.id} 
                    onClick={() => setInputText(p.content)}
                    className="text-left p-3 rounded-xl bg-[#1a1f33] border border-gray-700/50 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group"
                  >
                    <p className="text-sm font-medium text-white group-hover:text-blue-400 mb-1">{p.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{p.content}</p>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-4 flex flex-col relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Pilih template di kiri atau ketik prompt kamu di sini bro..."
              className="w-full bg-transparent text-white placeholder-gray-600 outline-none resize-none h-40 text-sm leading-relaxed"
            />
            <div className="flex justify-between items-center pt-3 border-t border-gray-800/50 mt-2">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <i>💡 Tip: Ganti kata di dalam kurung [PRODUK] sebelum generate.</i>
              </span>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !inputText}
                className={`px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                  isGenerating 
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                  : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                }`}
              >
                {isGenerating ? (
                  <><span className="animate-spin">🔄</span> Generating...</>
                ) : (
                  <>✨ Generate Sekarang</>
                )}
              </button>
            </div>
          </div>

          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6 flex-1 min-h-[300px] flex flex-col relative group">
            {outputText ? (
              <>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(outputText);
                    alert("Hasil udah di-copy bro!");
                  }}
                  className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-700 transition-all opacity-0 group-hover:opacity-100"
                >
                  📋 Copy Hasil
                </button>
                <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {outputText}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-50 mt-10">
                <span className="text-5xl mb-4">🤖</span>
                <p className="text-gray-400 text-sm">Hasil jawaban AI bakal muncul di sini.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}