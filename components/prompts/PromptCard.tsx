"use client";

import { Check, Copy, Star, Pencil, Trash2 } from "lucide-react";

import { Prompt } from "@/types/prompt";

type Props = {
  prompt: Prompt;
  copied: string;
  favorites: string[];
  onCopy: (text: string, id: string) => void;
  onToggleFavorite: (id: string) => void;
  onEdit?: (prompt: Prompt) => void;
  onDelete?: (id: string) => void;
};

export default function PromptCard({
  prompt,
  copied,
  favorites,
  onCopy,
  onToggleFavorite,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-white">
          {prompt.title}
        </h2>

        <span className="mt-2 inline-block rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
          {prompt.category}
        </span>

        <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-400">
          {prompt.prompt}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:ml-6 sm:justify-end">
        {/* Tombol Favorite */}
        <button
          onClick={() => onToggleFavorite(prompt.id)}
          className="rounded-lg bg-slate-800 p-2 transition hover:bg-slate-700"
          title="Favorite"
        >
          <Star
            size={18}
            className={
              favorites.includes(prompt.id)
                ? "fill-yellow-400 text-yellow-400"
                : "text-slate-400"
            }
          />
        </button>

        {/* Tombol Edit */}
        {onEdit && (
          <button
            onClick={() => onEdit(prompt)}
            className="rounded-lg bg-slate-800 p-2 text-slate-400 transition hover:bg-slate-700 hover:text-sky-400"
            title="Edit Prompt"
          >
            <Pencil size={18} />
          </button>
        )}

        {/* Tombol Delete */}
        {onDelete && (
          <button
            onClick={() => onDelete(prompt.id)}
            className="rounded-lg bg-slate-800 p-2 text-slate-400 transition hover:bg-slate-700 hover:text-red-400"
            title="Delete Prompt"
          >
            <Trash2 size={18} />
          </button>
        )}

        {/* Tombol Copy */}
        <button
          onClick={() => onCopy(prompt.prompt, prompt.id)}
          className="ml-2 flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-slate-300 transition hover:bg-slate-700"
        >
          {copied === prompt.id ? (
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
  );
}