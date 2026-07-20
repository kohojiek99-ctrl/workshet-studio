"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useAssets } from "@/components/hooks/useAssets";
import { Trash2, Plus, X, Video, FileImage, Edit, Copy, Star, UploadCloud } from "lucide-react";
// Tambahkan komponen Image bawaan Next.js
import Image from "next/image"; 

export default function AssetsPage() {
  const {
    assets, open, openModal, openEditModal, closeModal,
    name, setName, type, setType, ratio, setRatio, tags, setTags, previewUrl, handleFileUpload,
    saveAsset, deleteAsset, duplicateAsset, toggleFavorite, editingId,
  } = useAssets();

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white">Assets Library</h1>
                <p className="mt-2 text-slate-400">Manage and preview your promotional materials.</p>
              </div>
              <button onClick={openModal} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700">
                <Plus className="h-5 w-5" /> Upload Asset
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {assets.map((asset) => (
                <div key={asset.id} className="group relative rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-slate-700">
                  
                  <button onClick={() => toggleFavorite(asset.id)} className="absolute left-4 top-4 z-10 rounded-md bg-slate-950/80 p-2 backdrop-blur transition hover:bg-yellow-500/20">
                    <Star className={`h-4 w-4 ${asset.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-slate-400'}`} />
                  </button>

                  <div className="absolute right-4 top-4 z-10 flex gap-2">
                    <button onClick={() => duplicateAsset(asset)} className="rounded-md bg-slate-950/80 p-2 text-slate-400 backdrop-blur transition hover:bg-green-500/20 hover:text-green-400" title="Duplicate Asset">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button onClick={() => openEditModal(asset)} className="rounded-md bg-slate-950/80 p-2 text-slate-400 backdrop-blur transition hover:bg-blue-500/20 hover:text-blue-400" title="Edit Asset">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => deleteAsset(asset.id)} className="rounded-md bg-slate-950/80 p-2 text-slate-400 backdrop-blur transition hover:bg-red-500/20 hover:text-red-400" title="Delete Asset">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* KOTAK PREVIEW: Tampilkan gambar asli jika ada */}
                  <div className="relative mt-2 flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-xl bg-slate-800 text-slate-500">
                    {asset.previewUrl ? (
                      <img src={asset.previewUrl} alt={asset.name} className="h-full w-full object-cover" />
                    ) : (
                      asset.type === "MP4" ? <Video className="h-12 w-12 opacity-50" /> : <FileImage className="h-12 w-12 opacity-50" />
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="truncate pr-4 text-lg font-medium text-white">{asset.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{asset.type} • {asset.ratio} • {asset.tags}</p>
                  </div>
                </div>
              ))}

              <button onClick={openModal} className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-800 p-6 text-center transition hover:border-slate-700 hover:bg-slate-900/50 min-h-[300px]">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-400 text-xl font-light">
                  <Plus className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-medium text-white">Add New Asset</h3>
                <p className="mt-1 text-xs text-slate-500">Upload promotional media</p>
              </button>
            </div>
          </div>
        </main>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">{editingId ? "Edit Asset" : "Add New Asset"}</h2>
              <button onClick={closeModal} className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Bagian Scrollable Form */}
            <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-4">
              
              {/* TOMBOL UPLOAD FILE */}
              <div>
                <label className="mb-1 block text-sm text-slate-400">Media File (Max 2MB for Preview)</label>
                <div className="relative mt-1 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950 p-4 transition hover:border-blue-500">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="max-h-32 rounded-lg object-contain" />
                  ) : (
                    <>
                      <UploadCloud className="mb-2 h-8 w-8 text-slate-500" />
                      <span className="text-xs text-slate-400">Click to browse file</span>
                    </>
                  )}
                  {/* Input tersembunyi yang ditutupi oleh desain kotak di atas */}
                  <input 
                    type="file" 
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-400">Asset Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Summer Promo Image" className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 outline-none" />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-sm text-slate-400">Format</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 outline-none">
                    <option value="MP4">MP4 Video</option><option value="JPG">JPG Image</option><option value="PNG">PNG Image</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm text-slate-400">Ratio</label>
                  <select value={ratio} onChange={(e) => setRatio(e.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 outline-none">
                    <option value="4:5">4:5 (TikTok/IG)</option><option value="9:16">9:16 (Story)</option><option value="16:9">16:9 (Landscape)</option><option value="1:1">1:1 (Square)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-400">Tags / Category</label>
                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 outline-none" />
              </div>
            </div>

            <button onClick={saveAsset} className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
              {editingId ? "Save Changes" : "Save Asset"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}