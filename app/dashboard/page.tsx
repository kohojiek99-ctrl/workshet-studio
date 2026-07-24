"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  // Cek user login
  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "Kohojiek99");
      }
    }
    checkUser();
  }, []);

  // Fungsi Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen bg-[#0b0e14] text-white">
      
      {/* SIDEBAR UTAMA (LENGKAP DENGAN AI STUDIO) */}
      <aside className="w-64 bg-[#111424] border-r border-gray-800 flex flex-col p-6 justify-between">
        <div>
          {/* Logo */}
          <div className="p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                W
              </div>
              <span className="text-white font-serif font-bold text-lg tracking-wide">
                Worksheet Studio
              </span>
            </div>
          </div>

          {/* Menu Navigasi */}
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/5"
            >
              <span>📊</span> Dashboard
            </Link>

            <Link
              href="/prompts"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all"
            >
              <span>🧠</span> Prompts
            </Link>

            {/* MENU BARU AI STUDIO */}
            <Link
              href="/generate"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all"
            >
              <span>✨</span> AI Studio
            </Link>

            <Link
              href="/projects"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all"
            >
              <span>📈</span> Projects
            </Link>

            <Link
              href="/assets"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all"
            >
              <span>📦</span> Assets
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all"
            >
              <span>⚙️</span> Settings
            </Link>
          </nav>
        </div>

        {/* Tombol Keluar Studio */}
        <div className="pt-6 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-2.5 rounded-xl text-sm font-medium transition-all"
          >
            Keluar Studio
          </button>
        </div>
      </aside>

      {/* KONTEN UTAMA DASHBOARD */}
      <main className="flex-1 p-10 overflow-y-auto">
        
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            👋 Good Night, {userEmail.split('@')[0]}!
          </h1>
          <p className="text-gray-400">
            Welcome back! Ready to build something amazing today?
          </p>
        </div>

        {/* Kartu Statistik Atas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-2">Projects</p>
            <h3 className="text-3xl font-bold text-white mb-2">12</h3>
            <span className="text-emerald-400 text-xs">+12% this month</span>
          </div>

          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-2">Prompts</p>
            <h3 className="text-3xl font-bold text-white mb-2">184</h3>
            <span className="text-emerald-400 text-xs">+12% this month</span>
          </div>

          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-2">Assets</p>
            <h3 className="text-3xl font-bold text-white mb-2">632</h3>
            <span className="text-emerald-400 text-xs">+12% this month</span>
          </div>

          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-2">AI Credits</p>
            <h3 className="text-3xl font-bold text-white mb-2">9,240</h3>
            <span className="text-emerald-400 text-xs">+12% this month</span>
          </div>
        </div>

        {/* Recent Projects Section */}
        <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Recent Projects</h2>
          
          <div className="flex flex-col gap-4">
            <div className="bg-[#1a1f33] border border-gray-800/60 rounded-xl p-5 flex justify-between items-center">
              <div>
                <h3 className="text-white font-medium mb-1">AI Landing Page</h3>
                <p className="text-xs text-gray-500">Last updated today</p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-full font-medium">
                Active
              </span>
            </div>

            <div className="bg-[#1a1f33] border border-gray-800/60 rounded-xl p-5 flex justify-between items-center">
              <div>
                <h3 className="text-white font-medium mb-1">Marketing Dashboard</h3>
                <p className="text-xs text-gray-500">Last updated 2 days ago</p>
              </div>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs rounded-full font-medium">
                Draft
              </span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}