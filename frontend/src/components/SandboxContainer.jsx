import { PuzzleIcon } from "lucide-react";
import AnimalesSandbox from "./sandboxes/AnimalesSandbox";
import CuentaBancariaSandbox from "./sandboxes/CuentaBancariaSandbox";
import EmpleadoSandbox from "./sandboxes/EmpleadoSandbox";
import MultinivelSandbox from "./sandboxes/MultinivelSandbox";
import VehiculoSandbox from "./sandboxes/VehiculoSandbox";

const SANDBOXES = {
  "cuenta-bancaria": CuentaBancariaSandbox,
  empleado: EmpleadoSandbox,
  vehiculo: VehiculoSandbox,
  animales: AnimalesSandbox,
  "herencia-multinivel": MultinivelSandbox,
};

export default function SandboxContainer({ slug, onLog, resetSignal }) {
  const Sandbox = SANDBOXES[slug] ?? CuentaBancariaSandbox;

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-5 flex items-center gap-2 text-white/90">
        <PuzzleIcon size={18} className="text-[#8083FF]" />
        <h2 className="text-base font-semibold">Simulador Interactivo</h2>
      </div>
      <Sandbox onLog={onLog} resetSignal={resetSignal} />
    </div>
  );
}
