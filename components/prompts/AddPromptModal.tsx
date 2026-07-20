"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;

  title: string;
  category: string;
  prompt: string;

  onTitleChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPromptChange: (value: string) => void;
};

export default function AddPromptModal({
  open,
  onClose,
  onSave,
  title,
  category,
  prompt,
  onTitleChange,
  onCategoryChange,
  onPromptChange,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="text-2xl font-bold text-white">
          Add New Prompt
        </h2>

        <div className="mt-6 space-y-4">
          <input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Title"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-sky-500"
          />

          <input
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            placeholder="Category"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-sky-500"
          />

          <textarea
            rows={6}
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Prompt..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-sky-500"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-3 text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}