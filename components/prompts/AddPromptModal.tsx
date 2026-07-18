"use client";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddPromptModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 p-6">

        <h2 className="text-2xl font-bold text-white">
          Add New Prompt
        </h2>

        <div className="mt-6 space-y-4">

          <input
            placeholder="Title"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-sky-500"
          />

          <input
            placeholder="Category"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-sky-500"
          />

          <textarea
            rows={6}
            placeholder="Prompt..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-sky-500"
          />

        </div>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-5 py-3 text-white hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              console.log("save");
              onClose();
            }}
            className="rounded-xl bg-sky-600 px-5 py-3 text-white hover:bg-sky-500"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}