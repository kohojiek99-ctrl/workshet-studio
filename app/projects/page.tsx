"use client";

import { useState } from "react";

// Tipe data buat proyeknya
type Project = {
  id: number;
  title: string;
  category: string;
  status: "ide" | "editing" | "ready";
  date: string;
};

// Data simulasi awal
const initialProjects: Project[] = [
  { id: 1, title: "Promo Powerbank Flash Sale", category: "Produk Fisik", status: "ide", date: "24 Jul" },
  { id: 2, title: "Video 5 Detik Notion Template", category: "Produk Digital", status: "editing", date: "22 Jul" },
  { id: 3, title: "Testimoni Affiliate Batch 1", category: "Sosmed", status: "editing", date: "23 Jul" },
  { id: 4, title: "Bumper Outro Keranjang Kuning", category: "Aset", status: "ready", date: "20 Jul" },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isAdding, setIsAdding] = useState(false);

  // Fungsi buat ngerubah status (Mindahin kartu antar kolom)
  const handleStatusChange = (id: number, newStatus: "ide" | "editing" | "ready") => {
    setProjects(projects.map(proj => 
      proj.id === id ? { ...proj, status: newStatus } : proj
    ));
  };

  // Filter proyek berdasarkan statusnya
  const ideas = projects.filter(p => p.status === "ide");
  const editings = projects.filter(p => p.status === "editing");
  const readys = projects.filter(p => p.status === "ready");

  return (
    <div className="p-8 text-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold mb-2">Project Board 📊</h1>
          <p className="text-gray-400">
            Pantau progress pembuatan konten dan aset promosi kamu di sini.
          </p>
        </div>
        
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2"
        >
          <span className="text-xl">+</span> Buat Project Baru
        </button>
      </div>

      {/* Papan Kanban (3 Kolom) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KOLOM 1: IDEASI */}
        <div className="bg-[#1a1f33]/50 rounded-2xl p-4 border border-gray-800 h-fit min-h-[500px]">
          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="font-semibold text-gray-300 flex items-center gap-2">
              💡 Ideasi <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full">{ideas.length}</span>
            </h3>
          </div>
          <div className="space-y-4">
            {ideas.map(proj => (
              <ProjectCard key={proj.id} project={proj} onStatusChange={handleStatusChange} />
            ))}
          </div>
        </div>

        {/* KOLOM 2: PROSES EDITING */}
        <div className="bg-[#1a1f33]/50 rounded-2xl p-4 border border-blue-900/30 h-fit min-h-[500px]">
          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="font-semibold text-blue-400 flex items-center gap-2">
              ✂️ Proses Editing <span className="bg-blue-900/50 text-blue-300 text-xs px-2 py-1 rounded-full">{editings.length}</span>
            </h3>
          </div>
          <div className="space-y-4">
            {editings.map(proj => (
              <ProjectCard key={proj.id} project={proj} onStatusChange={handleStatusChange} />
            ))}
          </div>
        </div>

        {/* KOLOM 3: SIAP PUBLISH */}
        <div className="bg-[#1a1f33]/50 rounded-2xl p-4 border border-emerald-900/30 h-fit min-h-[500px]">
          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="font-semibold text-emerald-400 flex items-center gap-2">
              🚀 Siap Publish <span className="bg-emerald-900/50 text-emerald-300 text-xs px-2 py-1 rounded-full">{readys.length}</span>
            </h3>
          </div>
          <div className="space-y-4">
            {readys.map(proj => (
              <ProjectCard key={proj.id} project={proj} onStatusChange={handleStatusChange} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Komponen Kartu Proyek
function ProjectCard({ project, onStatusChange }: { project: Project, onStatusChange: (id: number, status: any) => void }) {
  return (
    <div className="bg-[#111424] p-5 rounded-xl border border-gray-700 hover:border-gray-500 transition-all shadow-sm group">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-medium px-2 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700">
          {project.category}
        </span>
        <span className="text-xs text-gray-500">{project.date}</span>
      </div>
      
      <h4 className="font-medium text-gray-200 mb-4 leading-snug">
        {project.title}
      </h4>
      
      <div className="pt-3 border-t border-gray-800 flex justify-between items-center">
        <span className="text-xs text-gray-500">Pindah ke:</span>
        <select 
          value={project.status}
          onChange={(e) => onStatusChange(project.id, e.target.value)}
          className="bg-[#1a1f33] text-xs text-gray-300 border border-gray-700 rounded-lg px-2 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
        >
          <option value="ide">💡 Ideasi</option>
          <option value="editing">✂️ Editing</option>
          <option value="ready">🚀 Siap Publish</option>
        </select>
      </div>
    </div>
  );
}