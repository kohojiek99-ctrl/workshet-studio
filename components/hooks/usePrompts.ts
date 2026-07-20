"use client";

import { useEffect, useMemo, useState } from "react";
import { Prompt } from "@/types/prompt";
import { getPrompts, savePrompts } from "@/lib/prompts";

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  
  // Kita tambahkan state baru sebagai "lampu lalu lintas"
  const [isLoaded, setIsLoaded] = useState(false);

  // Search
  const [search, setSearch] = useState("");

  // Favorites (local only)
  const [favorites, setFavorites] = useState<string[]>([]);

  // Copy state
  const [copied, setCopied] = useState("");

  // Modal
  const [open, setOpen] = useState(false);

  // Form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [prompt, setPrompt] = useState("");

  /**
   * 1. Load prompts (Langkah Pertama)
   */
  useEffect(() => {
    setPrompts(getPrompts());
    setIsLoaded(true); // Tandai bahwa data sudah selesai dibaca
  }, []);

  /**
   * 2. Save prompts (Langkah Kedua)
   */
  useEffect(() => {
    // Hanya simpan JIKA data sudah selesai dibaca di awal
    if (isLoaded) {
      savePrompts(prompts);
    }
  }, [prompts, isLoaded]);

  /**
   * Load Favorites dari Local Storage
   */
  useEffect(() => {
    const savedFavorites = localStorage.getItem("prompt-favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  /**
   * Save Favorites ke Local Storage
   */
  useEffect(() => {
    localStorage.setItem("prompt-favorites", JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Filtered Prompt List
   */
  const filteredPrompts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return prompts;

    return prompts.filter((item) => {
      return (
        item.title.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.prompt.toLowerCase().includes(keyword)
      );
    });
  }, [prompts, search]);

  /**
   * Copy Prompt
   */
  function copyPrompt(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => {
      setCopied("");
    }, 1500);
  }

  /**
   * Favorite
   */
  function toggleFavorite(id: string) {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  /**
   * Open Modal
   */
  function openModal() {
    setOpen(true);
  }

  /**
   * Close Modal
   */
  function closeModal() {
    setOpen(false);
    setTitle("");
    setCategory("");
    setPrompt("");
  }

  /**
   * Add Prompt
   */
  function savePrompt() {
    if (!title.trim() || !category.trim() || !prompt.trim()) {
      return;
    }

    const newPrompt: Prompt = {
      id: crypto.randomUUID(),
      title: title.trim(),
      category: category.trim(),
      prompt: prompt.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPrompts((prev) => [newPrompt, ...prev]);
    closeModal();
  }

  /**
   * Delete
   */
  function deletePrompt(id: string) {
    setPrompts((prev) => prev.filter((item) => item.id !== id));
  }

  /**
   * Update
   */
  function updatePrompt(updatedPrompt: Prompt) {
    setPrompts((prev) =>
      prev.map((item) => (item.id === updatedPrompt.id ? updatedPrompt : item))
    );
  }

  return {
    prompts,
    filteredPrompts,
    search,
    setSearch,
    favorites,
    toggleFavorite,
    copied,
    copyPrompt,
    open,
    openModal,
    closeModal,
    title,
    setTitle,
    category,
    setCategory,
    prompt,
    setPrompt,
    savePrompt,
    deletePrompt,
    updatePrompt,
  };
}