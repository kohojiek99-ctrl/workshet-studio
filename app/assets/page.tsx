"use client";

import { useState, useEffect } from "react";

export default function AssetsPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // State Form Input Modal
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("PDF Guide");
  const [size, setSize] = useState("4.0 MB");
  const [desc, setDesc] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  // Load data awal dari localStorage (atau default jika kosong)
  useEffect(() => {
    const savedData = localStorage.getItem("worksheet_resources");
    if (savedData) {
      setResources(JSON.parse(savedData));
    } else {
      const defaultResources = [
        {
          title: "Handbook 1: The Ultimate AI Prompt Architecture",
          category: "PDF Guide",
          size: "4.2 MB",
          desc: "Panduan fundamental cara merancang struktur prompt tingkat lanjut untuk agensi.",
          downloadLink: "https://drive.google.com"
        },
        {
          title: "Handbook 2: Cinematic Video Generation Engine",
          category: "PDF Guide",
          size: "6.8 MB",
          desc: "Rahasia meracik prompt video untuk Veo, Kling, Runway, dan Luma.",
          downloadLink: "https://drive.google.com"
        }
      ];
      setResources(defaultResources);
      localStorage.setItem("worksheet_resources", JSON.stringify(defaultResources));
    }
  }, []);

  // Simpan data ke localStorage setiap ada perubahan
  const saveToLocalStorage = (updatedData: any[]) => {
    setResources(updatedData);
    localStorage.setItem("worksheet_resources", JSON.stringify(updatedData));
  };

  // Buka Modal untuk Tambah Baru
  const handleOpenAdd = () => {
    setEditingIndex(null);
    setTitle("");
    setCategory("PDF Guide");
    setSize("5.0 MB");
    setDesc("");
    setDownloadLink("");
    setIsModalOpen(true);
  };

  // Buka Modal untuk Edit
  const handleOpenEdit = (index: number) => {
    const item = resources[index];
    setEditingIndex(index);
    setTitle(item.title);
    setCategory(item.category);
    setSize(item.size);
    setDesc(item.desc);
    setDownloadLink(item.downloadLink);
    setIsModalOpen(true);
  };

  // Hapus Resource
  const handleDelete = (index: number) => {
    if (confirm("Yakin ingin menghapus resource ini, bro?")) {
      const updated = resources.filter((_, i) => i !== index);
      saveToLocalStorage(updated);
    }
  };

  // Simpan (Tambah atau Update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !downloadLink) {
      alert("Judul dan Link GDrive wajib diisi ya, bro!");
      return;
    }

    const newItem = { title, category, size, desc, downloadLink };

    if (editingIndex !== null) {
      // Mode Edit
      const updated = [...resources];
      updated[editingIndex] = newItem;
      saveToLocalStorage(updated);
    } else {
      // Mode Tambah Baru
      const updated = [newItem, ...resources];
      saveToLocalStorage(updated);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 max-w-[1400px] mx-auto text-white space-y-8">
      
      {/* HEADER + TOMBOL TAMBAH RESOURCE */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#111424] border border-gray-800 rounded-3xl p-6 sm:p-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            📦 Resource & Handbook Vault
          </h1>
          <p className="text-gray-400 text-sm">
            Kelola file panduan, Handbook PDF, dan link Google Drive eksklusif untuk pembeli Anda di sini.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
        >
          ➕ Tambah Resource Baru
        </button>
      </div>

      {/* GRID DAFTAR RESOURCE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((file, index) => (
          <div key={index} className="bg-[#111424] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-full">
                  {file.category}
                </span>
                <span className="text-xs text-gray-400">{file.size}</span>
              </div>
              <h3 className="font-bold text-base text-white">{file.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{file.desc}</p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-gray-800/80">
              <a
                href={file.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-[#161a2e] hover:bg-emerald-500 hover:text-white border border-gray-700 hover:border-emerald-500 transition-all flex items-center justify-center gap-2"
              >
                📥 Download / GDrive
              </a>
              <button
                onClick={() => handleOpenEdit(index)}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500 hover:text-white transition-all cursor-pointer"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
              >
                🗑️ Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL FORM TAMBAH / EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111424] border border-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {editingIndex !== null ? "✏️ Edit Resource" : "➕ Tambah Resource Baru"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white text-lg">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Judul Resource / Handbook</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Handbook 5: Advanced Strategy"
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
                    placeholder="Contoh: PDF Guide"
                    className="w-full bg-[#161a2e] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Ukuran File</label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="Contoh: 4.5 MB"
                    className="w-full bg-[#161a2e] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Link Google Drive / Download URL</label>
                <input
                  type="text"
                  value={downloadLink}
                  onChange={(e) => setDownloadLink(e.target.value)}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full bg-[#161a2e] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Deskripsi Singkat</label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Tuliskan keterangan singkat tentang isi file ini..."
                  rows={3}
                  className="w-full bg-[#161a2e] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500 resize-none"
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
                  Simpan Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}