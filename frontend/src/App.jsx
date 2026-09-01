import { useEffect, useState } from "react";
import { api } from "./api/client";
import LiveTerminal from "./components/LiveTerminal";
import Navbar from "./components/Navbar";
import SandboxContainer from "./components/SandboxContainer";
import TheoryPanel from "./components/TheoryPanel";
import { getExercise } from "./data/exercises";
import { useTerminalLog } from "./hooks/useTerminalLog";

export default function App() {
  const [active, setActive] = useState("cuenta-bancaria");
  const [online, setOnline] = useState(true);
  const { entries, log } = useTerminalLog();

  const exercise = getExercise(active);

  useEffect(() => {
    let cancelled = false;

    const checkHealth = () => {
      api.health().then(({ ok }) => {
        if (!cancelled) setOnline(ok);
      });
    };

    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex h-screen flex-col bg-[#090D16]">
      <Navbar active={active} onSelect={setActive} online={online} />

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[300px_1fr_400px]">
        <div className="min-h-0 border-white/10 lg:border-r">
          <TheoryPanel exercise={exercise} />
        </div>

        <div className="min-h-0 border-white/10 lg:border-r">
          <SandboxContainer slug={active} onLog={log} />
        </div>

        <div className="min-h-0">
          <LiveTerminal entries={entries} source={exercise.source} />
        </div>
      </div>
    </div>
  );
}
