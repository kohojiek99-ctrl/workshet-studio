"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("Hello");
  const [userName, setUserName] = useState("Creator"); // Default fallback

  useEffect(() => {
    // 1. Fungsi ngatur sapaan otomatis berdasarkan jam lokal
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon");
    } else if (currentHour >= 17 && currentHour < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }

    // 2. Fungsi ngambil data user yang lagi aktif (login)
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Cek apakah user punya nama di profil metadata
        const nameFromMeta = user.user_metadata?.full_name || user.user_metadata?.name;
        
        // Kalau gak ada nama, ambil kata di depan @ pada email (contoh: budi@gmail.com -> budi)
        const nameFromEmail = user.email ? user.email.split('@')[0] : "Creator";
        
        let finalName = nameFromMeta || nameFromEmail;
        
        // Bikin huruf pertama jadi kapital biar rapi (budi -> Budi)
        finalName = finalName.charAt(0).toUpperCase() + finalName.slice(1);
        
        setUserName(finalName);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="p-8 text-white min-h-screen">
      {/* Sapaan Dinamis & Nama User */}
      <h1 className="text-4xl font-serif font-bold mb-2 flex items-center gap-3">
        👋 {greeting}, {userName}!
      </h1>
      <p className="text-gray-400 mb-10">
        Welcome back! Ready to build something amazing today?
      </p>

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1a1f33] p-6 rounded-2xl border border-gray-800 shadow-sm transition-colors hover:border-emerald-500/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400 font-medium">Projects</h3>
          </div>
          <p className="text-4xl font-serif font-bold mb-2">12</p>
          <p className="text-emerald-500 text-sm font-medium">+12% this month</p>
        </div>

        <div className="bg-[#1a1f33] p-6 rounded-2xl border border-gray-800 shadow-sm transition-colors hover:border-emerald-500/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400 font-medium">Prompts</h3>
          </div>
          <p className="text-4xl font-serif font-bold mb-2">184</p>
          <p className="text-emerald-500 text-sm font-medium">+12% this month</p>
        </div>

        <div className="bg-[#1a1f33] p-6 rounded-2xl border border-gray-800 shadow-sm transition-colors hover:border-emerald-500/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400 font-medium">Assets</h3>
          </div>
          <p className="text-4xl font-serif font-bold mb-2">632</p>
          <p className="text-emerald-500 text-sm font-medium">+12% this month</p>
        </div>

        <div className="bg-[#1a1f33] p-6 rounded-2xl border border-gray-800 shadow-sm transition-colors hover:border-emerald-500/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400 font-medium">AI Credits</h3>
          </div>
          <p className="text-4xl font-serif font-bold mb-2">9,240</p>
          <p className="text-emerald-500 text-sm font-medium">+12% this month</p>
        </div>
      </div>

      {/* Bagian Recent Projects */}
      <div className="bg-[#1a1f33] p-6 rounded-2xl border border-gray-800 shadow-sm">
        <h3 className="text-lg font-serif font-bold mb-6">Recent Projects</h3>
        <div className="flex justify-between items-center p-4 bg-[#141829] rounded-xl border border-gray-800/50 hover:border-gray-700 transition-colors">
          <div>
            <h4 className="font-medium text-gray-200">AI Landing Page</h4>
            <p className="text-sm text-gray-500 mt-1">Last updated today</p>
          </div>
          <span className="px-3 py-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 rounded-full border border-emerald-500/20">
            Active
          </span>
        </div>
        
        <div className="flex justify-between items-center p-4 bg-[#141829] rounded-xl border border-gray-800/50 hover:border-gray-700 transition-colors mt-4">
          <div>
            <h4 className="font-medium text-gray-200">Marketing Dashboard</h4>
            <p className="text-sm text-gray-500 mt-1">Last updated 2 days ago</p>
          </div>
          <span className="px-3 py-1 text-xs font-medium text-yellow-500 bg-yellow-500/10 rounded-full border border-yellow-500/20">
            Draft
          </span>
        </div>
      </div>
    </div>
  );
}