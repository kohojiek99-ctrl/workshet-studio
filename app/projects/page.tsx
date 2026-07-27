"use client";

import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const router = useRouter();

  const templates = [
    {
      title: "Launch Produk Baru (Flash Sale TikTok)",
      category: "E-Commerce / Affiliate",
      desc: "Blueprint lengkap urutan konten dari teaser 3 hari sebelum, hari H flash sale, hingga rekap konversi.",
      status: "Ready to Use"
    },
    {
      title: "Content Marketing 30 Hari (Instagram & TikTok)",
      category: "Organic Growth",
      desc: "Struktur kalender konten harian berbasis edukasi, hiburan, dan penawaran langsung.",
      status: "Ready to Use"
    }
  ];

  return (
    <div className="p-6 sm:p-8 md:p-10 max-w-[1400px] mx-auto text-white space-y-8">
      <div className="bg-[#111424] border border-gray-800 rounded-3xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          🚀 Project Templates & Campaign Blueprints
        </h1>
        <p className="text-gray-400 text-sm">
          Gunakan cetak biru (blueprint) kampanye pemasaran siap pakai untuk mempercepat eksekusi promosi produk Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((item, index) => (
          <div key={index} className="bg-[#111424] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-bold rounded-full">
                  {item.category}
                </span>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                  {item.status}
                </span>
              </div>
              <h3 className="font-bold text-lg text-white">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
            <button
              onClick={() => router.push("/generate")}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10"
            >
              ✨ Buat Prompt untuk Proyek Ini →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}