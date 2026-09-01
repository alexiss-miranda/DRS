import { BookOpen } from "lucide-react";
import UMLViewer from "./UMLViewer";

export default function TheoryPanel({ exercise }) {
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-5">
      <div className="flex items-center gap-2 text-white/90">
        <BookOpen size={18} className="text-[#8083FF]" />
        <h2 className="text-base font-semibold">Teoría &amp; UML</h2>
      </div>

      <div className="rounded-xl border border-white/10 bg-[rgba(17,24,39,0.8)] p-4 backdrop-blur-md">
        <h3 className="mb-2 text-sm font-semibold text-white">{exercise.tituloLargo}</h3>
        <p className="text-sm leading-relaxed text-white/60">{exercise.resumen}</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-[rgba(17,24,39,0.8)] p-4 backdrop-blur-md">
        <UMLViewer uml={exercise.uml} />
      </div>
    </div>
  );
}
