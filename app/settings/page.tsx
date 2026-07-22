"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [brandName, setBrandName] = useState("Worksheet Studio");
  const [niche, setNiche] = useState("Affiliate Marketing & Digital Products");
  const [isSaved, setIsSaved] = useState(false);

  // Fungsi simpan pengaturan
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-8 text-white min-h-screen max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold mb-2">Settings & Profile ⚙️</h1>
        <p className="text-gray-400">
          Atur preferensi brand, niche, dan identitas ruang kerja digital kamu di sini.
        </p>
      </div>

      {isSaved && (
        <div className="mb-6 bg-emerald-900/40 border border-emerald-600 text-emerald-300 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
          <span>✨</span> Pengaturan berhasil disimpan secara lokal!
        </div>
      )}

      <div className="space-y-6">
        {/* Card Profil Workspace */}
        <div className="bg-[#1a1f33] p-6 rounded-2xl border border-gray-800 shadow-sm">
          <h3 className="text-lg font-serif font-bold mb-4 text-emerald-400">
            🏢 Identitas Workspace
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Nama Brand / Studio
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-[#111424] border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Fokus Niche / Industri Utama
              </label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full bg-[#111424] border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Niche ini bakal ngebantu AI ngeneset arah *copywriting* jualan lu.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-2.5 rounded-xl transition-all text-sm"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

        {/* Card Integrasi API Status */}
        <div className="bg-[#1a1f33] p-6 rounded-2xl border border-gray-800 shadow-sm">
          <h3 className="text-lg font-serif font-bold mb-4 text-emerald-400">
            🔌 Status Integrasi Sistem
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-[#111424] p-4 rounded-xl border border-gray-700">
              <div>
                <h4 className="font-medium text-sm text-gray-200">OpenAI API (ChatGPT)</h4>
                <p className="text-xs text-gray-500">Digunakan untuk AI Prompt & Studio Generator</p>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-medium">
                Connected
              </span>
            </div>

            <div className="flex justify-between items-center bg-[#111424] p-4 rounded-xl border border-gray-700">
              <div>
                <h4 className="font-medium text-sm text-gray-200">Supabase Cloud & Storage</h4>
                <p className="text-xs text-gray-500">Database & Brankas file aset digital</p>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-medium">
                Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}