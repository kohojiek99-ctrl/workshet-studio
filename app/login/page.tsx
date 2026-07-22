"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      // Proses Daftar Akun Baru
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else {
        alert("Pendaftaran berhasil! Silakan cek email atau langsung masuk.");
        setIsSignUp(false);
      }
    } else {
      // Proses Masuk / Login
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert(error.message);
      } else {
        router.push("/"); // Lempar ke halaman utama kalau sukses
        router.refresh();
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#111424] text-white flex items-center justify-center p-6">
      <div className="bg-[#1a1f33] p-8 rounded-2xl border border-gray-800 w-full max-w-md shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Worksheet Studio 🧠</h1>
          <p className="text-sm text-gray-400">
            {isSignUp ? "Daftar akun eksklusif ruang kerja kamu" : "Masuk ke brankas pusat kontrol kreator"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@domain.com"
              className="w-full bg-[#111424] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#111424] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl transition-all text-sm disabled:opacity-50 mt-2"
          >
            {loading ? "Memproses..." : isSignUp ? "Daftar Sekarang" : "Masuk Studio"}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-gray-400 hover:text-emerald-400 transition-colors"
          >
            {isSignUp ? "Sudah punya akun? Masuk di sini" : "Belum punya akun? Daftar akun baru"}
          </button>
        </div>
      </div>
    </div>
  );
}