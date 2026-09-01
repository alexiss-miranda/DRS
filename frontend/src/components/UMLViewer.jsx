import { Braces, Lock } from "lucide-react";

function ClassBox({ nombre, pythonVersion, atributos = [], metodos = [], accent = false }) {
  return (
    <div
      className={`overflow-hidden rounded-lg border bg-black/20 ${
        accent ? "border-[#8083FF]/40" : "border-white/10"
      }`}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Braces size={14} className="text-[#8083FF]" />
          <span className="font-mono text-sm font-semibold text-white">class {nombre}</span>
        </div>
        {pythonVersion && (
          <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/40">
            PYTHON {pythonVersion}
          </span>
        )}
      </div>

      {atributos.length > 0 && (
        <div className="border-b border-white/10 px-3 py-2.5">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/30">
            Atributos
          </p>
          <div className="space-y-1.5">
            {atributos.map((a, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-white/70">
                  <span className="text-[#8083FF]">{a.visibilidad}</span> {a.texto}
                </span>
                {a.oculto && (
                  <span className="flex shrink-0 items-center gap-1 rounded-md bg-red-500/10 px-1.5 py-0.5 text-[10px] text-red-300">
                    Oculto <Lock size={10} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-3 py-2.5">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/30">
          Métodos
        </p>
        <div className="space-y-2">
          {metodos.map((m, i) => (
            <div key={i} className="font-mono text-xs">
              <div className="text-white/80">
                <span className="text-[#10B981]">{m.visibilidad}</span> {m.texto}
              </div>
              {m.retorno && <div className="pl-3 text-white/30">→ {m.retorno}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Arrow({ label }) {
  return (
    <div className="flex flex-col items-center py-1 text-white/30">
      <div className="h-4 w-px bg-white/20" />
      <span className="text-[9px] uppercase tracking-wider">{label ?? "extends"}</span>
      <div className="h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-white/20" />
    </div>
  );
}

export default function UMLViewer({ uml }) {
  if (!uml) return null;

  return (
    <div className="flex flex-col items-stretch">
      <ClassBox {...uml} accent={!uml.hijo && !uml.hermanos && !uml.cadena} />

      {uml.hijo && (
        <>
          <Arrow />
          <ClassBox {...uml.hijo} accent />
        </>
      )}

      {uml.cadena && (
        <>
          {uml.cadena.map((clase, i) => (
            <div key={clase.nombre}>
              <Arrow />
              <ClassBox {...clase} accent={i === uml.cadena.length - 1} />
            </div>
          ))}
        </>
      )}

      {uml.hermanos && (
        <>
          <Arrow />
          <div className="grid grid-cols-2 gap-2">
            {uml.hermanos.map((clase) => (
              <ClassBox key={clase.nombre} {...clase} accent />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
