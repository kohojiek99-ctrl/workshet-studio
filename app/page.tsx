import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import DashboardCard from "@/components/layout/DashboardCard";
import Link from "next/link"; // Gua tambahin ini buat fungsi pindah halaman

export default function Home() {
  const cards = [
    { title: "Projects", value: "12" },
    { title: "Prompts", value: "184" },
    { title: "Assets", value: "632" },
    { title: "AI Credits", value: "9,240" },
  ];

  const recentProjects = [
    {
      name: "AI Landing Page",
      status: "Active",
    },
    {
      name: "Marketing Dashboard",
      status: "Draft",
    },
    {
      name: "Prompt Library",
      status: "Active",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 space-y-8 p-8">
          
          {/* Bagian Greeting & Tombol Jalan Pintas AI */}
          <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-4xl font-bold text-white">
                👋 Good Afternoon, Evan
              </h2>
              <p className="mt-2 text-slate-400">
                Welcome back! Ready to build something amazing today?
              </p>
            </div>

            {/* Ini tombol baru buat langsung lompat ke halaman AI Chat */}
            <Link
              href="/chat"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-500 hover:shadow-blue-500/30"
            >
              ✨ Buka Asisten AI Pro
            </Link>
          </section>

          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <DashboardCard
                key={card.title}
                title={card.title}
                value={card.value}
              />
            ))}
          </section>

          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-6 text-xl font-semibold text-white">
              Recent Projects
            </h3>

            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.name}
                  className="flex items-center justify-between rounded-lg bg-slate-800 p-4"
                >
                  <div>
                    <h4 className="font-medium text-white">
                      {project.name}
                    </h4>
                    <p className="text-sm text-slate-400">
                      Last updated today
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      project.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}