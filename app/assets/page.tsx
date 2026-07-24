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
  const [files, setFiles] = useState<any[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  // 1. Ambil Kategori Custom dari memori browser pas pertama kali load
  useEffect(() => {
    const savedCategories = localStorage.getItem('customCategories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== "") {
      const updatedCategories = [...categories, newCategoryName.trim()];
      setCategories(updatedCategories);
      
      // Simpan ke memori browser biar gak ilang pas di-refresh
      localStorage.setItem('customCategories', JSON.stringify(updatedCategories));
      
      setNewCategoryName("");
      setIsAddingCategory(false);
    }
  };

  const fetchFiles = async () => {
    setIsLoadingFiles(true);
    try {
      const folderPath = activeCategory; 
      
      const { data, error } = await supabase.storage
        .from('assets')
        .list(folderPath, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (error) throw error;

      const validFiles = data?.filter((file) => file.name !== '.emptyFolderPlaceholder') || [];
      
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

  useEffect(() => {
    fetchFiles();
  }, [activeCategory]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true); 

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${activeCategory}/${fileName}`;

      const { error } = await supabase.storage.from('assets').upload(filePath, file);

      if (error) throw error;
      fetchFiles();
    } catch (error: any) {
      alert(`❌ Gagal upload bro: ${error.message}`);
    } finally {
      setIsUploading(false); 
      e.target.value = "";
    }
  };

  // --- FITUR BARU: HAPUS FILE ---
  const handleDelete = async (fileName: string) => {
    if (!window.confirm(`Bro, yakin mau hapus file "${fileName}"?`)) return;
    
    try {
      const filePath = `${activeCategory}/${fileName}`;
      const { error } = await supabase.storage.from('assets').remove([filePath]);
      if (error) throw error;
      
      fetchFiles(); // Refresh tampilan
    } catch (error: any) {
      alert(`❌ Gagal hapus: ${error.message}`);
    }
  };

  // --- FITUR BARU: EDIT/RENAME FILE ---
  const handleRename = async (oldName: string) => {
    const ext = oldName.split('.').pop();
    const oldNameWithoutExt = oldName.replace(`.${ext}`, '');
    
    const newName = window.prompt("Masukkan nama baru (tanpa ekstensi):", oldNameWithoutExt);
    if (!newName || newName.trim() === "" || newName === oldNameWithoutExt) return;

    try {
      const fullNewName = `${newName.trim()}.${ext}`;
      const oldPath = `${activeCategory}/${oldName}`;
      const newPath = `${activeCategory}/${fullNewName}`;

      const { error } = await supabase.storage.from('assets').move(oldPath, newPath);
      if (error) throw error;
      
      fetchFiles(); // Refresh tampilan
    } catch (error: any) {
      alert(`❌ Gagal ganti nama: ${error.message}`);
    }
  };

  // --- FITUR BARU: DOWNLOAD FILE ---
  const handleDownload = async (fileName: string, url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // Fallback kalau fetch di-block sama browser
      window.open(url, '_blank');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2 flex items-center gap-2">
            Asset Manager 📦
          </h1>
          <p className="text-gray-400">
            Kelola semua bahan konten, video promosi, dan produk digital lu di sini.
          </p>
        </div>
        
        <div>
          <input type="file" id="upload-asset" className="hidden" onChange={handleFileSelect} disabled={isUploading} />
          <label htmlFor="upload-asset" className={`cursor-pointer px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${isUploading ? "bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed" : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"}`}>
            <span>{isUploading ? "⏳" : "☁️"}</span> 
            {isUploading ? "Mengunggah..." : "Upload File"}
          </label>
        </div>
      </div>

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
            <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Nama kategori..." className="bg-transparent text-sm text-white outline-none w-32 px-2" autoFocus onKeyDown={(e) => e.key === "Enter" && handleAddCategory()} />
            <button onClick={handleAddCategory} className="text-emerald-400 hover:text-emerald-300 text-sm font-bold px-2">✓</button>
            <button onClick={() => setIsAddingCategory(false)} className="text-red-400 hover:text-red-300 text-sm font-bold px-2 border-l border-gray-700">✕</button>
          </div>
        ) : (
          <button onClick={() => setIsAddingCategory(true)} className="px-4 py-2 rounded-full text-sm font-medium transition-all border border-dashed border-gray-700 text-gray-500 hover:border-emerald-500/50 hover:text-emerald-400 flex items-center gap-1">
            <span>+</span> Custom
          </button>
        )}
      </div>

      <div className="bg-[#111424] border border-gray-800 rounded-2xl p-8 min-h-[400px]">
        {isLoadingFiles ? (
          <div className="flex flex-col items-center justify-center h-full pt-20">
            <div className="animate-spin text-4xl mb-4">🔄</div>
            <p className="text-gray-400">Sedang membuka brankas...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full pt-20 text-center">
            <span className="text-6xl mb-4 opacity-50">📂</span>
            <h2 className="text-xl font-medium text-white mb-2">Brankas Kosong</h2>
            <p className="text-gray-500 text-sm">
              Belum ada file yang diunggah ke kategori "{activeCategory}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {files.map((file, index) => {
              const isImage = file.name.match(/\.(jpeg|jpg|gif|png|webp)$/i) != null;

              return (
                <div key={index} className="group relative bg-[#1a1f33] border border-gray-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all flex flex-col">
                  
                  <div className="h-32 bg-black/40 flex items-center justify-center overflow-hidden relative">
                    {isImage ? (
                      <img src={file.url} alt={file.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <span className="text-5xl">📄</span>
                    )}
                  </div>

                  <div className="p-3 flex flex-col justify-between flex-1">
                    <p className="text-xs text-gray-300 truncate mb-3" title={file.name}>
                      {file.name}
                    </p>
                    
                    <div>
                      {/* Tombol Utama */}
                      <a href={file.url} target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center bg-gray-800 hover:bg-emerald-500/20 text-emerald-400 text-xs py-1.5 rounded transition-all mb-1.5">
                        Buka File
                      </a>
                      
                      {/* Aksi Tambahan: Download, Edit, Hapus */}
                      <div className="flex gap-1">
                        <button onClick={() => handleDownload(file.name, file.url)} title="Unduh" className="flex-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 py-1.5 rounded transition-all flex items-center justify-center text-xs">
                          ⬇️
                        </button>
                        <button onClick={() => handleRename(file.name)} title="Ganti Nama" className="flex-1 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 py-1.5 rounded transition-all flex items-center justify-center text-xs">
                          ✏️
                        </button>
                        <button onClick={() => handleDelete(file.name)} title="Hapus" className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-1.5 rounded transition-all flex items-center justify-center text-xs">
                          🗑️
                        </button>
                      </div>
                    </div>
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