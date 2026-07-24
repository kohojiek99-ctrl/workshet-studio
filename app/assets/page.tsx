"use client";

import { useState } from "react";

export default function AssetsPage() {
  // Daftar kategori bawaan
  const [categories, setCategories] = useState([
    "Semua",
    "Produk Digital",
    "Produk Fisik",
    "Aset TikTok",
    "Sound Effects",
  ]);
  
  const [activeCategory, setActiveCategory] = useState("Semua");
  
  // State untuk fitur nambah kategori custom
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== "") {
      setCategories([...categories, newCategoryName.trim()]);
      setNewCategoryName("");
      setIsAddingCategory(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2 flex items-center gap-2">
            Asset Manager 📦
          </h1>
          <p className="text-gray-400">
            Kelola semua bahan konten, video promosi, dan produk digital lu di sini.
          </p>
        </div>
        
        {/* Tombol Upload */}
        <button className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2">
          <span>☁️</span> Mengunggah ke Cloud...
        </button>
      </div>

      {/* Navigasi Kategori Custom */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              activeCategory === cat
                ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                : "bg-transparent border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}

        {/* Input Tambah Kategori Baru */}
        {isAddingCategory ? (
          <div className="flex items-center gap-2 bg-[#1a1f33] border border-emerald-500/50 rounded-full px-2 py-1">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nama kategori..."
              className="bg-transparent text-sm text-white outline-none w-32 px-2"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
            />
            <button 
              onClick={handleAddCategory}
              className="text-emerald-400 hover:text-emerald-300 text-sm font-bold px-2"
            >
              ✓
            </button>
            <button 
              onClick={() => setIsAddingCategory(false)}
              className="text-red-400 hover:text-red-300 text-sm font-bold px-2 border-l border-gray-700"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingCategory(true)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all border border-dashed border-gray-700 text-gray-500 hover:border-emerald-500/50 hover:text-emerald-400 flex items-center gap-1"
          >
            <span>+</span> Custom
          </button>
        )}
      </div>

      {/* Area Brankas Kosong */}
      <div className="bg-[#111424] border border-gray-800 rounded-2xl p-16 flex flex-col items-center justify-center text-center">
        <span className="text-6xl mb-4 opacity-50">📂</span>
        <h2 className="text-xl font-medium text-white mb-2">Brankas Kosong</h2>
        <p className="text-gray-500 text-sm">
          Belum ada file yang diunggah ke kategori "{activeCategory}"
        </p>
      </div>
    </div>
  );
}