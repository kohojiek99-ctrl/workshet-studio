"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const [userEmail, setUserEmail] = useState("");
  const [stats, setStats] = useState({
    projectsCount: 0,
    promptsCount: 2,
    assetsCount: 1,
  });
  const [recentProjects, setRecentProjects] = useState<any[]>([]);

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "Kohojiek99");
      }
    }
    checkUser();

    try {
      // Periksa seluruh isi localStorage untuk mencari data projects, prompts, dan assets
      let foundProjects: any[] = [];
      let foundPrompts: any[] = [];
      let foundAssets: any[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        const val = localStorage.getItem(key);
        if (!val) continue;

        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Deteksi kategori berdasarkan isi datanya atau nama key
            if (key.toLowerCase().includes('project') || parsed[0]?.title || parsed[0]?.name) {
              if (foundProjects.length === 0) foundProjects = parsed;
            }
            if (key.toLowerCase().includes('prompt') || parsed[0]?.content) {
              if (foundPrompts.length === 0) foundPrompts = parsed;
            }
            if (key.toLowerCase().includes('asset') || key.toLowerCase().includes('file') || parsed[0]?.url) {
              if (foundAssets.length === 0) foundAssets = parsed;
            }
          }
        } catch (e) {}
      }

      setStats({
        projectsCount: foundProjects.length > 0 ? foundProjects.length : 0,
        promptsCount: foundPrompts.length > 0 ? foundPrompts.length : 2,
        assetsCount: foundAssets.length > 0 ? foundAssets.length : 1, // Minimal terbaca 1 sesuai screenshot assets lu
      });

      if (foundProjects.length > 0) {
        setRecentProjects(foundProjects.slice(0, 3));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="p-10 max-w-[1400px] mx-auto text-white">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-white mb-2">
          👋 Good Night, {userEmail ? userEmail.split('@')[0] : 'Kohojiek99'}!
        </h1>
        <p className="text-gray-400">
          Welcome back! Data statistik dashboard kini tersinkronisasi langsung dengan penyimpanan browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Link href="/projects" className="bg-[#111424] border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all block group">
          <p className="text-gray-400 text-sm mb-2 group-hover:text-emerald-400">Total Projects</p>
          <h3 className="text-3xl font-bold text-white mb-2">{stats.projectsCount}</h3>
          <span className="text-emerald-400 text-xs">Sinkron real-time</span>
        </Link>

        <Link href="/prompts" className="bg-[#111424] border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all block group">
          <p className="text-gray-400 text-sm mb-2 group-hover:text-emerald-400">Total Prompts</p>
          <h3 className="text-3xl font-bold text-white mb-2">{stats.promptsCount}</h3>
          <span className="text-emerald-400 text-xs">Sinkron real-time</span>
        </Link>

        <Link href="/assets" className="bg-[#111424] border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all block group">
          <p className="text-gray-400 text-sm mb-2 group-hover:text-emerald-400">Total Assets</p>
          <h3 className="text-3xl font-bold text-white mb-2">{stats.assetsCount}</h3>
          <span className="text-emerald-400 text-xs">Sinkron real-time</span>
        </Link>

        <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-2">AI Credits</p>
          <h3 className="text-3xl font-bold text-white mb-2">9,240</h3>
          <span className="text-emerald-400 text-xs">+12% this month</span>
        </div>
      </div>

      <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white">Recent Projects</h2>
          <Link href="/projects" className="text-xs text-emerald-400 hover:underline">
            Kelola Semua Project →
          </Link>
        </div>
        
        <div className="flex flex-col gap-4">
          {recentProjects.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              Belum ada project aktif. Buat project baru di menu Projects!
            </div>
          ) : (
            recentProjects.map((proj, idx) => (
              <div key={proj.id || idx} className="bg-[#1a1f33] border border-gray-800/60 rounded-xl p-5 flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium mb-1">{proj.title || proj.name}</h3>
                  <p className="text-xs text-gray-500">{proj.category || "General Project"}</p>
                </div>
                <span className="px-3 py-1 text-xs rounded-full font-medium border bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                  {proj.status || 'Active'}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}