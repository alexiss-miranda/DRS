import { ChevronDown, ChevronUp, Code2, FileCode2, SquareTerminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function JsonInline({ data }) {
  const entries = Object.entries(data ?? {});
  if (entries.length === 0) return <span className="text-white/30">{"{}"}</span>;

  return (
    <span>
      {"{ "}
      {entries.map(([key, value], i) => (
        <span key={key}>
          <span className="text-white/70">"{key}"</span>
          <span className="text-white/30">: </span>
          <span className={typeof value === "string" ? "text-[#10B981]" : "text-[#8083FF]"}>
            {typeof value === "string" ? `"${value}"` : String(value)}
          </span>
          {i < entries.length - 1 && <span className="text-white/30">, </span>}
        </span>
      ))}
      {" }"}
    </span>
  );
}

function LevelBadge({ level }) {
  const styles =
    level === "warn"
      ? "bg-amber-500/15 text-amber-300"
      : "bg-[#8083FF]/15 text-[#8083FF]";
  return (
    <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${styles}`}>
      {level === "warn" ? "WARN" : "INFO"}
    </span>
  );
}

function LogLine({ entry }) {
  if (entry.kind === "system") {
    return <div className="mb-2 text-white/30">{entry.text}</div>;
  }

  return (
    <div className="mb-4 space-y-1.5">
      <div>
        <span className="text-white/40">[{entry.time}]</span> <LevelBadge level={entry.level} />{" "}
        <span className="text-white/40">API/Request</span>
      </div>
      <div className="pl-1 text-white/80">
        <span className="text-[#8083FF]">{entry.method}</span> {entry.endpoint}
      </div>
      <div className="pl-1 text-white/50">
        Payload: <JsonInline data={entry.payload} />
      </div>

      <div className="pt-1">
        <span className={`font-semibold ${entry.ok ? "text-[#10B981]" : "text-red-400"}`}>
          {entry.ok ? `200 OK` : `${entry.status} Error`}
        </span>{" "}
        <span className="text-white/30">{entry.ms}ms</span>
      </div>
      <div className="pl-1 text-white/50">
        Response: <JsonInline data={entry.response} />
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
          <span className="text-[#10B981]">&gt;_</span>
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

export default function LiveTerminal({ entries, source, archivo }) {
  const [tab, setTab] = useState("terminal");
  const [snippetOpen, setSnippetOpen] = useState(false);

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
          Terminal de Logs
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

      <div className="border-t border-white/10 bg-[#0F131C]/80">
        <button
          onClick={() => setSnippetOpen((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-2.5 text-xs text-white/60 hover:text-white"
        >
          <span className="flex items-center gap-2 font-mono">
            <FileCode2 size={13} className="text-[#8083FF]" />
            {archivo}
          </span>
          {snippetOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {snippetOpen && (
          <div className="max-h-56 overflow-y-auto border-t border-white/10 bg-[#050505] px-4 py-3">
            <pre className="font-mono text-[11px] leading-relaxed text-white/70">
              <code>{source}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
