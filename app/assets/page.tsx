"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Asset = {
  id: string;
  title: string;
  type: string;
  ratio: string;
  category: string;
  file_url: string;
  size: string;
  created_at: string;
};

const categories = ["All", "Digital Products", "Hardware Promos", "Templates", "Sound Effects"];

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isUploading, setIsUploading] = useState(false);

  // Ambil data aset dari database Supabase saat halaman dibuka
  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    const { data, error } = await supabase
      .from("assets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil aset:", error.message);
    } else if (data) {
      setAssets(data);
    }
  };

  // Fungsi Upload File ke Supabase Storage & Simpan ke Database
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      // 1. Upload file ke Supabase Storage (Bucket: 'assets')
      const { error: uploadError } = await supabase.storage
        .from("assets")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Dapatkan Public URL file
      const { data: publicURLData } = supabase.storage
        .from("assets")
        .getPublicUrl(fileName);

      const fileUrl = publicURLData.publicUrl;
      const fileSize = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      const fileType = file.type.includes("video") ? "Video" : file.type.includes("audio") ? "Audio" : "Image";

      // 3. Simpan metadata file ke Tabel Database 'assets'
      const { error: dbError } = await supabase.from("assets").insert([
        {
          title: file.name,
          type: fileType,
          ratio: "4:5", // Default rasio aman konten
          category: activeCategory === "All" ? "Digital Products" : activeCategory,
          file_url: fileUrl,
          size: fileSize,
        },
      ]);

      if (dbError) throw dbError;

      alert("Aset berhasil di-upload ke Cloud! ☁️");
      fetchAssets(); // Refresh daftar aset
    } catch (error: any) {
      alert("Gagal mengunggah: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Filter kategori
  const filteredAssets = activeCategory === "All" 
    ? assets 
    : assets.filter(asset => asset.category === activeCategory);

  return (
    <div className="p-8 text-white min-h-screen">
      {/* Header & Upload Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold mb-2">Asset Manager 📦</h1>
          <p className="text-gray-400">
            Kelola semua bahan konten, video promosi, dan produk digital kamu di cloud storage.
          </p>
        </div>
        
        {/* Tombol Upload Asli yang terhubung ke File Selector */}
        <label className={`bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2 cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
          {isUploading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            <span className="text-xl">+</span>
          )}
          <span>{isUploading ? "Mengunggah ke Cloud..." : "Upload Aset"}</span>
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Filter Kategori */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeCategory === cat 
                ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                : "bg-[#1a1f33] border-gray-700 text-gray-400 hover:text-gray-200 hover:border-gray-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Aset */}
      {filteredAssets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="bg-[#1a1f33] rounded-2xl border border-gray-800 overflow-hidden hover:border-emerald-500/50 transition-colors group">
              <div className="h-40 bg-[#111424] relative flex items-center justify-center border-b border-gray-800 group-hover:bg-[#141829] transition-colors">
                <span className="text-4xl opacity-50">
                  {asset.type === "Video" ? "🎥" : asset.type === "Audio" ? "🎵" : "🖼️"}
                </span>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-xs px-2 py-1 rounded text-gray-300 border border-gray-700">
                  {asset.ratio}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-gray-200 truncate mb-1" title={asset.title}>
                  {asset.title}
                </h3>
                <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                  <span>{asset.category}</span>
                  <span>{asset.size || "Local"}</span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(asset.file_url);
                      alert("Link aset berhasil disalin! 📋");
                    }}
                    className="flex-1 bg-[#111424] hover:bg-gray-800 border border-gray-700 text-gray-300 text-xs py-2 rounded-lg transition-colors"
                  >
                    Copy Link
                  </button>
                  <a 
                    href={asset.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-[#111424] hover:bg-gray-800 border border-gray-700 text-gray-300 text-xs py-2 rounded-lg transition-colors"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-[#1a1f33] border border-gray-800 rounded-2xl border-dashed">
          <span className="text-5xl mb-4 opacity-50">📂</span>
          <h3 className="text-lg font-medium text-gray-300 mb-1">Brankas Kosong</h3>
          <p className="text-gray-500 text-sm">Belum ada file yang diunggah ke kategori "{activeCategory}"</p>
        </div>
      )}
    </div>
  );
}