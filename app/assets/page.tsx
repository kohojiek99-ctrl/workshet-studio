"use client";

export default function AssetsPage() {
  const resourceFiles = [
    {
      title: "Handbook 1: The Ultimate AI Prompt Architecture",
      category: "PDF Guide",
      size: "4.2 MB",
      desc: "Panduan fundamental cara merancang struktur prompt tingkat lanjut untuk agensi.",
      downloadLink: "#"
    },
    {
      title: "Handbook 2: Cinematic Video Generation Engine",
      category: "PDF Guide",
      size: "6.8 MB",
      desc: "Rahasia meracik prompt video untuk Veo, Kling, Runway, dan Luma.",
      downloadLink: "#"
    },
    {
      title: "Handbook 3: TikTok & Reels Viral Blueprint",
      category: "PDF Guide",
      size: "3.5 MB",
      desc: "Strategi hook 3 detik pertama dan struktur naskah konversi tinggi.",
      downloadLink: "#"
    },
    {
      title: "Handbook 4: Direct Response Copywriting Swipe File",
      category: "PDF Guide",
      size: "5.1 MB",
      desc: "Kumpulan formula AIDA dan penawaran mematikan siap pakai.",
      downloadLink: "#"
    }
  ];

  const handleDownload = (title: string) => {
    alert(`Mengunduh file: ${title} (Simulasi link unduhan digital produk Anda)`);
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 max-w-[1400px] mx-auto text-white space-y-8">
      <div className="bg-[#111424] border border-gray-800 rounded-3xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          📦 Resource & Handbook Vault
        </h1>
        <p className="text-gray-400 text-sm">
          Unduh seluruh file panduan resmi (Handbook 1-4) dan aset eksklusif yang termasuk dalam paket lisensi Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resourceFiles.map((file, index) => (
          <div key={index} className="bg-[#111424] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-full">
                  {file.category}
                </span>
                <span className="text-xs text-gray-400">{file.size}</span>
              </div>
              <h3 className="font-bold text-base text-white">{file.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{file.desc}</p>
            </div>
            <button
              onClick={() => handleDownload(file.title)}
              className="w-full py-3 rounded-xl font-bold text-xs bg-[#161a2e] hover:bg-emerald-500 hover:text-white border border-gray-700 hover:border-emerald-500 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              📥 Download File PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}