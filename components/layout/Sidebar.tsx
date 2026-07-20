import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-60 border-r border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-3xl font-bold text-white">
          WORKSHET™
        </h1>
        <p className="mt-1 text-slate-400">
          Studio
        </p>
      </div>

      <nav className="space-y-2 p-4">
        <Link
          href="/dashboard"
          className="block rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          Dashboard
        </Link>

        <Link
          href="/prompts"
          className="block rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          Prompts
        </Link>

        <Link
          href="/projects"
          className="block rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          Projects
        </Link>

        <Link
          href="/assets"
          className="block rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          Assets
        </Link>

        {/* Tautan Settings sekarang aktif! */}
        <Link
          href="/settings"
          className="block rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}