# DRS POO Studio — Frontend

SPA en React (Vite) + Tailwind CSS que consume la API Flask de
[`../demo-web-cuentabancaria/`](../demo-web-cuentabancaria) para los 5 ejercicios de la guía
de POO: abstracción, encapsulación, herencia simple, polimorfismo y herencia multinivel.

## Estructura

```
src/
  api/client.js           # cliente fetch hacia /api/*
  data/exercises.js        # teoría, definición UML y fuente Python de cada ejercicio
  hooks/useTerminalLog.js  # estado de la terminal en vivo
  components/
    Navbar.jsx
    TheoryPanel.jsx        # columna izquierda: teoría + UMLViewer
    UMLViewer.jsx
    SandboxContainer.jsx   # columna central: elige el sandbox según el ejercicio activo
    LiveTerminal.jsx       # columna derecha: tabs Terminal / Código Python
    sandboxes/
      CuentaBancariaSandbox.jsx
      EmpleadoSandbox.jsx
      VehiculoSandbox.jsx
      AnimalesSandbox.jsx
      MultinivelSandbox.jsx
```

## Ejecutar en local

Requiere el backend Flask corriendo en `http://127.0.0.1:5000` (ver
[`../demo-web-cuentabancaria/README.md`](../demo-web-cuentabancaria/README.md)).

```bash
npm install
npm run dev
```

El dev server de Vite (`http://localhost:5173`) hace proxy de `/api/*` hacia el backend
Flask — configurado en `vite.config.js` — así que no hace falta CORS en desarrollo.

## Build de producción

```bash
npm run build
```

Genera `dist/`, que en Vercel se sirve junto a la API Python según el `vercel.json` de la
raíz del repositorio.
