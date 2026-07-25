"use client";

import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const isLoginPage = pathname === "/login";

  // Ambil foto profil dari localStorage secara real-time
  useEffect(() => {
    const updateProfilePic = () => {
      const savedPic = localStorage.getItem("user_profile_pic");
      if (savedPic) setProfilePic(savedPic);
    };

    updateProfilePic();
    // Event listener biar foto langsung sinkron kalau diganti di settings
    window.addEventListener("storage", updateProfilePic);
    return () => window.removeEventListener("storage", updateProfilePic);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const navItems = [
    { name: "Dashboard", href: "/", icon: "📊" },
    { name: "Prompts", href: "/prompts", icon: "🧠" },
    { name: "AI Studio", href: "/generate", icon: "✨" },
    { name: "Projects", href: "/projects", icon: "📋" },
    { name: "Assets", href: "/assets", icon: "📦" },
    { name: "Settings", href: "/settings", icon: "⚙️" },
  ];

  if (isLoginPage) {
    return (
      <html lang="id">
        <body className="bg-[#0b0e14] text-white antialiased">{children}</body>
      </html>
    );
  }

  return (
    <html lang="id">
      <body className="bg-[#0b0e14] text-white antialiased">
        <div className="min-h-screen bg-[#0b0e14] flex flex-col md:flex-row">
          
          {/* Mobile Top Navbar */}
          <div className="md:hidden flex items-center justify-between bg-[#111424] border-b border-gray-800 p-4 sticky top-0 z-50">
            <div className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="Worksheet Studio Logo" 
                width={140} 
                height={40} 
                className="h-7 w-auto object-contain" 
                priority
              />
            </div>
            
            <div className="flex items-center gap-3">
              {/* Foto Profil Pojok Kanan Atas (Mobile) */}
              <Link href="/settings" className="w-9 h-9 rounded-full overflow-hidden border border-emerald-500/40 bg-gray-800 flex items-center justify-center shadow">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm text-gray-300">👤</span>
                )}
              </Link>

              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-white px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-sm font-medium flex items-center gap-1.5 border border-gray-700"
              >
                <span>{isSidebarOpen ? "✕ Tutup" : "☰ Menu"}</span>
              </button>
            </div>
          </div>

          {/* Sidebar Kiri */}
          <aside className={`
            fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#111424] border-r border-gray-800 flex flex-col p-6 justify-between shrink-0 transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0 pt-16 md:pt-6" : "-translate-x-full md:translate-x-0"}
          `}>
            <div>
              {/* Logo Desktop */}
              <div className="hidden md:flex px-2 py-4 mb-6 items-center">
                <Image 
                  src="/logo.png" 
                  alt="Worksheet Studio Logo" 
                  width={300} 
                  height={100} 
                  className="w-44 h-auto object-contain" 
                  priority
                />
              </div>

              <nav className="flex flex-col gap-2 mt-2 md:mt-0">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/5"
                          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-gray-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-2.5 rounded-xl text-sm font-medium transition-all"
              >
                Keluar Studio
              </button>
            </div>
          </aside>

          {/* Overlay Gelap */}
          {isSidebarOpen && (
            <div 
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm"
            />
          )}

          {/* Area Konten Utama */}
          <main className="flex-1 overflow-y-auto bg-[#0b0e14] w-full flex flex-col">
            
            {/* Header Bar Khusus Desktop (Ada Foto Profil di Kanan Atas) */}
            <div className="hidden md:flex justify-end items-center px-10 pt-6 pb-2">
              <Link href="/settings" className="flex items-center gap-3 bg-[#111424] hover:bg-gray-800/60 border border-gray-800 px-4 py-2 rounded-2xl transition-all group">
                <span className="text-xs text-gray-300 group-hover:text-white font-medium">Kohojiek99</span>
                <div className="w-9 h-9 rounded-full overflow-hidden border border-emerald-500/40 bg-gray-800 flex items-center justify-center">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm text-gray-300">👤</span>
                  )}
                </div>
              </Link>
            </div>

            <div className="flex-1">
              {children}
            </div>
          </main>

        </div>
      </body>
    </html>
  );
}