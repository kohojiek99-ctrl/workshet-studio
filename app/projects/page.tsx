"use client";

import { useState, useEffect } from "react";

export default function ProjectsPage() {
  // Kolom Default
  const defaultColumns = ["💡 Ideasi", "✂️ Proses Editing", "🚀 Siap Publish"];
  const [columns, setColumns] = useState<string[]>([]);
  
  // Proyek Default
  const defaultProjects = [
    { id: 1, title: "Promo Powerbank Flash Sale", type: "Produk Fisik", date: "24 Jul", status: "💡 Ideasi" },
    { id: 2, title: "Video 5 Detik Affiliate TikTok", type: "Aset TikTok", date: "22 Jul", status: "✂️ Proses Editing" },
    { id: 3, title: "Bumper Outro Keranjang Kuning", type: "Aset TikTok", date: "20 Jul", status: "🚀 Siap Publish" }
  ];
  const [projects, setProjects] = useState<any[]>([]);

  // State untuk UI Tambah Kolom
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  // Load data pas pertama kali buka
  useEffect(() => {
    const savedCols = localStorage.getItem('boardColumns');
    const savedProjs = localStorage.getItem('boardProjects');
    
    setColumns(savedCols ? JSON.parse(savedCols) : defaultColumns);
    setProjects(savedProjs ? JSON.parse(savedProjs) : defaultProjects);
  }, []);

  // Fungsi simpan otomatis
  const saveCols = (cols: string[]) => {
    setColumns(cols);
    localStorage.setItem('boardColumns', JSON.stringify(cols));
  };
  const saveProjs = (projs: any[]) => {
    setProjects(projs);
    localStorage.setItem('boardProjects', JSON.stringify(projs));
  };

  // --- FITUR KOLOM (STATUS PROYEK) ---
  const handleAddColumn = () => {
    if (newColumnName.trim() !== "") {
      saveCols([...columns, newColumnName.trim()]);
      setNewColumnName("");
      setIsAddingColumn(false);
    }
  };

  const handleEditColumn = (oldName: string) => {
    const newName = window.prompt(`Ganti nama kolom "${oldName}" jadi apa?`, oldName);
    if (!newName || newName.trim() === "" || newName === oldName) return;
    
    const updatedCols = columns.map(c => c === oldName ? newName.trim() : c);
    saveCols(updatedCols);
    
    // Update juga semua proyek yang ada di kolom lama ini
    const updatedProjs = projects.map(p => p.status === oldName ? { ...p, status: newName.trim() } : p);
    saveProjs(updatedProjs);
  };

  const handleDeleteColumn = (colName: string) => {
    const projectsInCol = projects.filter(p => p.status === colName);
    if (projectsInCol.length > 0) {
      alert(`⚠️ Nggak bisa dihapus bro! Masih ada ${projectsInCol.length} proyek di kolom ini. Pindahin dulu proyeknya ya.`);
      return;
    }
    if (window.confirm(`Yakin mau hapus kolom "${colName}"?`)) {
      saveCols(columns.filter(c => c !== colName));
    }
  };

  // --- FITUR PROYEK ---
  const handleAddProject = () => {
    const title = window.prompt("Masukkan nama proyek baru:");
    if (!title || title.trim() === "") return;
    
    const type = window.prompt("Kategori proyek? (misal: Aset TikTok, Produk Fisik, dll)", "Aset TikTok");
    if (!type) return;

    const newProj = {
      id: Date.now(),
      title: title.trim(),
      type: type.trim(),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      status: columns[0] // Masuk ke kolom paling kiri otomatis
    };
    saveProjs([newProj, ...projects]);
  };

  const handleEditProject = (id: number, oldTitle: string) => {
    const newTitle = window.prompt("Ganti nama proyek:", oldTitle);
    if (!newTitle || newTitle.trim() === "" || newTitle === oldTitle) return;
    saveProjs(projects.map(p => p.id === id ? { ...p, title: newTitle.trim() } : p));
  };

  const handleDeleteProject = (id: number, title: string) => {
    if (window.confirm(`Yakin mau hapus proyek "${title}"?`)) {
      saveProjs(projects.filter(p => p.id !== id));
    }
  };

  const handleMoveProject = (id: number, newStatus: string) => {
    saveProjs(projects.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const handleDownloadProject = (proj: any) => {
    const textContent = `==== DETAIL PROYEK ====\n\nNama Proyek : ${proj.title}\nKategori    : ${proj.type}\nStatus      : ${proj.status}\nTanggal     : ${proj.date}\n\n=======================\nCatatan: (Tambahkan detail skrip/konsep di sini)`;
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Proyek_${proj.title.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2 flex items-center gap-2">
            Project Board 📊
          </h1>
          <p className="text-gray-400">
            Pantau progress pembuatan konten dan aset promosi kamu di sini.
          </p>
        </div>
        <button 
          onClick={handleAddProject}
          className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2"
        >
          <span>+</span> Buat Project Baru
        </button>
      </div>

      {/* KANBAN BOARD AREA */}
      <div className="flex overflow-x-auto pb-8 gap-6 items-start h-full no-scrollbar">
        {columns.map((col, index) => (
          <div key={index} className="bg-[#111424] border border-gray-800 rounded-2xl p-5 min-w-[320px] max-w-[320px] flex-shrink-0">
            
            {/* HEADER KOLOM (BISA EDIT & HAPUS) */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-3 group">
              <h2 className="text-lg font-medium text-white">{col}</h2>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEditColumn(col)} className="text-orange-400 hover:text-orange-300 text-sm" title="Edit Kolom">✏️</button>
                <button onClick={() => handleDeleteColumn(col)} className="text-red-400 hover:text-red-300 text-sm" title="Hapus Kolom">❌</button>
              </div>
            </div>

            {/* DAFTAR PROYEK DI DALAM KOLOM INI */}
            <div className="flex flex-col gap-4 min-h-[150px]">
              {projects.filter(p => p.status === col).map((proj) => (
                <div key={proj.id} className="bg-[#1a1f33] border border-gray-700/50 rounded-xl p-4 hover:border-emerald-500/30 transition-all flex flex-col group">
                  
                  {/* Info Atas Proyek */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-medium px-2 py-1 bg-gray-800 text-gray-300 rounded-md border border-gray-700">
                      {proj.type}
                    </span>
                    <span className="text-xs text-gray-500">{proj.date}</span>
                  </div>
                  
                  {/* Judul Proyek */}
                  <h3 className="text-sm text-gray-100 font-medium mb-4 leading-relaxed">
                    {proj.title}
                  </h3>
                  
                  <div className="mt-auto border-t border-gray-800 pt-3">
                    {/* Opsi Pindah Kolom */}
                    <div className="flex items-center justify-between mb-3 bg-black/20 p-2 rounded-lg border border-gray-800/50">
                      <span className="text-xs text-gray-500">Pindah ke:</span>
                      <select 
                        value={proj.status}
                        onChange={(e) => handleMoveProject(proj.id, e.target.value)}
                        className="bg-transparent text-emerald-400 font-medium text-xs outline-none cursor-pointer text-right"
                      >
                        {columns.map(c => <option key={c} value={c} className="bg-[#1a1f33]">{c}</option>)}
                      </select>
                    </div>

                    {/* TOMBOL AKSI PROYEK (EDIT, HAPUS, DOWNLOAD) */}
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleDownloadProject(proj)} title="Unduh Catatan Proyek" className="flex-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 py-1.5 rounded transition-all text-xs flex justify-center items-center">
                        ⬇️
                      </button>
                      <button onClick={() => handleEditProject(proj.id, proj.title)} title="Edit Nama Proyek" className="flex-1 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 py-1.5 rounded transition-all text-xs flex justify-center items-center">
                        ✏️
                      </button>
                      <button onClick={() => handleDeleteProject(proj.id, proj.title)} title="Hapus Proyek" className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-1.5 rounded transition-all text-xs flex justify-center items-center">
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* TAMBAH KOLOM BARU */}
        <div className="bg-[#111424]/50 border border-dashed border-gray-700 hover:border-emerald-500/50 rounded-2xl min-w-[320px] max-w-[320px] h-[120px] flex items-center justify-center transition-all">
          {isAddingColumn ? (
            <div className="flex flex-col gap-2 w-full px-6">
              <input 
                type="text" 
                value={newColumnName} 
                onChange={(e) => setNewColumnName(e.target.value)}
                placeholder="Nama tahap baru..."
                className="bg-[#1a1f33] text-sm text-white px-3 py-2 rounded-lg border border-emerald-500/50 outline-none w-full"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleAddColumn()}
              />
              <div className="flex gap-2">
                <button onClick={handleAddColumn} className="flex-1 bg-emerald-500/20 text-emerald-400 text-xs py-1.5 rounded-lg">Simpan</button>
                <button onClick={() => setIsAddingColumn(false)} className="flex-1 bg-gray-800 text-gray-400 text-xs py-1.5 rounded-lg">Batal</button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setIsAddingColumn(true)}
              className="text-gray-500 hover:text-emerald-400 flex flex-col items-center gap-2 w-full h-full justify-center"
            >
              <span className="text-2xl">+</span>
              <span className="text-sm font-medium">Tambah Tahap Baru</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}