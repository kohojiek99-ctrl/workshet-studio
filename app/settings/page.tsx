"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function SettingsPage() {
  const [niche, setNiche] = useState("Affiliate Marketing & Digital Products");
  const [language, setLanguage] = useState("Bahasa Indonesia");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState(false);

  // Load settingan tersimpan dari localStorage saat pertama buka
  useEffect(() => {
    const savedNiche = localStorage.getItem("user_niche");
    const savedLang = localStorage.getItem("user_language");
    const savedPic = localStorage.getItem("user_profile_pic");

    if (savedNiche) setNiche(savedNiche);
    if (savedLang) setLanguage(savedLang);
    if (savedPic) setProfilePic(savedPic);
  }, []);

  // Handler Simpan Perubahan
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user_niche", niche);
    localStorage.setItem("user_language", language);
    if (profilePic) {
      localStorage.setItem("user_profile_pic", profilePic);
    }

    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  // Handler Upload Foto Profil
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 sm:p-8 md:p-10 max-w-[1400px] mx-auto text-white">
      
      {/* Header Halaman */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          Settings & Profile ⚙️
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Atur preferensi profil, bahasa, dan niche ruang kerja digital kamu di sini.
        </p>
      </div>

      {/* Notifikasi Berhasil Simpan */}
      {savedMessage && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-medium flex items-center gap-2">
          <span>✅</span> Pengaturan berhasil disimpan dan disesuaikan!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Kiri: Profil Pengguna (Responsive) */}
        <div className="lg:col-span-1 bg-[#111424] border border-gray-800 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-emerald-500/40 mb-4 bg-gray-800 flex items-center justify-center">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl sm:text-4xl text-gray-400">👤</span>
            )}
          </div>

          <label className="cursor-pointer bg-[#1a1f33] hover:bg-gray-800 border border-gray-700 text-xs sm:text-sm font-medium px-4 py-2 rounded-xl text-gray-200 transition-all mb-4">
            📷 Ganti Foto Profil
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          <h3 className="text-base sm:text-lg font-bold text-white">Kohojiek99</h3>
          <p className="text-xs text-gray-400 mb-4">Creator & Affiliate Marketer</p>
          <div className="w-full border-t border-gray-800 pt-4 text-left">
            <span className="text-xs text-gray-500 block mb-1">Status Langganan</span>
            <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold">
              Lifetime Founder / Owner
            </span>
          </div>
        </div>

        {/* Kolom Kanan: Form Pengaturan & Identitas Terkunci */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            
            {/* Identitas Workspace (Terkunci Mati / Read Only) */}
            <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                🔒 Identitas Workspace (Locked Brand)
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Nama Brand / Studio (Permanen)
                  </label>
                  <input 
                    type="text"
                    value="Worksheet Studio"
                    disabled
                    className="w-full bg-[#161a2e] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed select-none"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    *Identitas brand resmi milik kreator. Tidak dapat diubah atau dihapus.
                  </p>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Logo Resmi Studio
                  </label>
                  <div className="flex items-center gap-4 bg-[#161a2e] border border-gray-800 p-3 rounded-xl">
                    <div className="h-8 w-auto flex items-center">
                      <Image 
                        src="/logo.png" 
                        alt="Worksheet Studio Logo" 
                        width={180} 
                        height={50} 
                        className="h-7 w-auto object-contain" 
                      />
                    </div>
                    <span className="text-xs text-emerald-400 font-medium">✓ Terpasang Permanen</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferensi User (Bisa Diubah) */}
            <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                ⚙️ Preferensi Pengguna
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Fokus Niche / Industri Utama
                  </label>
                  <input 
                    type="text"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="Contoh: Affiliate TikTok, Digital Products, Kuliner..."
                    className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500 transition-all"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    Digunakan oleh AI Studio untuk menyesuaikan arah copywriting dan hasil generate.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Bahasa Interface
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500 transition-all cursor-pointer"
                  >
                    <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                    <option value="English">English</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tombol Simpan */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all"
              >
                💾 Simpan Perubahan
              </button>
            </div>

          </form>

          {/* Status Integrasi Sistem */}
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-4">Status Integrasi Sistem</h2>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#1a1f33] p-4 rounded-xl border border-gray-800 gap-3">
                <div>
                  <p className="text-sm font-medium text-white">OpenAI API (ChatGPT)</p>
                  <p className="text-xs text-gray-500">Digunakan untuk AI Prompt & Studio Generator</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold">
                  Connected
                </span>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#1a1f33] p-4 rounded-xl border border-gray-800 gap-3">
                <div>
                  <p className="text-sm font-medium text-white">Supabase Cloud & Storage</p>
                  <p className="text-xs text-gray-500">Database & Brankas file aset digital</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold">
                  Connected
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}