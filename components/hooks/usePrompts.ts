"use client";

import { useEffect, useMemo, useState } from "react";
import { Prompt } from "@/types/prompt";
import { supabase } from "@/lib/supabase"; // 🚀 MESIN AWAN SUPABASE NYALA DI SINI

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState("");
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [promptText, setPromptText] = useState(""); // State buat nampung teks input

  // 1. AMBIL DATA DARI SUPABASE OTOMATIS
  const fetchPrompts = async () => {
    const { data, error } = await supabase
      .from("prompts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      // Kita konversi format Supabase (content) ke format kodingan lu (prompt)
      const formattedData: Prompt[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        prompt: item.content, 
        createdAt: item.created_at,
        updatedAt: item.created_at,
      }));
      setPrompts(formattedData);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  // Fitur Favorites tetap pakai Local Storage (memori HP) karena ini selera personal
  useEffect(() => {
    const savedFavorites = localStorage.getItem("prompt-favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("prompt-favorites", JSON.stringify(favorites));
  }, [favorites]);

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

  function copyPrompt(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 1500);
  }

  function toggleFavorite(id: string) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setTitle("");
    setCategory("");
    setPromptText("");
  }

  // 2. SIMPAN DATA BARU KE SUPABASE
  const savePrompt = async () => {
    if (!title.trim() || !category.trim() || !promptText.trim()) return;

    const newEntry = {
      title: title.trim(),
      category: category.trim(),
      content: promptText.trim(), // Kirim ke DB pakai nama 'content'
    };

    const { data, error } = await supabase
      .from("prompts")
      .insert([newEntry])
      .select();

    if (!error && data) {
      const inserted = data[0];
      const newPrompt: Prompt = {
        id: inserted.id,
        title: inserted.title,
        category: inserted.category,
        prompt: inserted.content,
        createdAt: inserted.created_at,
        updatedAt: inserted.created_at,
      };
      setPrompts((prev) => [newPrompt, ...prev]);
      closeModal();
    }
  };

  // 3. HAPUS DATA DI SUPABASE
  const deletePrompt = async (id: string) => {
    const { error } = await supabase.from("prompts").delete().eq("id", id);
    if (!error) {
      setPrompts((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // 4. UPDATE DATA DI SUPABASE
  const updatePrompt = async (updatedPrompt: Prompt) => {
    const { error } = await supabase
      .from("prompts")
      .update({
        title: updatedPrompt.title,
        category: updatedPrompt.category,
        content: updatedPrompt.prompt, // Simpan ke DB pakai 'content'
      })
      .eq("id", updatedPrompt.id);

    if (!error) {
      setPrompts((prev) =>
        prev.map((item) => (item.id === updatedPrompt.id ? updatedPrompt : item))
      );
    }
  };

  // Kembalikan nama state 'promptText' menjadi 'prompt' agar aplikasi lu gak error
  return {
    prompts, filteredPrompts, search, setSearch, favorites, toggleFavorite, copied, copyPrompt,
    open, openModal, closeModal, title, setTitle, category, setCategory, prompt: promptText, setPrompt: setPromptText,
    savePrompt, deletePrompt, updatePrompt,
  };
}