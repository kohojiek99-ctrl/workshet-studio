"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Kalau lagi di halaman login, tampilkan halaman tanpa sidebar biar bersih
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
      <body className="bg-[#111424] text-white antialiased flex min-h-screen">
        {/* Sidebar Kiri */}
        <aside className="w-64 border-r border-gray-800 p-6 flex flex-col justify-between bg-[#111424]">
          <div>
            {/* Logo / Judul */}
            <div className="flex items-center gap-3 mb-10 px-2">
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

          {/* Tombol Logout di Bawah Sidebar */}
          <div className="pt-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-400 font-medium py-3 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
            >
              <span>🚪</span>
              <span>Keluar Studio</span>
            </button>
          </div>
        </aside>

        {/* Area Konten Utama di Kanan */}
        <main className="flex-1 overflow-y-auto bg-[#111424]">
          {children}
        </main>
      </body>
    </html>
  );
}