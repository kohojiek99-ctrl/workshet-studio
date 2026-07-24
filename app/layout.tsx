"use client";

import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/login";

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
        <div className="flex min-h-screen bg-[#0b0e14]">
          {/* Sidebar Kiri */}
          <aside className="w-64 bg-[#111424] border-r border-gray-800 flex flex-col p-6 justify-between shrink-0">
            <div>
              {/* Logo Gambar Futuristik */}
              <div className="p-4 mb-6 flex items-center">
                <Image 
                  src="/logo.png" 
                  alt="Worksheet Studio Logo" 
                  width={240} 
                  height={60} 
                  className="h-10 w-auto object-contain" 
                  priority
                />
              </div>

              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
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

          <main className="flex-1 overflow-y-auto bg-[#0b0e14]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}