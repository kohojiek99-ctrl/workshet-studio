"use client";

import { useState, useEffect } from "react";
import { Bell, Search } from "lucide-react";

export default function Header() {
  const [userName, setUserName] = useState("Studio Owner");
  const [userRole, setUserRole] = useState("Digital Marketer");
  const [profilePic, setProfilePic] = useState(""); // Tambahan state foto profil

  const loadProfile = () => {
    setUserName(localStorage.getItem("workshet-username") || "Studio Owner");
    setUserRole(localStorage.getItem("workshet-role") || "Digital Marketer");
    setProfilePic(localStorage.getItem("workshet-profile-pic") || "");
  };

  useEffect(() => {
    loadProfile(); 
    window.addEventListener("profileUpdated", loadProfile);
    return () => window.removeEventListener("profileUpdated", loadProfile);
  }, []);

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-900/50 px-8 backdrop-blur-sm">
      <div className="flex w-96 items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 transition focus-within:border-blue-500">
        <Search className="h-5 w-5 text-slate-500" />
        <input
          type="text"
          placeholder="Search projects, prompts, or assets..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 transition hover:text-white">
          <Bell className="h-6 w-6" />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-blue-500"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
          {/* Bagian Foto Profil */}
          <div className="flex h-10 w-10 overflow-hidden items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-lg border border-slate-700">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              userName.charAt(0).toUpperCase()
            )}
          </div>
          
          <div className="hidden flex-col md:flex">
            <span className="text-sm font-semibold text-white">{userName}</span>
            <span className="text-xs text-slate-400">{userRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
}