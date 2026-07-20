"use client";

import { Prompt } from "@/types/prompt";
import PromptCard from "./PromptCard";

type Props = {
  prompts: Prompt[];
  copied: string;
  favorites: string[];
  onCopy: (text: string, id: string) => void;
  onToggleFavorite: (id: string) => void;
  onEdit?: (prompt: Prompt) => void;
  onDelete?: (id: string) => void;
};

export default function PromptList({
  prompts,
  copied,
  favorites,
  onCopy,
  onToggleFavorite,
  onEdit,
  onDelete,
}: Props) {
  if (prompts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center text-slate-400">
        No prompt found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          copied={copied}
          favorites={favorites}
          onCopy={onCopy}
          onToggleFavorite={onToggleFavorite}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}