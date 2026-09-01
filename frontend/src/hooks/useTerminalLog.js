import { useCallback, useState } from "react";

function timestamp() {
  return new Date().toTimeString().slice(0, 8);
}

let nextId = 1;

export function useTerminalLog() {
  const [entries, setEntries] = useState([
    { id: nextId++, kind: "system", text: "# Servidor Flask conectado" },
    { id: nextId++, kind: "system", text: "# Escuchando eventos de la UI..." },
  ]);

  const log = useCallback((entry) => {
    setEntries((prev) => [...prev, { id: nextId++, kind: "call", time: timestamp(), ...entry }]);
  }, []);

  const clear = useCallback(() => {
    setEntries([{ id: nextId++, kind: "system", text: "# Terminal reiniciada" }]);
  }, []);

  return { entries, log, clear };
}
