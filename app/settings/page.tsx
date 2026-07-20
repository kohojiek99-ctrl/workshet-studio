"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { User, Save, Sliders, Camera } from "lucide-react";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [defaultRatio, setDefaultRatio] = useState("4:5");
  const [defaultTag, setDefaultTag] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setName(localStorage.getItem("workshet-username") || "Studio Owner");
    setRole(localStorage.getItem("workshet-role") || "Digital Marketer");
    setProfilePic(localStorage.getItem("workshet-profile-pic") || "");
    setDefaultRatio(localStorage.getItem("workshet-def-ratio") || "4:5");
    setDefaultTag(localStorage.getItem("workshet-def-tag") || "");
  }, []);

  const handlePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Maksimal ukuran foto profil adalah 2MB ya bro!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem("workshet-username", name);
    localStorage.setItem("workshet-role", role);
    localStorage.setItem("workshet-profile-pic", profilePic);
    localStorage.setItem("workshet-def-ratio", defaultRatio);
    localStorage.setItem("workshet-def-tag", defaultTag);
    
    window.dispatchEvent(new Event("profileUpdated"));

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white">Settings</h1>
                <p className="mt-2 text-slate-400">
                  Manage your account preferences and studio configurations.
                </p>
              </div>
              
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700"
              >
                <Save className="h-5 w-5" />
                {isSaved ? "Saved Successfully!" : "Save Changes"}
              </button>
            </div>

            <div className="space-y-6">
              
              {/* Seksi Profil */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-blue-500/20 p-2 text-blue-400">
                    <User className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Profile Details</h2>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Avatar Upload */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative flex h-24 w-24 overflow-hidden items-center justify-center rounded-full bg-slate-800 border-2 border-slate-700">
                      {profilePic ? (
                        <img src={profilePic} alt="Avatar" className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-10 w-10 text-slate-500" />
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 transition hover:opacity-100 flex items-center justify-center cursor-pointer">
                        <Camera className="h-6 w-6 text-white" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handlePicUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">Click avatar to change</span>
                  </div>

                  <div className="flex-1 grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm text-slate-400">Display Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-white outline-none transition focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm text-slate-400">Role / Profession</label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-white outline-none transition focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Seksi Workspace Defaults */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-green-500/20 p-2 text-green-400">
                    <Sliders className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Workspace Defaults</h2>
                    <p className="text-sm text-slate-400">Auto-fill values for new assets</p>
                  </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-slate-400">Default Ratio</label>
                    <select
                      value={defaultRatio}
                      onChange={(e) => setDefaultRatio(e.target.value)}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-white outline-none transition focus:border-blue-500"
                    >
                      <option value="4:5">4:5 (Vertical Promo)</option>
                      <option value="9:16">9:16 (Story/Reels)</option>
                      <option value="16:9">16:9 (Landscape)</option>
                      <option value="1:1">1:1 (Square)</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-400">Default Tags</label>
                    <input
                      type="text"
                      value={defaultTag}
                      onChange={(e) => setDefaultTag(e.target.value)}
                      placeholder="e.g., Promo"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-white outline-none transition focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}