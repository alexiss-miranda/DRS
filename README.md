# MR22058 DRS GUIA 1

Repositorio oficial para la entrega de la **Guía 1 de Diseño y Reutilización de Software (DRS)**: Programación Orientada a Objetos (POO) en Python, principios SOLID y arquitectura modular.

Incluye la resolución completa de los 5 ejercicios solicitados en consola con pruebas unitarias (`pytest`), además de una **plataforma web interactiva full-stack** desarrollada con Flask y Tailwind CSS desplegada en la nube.

---

## 🚀 Despliegue en Línea (Demo Web)

La aplicación web interactiva se encuentra desplegada y disponible públicamente en Vercel:
* 🌐 **URL de Producción:** [https://drs-psi.vercel.app/

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Descripción |
|---|---|---|
| **Lenguaje Core** | Python 3.10+ | Implementación de las clases y lógica de negocio POO |
| **Backend Web** | Flask 3.1+ | Servidor web WSGI y endpoints JSON-RPC |
| **Pruebas** | Pytest 8.0+ | Suites de pruebas unitarias automatizadas por ejercicio |
| **Frontend UI** | HTML5 + Tailwind CSS | Interfaz visual estilo Studio Developer (Dark Mode) |
| **Tipografía e Iconos** | Inter, JetBrains Mono, Material Symbols | Estética y legibilidad de grado profesional |
| **Despliegue & CI/CD** | Vercel Serverless Functions | Hosting en la nube con soporte serverless para Python |

---

## 📁 Estructura del Repositorio

El repositorio está organizado en módulos independientes, limpios y autocontenidos:

```text
mr22058-guia1-drs/
├── ejercicio-1-abstraccion-datos/     # Ejercicio 1: CuentaBancaria (Abstracción)
│   ├── cuenta_bancaria.py
│   ├── main.py
│   ├── tests/
│   └── README.md
├── ejercicio-2-encapsulacion/          # Ejercicio 2: Empleado con @property (Encapsulación)
│   ├── empleado.py
│   ├── main.py
│   ├── tests/
│   └── README.md
├── ejercicio-3-herencia-simple/        # Ejercicio 3: Vehiculo y Coche (Herencia Simple)
│   ├── vehiculo.py
│   ├── main.py
│   ├── tests/
│   └── README.md
├── ejercicio-4-polimorfismo/           # Ejercicio 4: Animal, Perro, Gato (Polimorfismo)
│   ├── animal.py
│   ├── main.py
│   ├── tests/
│   └── README.md
├── ejercicio-5-herencia-multinivel/    # Ejercicio 5: Animal -> Mamifero -> Perro (Multinivel)
│   ├── animal.py
│   ├── main.py
│   ├── tests/
│   └── README.md
├── demo-web-cuentabancaria/            # Plataforma Web Interactiva (Flask + Templates + Static)
│   ├── app.py
│   ├── templates/                      # Vistas HTML con Cyberpunk HUD y diseño Stitch
│   ├── static/img/                     # Ilustraciones de canino y felino cibernéticos
│   └── requirements.txt
├── api/                                # Entrypoints Serverless para Vercel
│   ├── index.py
│   └── handler.py
├── vercel.json                         # Configuración de despliegue en Vercel
└── requirements.txt                    # Dependencias globales del proyecto
```

---

## 📋 Resumen de Ejercicios

| # | Ejercicio | Concepto POO Aplicado | Clases Principales | Carpeta |
|---|---|---|---|---|
| **1** | **Abstracción de Datos** | Ocultamiento de la complejidad interna del saldo bancario | `CuentaBancaria` | [`ejercicio-1-abstraccion-datos/`](./ejercicio-1-abstraccion-datos) |
| **2** | **Encapsulación** | Atributos privados (`__nombre`, `__edad`) con `@property` y validaciones | `Empleado` | [`ejercicio-2-encapsulacion/`](./ejercicio-2-encapsulacion) |
| **3** | **Herencia Simple** | Reutilización de lógica base en subclase derivada | `Vehiculo`, `Coche` | [`ejercicio-3-herencia-simple/`](./ejercicio-3-herencia-simple) |
| **4** | **Polimorfismo** | Sobrescritura de método común (`hacer_sonido`) ejecutado dinámicamente | `Animal`, `Perro`, `Gato` | [`ejercicio-4-polimorfismo/`](./ejercicio-4-polimorfismo) |
| **5** | **Herencia Multinivel** | Jerarquía de 3 niveles y resolución de métodos (MRO) | `Animal` &rarr; `Mamifero` &rarr; `Perro` | [`ejercicio-5-herencia-multinivel/`](./ejercicio-5-herencia-multinivel) |

---

## 💻 Instalación y Ejecución Local

### 1. Prerrequisitos
Asegúrate de tener instalado en tu sistema:
* **Git**
* **Python 3.10 o superior** (verificar con `python3 --version`)
* **pip** (administrador de paquetes de Python)

---

### 2. Clonar el Repositorio
```bash
git clone https://github.com/alexiss-miranda/DRS-Guia1.git
cd DRS-Guia1
```

---

### 3. Crear y Activar un Entorno Virtual (Recomendado)

En Linux / macOS:
```bash
python3 -m venv .venv
source .venv/bin/activate
```

En Windows (PowerShell):
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

---

### 4. Instalar Dependencias

Para instalar las dependencias de la aplicación web:
```bash
pip install -r requirements.txt
```

Para instalar dependencias de desarrollo y testing (`pytest`):
```bash
pip install pytest
```

---

### 5. Ejecutar la Aplicación Web Localmente

Para levantar el servidor web interactivo con todas las vistas:
```bash
cd demo-web-cuentabancaria
python3 app.py
```

Abre tu navegador en:
👉 **[http://127.0.0.1:5000](http://127.0.0.1:5000)**

Rutas disponibles en la plataforma web:
* `/cuenta-bancaria` &rarr; Ejercicio 1 (Abstracción)
* `/empleado` &rarr; Ejercicio 2 (Encapsulación)
* `/vehiculo` &rarr; Ejercicio 3 (Herencia Simple)
* `/animales` &rarr; Ejercicio 4 (Polimorfismo)
* `/herencia-multinivel` &rarr; Ejercicio 5 (Herencia Multinivel)

---

### 6. Ejecutar los Demos por Consola

Si deseas correr las pruebas de consola independientes de cada ejercicio:

```bash
# Ejercicio 1
python3 ejercicio-1-abstraccion-datos/main.py

# Ejercicio 2
python3 ejercicio-2-encapsulacion/main.py

# Ejercicio 3
python3 ejercicio-3-herencia-simple/main.py

# Ejercicio 4
python3 ejercicio-4-polimorfismo/main.py

# Ejercicio 5
python3 ejercicio-5-herencia-multinivel/main.py
```

---

### 7. Ejecutar Pruebas Unitarias Automatizadas

Para ejecutar la suite completa de pruebas unitarias de todos los ejercicios:

```bash
pytest
```

O ejecutar pruebas para un ejercicio específico:
```bash
pytest ejercicio-1-abstraccion-datos/tests/
pytest ejercicio-2-encapsulacion/tests/
pytest ejercicio-3-herencia-simple/tests/
pytest ejercicio-4-polimorfismo/tests/
pytest ejercicio-5-herencia-multinivel/tests/
```

---

## 👤 Información del Autor

* **Estudiante / Carnet:** MR22058 (Alexis Miranda)
* **Materia:** Diseño y Reutilización de Software (DRS)
* **Actividad:** Guía de Práctica 1 — Programación Orientada a Objetos
