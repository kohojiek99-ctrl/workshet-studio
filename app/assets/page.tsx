"use client";

import { useState, useEffect } from "react";

export default function AssetsPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State untuk form Tambah / Edit Total Asset
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Digital Products");
  const [status, setStatus] = useState("Ready");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  
  // State untuk Modal Lihat/Preview File Asset
  const [previewAsset, setPreviewAsset] = useState<any | null>(null);

  // Load assets dari localStorage saat pertama buka
  useEffect(() => {
    try {
      const localData = localStorage.getItem("assetItems");
      if (localData) {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAssets(parsed);
          return;
        }
      }
      const defaultAssets = [
        { id: "1", title: "Video Promosi Powerbank", category: "Aset TikTok", status: "Ready", description: "Video reel 9:16 untuk flash sale", fileUrl: null, fileName: null }
      ];
      setAssets(defaultAssets);
      localStorage.setItem("assetItems", JSON.stringify(defaultAssets));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveToStorage = (updatedAssets: any[]) => {
    setAssets(updatedAssets);
    localStorage.setItem("assetItems", JSON.stringify(updatedAssets));
  };

  // Handler Buka Modal Tambah Baru
  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle("");
    setCategory("Digital Products");
    setStatus("Ready");
    setDescription("");
    setFileUrl(null);
    setFileName(null);
    setIsModalOpen(true);
  };

  // Handler Buka Modal Edit Total
  const handleOpenEdit = (item: any) => {
    setEditingId(item.id);
    setTitle(item.title || "");
    setCategory(item.category || "Digital Products");
    setStatus(item.status || "Ready");
    setDescription(item.description || "");
    setFileUrl(item.fileUrl || null);
    setFileName(item.fileName || null);
    setIsModalOpen(true);
  };

  // Handler Upload File di dalam Modal
  const handleModalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFileUrl(reader.result as string);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  // Handler Simpan Total (Tambah atau Update)
  const handleSaveAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      const updated = assets.map(item => {
        if (item.id === editingId) {
          return { 
            ...item, 
            title, 
            category, 
            status, 
            description, 
            fileUrl, 
            fileName 
          };
        }
        return item;
      });
      saveToStorage(updated);
    } else {
      const newAsset = {
        id: Date.now().toString(),
        title,
        category,
        status,
        description,
        fileUrl,
        fileName,
      };
      saveToStorage([newAsset, ...assets]);
    }

    setIsModalOpen(false);
  };

  // Handler Hapus Asset
  const handleDelete = (id: string) => {
    const updated = assets.filter(item => item.id !== id);
    saveToStorage(updated);
  };

  return (
    <div className="p-4 sm:p-8 md:p-10 max-w-[1400px] mx-auto text-white">
      
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            Asset Manager 📦
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Kelola, edit detail, lihat, dan unduh bahan konten atau produk digital lu di sini.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all"
        >
          + Upload Asset Baru
        </button>
      </div>

      {/* List Assets */}
      <div className="grid grid-cols-1 gap-4">
        {assets.length === 0 ? (
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-10 text-center text-gray-500">
            Belum ada asset. Klik tombol "+ Upload Asset Baru" di atas!
          </div>
        ) : (
          assets.map((item) => (
            <div key={item.id} className="bg-[#111424] border border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-gray-700 transition-all">
              
              {/* Info Asset */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-white font-bold text-base sm:text-lg">{item.title}</h3>
                  <span className="px-2.5 py-0.5 text-[11px] rounded-full font-medium border bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                    {item.status || "Ready"}
                  </span>
                </div>
                <p className="text-xs text-emerald-400 font-medium mb-1">{item.category || "Digital Products"}</p>
                {item.description && (
                  <p className="text-xs text-gray-400 mb-2 line-clamp-1">{item.description}</p>
                )}
                {item.fileName && (
                  <p className="text-xs text-gray-300 flex items-center gap-1">
                    📎 File: <span className="text-emerald-400 underline truncate max-w-[200px] sm:max-w-xs">{item.fileName}</span>
                  </p>
                )}
              </div>

              {/* Tombol Aksi Lengkap */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                
                {/* 1. Tombol Lihat / Preview */}
                {item.fileUrl ? (
                  <button
                    onClick={() => setPreviewAsset(item)}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#1a1f33] hover:bg-gray-800 border border-gray-700 text-cyan-400 flex items-center gap-1.5 transition-all"
                  >
                    👁️ Lihat
                  </button>
                ) : (
                  <span className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#161a2e] border border-gray-800 text-gray-600 cursor-not-allowed">
                    👁️ Lihat
                  </span>
                )}

                {/* 2. Tombol Edit Detail */}
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#1a1f33] hover:bg-gray-800 border border-gray-700 text-amber-400 flex items-center gap-1.5 transition-all"
                >
                  ✏️ Edit Detail
                </button>

                {/* 3. Tombol Download */}
                {item.fileUrl ? (
                  <a
                    href={item.fileUrl}
                    download={item.fileName || "asset-file"}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#1a1f33] hover:bg-gray-800 border border-gray-700 text-emerald-400 flex items-center gap-1.5 transition-all"
                  >
                    📥 Download
                  </a>
                ) : (
                  <span className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#161a2e] border border-gray-800 text-gray-600 cursor-not-allowed">
                    📥 Download
                  </span>
                )}

                {/* 4. Hapus Asset */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-2 rounded-xl text-xs font-medium bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-all"
                >
                  🗑️
                </button>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form Tambah / Edit Total Asset */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6 w-full max-w-lg text-white my-8">
            <h2 className="text-lg font-bold mb-4">
              {editingId ? "Edit Detail Asset" : "Upload Asset Baru"}
            </h2>
            
            <form onSubmit={handleSaveAsset} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Nama Asset</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Video Promosi TikTok..."
                  required
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Kategori Asset</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Contoh: Digital Products / Aset TikTok"
                    className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Status Asset</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="Ready">Ready</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Catatan / Deskripsi Asset</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tulis catatan atau detail asset di sini..."
                  rows={3}
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Upload / Ganti File Asset</label>
                <div className="flex items-center gap-3 bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-3">
                  <label className="cursor-pointer px-4 py-2 bg-gray-800 hover:bg-gray-700 text-xs font-medium rounded-lg border border-gray-600 text-white transition-all">
                    Pilih File
                    <input type="file" onChange={handleModalFileUpload} className="hidden" />
                  </label>
                  <span className="text-xs text-gray-400 truncate max-w-[240px]">
                    {fileName ? fileName : "Belum ada file dipilih"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-300 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-lg shadow-emerald-500/20"
                >
                  Simpan Perubahan Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Preview / Lihat File Asset */}
      {previewAsset && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6 w-full max-w-2xl text-white flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-bold">{previewAsset.title}</h2>
                <p className="text-xs text-gray-400">{previewAsset.fileName}</p>
              </div>
              <button
                onClick={() => setPreviewAsset(null)}
                className="text-gray-400 hover:text-white bg-gray-800 px-3 py-1.5 rounded-lg text-xs"
              >
                ✕ Tutup
              </button>
            </div>

            <div className="flex-1 bg-[#1a1f33] rounded-xl overflow-hidden flex flex-col items-center justify-center p-4 border border-gray-800 min-h-[300px]">
              {previewAsset.description && (
                <p className="text-xs text-gray-300 mb-4 bg-gray-800/50 p-3 rounded-lg w-full text-center">
                  📝 {previewAsset.description}
                </p>
              )}
              {previewAsset.fileUrl?.startsWith("data:image/") ? (
                <img src={previewAsset.fileUrl} alt="Preview" className="max-h-[45vh] object-contain rounded-lg" />
              ) : previewAsset.fileUrl?.startsWith("data:video/") ? (
                <video src={previewAsset.fileUrl} controls className="max-h-[45vh] w-full rounded-lg" />
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-300 mb-2">File asset terlampir siap diunduh.</p>
                  <a
                    href={previewAsset.fileUrl}
                    download={previewAsset.fileName}
                    className="inline-block px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold"
                  >
                    Download File Sekarang
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}