import { ChevronDown, Landmark, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../api/client";

const CHIPS = [
  { label: "+$50", operacion: "depositar", monto: "50" },
  { label: "+$100", operacion: "depositar", monto: "100" },
  { label: "-$20", operacion: "retirar", monto: "20" },
  { label: "-$50", operacion: "retirar", monto: "50" },
];

export default function CuentaBancariaSandbox({ onLog }) {
  const [saldo, setSaldo] = useState("0.00");
  const [flash, setFlash] = useState(false);
  const [operacion, setOperacion] = useState("depositar");
  const [monto, setMonto] = useState("50");
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.obtenerSaldo().then(({ ok, data }) => {
      if (ok) setSaldo(data.saldo);
    });
  }, []);

  const dispararFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 250);
  };

  const confirmar = async () => {
    setMensaje(null);
    setLoading(true);
    const { ok, status, data } = await api.operarCuenta(operacion, monto);
    setLoading(false);

    onLog({
      method: "POST",
      endpoint: "/api/operar",
      call: `CuentaBancaria.${operacion}(${monto})`,
      status,
      ok,
      result: ok ? `New Balance $${data.saldo}` : data.error,
    });

    if (!ok) {
      setMensaje({ tipo: "error", texto: data.error || "Ocurrió un error" });
      return;
    }

    setSaldo(data.saldo);
    dispararFlash();
    setMensaje({
      tipo: "ok",
      texto: operacion === "depositar" ? "Depósito realizado" : "Retiro realizado",
    });
  };

  const reiniciar = async () => {
    const { ok, status, data } = await api.reiniciarCuenta();
    onLog({
      method: "POST",
      endpoint: "/api/reiniciar",
      call: "CuentaBancaria.__init__()",
      status,
      ok,
      result: ok ? `New Balance $${data.saldo}` : data.error,
    });
    if (ok) {
      setSaldo(data.saldo);
      dispararFlash();
      setMensaje({ tipo: "ok", texto: "Cuenta reiniciada" });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-white/10 bg-[rgba(17,24,39,0.8)] p-5 backdrop-blur-md">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
            <Landmark size={18} className="text-[#8083FF]" />
          </div>
          <span className="font-mono text-xs text-white/40">ID: CB-9824</span>
        </div>

        <p className="text-xs uppercase tracking-wide text-white/40">Balance actual</p>
        <p
          key={saldo}
          className={`mt-1 font-mono text-4xl font-bold text-white ${
            flash ? "animate-count-flash" : ""
          }`}
        >
          ${saldo}
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-[rgba(17,24,39,0.8)] p-5 backdrop-blur-md">
        <label className="mb-2 block text-xs text-white/50">Monto (USD)</label>
        <div className="flex gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2.5">
            <span className="text-white/40">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="w-full bg-transparent font-mono text-sm text-white outline-none"
            />
          </div>
          <div className="relative">
            <select
              value={operacion}
              onChange={(e) => setOperacion(e.target.value)}
              className="h-full appearance-none rounded-lg border border-white/10 bg-black/30 py-2.5 pl-3 pr-9 text-sm text-white outline-none"
            >
              <option value="depositar">Depositar</option>
              <option value="retirar">Retirar</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
            />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {CHIPS.map((chip) => (
            <button
              key={chip.label}
              onClick={() => {
                setOperacion(chip.operacion);
                setMonto(chip.monto);
              }}
              className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${
                chip.operacion === "depositar"
                  ? "border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20"
                  : "border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {mensaje && (
          <p className={`mt-3 text-xs ${mensaje.tipo === "error" ? "text-red-400" : "text-[#10B981]"}`}>
            {mensaje.texto}
          </p>
        )}

        <button
          onClick={confirmar}
          disabled={loading}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#494BD6] to-[#8083FF] py-3 text-sm font-semibold text-white shadow-lg shadow-[#494BD6]/20 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Zap size={15} />
          {loading ? "Procesando..." : "Confirm Transaction"}
        </button>

        <button
          onClick={reiniciar}
          className="mt-2 w-full rounded-lg border border-white/10 py-2 text-xs text-white/50 transition-colors hover:bg-white/5 hover:text-white/80"
        >
          Reiniciar cuenta
        </button>
      </div>
    </div>
  );
}
