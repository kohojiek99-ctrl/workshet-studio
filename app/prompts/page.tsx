"use client";

import { useState, useEffect } from "react";

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // State Form Modal
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Universal");
  const [type, setType] = useState("text");
  const [content, setContent] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("worksheet_master_prompts");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPrompts(parsed);
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
    setPrompts(defaultPrompts);
    localStorage.setItem("worksheet_master_prompts", JSON.stringify(defaultPrompts));
  }, []);

  const saveAndSync = (updatedData: any[]) => {
    setPrompts(updatedData);
    localStorage.setItem("worksheet_master_prompts", JSON.stringify(updatedData));
    window.dispatchEvent(new Event("prompts_updated"));
  };

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setTitle("");
    setCategory("Universal");
    setType("text");
    setContent("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    const item = prompts[index];
    setEditingIndex(index);
    setTitle(item.title);
    setCategory(item.category);
    setType(item.type || "text");
    setContent(item.content);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    if (confirm("Yakin ingin menghapus master prompt ini, bro?")) {
      const updated = prompts.filter((_, i) => i !== index);
      saveAndSync(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Judul dan Konten Prompt wajib diisi ya, bro!");
      return;
    }

    const newItem = {
      id: `master-${Date.now()}`,
      title,
      category,
      type,
      content
    };

    if (editingIndex !== null) {
      const updated = [...prompts];
      updated[editingIndex] = { ...updated[editingIndex], ...newItem };
      saveAndSync(updated);
    } else {
      const updated = [...prompts, newItem];
      saveAndSync(updated);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 max-w-[1400px] mx-auto text-white space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#111424] border border-gray-800 rounded-3xl p-6 sm:p-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            ⚡ Master Prompts Manager
          </h1>
          <p className="text-gray-400 text-sm">
            Semua prompt yang Anda buat atau edit di sini akan otomatis sinkron langsung ke halaman AI Studio.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
        >
          ➕ Tambah Master Prompt Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prompts.map((item, index) => (
          <div key={index} className="bg-[#111424] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-full">
                  {item.category}
                </span>
                <span className="text-xs text-indigo-400 uppercase font-bold">{item.type || "text"} mode</span>
              </div>
              <h3 className="font-bold text-base text-white">{item.title}</h3>
              <p className="text-xs text-gray-400 font-mono bg-[#161a2e] p-3 rounded-xl border border-gray-800 line-clamp-3">
                {item.content}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-800/80">
              <button
                onClick={() => handleOpenEdit(index)}
                className="px-4 py-2 rounded-xl font-bold text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500 hover:text-white transition-all cursor-pointer"
              >
                ✏️ Edit Prompt
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="px-4 py-2 rounded-xl font-bold text-xs bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
              >
                🗑️ Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL TAMBAH / EDIT PROMPT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111424] border border-gray-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {editingIndex !== null ? "✏️ Edit Master Prompt" : "➕ Tambah Master Prompt Baru"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white text-lg">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Judul Master Prompt</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: 9. MASTER PROMPT YOUTUBE SCRIPTS"
                  className="w-full bg-[#161a2e] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Kategori</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Contoh: YouTube"
                    className="w-full bg-[#161a2e] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Tipe Engine</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-[#161a2e] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                  >
                    <option value="text">Text / Copywriting</option>
                    <option value="video">Video Storyboard Engine</option>
                    <option value="image">Image / Photo Asset</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Isi Master Prompt Utama</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan instruksi dasar/core prompt di sini..."
                  rows={6}
                  className="w-full bg-[#161a2e] border border-gray-700 rounded-xl p-4 text-xs font-mono text-gray-300 outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-3 rounded-xl font-bold text-xs bg-gray-800 hover:bg-gray-700 text-white transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-600 text-white transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  Simpan & Sinkronkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}