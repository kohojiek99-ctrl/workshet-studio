"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [greeting, setGreeting] = useState("Good Afternoon");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // Fungsi Langsung Buka Custom GPT PromptCinema Studio™ Pro
  const handleOpenCustomGPT = () => {
    window.open("https://chatgpt.com/g/g-6a51bd07e8a081918f285736213bdf14-promptcinema-studiotm-pro", "_blank");
  };

  const quickPrompts = [
    { title: "🎬 Master Storyboard Video", desc: "Buat naskah & prompt Veo/Kling/Runway 5-15 detik", link: "/generate" },
    { title: "🎯 TikTok & Reels Ads", desc: "Hook 3 detik pertama & skrip konversi tinggi", link: "/generate" },
    { title: "📈 Meta Ads (FB & IG)", desc: "Stop-scroll hook & copywriting penualan", link: "/generate" },
    { title: "🖼️ Foto Produk / Visual Asset", desc: "Prompt Midjourney & DALL-E estetis", link: "/generate" },
  ];

  return (
    <div className="p-6 sm:p-8 md:p-10 max-w-[1400px] mx-auto text-white space-y-8">
      
      {/* HEADER & WELCOME SECTION + STATUS LISENSI */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#111424] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider">
              License: Lifetime Pro Access
            </span>
            <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold rounded-full uppercase tracking-wider">
              VIP Member
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2">
            👋 {greeting}, kohojiek99!
          </h1>
          <p className="text-gray-400 text-sm">
            Selamat datang kembali di pusat kendali AI Studio Anda. Semua sistem sinkron dan siap digunakan.
          </p>
        </div>

        {/* TOMBOL UTAMA AKSES CUSTOM GPT */}
        <button
          onClick={handleOpenCustomGPT}
          className="px-6 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
        >
          🚀 Buka Custom GPTs Utama
        </button>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
          <p className="text-xs text-gray-400 font-medium mb-1">Total Projects</p>
          <h3 className="text-2xl font-bold text-white mb-1">2</h3>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Sinkron real-time</span>
        </div>

        <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
          <p className="text-xs text-gray-400 font-medium mb-1">Total Master Prompts</p>
          <h3 className="text-2xl font-bold text-white mb-1">8</h3>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Siap pakai</span>
        </div>

        <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
          <p className="text-xs text-gray-400 font-medium mb-1">Total Assets</p>
          <h3 className="text-2xl font-bold text-white mb-1">1</h3>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Sinkron real-time</span>
        </div>

        <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6 border-emerald-500/30 bg-gradient-to-br from-[#111424] to-emerald-950/20">
          <p className="text-xs text-emerald-400 font-bold mb-1">Custom GPT Status</p>
          <h3 className="text-xl font-bold text-white mb-1">Active ✨</h3>
          <span className="text-[10px] text-gray-300">Unlimited via ChatGPT</span>
        </div>

      </div>

      {/* PANDUAN CEPAT / ONBOARDING */}
      <div className="bg-[#111424] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">📖 Panduan Singkat Penggunaan Studio</h3>
          <span className="text-xs text-gray-400">3 Langkah Mudah</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-[#161a2e] border border-gray-800/80 rounded-2xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">1</div>
            <h4 className="font-bold text-sm text-white">Pilih & Isi Form</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Masuk ke menu <b>AI Studio</b>, pilih salah satu Master Prompt, lalu isi form interaktif sesuai produk atau topik Anda.
            </p>
          </div>

          <div className="bg-[#161a2e] border border-gray-800/80 rounded-2xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">2</div>
            <h4 className="font-bold text-sm text-white">Salin & Buka GPTs</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Klik tombol utama. Sistem akan otomatis menyalin Master Prompt ke clipboard sekaligus membuka Custom GPT Anda.
            </p>
          </div>

          <div className="bg-[#161a2e] border border-gray-800/80 rounded-2xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">3</div>
            <h4 className="font-bold text-sm text-white">Paste & Generate</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Tempel (Ctrl+V / Cmd+V) prompt tersebut ke dalam jendela Custom GPT Anda di ChatGPT untuk mendapatkan hasil instan.
            </p>
          </div>

        </div>
      </div>

      {/* QUICK SHORTCUTS MASTER PROMPT (PENGGANTI RECENT PROJECTS) */}
      <div className="bg-[#111424] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">⚡ Quick Master Prompt Shortcuts</h3>
          <span 
            onClick={() => router.push("/generate")}
            className="text-xs text-emerald-400 cursor-pointer hover:underline font-semibold"
          >
            Buka AI Studio Lengkap →
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickPrompts.map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(item.link)}
              className="bg-[#161a2e] border border-gray-800 hover:border-emerald-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-lg hover:shadow-emerald-500/5 flex flex-col justify-between group"
            >
              <div className="space-y-2 mb-4">
                <h4 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="flex items-center text-xs text-emerald-400 font-bold gap-1">
                <span>Gunakan Prompt</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}