"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useProjects } from "@/components/hooks/useProjects";
// Tambahkan ikon Copy
import { Trash2, Plus, X, Edit, Copy } from "lucide-react";

export default function ProjectsPage() {
  const {
    projects, open, openModal, openEditModal, closeModal,
    name, setName, type, setType, status, setStatus,
    saveProject, deleteProject, duplicateProject, editingId,
  } = useProjects();

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                  Projects
                </h1>
                <p className="mt-2 text-slate-400">
                  Track and manage your ongoing work.
                </p>
              </div>

              <button 
                onClick={openModal}
                className="flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 font-semibold text-white transition hover:bg-sky-600"
              >
                <Plus size={20} />
                New Project
              </button>
            </div>

            <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
              {projects.length === 0 ? (
                <p className="text-center text-slate-400 py-8">No projects yet. Create one above!</p>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex flex-col gap-4 rounded-lg border border-slate-700 bg-slate-800 p-4 sm:flex-row sm:items-center sm:justify-between transition hover:border-slate-600"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white">
                          {project.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-3 text-sm text-slate-400">
                          <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs text-slate-300">
                            {project.type}
                          </span>
                          <span>Updated: {project.lastUpdated}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-4">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            project.status === "Completed"
                              ? "bg-green-500/20 text-green-400"
                              : project.status === "In Progress"
                              ? "bg-sky-500/20 text-sky-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {project.status}
                        </span>
                        
                        {/* Tombol Duplicate */}
                        <button
                          onClick={() => duplicateProject(project)}
                          className="rounded-lg bg-slate-900 p-2 text-slate-400 transition hover:bg-green-500/20 hover:text-green-400"
                          title="Duplicate Project"
                        >
                          <Copy size={18} />
                        </button>

                        {/* Tombol Edit */}
                        <button
                          onClick={() => openEditModal(project)}
                          className="rounded-lg bg-slate-900 p-2 text-slate-400 transition hover:bg-blue-500/20 hover:text-blue-400"
                          title="Edit Project"
                        >
                          <Edit size={18} />
                        </button>

                        {/* Tombol Hapus */}
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="rounded-lg bg-slate-900 p-2 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400"
                          title="Delete Project"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {editingId ? "Edit Project" : "Add New Project"}
              </h2>
              <button onClick={closeModal} className="text-slate-400 transition hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">Project Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white outline-none transition focus:border-sky-500"
                  placeholder="e.g. Summer Campaign"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">Project Type</label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white outline-none transition focus:border-sky-500"
                  placeholder="e.g. Marketing, Video Asset"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white outline-none transition focus:border-sky-500"
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <button
                onClick={saveProject}
                disabled={!name.trim() || !type.trim()}
                className="mt-4 w-full rounded-lg bg-sky-500 py-3 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {editingId ? "Save Changes" : "Save Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}