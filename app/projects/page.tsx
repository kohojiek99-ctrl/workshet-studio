"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("General Project");

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
      // Fallback data awal jika belum ada
      const defaultProjects = [
        { id: "1", title: "MAKAN MAKAN", category: "General Project", status: "Active", fileUrl: null, fileName: null },
        { id: "2", title: "MAKANAN", category: "General Project", status: "Active", fileUrl: null, fileName: null },
        { id: "3", title: "Promo Powerbank Flash Sale", category: "General Project", status: "Active", fileUrl: null, fileName: null }
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

  // Handler buat tambah project baru
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProj = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      status: "Active",
      fileUrl: null,
      fileName: null,
    };

    const updated = [newProj, ...projects];
    saveToStorage(updated);
    setNewTitle("");
    setIsModalOpen(false);
  };

  // Handler Hapus Project
  const handleDelete = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    saveToStorage(updated);
  };

  // Handler Upload File ke Project Tertentu
  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = projects.map(p => {
        if (p.id === id) {
          return { ...p, fileUrl: reader.result as string, fileName: file.name };
        }
        return p;
      });
      saveToStorage(updated);
    };
    reader.readAsDataURL(file);
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
            Kelola semua project, ide, dan unggah file pendukung atau asset di sini.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
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
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-white font-bold text-base sm:text-lg">{proj.title}</h3>
                  <span className="px-2.5 py-0.5 text-[11px] rounded-full font-medium border bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                    {proj.status || "Active"}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{proj.category || "General Project"}</p>
                {proj.fileName && (
                  <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                    📎 File Terlampir: <span className="underline truncate max-w-[200px] sm:max-w-xs">{proj.fileName}</span>
                  </p>
                )}
              </div>

              {/* Tombol Aksi: Buka File, Upload File, Hapus */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
                
                {/* Opsi Buka File (Muncul kalau sudah ada filenya) */}
                {proj.fileUrl && (
                  <a
                    href={proj.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#1a1f33] hover:bg-gray-800 border border-gray-700 text-emerald-400 flex items-center gap-1.5 transition-all"
                  >
                    📂 Buka File
                  </a>
                )}

                {/* Opsi Upload File */}
                <label className="cursor-pointer px-3.5 py-2 rounded-xl text-xs font-medium bg-[#1a1f33] hover:bg-gray-800 border border-gray-700 text-gray-200 flex items-center gap-1.5 transition-all">
                  📤 {proj.fileUrl ? "Ganti File" : "Upload File"}
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(proj.id, e)}
                    className="hidden"
                  />
                </label>

                {/* Hapus Project */}
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-all"
                >
                  🗑️ Hapus
                </button>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Buat Project Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6 w-full max-w-md text-white">
            <h2 className="text-lg font-bold mb-4">Buat Project Baru</h2>
            
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Nama Project</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Kampanye TikTok Affiliator..."
                  required
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Kategori / Niche</label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Contoh: Digital Products / Affiliate"
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                />
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
                  Simpan Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}