"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Gagal logout:", error.message);
    } else {
      router.push("/login"); 
      router.refresh(); 
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-[#111424] border-r border-gray-800 flex flex-col p-6">
      <div className="p-6">
        <h2 className="text-2xl font-serif font-bold text-white tracking-wider">
          WORKSHEET<span className="text-emerald-500">.</span>
        </h2>
        <p className="text-gray-500 text-sm mt-1">Studio Kreatif Pro</p>
      </div>

      <nav className="flex flex-col gap-2 flex-1 px-4">
        <Link
          href="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            pathname === "/" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          <span>📊</span> Dashboard
        </Link>

        <Link
          href="/prompts"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            pathname === "/prompts" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          <span>🧠</span> Prompts
        </Link>

        <Link
          href="/generate"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            pathname === "/generate" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          <span>✨</span> AI Studio
        </Link>

        <Link
          href="/projects"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            pathname === "/projects" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          <span>📈</span> Projects
        </Link>

        <Link
          href="/assets"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            pathname === "/assets" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          <span>📦</span> Assets
        </Link>

        <Link
          href="/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            pathname === "/settings" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          <span>⚙️</span> Settings
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-2.5 rounded-xl text-sm font-medium transition-all"
        >
          Keluar Studio
        </button>
      </div>
    </aside>
  );
}