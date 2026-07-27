"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // State Form Input Modal
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("E-Commerce / Affiliate");
  const [status, setStatus] = useState("Ready to Use");
  const [desc, setDesc] = useState("");

  // Load data awal dari localStorage (atau default jika kosong)
  useEffect(() => {
    const savedData = localStorage.getItem("worksheet_projects");
    if (savedData) {
      setProjects(JSON.parse(savedData));
    } else {
      const defaultProjects = [
        {
          title: "Launch Produk Baru (Flash Sale TikTok)",
          category: "E-Commerce / Affiliate",
          status: "Ready to Use",
          desc: "Blueprint lengkap urutan konten dari teaser 3 hari sebelum, hari H flash sale, hingga rekap konversi."
        },
        {
          title: "Content Marketing 30 Hari (Instagram & TikTok)",
          category: "Organic Growth",
          status: "Ready to Use",
          desc: "Struktur kalender konten harian berbasis edukasi, hiburan, dan penawaran langsung."
        }
      ];
      setProjects(defaultProjects);
      localStorage.setItem("worksheet_projects", JSON.stringify(defaultProjects));
    }
  }, []);

  // Simpan data ke localStorage setiap ada perubahan
  const saveToLocalStorage = (updatedData: any[]) => {
    setProjects(updatedData);
    localStorage.setItem("worksheet_projects", JSON.stringify(updatedData));
  };

  // Buka Modal untuk Tambah Baru
  const handleOpenAdd = () => {
    setEditingIndex(null);
    setTitle("");
    setCategory("E-Commerce / Affiliate");
    setStatus("Ready to Use");
    setDesc("");
    setIsModalOpen(true);
  };

  // Buka Modal untuk Edit
  const handleOpenEdit = (index: number) => {
    const item = projects[index];
    setEditingIndex(index);
    setTitle(item.title);
    setCategory(item.category);
    setStatus(item.status);
    setDesc(item.desc);
    setIsModalOpen(true);
  };

  // Hapus Project
  const handleDelete = (index: number) => {
    if (confirm("Yakin ingin menghapus proyek ini, bro?")) {
      const updated = projects.filter((_, i) => i !== index);
      saveToLocalStorage(updated);
    }
  };

  // Simpan (Tambah atau Update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc) {
      alert("Judul dan Deskripsi proyek wajib diisi ya, bro!");
      return;
    }

    const newItem = { title, category, status, desc };

    if (editingIndex !== null) {
      // Mode Edit
      const updated = [...projects];
      updated[editingIndex] = newItem;
      saveToLocalStorage(updated);
    } else {
      // Mode Tambah Baru
      const updated = [newItem, ...projects];
      saveToLocalStorage(updated);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 max-w-[1400px] mx-auto text-white space-y-8">
      
      {/* HEADER + TOMBOL TAMBAH PROJECT */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#111424] border border-gray-800 rounded-3xl p-6 sm:p-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            🚀 Project Templates & Campaign Blueprints
          </h1>
          <p className="text-gray-400 text-sm">
            Kelola cetak biru (blueprint) kampanye dan strategi pemasaran Anda dengan mudah di sini.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
        >
          ➕ Tambah Proyek Baru
        </button>
      </div>

      {/* GRID DAFTAR PROJECTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((item, index) => (
          <div key={index} className="bg-[#111424] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-bold rounded-full">
                  {item.category}
                </span>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                  {item.status}
                </span>
              </div>
              <h3 className="font-bold text-lg text-white">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-800/80">
              <button
                onClick={() => router.push("/generate")}
                className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                ✨ Buat Prompt →
              </button>
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

      {/* MODAL FORM TAMBAH / EDIT PROJECT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111424] border border-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {editingIndex !== null ? "✏️ Edit Proyek" : "➕ Tambah Proyek Baru"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white text-lg">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Judul Proyek / Campaign</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Promo Ramadhan Flash Sale"
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
                    placeholder="Contoh: Affiliate TikTok"
                    className="w-full bg-[#161a2e] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Status</label>
                  <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Contoh: Ready to Use"
                    className="w-full bg-[#161a2e] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Deskripsi / Detail Blueprint</label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Tuliskan ringkasan strategi campaign ini..."
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
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}