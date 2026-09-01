import { ArrowDownCircle, ArrowUpCircle, Nfc, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../api/client";

const QUICK_DEPOSITOS = ["25", "50", "100", "250"];

export default function CuentaBancariaSandbox({ onLog, resetSignal }) {
  const [saldo, setSaldo] = useState("0.00");
  const [saldoAnterior, setSaldoAnterior] = useState(null);
  const [flash, setFlash] = useState(false);
  const [operacion, setOperacion] = useState("depositar");
  const [monto, setMonto] = useState("100");
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(false);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    api.obtenerSaldo().then(({ ok, data }) => {
      if (ok) setSaldo(data.saldo);
    });
  }, []);

  useEffect(() => {
    if (resetSignal == null) return;
    setSaldo("0.00");
    setSaldoAnterior(null);
    setHistorial([]);
    setMensaje(null);
    setFlash(true);
    setTimeout(() => setFlash(false), 250);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal]);

  const dispararFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 250);
  };

  const registrarHistorial = (tipo, montoOp, saldoResultante) => {
    setHistorial((prev) =>
      [
        {
          id: Date.now(),
          tipo,
          monto: montoOp,
          saldo: saldoResultante,
          hora: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
        },
        ...prev,
      ].slice(0, 3),
    );
  };

  const confirmar = async () => {
    setMensaje(null);
    setLoading(true);
    const payload = { operacion, monto };
    const { ok, status, data, ms } = await api.operarCuenta(operacion, monto);
    setLoading(false);

    onLog({
      method: "POST",
      endpoint: "/api/operar",
      payload,
      level: operacion === "retirar" ? "warn" : "info",
      ok,
      status,
      ms,
      response: ok ? { saldo: data.saldo } : { error: data.error },
    });

    if (!ok) {
      setMensaje({ tipo: "error", texto: data.error || "Ocurrió un error" });
      return;
    }

    setSaldoAnterior(saldo);
    setSaldo(data.saldo);
    dispararFlash();
    registrarHistorial(operacion, monto, data.saldo);
    setMensaje({
      tipo: "ok",
      texto: operacion === "depositar" ? "Depósito realizado" : "Retiro realizado",
    });
  };

  const trend = saldoAnterior !== null ? Number(saldo) - Number(saldoAnterior) : null;

  return (
    <div className="flex flex-col gap-5">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[rgba(28,32,54,0.9)] to-[rgba(15,19,28,0.9)] p-6 backdrop-blur-md">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="text-sm font-bold tracking-wide text-white">DRS BANK</p>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Black Edition</p>
          </div>
          <Nfc size={22} className="text-white/40" />
        </div>

        <p className="text-xs uppercase tracking-wide text-white/40">Saldo disponible</p>
        <div className="mt-1 flex items-end gap-2">
          <p
            key={saldo}
            className={`font-mono text-4xl font-bold text-white ${flash ? "animate-count-flash" : ""}`}
          >
            ${saldo}
          </p>
          {trend !== null && trend !== 0 && (
            <span
              className={`mb-1 flex items-center gap-0.5 text-xs font-medium ${
                trend > 0 ? "text-[#10B981]" : "text-red-400"
              }`}
            >
              {trend > 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {trend > 0 ? "+" : ""}
              {trend.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-white/30">Titular / Cuenta</p>
            <p className="mt-0.5 font-mono text-xs text-white/70">ALEXIS MIRANDA — #9824-POO</p>
          </div>
          <div className="h-5 w-8 rounded border border-white/20 bg-white/5" />
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[rgba(17,24,39,0.8)] p-5 backdrop-blur-md">
        <div className="mb-4 grid grid-cols-2 gap-1 rounded-lg bg-black/30 p-1">
          <button
            onClick={() => setOperacion("depositar")}
            className={`rounded-md py-2 text-sm font-medium transition-colors ${
              operacion === "depositar" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            Depositar
          </button>
          <button
            onClick={() => setOperacion("retirar")}
            className={`rounded-md py-2 text-sm font-medium transition-colors ${
              operacion === "retirar" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            Retirar
          </button>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-3">
          <span className="text-lg text-white/40">$</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="w-full bg-transparent font-mono text-lg text-white outline-none"
          />
          <span className="rounded bg-white/5 px-2 py-1 text-[10px] font-medium text-white/40">
            USD
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_DEPOSITOS.map((valor) => (
            <button
              key={valor}
              onClick={() => {
                setOperacion("depositar");
                setMonto(valor);
              }}
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-xs text-white/70 transition-colors hover:border-white/20 hover:bg-white/5"
            >
              +${valor}
            </button>
          ))}
          <button
            onClick={() => {
              setOperacion("retirar");
              setMonto(saldo);
            }}
            className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 font-mono text-xs text-amber-300 transition-colors hover:bg-amber-500/20"
          >
            Max Retiro
          </button>
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
          {loading ? "Procesando..." : "▷ Confirmar Operación Bancaria"}
        </button>
      </div>

      <div className="rounded-xl border border-white/10 bg-[rgba(17,24,39,0.8)] p-5 backdrop-blur-md">
        <p className="mb-3 text-xs uppercase tracking-wide text-white/40">Últimas transacciones</p>
        {historial.length === 0 ? (
          <p className="text-sm text-white/30">Sin transacciones todavía.</p>
        ) : (
          <ul className="space-y-3">
            {historial.map((h) => (
              <li key={h.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {h.tipo === "depositar" ? (
                    <ArrowDownCircle size={18} className="text-[#10B981]" />
                  ) : (
                    <ArrowUpCircle size={18} className="text-red-400" />
                  )}
                  <div>
                    <p className="text-xs font-medium text-white/80">
                      {h.tipo === "depositar" ? "Depósito" : "Retiro"}
                    </p>
                    <p className="text-[10px] text-white/40">{h.hora}</p>
                  </div>
                </div>
                <span
                  className={`font-mono text-xs font-semibold ${
                    h.tipo === "depositar" ? "text-[#10B981]" : "text-red-400"
                  }`}
                >
                  {h.tipo === "depositar" ? "+" : "-"}${h.monto}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
