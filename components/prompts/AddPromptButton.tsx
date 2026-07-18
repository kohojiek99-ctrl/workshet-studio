"use client";

import { Plus } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function AddPromptButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-500"
    >
      <Plus size={18} />
      Add Prompt
    </button>
  );
}