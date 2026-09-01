import { Code2, SquareTerminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function LogLine({ entry }) {
  if (entry.kind === "system") {
    return <div className="text-white/30">{entry.text}</div>;
  }

  return (
    <div className="mb-3">
      <div>
        <span className="text-white/40">[{entry.time}]</span>{" "}
        <span className="text-[#8083FF]">{entry.method}</span>{" "}
        <span className="text-white/70">{entry.endpoint}</span>{" "}
        <span className="text-white/30">→</span>
      </div>
      <div className="pl-4 text-white/50">{entry.call}</div>
      <div className={`pl-4 ${entry.ok ? "text-[#10B981]" : "text-red-400"}`}>
        {entry.ok ? `Success ${entry.status} OK` : `Error ${entry.status}`}
        {entry.result ? ` — ${entry.result}` : ""}
      </div>
    </div>
  );
}

function TerminalTab({ entries }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [entries]);

  return (
    <div className="flex h-full flex-col bg-[#050505]">
      <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[12px] leading-relaxed">
        {entries.map((entry) => (
          <LogLine key={entry.id} entry={entry} />
        ))}
        <div className="flex items-center gap-1 text-white/60">
          <span className="text-[#10B981]">&gt;</span>
          <span className="h-3.5 w-1.5 animate-pulse-dot bg-white/60" />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

function CodeTab({ source }) {
  return (
    <div className="h-full overflow-y-auto bg-[#050505] px-4 py-3">
      <pre className="font-mono text-[12px] leading-relaxed text-white/80">
        <code>{source}</code>
      </pre>
    </div>
  );
}

export default function LiveTerminal({ entries, source }) {
  const [tab, setTab] = useState("terminal");

  return (
    <div className="flex h-full flex-col">
      <div className="flex border-b border-white/10 bg-[#0F131C]/80">
        <button
          onClick={() => setTab("terminal")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            tab === "terminal"
              ? "border-[#8083FF] text-white"
              : "border-transparent text-white/40 hover:text-white/70"
          }`}
        >
          <SquareTerminal size={15} />
          Terminal en Vivo
        </button>
        <button
          onClick={() => setTab("codigo")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            tab === "codigo"
              ? "border-[#8083FF] text-white"
              : "border-transparent text-white/40 hover:text-white/70"
          }`}
        >
          <Code2 size={15} />
          Código Python
        </button>
      </div>

      <div className="min-h-0 flex-1">
        {tab === "terminal" ? <TerminalTab entries={entries} /> : <CodeTab source={source} />}
      </div>
    </div>
  );
}
