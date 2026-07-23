"use client";

import { useState } from "react";

export default function ProjectsPage() {
  // State untuk ngontrol pop-up modal kebuka/ketutup
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Project Board 📊</h1>
          <p className="text-gray-400">Pantau progress pembuatan konten dan aset promosi kamu di sini.</p>
        </div>
        
        {/* Tombol yang udah dikasih "nyawa" */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2"
        >
          <span>+</span> Buat Project Baru
        </button>
      </div>

      {/* Kanban Board Tampilan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Kolom 1: Ideasi */}
        <div className="bg-[#1a1f33]/50 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-white font-medium">💡 Ideasi</h2>
            <span className="bg-gray-800 text-gray-400 text-xs py-0.5 px-2 rounded-full">1</span>
          </div>
          {/* Card */}
          <div className="bg-[#111424] border border-gray-700 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] text-gray-400 border border-gray-700 px-2 py-1 rounded-md">Produk Fisik</span>
              <span className="text-[10px] text-gray-500">24 Jul</span>
            </div>
            <h3 className="text-white text-sm font-medium mb-4">Promo Powerbank Flash Sale</h3>
            <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-800">
              <span>Pindah ke:</span>
              <select className="bg-transparent border border-gray-700 rounded p-1 text-gray-300 outline-none">
                <option>💡 Ideasi</option>
                <option>✂️ Editing</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kolom 2: Proses Editing */}
        <div className="bg-[#1a1f33]/50 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-blue-400 font-medium">✂️ Proses Editing</h2>
            <span className="bg-blue-900/30 text-blue-400 text-xs py-0.5 px-2 rounded-full">2</span>
          </div>
          {/* Card 1 */}
          <div className="bg-[#111424] border border-gray-700 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] text-gray-400 border border-gray-700 px-2 py-1 rounded-md">Produk Digital</span>
              <span className="text-[10px] text-gray-500">22 Jul</span>
            </div>
            <h3 className="text-white text-sm font-medium mb-4">Video 5 Detik Notion Template</h3>
            <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-800">
              <span>Pindah ke:</span>
              <select className="bg-transparent border border-gray-700 rounded p-1 text-gray-300 outline-none">
                <option>✂️ Editing</option>
                <option>🚀 Siap Publish</option>
              </select>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-[#111424] border border-gray-700 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] text-gray-400 border border-gray-700 px-2 py-1 rounded-md">Sosmed</span>
              <span className="text-[10px] text-gray-500">23 Jul</span>
            </div>
            <h3 className="text-white text-sm font-medium mb-4">Testimoni Affiliate Batch 1</h3>
            <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-800">
              <span>Pindah ke:</span>
              <select className="bg-transparent border border-gray-700 rounded p-1 text-gray-300 outline-none">
                <option>✂️ Editing</option>
                <option>🚀 Siap Publish</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kolom 3: Siap Publish */}
        <div className="bg-[#1a1f33]/50 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-emerald-400 font-medium">🚀 Siap Publish</h2>
            <span className="bg-emerald-900/30 text-emerald-400 text-xs py-0.5 px-2 rounded-full">1</span>
          </div>
          {/* Card */}
          <div className="bg-[#111424] border border-gray-700 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] text-gray-400 border border-gray-700 px-2 py-1 rounded-md">Aset</span>
              <span className="text-[10px] text-gray-500">20 Jul</span>
            </div>
            <h3 className="text-white text-sm font-medium mb-4">Bumper Outro Keranjang Kuning</h3>
            <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-800">
              <span>Pindah ke:</span>
              <select className="bg-transparent border border-gray-700 rounded p-1 text-emerald-400 outline-none">
                <option>🚀 Siap Publish</option>
                <option>✅ Selesai</option>
              </select>
            </div>
          </div>
        </div>

      </div>

      {/* POP-UP MODAL (Akan muncul kalau state isModalOpen = true) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-[#111424] border border-gray-700 p-6 md:p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-2">
              <span>✨</span> Buka Project Baru
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-2">Nama Project Konten</label>
                <input 
                  type="text" 
                  placeholder="Misal: Hook Video Powerbank..." 
                  className="w-full bg-[#1a1f33] border border-gray-700 text-white rounded-xl p-3 outline-none focus:border-emerald-500 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-2">Kategori Aset</label>
                <select className="w-full bg-[#1a1f33] border border-gray-700 text-white rounded-xl p-3 outline-none focus:border-emerald-500 text-sm appearance-none">
                  <option>🛍️ Produk Fisik</option>
                  <option>💻 Produk Digital</option>
                  <option>📱 Aset TikTok / Sosmed</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 transition-all text-sm font-medium"
              >
                Batal
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-all text-sm font-medium"
              >
                Simpan & Mulai
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}