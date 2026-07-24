"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AssetsPage() {
  const [categories, setCategories] = useState([
    "Semua",
    "Produk Digital",
    "Produk Fisik",
    "Aset TikTok",
    "Sound Effects",
  ]);
  
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  
  const [isUploading, setIsUploading] = useState(false);

  // STATE BARU: Buat nyimpen daftar file dan status loading
  const [files, setFiles] = useState<any[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  // FUNGSI BARU: Buat ngambil data file dari Supabase
  const fetchFiles = async () => {
    setIsLoadingFiles(true);
    try {
      // Kita cari di dalam folder kategori yang lagi aktif
      const folderPath = activeCategory; 
      
      const { data, error } = await supabase.storage
        .from('assets')
        .list(folderPath, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }, // yang terbaru di atas
        });

      if (error) throw error;

      // Filter file yang valid aja
      const validFiles = data?.filter((file) => file.name !== '.emptyFolderPlaceholder') || [];
      
      // Bikin array baru lengkap sama URL link-nya biar bisa diklik
      const filesWithUrls = validFiles.map((file) => {
        const filePath = `${folderPath}/${file.name}`;
        const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(filePath);
        return {
          ...file,
          url: publicUrlData.publicUrl,
        };
      });

      setFiles(filesWithUrls);
    } catch (error: any) {
      console.error("Gagal ngambil file:", error.message);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  // Panggil fetchFiles setiap kali kategori diklik/berubah
  useEffect(() => {
    fetchFiles();
  }, [activeCategory]);

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== "") {
      setCategories([...categories, newCategoryName.trim()]);
      setNewCategoryName("");
      setIsAddingCategory(false);
    }
  };

  // Fungsi Upload (Udah dimodifikasi biar langsung refresh daftar file abis upload)
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true); 

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${activeCategory}/${fileName}`;

      const { data, error } = await supabase.storage
        .from('assets') 
        .upload(filePath, file);

      if (error) throw error;

      alert(`✅ MANTAP BRO! File "${file.name}" sukses mendarat di brankas!`);
      
      // REFRESH daftar file otomatis biar file yang baru lu upload langsung nongol!
      fetchFiles();
      
    } catch (error: any) {
      alert(`❌ Yah, gagal upload bro: ${error.message}`);
    } finally {
      setIsUploading(false); 
      e.target.value = "";
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
        <div>
          <input 
            type="file" 
            id="upload-asset" 
            className="hidden"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          <label 
            htmlFor="upload-asset"
            className={`cursor-pointer px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
              isUploading 
              ? "bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed" 
              : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
            }`}
          >
            <span>{isUploading ? "⏳" : "☁️"}</span> 
            {isUploading ? "Mengunggah..." : "Upload File"}
          </label>
        </div>
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
            <button onClick={handleAddCategory} className="text-emerald-400 hover:text-emerald-300 text-sm font-bold px-2">✓</button>
            <button onClick={() => setIsAddingCategory(false)} className="text-red-400 hover:text-red-300 text-sm font-bold px-2 border-l border-gray-700">✕</button>
          </div>
        ) : (
          <button onClick={() => setIsAddingCategory(true)} className="px-4 py-2 rounded-full text-sm font-medium transition-all border border-dashed border-gray-700 text-gray-500 hover:border-emerald-500/50 hover:text-emerald-400 flex items-center gap-1">
            <span>+</span> Custom
          </button>
        )}
      </div>

      {/* AREA TAMPILAN FILE (BRANKAS) */}
      <div className="bg-[#111424] border border-gray-800 rounded-2xl p-8 min-h-[400px]">
        {isLoadingFiles ? (
          // Animasi muter pas narik data
          <div className="flex flex-col items-center justify-center h-full pt-20">
            <div className="animate-spin text-4xl mb-4">🔄</div>
            <p className="text-gray-400">Sedang membuka brankas...</p>
          </div>
        ) : files.length === 0 ? (
          // Tampilan kalau beneran kosong
          <div className="flex flex-col items-center justify-center h-full pt-20 text-center">
            <span className="text-6xl mb-4 opacity-50">📂</span>
            <h2 className="text-xl font-medium text-white mb-2">Brankas Kosong</h2>
            <p className="text-gray-500 text-sm">
              Belum ada file yang diunggah ke kategori "{activeCategory}"
            </p>
          </div>
        ) : (
          // Grid tampilan file yang udah masuk (NYATA BRO!)
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {files.map((file, index) => {
              // Deteksi ini gambar apa dokumen biasa
              const isImage = file.name.match(/\.(jpeg|jpg|gif|png|webp)$/i) != null;

              return (
                <div key={index} className="group relative bg-[#1a1f33] border border-gray-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all">
                  
                  {/* Thumbnail / Gambar */}
                  <div className="h-32 bg-black/40 flex items-center justify-center overflow-hidden">
                    {isImage ? (
                      <img src={file.url} alt={file.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <span className="text-5xl">📄</span>
                    )}
                  </div>

                  {/* Info File & Tombol Buka */}
                  <div className="p-3">
                    <p className="text-xs text-gray-300 truncate mb-2" title={file.name}>
                      {file.name}
                    </p>
                    <a 
                      href={file.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center bg-gray-800 hover:bg-emerald-500/20 text-emerald-400 text-xs py-1.5 rounded transition-all"
                    >
                      Buka File
                    </a>
                  </div>
                  
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}