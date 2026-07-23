"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  // State untuk buka/tutup menu di layar HP
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLoginPage = pathname === "/login";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const navItems = [
    { name: "Dashboard", href: "/", icon: "📊" },
    { name: "Prompts", href: "/prompts", icon: "🧠" },
    { name: "Projects", href: "/projects", icon: "📋" },
    { name: "Assets", href: "/assets", icon: "📦" },
    { name: "Settings", href: "/settings", icon: "⚙️" },
  ];

  if (isLoginPage) {
    return (
      <html lang="id">
        <body className="bg-[#111424] text-white antialiased">
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="id">
      <body className="bg-[#111424] text-white antialiased flex flex-col md:flex-row min-h-screen">
        
        {/* Navbar Khusus Mobile (Hanya muncul di HP) */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-800 bg-[#111424]">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧠</span>
            <h1 className="text-lg font-serif font-bold">Worksheet Studio</h1>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-400 hover:text-white focus:outline-none text-2xl"
          >
            {isMobileMenuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Sidebar Kiri (Akan jadi Dropdown di HP, dan Sidebar normal di PC) */}
        <aside
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } md:flex w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-800 p-6 flex-col justify-between bg-[#111424] shrink-0 transition-all`}
        >
          <div>
            {/* Logo / Judul (Hanya Muncul di Desktop) */}
            <div className="hidden md:flex items-center gap-3 mb-10 px-2">
              <span className="text-2xl">🧠</span>
              <h1 className="text-xl font-serif font-bold tracking-wide">Worksheet Studio</h1>
            </div>

            {/* Menu Navigasi */}
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)} // Otomatis tutup menu kalau link diklik di HP
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "text-gray-400 hover:text-gray-200 hover:bg-[#1a1f33]"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Tombol Logout */}
          <div className="pt-4 mt-8 md:mt-0 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-400 font-medium py-3 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
            >
              <span>🚪</span>
              <span>Keluar Studio</span>
            </button>
          </div>
        </aside>

        {/* Area Konten Utama */}
        <main className="flex-1 overflow-y-auto bg-[#111424] w-full">
          {children}
        </main>
      </body>
    </html>
  );
}