"use client";

import { useState, useEffect } from "react";

export default function PromptsPage() {
  // --- STATE KATEGORI ---
  const defaultCategories = ["Semua", "Copywriting", "Video Script", "SEO", "Ide Konten"];
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // --- STATE PROMPT ---
  const [prompts, setPrompts] = useState<any[]>([]);
  
  // --- STATE MODAL (Buat ngetik prompt panjang) ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentPrompt, setCurrentPrompt] = useState({ id: 0, title: "", content: "", category: "" });

  // Load data pas pertama kali buka
  useEffect(() => {
    const savedCats = localStorage.getItem('promptCategories');
    const savedPrompts = localStorage.getItem('promptItems');
    
    setCategories(savedCats ? JSON.parse(savedCats) : defaultCategories);
    if (savedPrompts) {
      setPrompts(JSON.parse(savedPrompts));
    } else {
      // Data dummy awal biar nggak kosong banget
      setPrompts([
        { id: 1, title: "Prompt Hook TikTok", content: "Buatkan 5 hook video TikTok yang memancing rasa penasaran audiens tentang produk [NAMA PRODUK]. Gunakan bahasa gaul anak Jaksel dan beri penekanan pada rasa FOMO (Fear of Missing Out).", category: "Video Script", date: "24 Jul" }
      ]);
    }
  }, []);

  // Fungsi simpan otomatis ke memori browser
  const saveCategories = (cats: string[]) => {
    setCategories(cats);
    localStorage.setItem('promptCategories', JSON.stringify(cats));
  };
  const savePrompts = (newPrompts: any[]) => {
    setPrompts(newPrompts);
    localStorage.setItem('promptItems', JSON.stringify(newPrompts));
  };

  // ==========================================
  // LOGIKA KATEGORI (Sama persis kayak Assets)
  // ==========================================
  const handleAddCategory = () => {
    if (newCategoryName.trim() !== "") {
      saveCategories([...categories, newCategoryName.trim()]);
      setActiveCategory(newCategoryName.trim());
      setNewCategoryName("");
      setIsAddingCategory(false);
    }
  };

  const handleEditCategory = (oldCatName: string) => {
    if (oldCatName === "Semua") return;
    const newName = window.prompt(`Ganti nama kategori "${oldCatName}" jadi apa bro?`, oldCatName);
    
    if (!newName || newName.trim() === "" || newName === oldCatName) return;
    
    const updatedCategories = categories.map((cat) => (cat === oldCatName ? newName.trim() : cat));
    saveCategories(updatedCategories);
    
    // Update juga kategori di prompt yang udah ada
    const updatedPrompts = prompts.map(p => p.category === oldCatName ? { ...p, category: newName.trim() } : p);
    savePrompts(updatedPrompts);

    if (activeCategory === oldCatName) setActiveCategory(newName.trim());
  };

  const handleDeleteCategory = (catToRemove: string) => {
    if (catToRemove === "Semua") return;
    const promptsInCat = prompts.filter(p => p.category === catToRemove);
    if (promptsInCat.length > 0) {
      alert(`⚠️ Hapus dulu atau pindahin ${promptsInCat.length} prompt yang ada di kategori ini bro!`);
      return;
    }
    if (!window.confirm(`Yakin mau hapus menu kategori "${catToRemove}"?`)) return;
    
    saveCategories(categories.filter((cat) => cat !== catToRemove));
    if (activeCategory === catToRemove) setActiveCategory("Semua");
  };

  // ==========================================
  // LOGIKA PROMPT (Tambah, Edit, Hapus, Copy)
  // ==========================================
  const openAddModal = () => {
    setModalMode("add");
    setCurrentPrompt({ 
      id: Date.now(), 
      title: "", 
      content: "", 
      category: activeCategory === "Semua" ? categories[1] : activeCategory // Default kategori
    });
    setIsModalOpen(true);
  };

  const openEditModal = (promptToEdit: any) => {
    setModalMode("edit");
    setCurrentPrompt(promptToEdit);
    setIsModalOpen(true);
  };

  const saveModalPrompt = () => {
    if (currentPrompt.title.trim() === "" || currentPrompt.content.trim() === "") {
      alert("Judul dan isi prompt nggak boleh kosong bro!");
      return;
    }

    let updatedPrompts;
    if (modalMode === "add") {
      const newPrompt = {
        ...currentPrompt,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
      };
      updatedPrompts = [newPrompt, ...prompts];
    } else {
      updatedPrompts = prompts.map(p => p.id === currentPrompt.id ? currentPrompt : p);
    }

    savePrompts(updatedPrompts);
    setIsModalOpen(false);
  };

  const handleDeletePrompt = (id: number, title: string) => {
    if (window.confirm(`Yakin mau hapus prompt "${title}"?`)) {
      savePrompts(prompts.filter(p => p.id !== id));
    }
  };

  const handleCopyPrompt = (content: string) => {
    navigator.clipboard.writeText(content);
    alert("✅ Mantap! Prompt udah di-copy, tinggal paste di ChatGPT/Claude!");
  };

  // Filter prompt sesuai kategori yang aktif
  const displayedPrompts = activeCategory === "Semua" 
    ? prompts 
    : prompts.filter(p => p.category === activeCategory);

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen relative">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2 flex items-center gap-2">
            Prompt Library 🧠
          </h1>
          <p className="text-gray-400">
            Simpan semua mantra rahasia ChatGPT dan AI lu di sini biar gampang dicopy.
          </p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2"
        >
          <span>+</span> Buat Prompt Baru
        </button>
      </div>

      {/* MENU KATEGORI */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {categories.map((cat, index) => (
          <div key={index} className="flex items-center">
            <button
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-medium transition-all border ${
                activeCategory === cat
                  ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 rounded-l-full"
                  : "bg-transparent border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white rounded-full"
              } ${activeCategory === cat && cat !== "Semua" ? "border-r-0" : ""}`}
            >
              {cat}
            </button>
            
            {activeCategory === cat && cat !== "Semua" && (
              <div className="flex items-center bg-emerald-500/10 border border-l-0 border-emerald-500/50 rounded-r-full overflow-hidden">
                <button onClick={() => handleEditCategory(cat)} className="px-2 py-2 text-xs text-orange-400 hover:bg-orange-500/20 hover:text-orange-300 border-l border-emerald-500/30" title="Ganti Nama">✏️</button>
                <button onClick={() => handleDeleteCategory(cat)} className="px-2 py-2 text-xs text-red-400 hover:bg-red-500/20 hover:text-red-300 border-l border-emerald-500/30" title="Hapus">❌</button>
              </div>
            )}
          </div>
        ))}

        {isAddingCategory ? (
          <div className="flex items-center gap-2 bg-[#1a1f33] border border-emerald-500/50 rounded-full px-2 py-1">
            <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Nama kategori..." className="bg-transparent text-sm text-white outline-none w-32 px-2" autoFocus onKeyDown={(e) => e.key === "Enter" && handleAddCategory()} />
            <button onClick={handleAddCategory} className="text-emerald-400 font-bold px-2">✓</button>
            <button onClick={() => setIsAddingCategory(false)} className="text-red-400 font-bold px-2 border-l border-gray-700">✕</button>
          </div>
        ) : (
          <button onClick={() => setIsAddingCategory(true)} className="px-4 py-2 rounded-full text-sm font-medium transition-all border border-dashed border-gray-700 text-gray-500 hover:border-emerald-500/50 hover:text-emerald-400 flex items-center gap-1">
            <span>+</span> Custom
          </button>
        )}
      </div>

      {/* GRID DAFTAR PROMPT */}
      <div className="bg-[#111424] border border-gray-800 rounded-2xl p-8 min-h-[400px]">
        {displayedPrompts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full pt-20 text-center">
            <span className="text-6xl mb-4 opacity-50">📝</span>
            <h2 className="text-xl font-medium text-white mb-2">Belum ada Prompt</h2>
            <p className="text-gray-500 text-sm">Klik tombol "Buat Prompt Baru" di atas bro.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPrompts.map((prompt) => (
              <div key={prompt.id} className="group bg-[#1a1f33] border border-gray-800 rounded-xl p-5 hover:border-emerald-500/50 transition-all flex flex-col h-64 relative overflow-hidden">
                
                {/* Header Card */}
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium px-2 py-1 bg-gray-800 text-gray-300 rounded border border-gray-700">
                    {prompt.category}
                  </span>
                  <span className="text-xs text-gray-500">{prompt.date}</span>
                </div>
                
                {/* Isi Card */}
                <h3 className="text-md font-bold text-white mb-2 truncate">{prompt.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-4 flex-1">
                  {prompt.content}
                </p>

                {/* Tombol Aksi (Muncul pas di-hover) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1a1f33] via-[#1a1f33] to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
                  <button onClick={() => handleCopyPrompt(prompt.content)} className="flex-[2] bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium transition-all shadow-lg">
                    📋 Copy Prompt
                  </button>
                  <button onClick={() => openEditModal(prompt)} title="Edit" className="flex-1 bg-gray-800 hover:bg-orange-500/20 text-orange-400 py-2 rounded-lg text-sm transition-all border border-gray-700 hover:border-orange-500/50">
                    ✏️
                  </button>
                  <button onClick={() => handleDeletePrompt(prompt.id, prompt.title)} title="Hapus" className="flex-1 bg-gray-800 hover:bg-red-500/20 text-red-400 py-2 rounded-lg text-sm transition-all border border-gray-700 hover:border-red-500/50">
                    🗑️
                  </button>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>

      {/* POP-UP MODAL (Buat Ngetik / Edit Prompt) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-[#111424] border border-gray-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            {/* Header Modal */}
            <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-[#1a1f33]">
              <h3 className="text-lg font-bold text-white">
                {modalMode === "add" ? "✨ Buat Prompt Baru" : "✏️ Edit Prompt"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>
            
            {/* Body Modal */}
            <div className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Judul Prompt</label>
                <input 
                  type="text" 
                  value={currentPrompt.title}
                  onChange={(e) => setCurrentPrompt({...currentPrompt, title: e.target.value})}
                  placeholder="Misal: Hook Video TikTok Fomo"
                  className="w-full bg-[#1a1f33] border border-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Kategori</label>
                <select 
                  value={currentPrompt.category}
                  onChange={(e) => setCurrentPrompt({...currentPrompt, category: e.target.value})}
                  className="w-full bg-[#1a1f33] border border-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer"
                >
                  {categories.filter(c => c !== "Semua").map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Isi Prompt</label>
                <textarea 
                  value={currentPrompt.content}
                  onChange={(e) => setCurrentPrompt({...currentPrompt, content: e.target.value})}
                  placeholder="Ketik prompt AI kamu di sini..."
                  rows={6}
                  className="w-full bg-[#1a1f33] border border-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:border-emerald-500 transition-colors resize-none"
                />
              </div>
            </div>
            
            {/* Footer Modal */}
            <div className="px-6 py-4 border-t border-gray-800 bg-[#1a1f33] flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
              >
                Batal
              </button>
              <button 
                onClick={saveModalPrompt}
                className="px-5 py-2.5 rounded-xl font-medium bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all"
              >
                Simpan Prompt
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}