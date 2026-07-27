"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/", icon: "📊" },
    { name: "Projects", href: "/projects", icon: "📁" },
    { name: "Prompts", href: "/prompts", icon: "💡" },
    { name: "Storyboard Studio", href: "/storyboard", icon: "🎬" },
    { name: "Assets", href: "/assets", icon: "🎨" },
    { name: "Generate", href: "/generate", icon: "✨" },
    { name: "Chat", href: "/chat", icon: "💬" },
    { name: "Settings", href: "/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-[#0d0f1a] border-r border-gray-800 flex flex-col h-screen p-6 sticky top-0">
      {/* Logo / Brand */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white tracking-wider">
          WORKSHEET <span className="text-emerald-400">STUDIO</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">AI Creator Workspace</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Sidebar */}
      <div className="pt-4 border-t border-gray-800 text-xs text-gray-500 text-center">
        v2.6 Pro Edition
      </div>
    </aside>
  );
}