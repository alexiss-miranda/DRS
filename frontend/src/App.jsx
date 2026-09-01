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
  const [statusCode, setStatusCode] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("drs-theme") ?? "dark");
  const [resetSignal, setResetSignal] = useState(null);
  const { entries, log } = useTerminalLog();

  const exercise = getExercise(active);

  useEffect(() => {
    localStorage.setItem("drs-theme", theme);
  }, [theme]);

  useEffect(() => {
    let cancelled = false;

    const checkHealth = () => {
      api.health().then(({ ok, status }) => {
        if (cancelled) return;
        setOnline(ok);
        setStatusCode(status);
      });
    };

    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const handleReset = async () => {
    const { ok, status, data, ms } = await api.reiniciarCuenta();
    log({
      method: "POST",
      endpoint: "/api/reiniciar",
      payload: {},
      level: "warn",
      ok,
      status,
      ms,
      response: ok ? { saldo: data.saldo } : { error: data.error },
    });
    if (ok) setResetSignal((n) => n + 1);
  };

  return (
    <div className={`flex h-screen flex-col bg-[#090D16] ${theme === "light" ? "theme-light" : ""}`}>
      <Navbar
        active={active}
        onSelect={setActive}
        online={online}
        statusCode={statusCode}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        onReset={handleReset}
      />

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[300px_1fr_400px]">
        <div className="min-h-0 border-white/10 lg:border-r">
          <TheoryPanel exercise={exercise} />
        </div>

        <div className="min-h-0 border-white/10 lg:border-r">
          <SandboxContainer slug={active} onLog={log} resetSignal={active === "cuenta-bancaria" ? resetSignal : undefined} />
        </div>

        <div className="min-h-0">
          <LiveTerminal entries={entries} source={exercise.source} archivo={exercise.archivo} />
        </div>
      </div>
    </div>
  );
}
