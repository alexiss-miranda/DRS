import { Landmark, Moon, RotateCcw, Sun } from "lucide-react";
import { EXERCISES } from "../data/exercises";

export default function Navbar({ active, onSelect, online, statusCode, theme, onToggleTheme, onReset }) {
  const activeExercise = EXERCISES.find((e) => e.slug === active);

  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center gap-4 border-b border-white/10 bg-[#0F131C]/80 px-6 py-3 backdrop-blur-md">
      <div className="flex items-center gap-2 text-white">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#494BD6] to-[#8083FF]">
          <Landmark size={18} strokeWidth={2.25} />
        </div>
        <div className="leading-tight">
          <h1 className="text-base font-bold tracking-tight">DRS POO Studio —</h1>
          <p className="text-xs text-white/40">Ejercicio {activeExercise?.numero}</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-wrap items-center gap-1 overflow-x-auto">
        {EXERCISES.map((ej) => {
          const isActive = ej.slug === active;
          return (
            <button
              key={ej.slug}
              onClick={() => onSelect(ej.slug)}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              <span className="font-mono text-xs text-[#8083FF]">
                {String(ej.numero).padStart(2, "0")}
              </span>{" "}
              {ej.titulo}
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-full border border-[#10B981]/20 bg-[#10B981]/10 px-3 py-1.5 text-xs">
          <span
            className={`h-2 w-2 rounded-full ${
              online ? "animate-pulse-dot bg-[#10B981]" : "bg-red-500"
            }`}
          />
          <span className="font-mono text-[#10B981]">
            Flask API: {online ? `Online${statusCode ? ` (${statusCode} OK)` : ""}` : "Offline"}
          </span>
        </div>

        {active === "cuenta-bancaria" && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            <RotateCcw size={13} />
            Reset Account
          </button>
        )}

        <button
          onClick={onToggleTheme}
          aria-label="Cambiar tema"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          {theme === "light" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  );
}
