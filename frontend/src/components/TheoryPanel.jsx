import { AlertTriangle, Lock, Sparkles } from "lucide-react";
import UMLViewer from "./UMLViewer";

export default function TheoryPanel({ exercise }) {
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Teoría</p>

      <div className="rounded-xl border border-white/10 bg-[rgba(17,24,39,0.8)] p-4 backdrop-blur-md">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={15} className="text-[#8083FF]" />
          <h3 className="text-sm font-semibold text-white">{exercise.tituloLargo}</h3>
        </div>
        <p className="text-sm leading-relaxed text-white/60">{exercise.resumen}</p>
      </div>

      {exercise.encapsulamiento && (
        <div className="rounded-xl border border-white/10 bg-[rgba(17,24,39,0.8)] p-4 backdrop-blur-md">
          <div className="mb-1.5 flex items-center gap-2">
            <Lock size={14} className="text-[#8083FF]" />
            <h4 className="text-sm font-semibold text-white">{exercise.encapsulamiento.titulo}</h4>
          </div>
          <p className="text-xs leading-relaxed text-white/50">{exercise.encapsulamiento.texto}</p>
        </div>
      )}

      <div className="rounded-xl border border-white/10 bg-[rgba(17,24,39,0.8)] p-4 backdrop-blur-md">
        <UMLViewer uml={exercise.uml} />
      </div>

      {exercise.excepciones && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4 backdrop-blur-md">
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle size={14} className="text-red-400" />
            <h4 className="text-sm font-semibold text-red-300">Manejo de Excepciones</h4>
          </div>
          <div className="space-y-2">
            {exercise.excepciones.map((exc) => (
              <p key={exc.nombre} className="text-xs leading-relaxed text-white/50">
                <span className="font-mono font-semibold text-red-300">{exc.nombre}</span>:{" "}
                {exc.texto}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
