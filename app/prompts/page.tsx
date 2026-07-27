"use client";

import { useState, useEffect } from "react";

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // State untuk form Tambah / Edit Prompt
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [content, setContent] = useState("");

  // Data 8 Master Prompt Bawaan (7 Prompt Lama + 1 Prompt Baru Storyboard Video Mode)
  const defaultMasterPrompts = [
    {
      id: "master-1",
      title: "1. MASTER PROMPT META ADS (STOP SCROLL)",
      category: "Meta Ads",
      content: `Anda adalah Meta Ads Creative Director, Senior Copywriter, Consumer Psychologist, dan Performance Marketing Expert dengan pengalaman lebih dari 20 tahun.
# TUGAS
Buatkan iklan Facebook & Instagram Ads yang memiliki Hook Stop Scroll, membangun rasa penasaran, menyentuh pain point audiens, membangun kepercayaan, menawarkan solusi yang kuat, dan menghasilkan Call To Action yang mendorong konversi.
# INFORMASI PRODUK
Nama Produk: [JUDUL PRODUK]
Kategori: [KATEGORI]
Target Market: [TARGET MARKET]
Masalah Utama Audiens: [PAIN POINT]
Keunggulan Produk: [USP]
Benefit: [BENEFIT]
Promo: [PROMO]
Harga: [HARGA]
Brand Voice: [FRIENDLY / PREMIUM / LUXURY / FUN / PROFESSIONAL]
Tujuan Iklan: [LEADS / SALES / WHATSAPP / WEBSITE / BRANDING]
# OUTPUT
Buatkan:
1. 10 Stop Scroll Hook
2. 5 Primary Text
3. 5 Headline
4. 5 Description
5. 5 CTA
6. Caption Meta Ads
7. Emotional Trigger
8. Psychological Trigger
9. Angle Marketing terbaik
10. Rekomendasi Visual
11. Prompt AI Image untuk iklan
12. Rekomendasi warna dan layout
13. Saran A/B Testing
14. Optimasi CTR & Conversion
Gunakan bahasa Indonesia yang natural, persuasive, tidak berlebihan, dan mengikuti prinsip copywriting modern.
+ TEMPLATE TAMBAHAN:
1. Caption pendek (soft selling)
2. Caption panjang (story selling)
3. Caption hard selling
4. 30 hashtag relevan (10 populer, 10 niche, 10 long-tail)
5. Sertakan emoji seperlunya.`
    },
    {
      id: "master-2",
      title: "2. MASTER PROMPT TIKTOK ADS",
      category: "TikTok Ads",
      content: `Anda adalah TikTok Ads Strategist, Viral Content Creator, Copywriter, Storytelling Expert, dan Consumer Psychologist.
Buatkan konsep TikTok Ads yang mampu menarik perhatian dalam 3 detik pertama, meningkatkan watch time, membangun rasa penasaran, menyampaikan manfaat produk secara natural, dan menghasilkan CTA yang tinggi.
Informasi Produk:
- Nama Produk: ...
- Kategori: ...
- Target Market: ...
- Masalah Audiens: ...
- Keunggulan: ...
- Benefit: ...
- Promo: ...
Output:
• Hook 3 detik (10 variasi)
• Script 15 detik, 30 detik, 60 detik
• Storytelling & Pattern Interrupt
• CTA & Caption & Hashtag
• Prompt AI Video & Thumbnail
• Ide B-roll, Opening & Closing Scene
• Optimasi Retention
+ TEMPLATE TAMBAHAN:
1. Caption pendek, panjang, hard selling
2. 30 hashtag relevan (populer, niche, long-tail) & emoji seperlunya.`
    },
    {
      id: "master-3",
      title: "3. MASTER PROMPT UNIVERSAL",
      category: "Universal",
      content: `Anda adalah AI Business Consultant, Marketing Strategist, Creative Director, Brand Consultant, Copywriter, Content Strategist, dan Digital Marketing Expert kelas dunia.
Sebelum memberikan jawaban, lakukan analisis secara mendalam terhadap tujuan, target market, perilaku audiens, psikologi konsumen, tren industri, positioning brand, dan platform yang digunakan. Berikan solusi yang praktis, kreatif, dan siap diterapkan.
Informasi:
- Tujuan: ...
- Produk/Jasa: ...
- Target Market: ...
- Platform: ...
- Brand: ...
Output:
• Analisis & Strategi
• Ide Konten & Copywriting
• Caption, CTA & Hashtag
• Prompt AI Image & Video
• Angle Marketing & Rekomendasi Funnel
• KPI & Action Plan
+ TEMPLATE TAMBAHAN:
1. Caption pendek, panjang, hard selling
2. 30 hashtag relevan & emoji profesional.`
    },
    {
      id: "master-4",
      title: "4. MASTER PROMPT CAROUSEL INSTAGRAM",
      category: "Instagram",
      content: `Anda adalah Instagram Content Strategist dan Creative Director.
Buatkan konten Carousel Instagram yang edukatif, menarik, mudah dipahami, dan mendorong audiens untuk swipe hingga slide terakhir.
Informasi:
- Topik: ...
- Target Audience: ...
- Tujuan: ...
Output:
• Judul & Hook Slide 1
• Isi Slide 2–10
• CTA, Caption & Hashtag
• Prompt AI Image setiap slide
• Warna, Font, Layout, Ide ikon & Visual Style
• Prompt Canva
+ TEMPLATE TAMBAHAN:
1. Caption pendek, panjang, hard selling
2. 30 hashtag relevan & emoji profesional.`
    },
    {
      id: "master-5",
      title: "5. MASTER PROMPT PROMOSI MEDIA SOSIAL",
      category: "Social Media",
      content: `Anda adalah Social Media Marketing Expert.
Buatkan materi promosi yang dapat digunakan di Instagram, Facebook, TikTok, Threads, LinkedIn, WhatsApp, dan X.
Informasi:
- Produk: ...
- Target Market: ...
- Tujuan: ...
Output:
• Caption, CTA & Hook
• Story, Feed, Reels, Shorts
• Prompt AI Visual & Hashtag
• Jadwal Posting
• Variasi Soft Selling & Hard Selling
+ TEMPLATE TAMBAHAN:
1. Caption pendek, panjang, hard selling
2. 30 hashtag relevan & emoji profesional.`
    },
    {
      id: "master-6",
      title: "6. MASTER PROMPT PRODUK FISIK UMKM",
      category: "UMKM",
      content: `Anda adalah Marketing Consultant khusus UMKM dan Produk Fisik. Analisis produk kemudian buatkan materi promosi yang mampu meningkatkan penjualan.
Informasi:
- Produk: ...
- Kategori: ...
- Harga: ...
- Target Market: ...
- Keunggulan & Benefit: ...
Output:
• USP & Value Proposition
• Headline, Hook, Caption, CTA
• Script Video, Meta Ads, TikTok Ads, Carousel
• Prompt AI Image Produk
• Ide Bundling, Promo, Upselling & Cross Selling
+ TEMPLATE TAMBAHAN:
1. Caption pendek, panjang, hard selling
2. 30 hashtag relevan & emoji profesional.`
    },
    {
      id: "master-7",
      title: "7. MASTER PROMPT BANNER • SPANDUK • FLYER",
      category: "Design",
      content: `Anda adalah Graphic Designer, Brand Strategist, dan Creative Director. Buatkan konsep desain promosi yang profesional, modern, menarik perhatian, mudah dibaca, dan memiliki hirarki visual yang jelas.
Informasi:
- Jenis Media: (Banner / Flyer / Brosur / Sticker / Label / Spanduk / Roll Banner / X Banner / Poster)
- Nama Brand: ...
- Produk: ...
- Target Market: ...
- Ukuran: ...
Output:
• Konsep Desain, Headline, Subheadline, Copywriting, CTA
• Warna, Font, Layout, Visual Style
• Prompt AI Image, Canva, Photoshop, Illustrator
• Rekomendasi Material Cetak, Bleed & Safe Margin
+ TEMPLATE TAMBAHAN:
1. Caption pendek, panjang, hard selling
2. 30 hashtag relevan & emoji profesional.`
    },
    {
      id: "master-8",
      title: "8. MASTER PROMPT STORYBOARD VIDEO MODE™",
      category: "AI Video",
      content: `[AI Cinematic Storyboard Engine]
PROJECT INFORMATION:
- Topik: ...
- Target Audience: ...
- Tujuan (Brand Awareness / Engagement / Leads / Sales / Edukasi / Product Launch): ...
- Platform (TikTok / Instagram Reels / YouTube Shorts / YouTube / Facebook / LinkedIn): ...
- Durasi Video (15 Detik / 30 Detik / 60 Detik / 3 Menit): ...
- Informasi Tambahan: ...

CONTENT PRESET (Pilih salah satu):
Viral Content / Soft Selling / Hard Selling / Storytelling / Product Demo / Educational / Before vs After / Problem Solution / Testimonial / Cinematic Brand Film / Faceless Video / AI Showcase / Launch Campaign

VIDEO FORMAT (Pilih salah satu):
Talking Head / Cinematic / UGC / Screen Recording / Motion Graphic / Interview / Podcast Clip / Documentary / Product Showcase

VISUAL STYLE (Pilih salah satu):
Apple Style / Modern SaaS / Luxury / Minimalist / Dark Premium / Futuristic / Documentary / Corporate

BRAND PERSONALITY (Pilih salah satu):
Professional / Friendly / Luxury / Premium / Elegant / Modern / Innovative / Bold / Minimalist / Futuristic / Inspirational / Educational

CTA (Pilih salah satu):
Follow / Komentar / Klik Link / Download / Daftar / Beli Sekarang

# ROLE
Anda adalah AI Creative Director profesional yang menggabungkan keahlian sebagai Creative Director, Commercial Director, Film Director, Marketing Strategist, Copywriter, Storytelling Expert, Cinematographer, Video Editor, Motion Designer, dan AI Video Prompt Engineer.
Tujuan Anda adalah mengubah informasi sederhana menjadi storyboard video premium berbahasa Indonesia yang siap diproduksi dengan standar agensi kreatif kelas dunia.

# OUTPUT
1. Creative Brief (Big Idea, Marketing Objective, Core Message, Target Emotion, Target Audience Insight, Hook Recommendation, Visual Direction, Storytelling Style)
2. Story Structure (Alur hook, problem, solution, transformation, CTA)
3. Storyboard Lengkap per Scene (Nomor scene, objective, voice over, dialog, screen text, visual description, camera angle, movement, lens, lighting, composition, ekspresi karakter, transisi, sound effect, rekomendasi musik)
4. AI Video Prompt (Prompt ultra-detail siap pakai untuk Google Veo, Kling AI, Runway, Luma AI, Pika, Hailuo AI mencakup subject, action, environment, camera, lighting, mood, color palette, cinematic style, dll)
5. Editing Direction (Opening style, editing pace, cut style, subtitle, motion graphic, zoom, B-roll, music, sound FX, color grading, ending style)
6. CTA Ending yang kuat sesuai tujuan video.`
    }
  ];

  // Load prompts dari localStorage saat pertama buka (pastikan master prompt ikut ter-update)
  useEffect(() => {
    try {
      const localData = localStorage.getItem("promptItems");
      if (localData) {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Gabungkan atau pastikan master prompt 1-8 selalu ada
          setAssetsAndPrompts(parsed);
          return;
        }
      }
      setPrompts(defaultMasterPrompts);
      localStorage.setItem("promptItems", JSON.stringify(defaultMasterPrompts));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const setAssetsAndPrompts = (parsed: any[]) => {
    // Cek apakah master-8 sudah ada, jika belum masukkan secara aman tanpa hapus custom user
    const hasMaster8 = parsed.some((p: any) => p.id === "master-8");
    if (!hasMaster8) {
      const merged = [defaultMasterPrompts[7], ...parsed];
      setPrompts(merged);
      localStorage.setItem("promptItems", JSON.stringify(merged));
    } else {
      setPrompts(parsed);
    }
  };

  const saveToStorage = (updated: any[]) => {
    setPrompts(updated);
    localStorage.setItem("promptItems", JSON.stringify(updated));
  };

  // Handler Buka Modal Tambah Prompt Custom
  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle("");
    setCategory("General");
    setContent("");
    setIsModalOpen(true);
  };

  // Handler Buka Modal Edit
  const handleOpenEdit = (item: any) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCategory(item.category || "General");
    setContent(item.content);
    setIsModalOpen(true);
  };

  // Handler Simpan
  const handleSavePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editingId) {
      const updated = prompts.map(p => p.id === editingId ? { ...p, title, category, content } : p);
      saveToStorage(updated);
    } else {
      const newPrompt = {
        id: Date.now().toString(),
        title,
        category,
        content,
      };
      saveToStorage([newPrompt, ...prompts]);
    }

    setIsModalOpen(false);
  };

  // Handler Hapus Prompt
  const handleDelete = (id: string) => {
    const updated = prompts.filter(p => p.id !== id);
    saveToStorage(updated);
  };

  // Handler Copy to Clipboard
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-4 sm:p-8 md:p-10 max-w-[1400px] mx-auto text-white">
      
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            Prompt Library & Master Templates 🧠
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Gunakan master prompt siap pakai atau buat dan simpan prompt custom buatan lu sendiri.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all"
        >
          + Tambah Prompt Baru
        </button>
      </div>

      {/* List Prompts */}
      <div className="grid grid-cols-1 gap-6">
        {prompts.map((item) => (
          <div key={item.id} className="bg-[#111424] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div>
                <span className="px-2.5 py-0.5 text-[11px] rounded-full font-medium border bg-emerald-500/10 border-emerald-500/30 text-emerald-400 mb-2 inline-block">
                  {item.category || "General"}
                </span>
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => handleCopy(item.id, item.content)}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition-all flex items-center gap-1.5"
                >
                  {copiedId === item.id ? "✅ Tersalin!" : "📋 Salin Prompt"}
                </button>

                <button
                  onClick={() => handleOpenEdit(item)}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#1a1f33] hover:bg-gray-800 border border-gray-700 text-amber-400 transition-all"
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-2 rounded-xl text-xs font-medium bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-all"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="bg-[#161a2e] border border-gray-800/80 rounded-xl p-4 font-mono text-xs sm:text-sm text-gray-300 whitespace-pre-wrap max-h-48 overflow-y-auto">
              {item.content}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah / Edit Prompt */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#111424] border border-gray-800 rounded-2xl p-6 w-full max-w-2xl text-white my-8">
            <h2 className="text-lg font-bold mb-4">
              {editingId ? "Edit Prompt" : "Tambah Prompt Baru"}
            </h2>
            
            <form onSubmit={handleSavePrompt} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Judul Prompt</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Master Prompt Custom..."
                    required
                    className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Kategori</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Contoh: Meta Ads / Copywriting"
                    required
                    className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Isi Master Prompt</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan isi master prompt di sini..."
                  rows={10}
                  required
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-300 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-lg shadow-emerald-500/20"
                >
                  Simpan Prompt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}