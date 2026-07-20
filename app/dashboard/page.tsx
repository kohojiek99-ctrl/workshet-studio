"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

// Kita panggil KETIGA mesin yang sudah kita buat
import { usePrompts } from "@/components/hooks/usePrompts";
import { useProjects } from "@/components/hooks/useProjects";
import { useAssets } from "@/components/hooks/useAssets";

export default function DashboardPage() {
  // Ambil data dari masing-masing mesin
  const { prompts } = usePrompts();
  const { projects } = useProjects();
  const { assets } = useAssets();

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white">Dashboard</h1>
              <p className="mt-2 text-slate-400">
                Welcome back! Here's your studio overview.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Card 1: Total Prompts */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700">
                <h3 className="text-lg font-medium text-slate-400">Total Prompts</h3>
                <p className="mt-2 text-4xl font-bold text-white">{prompts.length}</p>
              </div>

              {/* Card 2: Total Projects */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700">
                <h3 className="text-lg font-medium text-slate-400">Active Projects</h3>
                <p className="mt-2 text-4xl font-bold text-white">{projects.length}</p>
              </div>

              {/* Card 3: Digital Assets (Sekarang sudah aktif!) */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700">
                <h3 className="text-lg font-medium text-slate-400">Digital Assets</h3>
                <p className="mt-2 text-4xl font-bold text-white">{assets.length}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}