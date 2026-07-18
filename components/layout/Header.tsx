export default function Header() {
    return (
      <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
        <div>
          <h1 className="text-lg font-semibold text-white">
            WORKSHET™ Studio
          </h1>
  
          <p className="text-sm text-slate-400">
            AI Productivity Workspace
          </p>
        </div>
  
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-800" />
  
          <div>
            <p className="text-sm font-medium text-white">
              Evan Fauzi
            </p>
  
            <p className="text-xs text-slate-400">
              Founder
            </p>
          </div>
        </div>
      </header>
    );
  }