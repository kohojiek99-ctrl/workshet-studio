"use client";

import { useState, useEffect } from "react";

export default function GeneratePage() {
  const [savedPrompts, setSavedPrompts] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // State untuk modal/form Tambah & Edit Prompt
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const defaultTemplates = [
    { title: "Hook TikTok Fomo", content: "Buatkan 5 hook video pendek (TikTok/Reels) untuk mempromosikan [PRODUK]. Gunakan gaya bahasa anak muda, berikan efek penasaran yang tinggi dan FOMO (Fear of missing out) di 3 detik pertama." },
    { title: "Caption Jualan Elegan", content: "Buatkan caption Instagram untuk produk [PRODUK]. Gunakan format AIDA (Attention, Interest, Desire, Action). Bahasanya elegan, profesional, tapi tetap mengundang orang untuk klik link di bio." },
    { title: "Ide Konten 7 Hari", content: "Berikan saya ide kalender konten selama 7 hari untuk niche [NICHE/TOPIK]. Formatnya: Hari, Topik, Format (Video/Carousel), dan Call to Action." }
  ];

  // Load Prompt dari localStorage
  useEffect(() => {
    const localPrompts = localStorage.getItem('promptItems');
    if (localPrompts) {
      try {
        setSavedPrompts(JSON.parse(localPrompts));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Simpan perubahan ke localStorage
  const saveToLocalStorage = (newPrompts: any[]) => {
    setSavedPrompts(newPrompts);
    localStorage.setItem('promptItems', JSON.stringify(newPrompts));
  };

  // Fungsi Tambah / Edit Prompt
  const handleSavePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTitle || !modalContent) return alert("Judul dan isi prompt wajib diisi!");

    if (editingId) {
      // Mode Edit
      const updated = savedPrompts.map(p => p.id === editingId ? { ...p, title: modalTitle, content: modalContent } : p);
      saveToLocalStorage(updated);
    } else {
      // Mode Tambah Baru
      const newPrompt = {
        id: Date.now().toString(),
        title: modalTitle,
        content: modalContent,
        category: "Custom"
      };
      saveToLocalStorage([newPrompt, ...savedPrompts]);
    }

    closeModal();
  };

  const openAddModal = () => {
    setEditingId(null);
    setModalTitle("");
    setModalContent("");
    setIsModalOpen(true);
  };

  const openEditModal = (p: any, e: React.MouseEvent) => {
    e.stopPropagation(); // Biar tidak kepilih langsung ke textarea
    setEditingId(p.id);
    setModalTitle(p.title);
    setModalContent(p.content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setModalTitle("");
    setModalContent("");
  };

  // Fungsi Hapus Prompt
  const handleDeletePrompt = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Yakin ingin menghapus prompt ini dari library?")) {
      const filtered = savedPrompts.filter(p => p.id !== id);
      saveToLocalStorage(filtered);
    }
  };

  // Fungsi Generate AI via Backend API
  const handleGenerate = async () => {
    if (inputText.trim() === "") return alert("Isi promptnya dulu bro!");

    setIsGenerating(true);
    setOutputText("");

    try {
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
    <div className="p-10 max-w-[1400px] mx-auto text-white">
      
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2 flex items-center gap-2">
            AI Studio ✨
          </h1>
          <p className="text-gray-400">
            Pilih template, kelola prompt library, dan generate hasilnya langsung di sini.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openAddModal}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <span>➕</span> Tambah Prompt Baru
          </button>
          <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl">
             <span className="text-emerald-400 text-sm font-medium">✅ Terhubung ke OpenAI</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Kolom Kiri: Template & Library */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          
          {/* Template Bawaan */}
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

          {/* Prompt Saya (Library dengan Fitur Edit & Hapus) */}
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-5 overflow-y-auto max-h-[400px]">
            <h2 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Prompt Saya (Library)</h2>
            <div className="flex flex-col gap-3">
              {savedPrompts.length === 0 ? (
                <p className="text-xs text-gray-600 text-center py-4">Belum ada prompt yang disimpan. Klik tombol tambah di atas!</p>
              ) : (
                savedPrompts.map((p) => (
                  <div 
                    key={p.id} 
                    onClick={() => setInputText(p.content)}
                    className="text-left p-3 rounded-xl bg-[#1a1f33] border border-gray-700/50 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group cursor-pointer relative"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium text-white group-hover:text-blue-400 pr-12">{p.title}</p>
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                        <button 
                          onClick={(e) => openEditModal(p, e)} 
                          className="p-1 text-gray-400 hover:text-white text-xs bg-gray-800/80 rounded"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={(e) => handleDeletePrompt(p.id, e)} 
                          className="p-1 text-red-400 hover:text-red-300 text-xs bg-gray-800/80 rounded"
                          title="Hapus"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">{p.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Kolom Kanan: Input & Hasil AI */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          
          {/* Kotak Textarea Input */}
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-4 flex flex-col relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Pilih template/library di kiri atau ketik prompt kamu di sini bro..."
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

          {/* Kotak Hasil AI + Tombol Salin */}
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6 flex-1 min-h-[300px] flex flex-col relative group">
            {outputText ? (
              <>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(outputText);
                    alert("Hasil berhasil disalin ke clipboard! 📋");
                  }}
                  className="absolute top-4 right-4 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-emerald-500/30 transition-all flex items-center gap-1.5 shadow"
                >
                  <span>📋</span> Salin Hasil
                </button>
                <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap pt-2">
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

      {/* MODAL TAMBAH / EDIT PROMPT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111424] border border-gray-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingId ? "✏️ Edit Prompt Library" : "➕ Tambah Prompt Baru"}
            </h3>
            
            <form onSubmit={handleSavePrompt} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Judul Prompt</label>
                <input 
                  type="text"
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  placeholder="Contoh: Hook Promosi Affiliate TikTok"
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Isi Prompt</label>
                <textarea 
                  rows={5}
                  value={modalContent}
                  onChange={(e) => setModalContent(e.target.value)}
                  placeholder="Tulis instruksi atau prompt AI di sini..."
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-gray-800">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                >
                  Simpan Prompt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}