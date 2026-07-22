"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
// Kita pakai file kunci master yang udah lu bikin di folder lib
import { supabase } from "@/lib/supabase";

export default function Sidebar() {
  const router = useRouter();

  // Fungsi Eksekusi Logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Gagal logout:", error.message);
    } else {
      router.push("/login"); // Balikin ke halaman login
      router.refresh(); // Bersihin sisa memori halaman
    }
  };

  return (
    <div className="w-64 min-h-screen bg-[#111424] border-r border-gray-800 flex flex-col">
      {/* Bagian Logo */}
      <div className="p-6">
        <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
          WORKSCHET™
        </h2>
        <p className="text-gray-500 text-sm mt-1">Studio</p>
      </div>

      {/* Bagian Menu Navigasi */}
      <nav className="flex-1 px-4 mt-4 space-y-2">
        <Link 
          href="/" 
          className="block px-4 py-3 text-gray-300 hover:bg-[#1a1f33] hover:text-white rounded-xl transition-all"
        >
          Dashboard
        </Link>
        <Link 
          href="/prompts" 
          className="block px-4 py-3 text-gray-300 hover:bg-[#1a1f33] hover:text-white rounded-xl transition-all"
        >
          Prompts
        </Link>
        <Link 
          href="/projects" 
          className="block px-4 py-3 text-gray-300 hover:bg-[#1a1f33] hover:text-white rounded-xl transition-all"
        >
          Projects
        </Link>
        <Link 
          href="/assets" 
          className="block px-4 py-3 text-gray-300 hover:bg-[#1a1f33] hover:text-white rounded-xl transition-all"
        >
          Assets
        </Link>
        <Link 
          href="/settings" 
          className="block px-4 py-3 text-gray-300 hover:bg-[#1a1f33] hover:text-white rounded-xl transition-all"
        >
          Settings
        </Link>
      </nav>

      {/* Bagian Bawah (Tombol Logout) */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}