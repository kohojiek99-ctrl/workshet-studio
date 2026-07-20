"use client";

import { useState, useEffect } from "react";
import { Asset } from "@/types/asset";
import { getAssets, saveAssets } from "@/lib/assets";

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [type, setType] = useState("MP4"); 
  const [ratio, setRatio] = useState("4:5"); 
  const [tags, setTags] = useState("");
  const [previewUrl, setPreviewUrl] = useState(""); // State baru untuk file gambar

  useEffect(() => {
    setAssets(getAssets());
  }, []);

  const openModal = () => {
    setEditingId(null);
    setName("");
    setType("MP4");
    const savedRatio = localStorage.getItem("workshet-def-ratio") || "4:5";
    const savedTag = localStorage.getItem("workshet-def-tag") || "";
    setRatio(savedRatio);
    setTags(savedTag);
    setPreviewUrl(""); // Reset file saat buka
    setOpen(true);
  };
  
  const openEditModal = (asset: Asset) => {
    setEditingId(asset.id);
    setName(asset.name); 
    setType(asset.type); 
    setRatio(asset.ratio); 
    setTags(asset.tags);
    setPreviewUrl(asset.previewUrl || ""); // Tampilkan file lama jika ada
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false); 
    setEditingId(null);
    setName(""); setType("MP4"); setRatio("4:5"); setTags(""); setPreviewUrl("");
  };

  // Fungsi BARU: Membaca file yang diupload user
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Batasi 2MB karena ini menggunakan localStorage
    if (file.size > 2 * 1024 * 1024) {
      alert("File terlalu besar! Untuk versi pratinjau ini, maksimal file adalah 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string); // Simpan file sebagai kode Base64
    };
    reader.readAsDataURL(file);
  };

  const saveAsset = () => {
    if (!name.trim()) return;
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    let updatedAssets;

    if (editingId) {
      updatedAssets = assets.map((asset) => 
        asset.id === editingId ? { ...asset, name: name.trim(), type, ratio, tags: tags.trim() || "Uncategorized", previewUrl } : asset
      );
    } else {
      const newAsset: Asset = {
        id: Date.now().toString(),
        name: name.trim(), type, ratio, tags: tags.trim() || "Uncategorized", dateAdded: today, isFavorite: false, previewUrl
      };
      updatedAssets = [newAsset, ...assets];
    }
    setAssets(updatedAssets); saveAssets(updatedAssets); closeModal();
  };

  const deleteAsset = (id: string) => {
    const updatedAssets = assets.filter((asset) => asset.id !== id);
    setAssets(updatedAssets); saveAssets(updatedAssets);
  };

  const duplicateAsset = (asset: Asset) => {
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const duplicatedAsset: Asset = { ...asset, id: Date.now().toString(), name: `${asset.name} (Copy)`, dateAdded: today };
    const updatedAssets = [duplicatedAsset, ...assets];
    setAssets(updatedAssets); saveAssets(updatedAssets);
  };

  const toggleFavorite = (id: string) => {
    const updatedAssets = assets.map((asset) =>
      asset.id === id ? { ...asset, isFavorite: !asset.isFavorite } : asset
    );
    setAssets(updatedAssets); saveAssets(updatedAssets);
  };

  return {
    assets, open, openModal, openEditModal, closeModal,
    name, setName, type, setType, ratio, setRatio, tags, setTags, previewUrl, handleFileUpload, // return fungsi baru
    saveAsset, deleteAsset, duplicateAsset, toggleFavorite, editingId,
  };
}