"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Copy, Check, Star, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

type PromptItem = {
  title: string;
  category: string;
  prompt: string;
};

export default function PromptsPage() {
  const [copied, setCopied] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPrompt, setNewPrompt] = useState("");

  const [prompts, setPrompts] = useState<PromptItem[]>([
    {
      title: "Cinematic Prompt",
      category: "Video",
      prompt:
        "Create an ultra cinematic scene with dramatic lighting, volumetric fog, realistic camera movement, 8K quality.",
    },
    {
      title: "TikTok Hook Generator",
      category: "Marketing",
      prompt:
        "Generate 10 viral TikTok hooks that instantly grab attention in under 3 seconds.",
    },
    {
      title: "Logo Generator",
      category: "Design",
      prompt:
        "Design a modern minimalist logo using geometric shapes with premium branding style.",
    },
    {
      title: "Landing Page Copy",
      category: "Copywriting",
      prompt:
        "Write a persuasive landing page focused on conversions using AIDA framework.",
    },
  ]);

  const filteredPrompts = useMemo(() => {
    const keyword = search.toLowerCase();

    return prompts.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword)
    );
  }, [prompts, search]);

  async function copyPrompt(text: string, title: string) {
    await navigator.clipboard.writeText(text);

    setCopied(title);

    setTimeout(() => {
      setCopied("");
    }, 2000);
  }

  function toggleFavorite(title: string) {
    if (favorites.includes(title)) {
      setFavorites(favorites.filter((item) => item !== title));
    } else {
      setFavorites([...favorites, title]);
    }
  }

  function resetForm() {
    setNewTitle("");
    setNewCategory("");
    setNewPrompt("");
  }

  function handleCancel() {
    resetForm();
    setIsModalOpen(false);
  }

  function handleSave() {
    if (
      !newTitle.trim() ||
      !newCategory.trim() ||
      !newPrompt.trim()
    ) {
      return;
    }

    setPrompts((prev) => [
      {
        title: newTitle,
        category: newCategory,
        prompt: newPrompt,
      },
      ...prev,
    ]);

    resetForm();
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="flex min-h-screen bg-slate-950">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <Header />

          <main className="flex-1 p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Prompt Library
                </h1>

                <p className="mt-2 text-slate-400">
                  Organize and manage your AI prompts.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-500"
              >
                <Plus size={18} />
                Add Prompt
              </button>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Prompt..."
              className="mt-8 w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-white outline-none focus:border-sky-500"
            />

            <div className="mt-8 space-y-4">
              {filteredPrompts.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {item.title}
                    </h2>

                    <span className="mt-2 inline-block rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleFavorite(item.title)}
                      className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
                    >
                      <Star
                        size={18}
                        className={
                          favorites.includes(item.title)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-400"
                        }
                      />
                    </button>

                    <button
                      onClick={() =>
                        copyPrompt(item.prompt, item.title)
                      }
                      className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-slate-300 hover:bg-slate-700"
                    >
                      {copied === item.title ? (
                        <>
                          <Check size={16} />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}

              {filteredPrompts.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center text-slate-400">
                  No prompt found.
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Add Prompt
              </h2>

              <button
                onClick={handleCancel}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Title"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none"
              />

              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Category"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none"
              />

              <textarea
                rows={6}
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                placeholder="Prompt..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}