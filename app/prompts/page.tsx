"use client";

import { useState } from "react";

// Tambahkan import Sidebar dan Header
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

import AddPromptButton from "@/components/prompts/AddPromptButton";
import AddPromptModal from "@/components/prompts/AddPromptModal";
import PromptList from "@/components/prompts/PromptList";
import { usePrompts } from "@/components/hooks/usePrompts";
import { Prompt } from "@/types/prompt";

export default function PromptsPage() {
  const {
    filteredPrompts,
    search,
    setSearch,
    copied,
    copyPrompt,
    favorites,
    toggleFavorite,
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
  } = usePrompts();

  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

  const handleEdit = (p: Prompt) => {
    setTitle(p.title);
    setCategory(p.category);
    setPrompt(p.prompt);
    setEditingPrompt(p);
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    setEditingPrompt(null);
  };

  const handleSave = () => {
    if (editingPrompt) {
      updatePrompt({
        ...editingPrompt,
        title: title.trim(),
        category: category.trim(),
        prompt: prompt.trim(),
        updatedAt: new Date().toISOString(),
      });
      handleCloseModal();
    } else {
      savePrompt();
    }
  };

  return (
    // Tambahkan struktur layout yang sama dengan Dashboard
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                  Prompt Library
                </h1>
                <p className="mt-2 text-slate-400">
                  Manage all your AI prompts in one place.
                </p>
              </div>

              <AddPromptButton onClick={openModal} />
            </div>

            <div className="mt-8">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search prompts..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-500"
              />
            </div>

            <div className="mt-8">
              <PromptList
                prompts={filteredPrompts}
                copied={copied}
                favorites={favorites}
                onCopy={copyPrompt}
                onToggleFavorite={toggleFavorite}
                onDelete={deletePrompt}
                onEdit={handleEdit}
              />
            </div>

            <AddPromptModal
              open={open}
              onClose={handleCloseModal}
              onSave={handleSave}
              title={title}
              category={category}
              prompt={prompt}
              onTitleChange={setTitle}
              onCategoryChange={setCategory}
              onPromptChange={setPrompt}
            />
          </div>
        </main>
      </div>
    </div>
  );
}