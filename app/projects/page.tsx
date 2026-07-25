"use client";

import { useState, useEffect } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State untuk form Tambah / Edit Total
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General Project");
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  
  // State untuk Modal Lihat/Preview File
  const [previewProject, setPreviewProject] = useState<any | null>(null);

  // Load projects dari localStorage saat pertama buka
  useEffect(() => {
    try {
      const localData = localStorage.getItem("projectItems");
      if (localData) {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
          return;
        }
      }
      const defaultProjects = [
        { id: "1", title: "MAKAN MAKAN", category: "General Project", status: "Active", description: "Project kuliner tiktok", fileUrl: null, fileName: null },
        { id: "2", title: "MAKANAN", category: "General Project", status: "Active", description: "Review makanan viral", fileUrl: null, fileName: null },
        { id: "3", title: "Promo Powerbank Flash Sale", category: "Affiliate TikTok", status: "Active", description: "Promo powerbank 50%", fileUrl: null, fileName: null }
      ];
      setProjects(defaultProjects);
      localStorage.setItem("projectItems", JSON.stringify(defaultProjects));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveToStorage = (updatedProjects: any[]) => {
    setProjects(updatedProjects);
    localStorage.setItem("projectItems", JSON.stringify(updatedProjects));
  };

  // Handler Buka Modal Tambah Baru
  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle("");
    setCategory("General Project");
    setStatus("Active");
    setDescription("");
    setFileUrl(null);
    setFileName(null);
    setIsModalOpen(true);
  };

  // Handler Buka Modal Edit Total (Semua data project bisa diubah)
  const handleOpenEdit = (proj: any) => {
    setEditingId(proj.id);
    setTitle(proj.title || "");
    setCategory(proj.category || "General Project");
    setStatus(proj.status || "Active");
    setDescription(proj.description || "");
    setFileUrl(proj.fileUrl || null);
    setFileName(proj.fileName || null);
    setIsModalOpen(true);
  };

  // Handler Upload File di dalam Modal Edit/Tambah
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

  // Handler Simpan Total (Tambah atau Update semua field)
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      // Update Project yang sedang diedit
      const updated = projects.map(p => {
        if (p.id === editingId) {
          return { 
            ...p, 
            title, 
            category, 
            status, 
            description, 
            fileUrl, 
            fileName 
          };
        }
        return p;
      });
      saveToStorage(updated);
    } else {
      // Tambah Project Baru
      const newProj = {
        id: Date.now().toString(),
        title,
        category,
        status,
        description,
        fileUrl,
        fileName,
      };
      saveToStorage([newProj, ...projects]);
    }

    setIsModalOpen(false);
  };

  // Handler Hapus Project
  const handleDelete = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    saveToStorage(updated);
  };

  return (
    <div className="p-4 sm:p-8 md:p-10 max-w-[1400px] mx-auto text-white">
      
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            Project Board 📋
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Kelola, edit detail lengkap, lihat, dan unduh file project kamu di sini.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all"
        >
          + Buat Project Baru
        </button>
      </div>

      {/* List Projects */}
      <div className="grid grid-cols-1 gap-4">
        {projects.length === 0 ? (
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-10 text-center text-gray-500">
            Belum ada project. Klik tombol "+ Buat Project Baru" di atas!
          </div>
        ) : (
          projects.map((proj) => (
            <div key={proj.id} className="bg-[#111424] border border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-gray-700 transition-all">
              
              {/* Info Project */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-white font-bold text-base sm:text-lg">{proj.title}</h3>
                  <span className={`px-2.5 py-0.5 text-[11px] rounded-full font-medium border ${
                    proj.status === 'Completed' 
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                      : proj.status === 'Pending'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  }`}>
                    {proj.status || "Active"}
                  </span>
                </div>
                <p className="text-xs text-emerald-400 font-medium mb-1">{proj.category || "General Project"}</p>
                {proj.description && (
                  <p className="text-xs text-gray-400 mb-2 line-clamp-1">{proj.description}</p>
                )}
                {proj.fileName && (
                  <p className="text-xs text-gray-300 flex items-center gap-1">
                    📎 File: <span className="text-emerald-400 underline truncate max-w-[200px] sm:max-w-xs">{proj.fileName}</span>
                  </p>
                )}
              </div>

              {/* Tombol Aksi Lengkap */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                
                {/* 1. Tombol Lihat / Preview */}
                {proj.fileUrl ? (
                  <button
                    onClick={() => setPreviewProject(proj)}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#1a1f33] hover:bg-gray-800 border border-gray-700 text-cyan-400 flex items-center gap-1.5 transition-all"
                  >
                    👁️ Lihat
                  </button>
                ) : (
                  <span className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#161a2e] border border-gray-800 text-gray-600 cursor-not-allowed">
                    👁️ Lihat
                  </span>
                )}

                {/* 2. Tombol Edit Total (Membuka modal dengan seluruh data project) */}
                <button
                  onClick={() => handleOpenEdit(proj)}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#1a1f33] hover:bg-gray-800 border border-gray-700 text-amber-400 flex items-center gap-1.5 transition-all"
                >
                  ✏️ Edit Detail
                </button>

                {/* 3. Tombol Download */}
                {proj.fileUrl ? (
                  <a
                    href={proj.fileUrl}
                    download={proj.fileName || "project-file"}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#1a1f33] hover:bg-gray-800 border border-gray-700 text-emerald-400 flex items-center gap-1.5 transition-all"
                  >
                    📥 Download
                  </a>
                ) : (
                  <span className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#161a2e] border border-gray-800 text-gray-600 cursor-not-allowed">
                    📥 Download
                  </span>
                )}

                {/* 4. Tombol Hapus */}
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="px-3 py-2 rounded-xl text-xs font-medium bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-all"
                >
                  🗑️
                </button>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form Tambah / Edit Total Project */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6 w-full max-w-lg text-white my-8">
            <h2 className="text-lg font-bold mb-4">
              {editingId ? "Edit Detail Project" : "Buat Project Baru"}
            </h2>
            
            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Nama Project</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Kampanye TikTok Affiliator..."
                  required
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Kategori / Niche</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Contoh: Digital Products"
                    className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Status Project</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Catatan / Deskripsi Project</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tulis catatan atau detail project di sini..."
                  rows={3}
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Upload / Ganti File Project</label>
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
                  Simpan Perubahan Total
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Preview / Lihat File */}
      {previewProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6 w-full max-w-2xl text-white flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-bold">{previewProject.title}</h2>
                <p className="text-xs text-gray-400">{previewProject.fileName}</p>
              </div>
              <button
                onClick={() => setPreviewProject(null)}
                className="text-gray-400 hover:text-white bg-gray-800 px-3 py-1.5 rounded-lg text-xs"
              >
                ✕ Tutup
              </button>
            </div>

            <div className="flex-1 bg-[#1a1f33] rounded-xl overflow-hidden flex flex-col items-center justify-center p-4 border border-gray-800 min-h-[300px]">
              {previewProject.description && (
                <p className="text-xs text-gray-300 mb-4 bg-gray-800/50 p-3 rounded-lg w-full text-center">
                  📝 {previewProject.description}
                </p>
              )}
              {previewProject.fileUrl?.startsWith("data:image/") ? (
                <img src={previewProject.fileUrl} alt="Preview" className="max-h-[45vh] object-contain rounded-lg" />
              ) : previewProject.fileUrl?.startsWith("data:video/") ? (
                <video src={previewProject.fileUrl} controls className="max-h-[45vh] w-full rounded-lg" />
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-300 mb-2">File terlampir siap diunduh.</p>
                  <a
                    href={previewProject.fileUrl}
                    download={previewProject.fileName}
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