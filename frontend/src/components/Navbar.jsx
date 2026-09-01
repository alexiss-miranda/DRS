import { Boxes } from "lucide-react";
import { EXERCISES } from "../data/exercises";

export default function Navbar({ active, onSelect, online }) {
  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center gap-4 border-b border-white/10 bg-[#0F131C]/80 px-6 py-3 backdrop-blur-md">
      <div className="flex items-center gap-2 text-white">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#494BD6] to-[#8083FF]">
          <Boxes size={18} strokeWidth={2.5} />
        </div>
        <div className="leading-tight">
          <h1 className="text-sm font-bold tracking-tight">DRS POO Studio</h1>
          <p className="text-[11px] text-white/40">Guía 1 POO</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-wrap items-center gap-1 overflow-x-auto">
        {EXERCISES.map((ej) => {
          const isActive = ej.slug === active;
          return (
            <button
              key={ej.slug}
              onClick={() => onSelect(ej.slug)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
                isActive
                  ? "bg-gradient-to-r from-[#494BD6] to-[#8083FF] text-white shadow-[0_0_16px_rgba(128,131,255,0.35)]"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80"
              }`}
            >
              Ej.{ej.numero} · {ej.titulo}
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs">
        <span
          className={`h-2 w-2 rounded-full ${
            online ? "animate-pulse-dot bg-[#10B981]" : "bg-red-500"
          }`}
        />
        <span className="font-mono text-white/60">
          Flask API: {online ? "Online" : "Offline"}
        </span>
      </div>
    </header>
  );
}
