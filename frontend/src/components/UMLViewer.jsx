function ClassBox({ nombre, atributos = [], metodos = [], accent = false }) {
  return (
    <div
      className={`overflow-hidden rounded-lg border ${
        accent ? "border-[#8083FF]/40" : "border-white/10"
      } bg-black/20`}
    >
      <div
        className={`border-b px-3 py-2 text-center font-mono text-xs font-semibold ${
          accent
            ? "border-[#8083FF]/40 bg-[#494BD6]/20 text-[#c7c8ff]"
            : "border-white/10 bg-white/5 text-white/90"
        }`}
      >
        {nombre}
      </div>
      {atributos.length > 0 && (
        <div className="space-y-1 border-b border-white/10 px-3 py-2">
          {atributos.map((a, i) => (
            <div key={i} className="font-mono text-[11px] text-white/60">
              <span className="text-[#8083FF]">{a.visibilidad}</span> {a.texto}
            </div>
          ))}
        </div>
      )}
      <div className="space-y-1 px-3 py-2">
        {metodos.map((m, i) => (
          <div key={i} className="font-mono text-[11px] text-white/70">
            <span className="text-[#10B981]">{m.visibilidad}</span> {m.texto}
          </div>
        ))}
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
