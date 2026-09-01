export const EXERCISES = [
  {
    slug: "cuenta-bancaria",
    numero: 1,
    titulo: "Abstracción",
    tituloLargo: "Principio de Abstracción",
    archivo: "cuenta_bancaria.py",
    resumen:
      "La abstracción consiste en ocultar los detalles de implementación y exponer solo la funcionalidad esencial al usuario. En este ejercicio, el usuario no necesita saber cómo se calcula el saldo internamente, solo interactúa con los métodos definidos.",
    encapsulamiento: {
      titulo: "Encapsulamiento Estricto",
      texto: "El atributo _saldo está protegido. No debe modificarse directamente desde fuera de la clase.",
    },
    uml: {
      nombre: "CuentaBancaria",
      pythonVersion: "3.10",
      atributos: [{ visibilidad: "-", texto: "_saldo: Decimal", oculto: true }],
      metodos: [
        { visibilidad: "+", texto: "depositar(monto: Decimal)", retorno: "None" },
        { visibilidad: "+", texto: "retirar(monto: Decimal)", retorno: "None" },
        { visibilidad: "+", texto: "obtener_saldo()", retorno: "Decimal" },
      ],
    },
    excepciones: [
      { nombre: "SaldoInsuficienteError", texto: "Al intentar retirar más del saldo disponible." },
      { nombre: "ValueError", texto: "Si el monto de depósito/retiro es negativo o cero." },
    ],
    source: `class SaldoInsuficienteError(Exception):
    """Se lanza al intentar retirar un monto mayor al saldo disponible."""

    def __init__(self, saldo_actual, monto_solicitado):
        super().__init__(
            f"Fondos insuficientes: saldo actual {saldo_actual}, "
            f"monto solicitado {monto_solicitado}"
        )


class CuentaBancaria:
    """Cuenta bancaria con saldo oculto tras depositar/retirar/obtener_saldo."""

    def __init__(self, saldo_inicial=Decimal("0")):
        if saldo_inicial < 0:
            raise ValueError("El saldo inicial no puede ser negativo")
        self.__saldo = saldo_inicial

    def depositar(self, monto):
        self.__validar_monto_positivo(monto)
        self.__saldo += monto

    def retirar(self, monto):
        self.__validar_monto_positivo(monto)
        if monto > self.__saldo:
            raise SaldoInsuficienteError(self.__saldo, monto)
        self.__saldo -= monto

    def obtener_saldo(self):
        return self.__saldo

    def __validar_monto_positivo(self, monto):
        if monto is None or monto <= 0:
            raise ValueError("El monto debe ser mayor que cero")`,
  },
  {
    slug: "empleado",
    numero: 2,
    titulo: "Encapsulación",
    tituloLargo: "Principio de Encapsulación",
    archivo: "empleado.py",
    resumen:
      "Restringir el acceso directo a los atributos de un objeto y exponerlos solo a través de propiedades (getters/setters) que validan cada valor antes de asignarlo.",
    encapsulamiento: {
      titulo: "Propiedades con Validación",
      texto: "nombre y edad se guardan en atributos privados; las propiedades públicas son el único camino para leerlos o modificarlos.",
    },
    uml: {
      nombre: "Empleado",
      pythonVersion: "3.10",
      atributos: [
        { visibilidad: "-", texto: "_nombre: str", oculto: true },
        { visibilidad: "-", texto: "_edad: int", oculto: true },
      ],
      metodos: [
        { visibilidad: "+", texto: "nombre", retorno: "str (property)" },
        { visibilidad: "+", texto: "edad", retorno: "int (property)" },
      ],
    },
    excepciones: [
      { nombre: "ValueError", texto: "Si el nombre está vacío, o la edad no está entre 1 y 99." },
    ],
    source: `class Empleado:
    """Encapsula los datos de un empleado.

    Nombre y edad se guardan en atributos privados (name mangling con
    doble guion bajo) y solo son accesibles a través de las propiedades
    \`nombre\` y \`edad\`, que validan cada valor asignado.
    """

    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad

    @property
    def nombre(self):
        return self.__nombre

    @nombre.setter
    def nombre(self, valor):
        if not valor or not valor.strip():
            raise ValueError("El nombre no puede estar vacío")
        self.__nombre = valor

    @property
    def edad(self):
        return self.__edad

    @edad.setter
    def edad(self, valor):
        if valor <= 0 or valor >= 100:
            raise ValueError("La edad debe ser mayor que 0 y menor que 100")
        self.__edad = valor`,
  },
  {
    slug: "vehiculo",
    numero: 3,
    titulo: "Herencia",
    tituloLargo: "Principio de Herencia Simple",
    archivo: "vehiculo.py",
    resumen:
      "Una clase (Coche) reutiliza el comportamiento de otra (Vehiculo) mediante herencia, y añade su propio comportamiento especializado sin reescribir lo heredado.",
    uml: {
      nombre: "Vehiculo",
      pythonVersion: "3.10",
      atributos: [],
      metodos: [
        { visibilidad: "+", texto: "arrancar()", retorno: "str" },
        { visibilidad: "+", texto: "detener()", retorno: "str" },
      ],
      hijo: {
        nombre: "Coche",
        atributos: [],
        metodos: [{ visibilidad: "+", texto: "conducir()", retorno: "str" }],
      },
    },
    source: `class Vehiculo:
    """Clase base con el comportamiento común a todo vehículo."""

    def arrancar(self):
        return "El vehículo ha arrancado."

    def detener(self):
        return "El vehículo se ha detenido."


class Coche(Vehiculo):
    """Extiende Vehiculo con comportamiento propio de un coche,
    reutilizando arrancar() y detener() por herencia.
    """

    def conducir(self):
        return "El coche está siendo conducido."`,
  },
  {
    slug: "animales",
    numero: 4,
    titulo: "Polimorfismo",
    tituloLargo: "Principio de Polimorfismo",
    archivo: "animal_polimorfismo.py",
    resumen:
      "Una misma referencia de tipo Animal invoca hacer_sonido(); el comportamiento real depende de la subclase concreta detrás del objeto en tiempo de ejecución.",
    uml: {
      nombre: "Animal",
      pythonVersion: "3.10",
      atributos: [],
      metodos: [{ visibilidad: "+", texto: "hacer_sonido()", retorno: "str" }],
      hermanos: [
        { nombre: "Perro", metodos: [{ visibilidad: "+", texto: "hacer_sonido()", retorno: "str" }] },
        { nombre: "Gato", metodos: [{ visibilidad: "+", texto: "hacer_sonido()", retorno: "str" }] },
      ],
    },
    source: `class Animal:
    """Clase base cuyo método hacer_sonido() es sobrescrito por las
    subclases para demostrar polimorfismo.
    """

    def hacer_sonido(self):
        return "El animal hace un sonido."


class Perro(Animal):
    def hacer_sonido(self):
        return "El perro ladra: ¡Guau!"


class Gato(Animal):
    def hacer_sonido(self):
        return "El gato maúlla: ¡Miau!"`,
  },
  {
    slug: "herencia-multinivel",
    numero: 5,
    titulo: "Multinivel",
    tituloLargo: "Principio de Herencia Multinivel",
    archivo: "animal_multinivel.py",
    resumen:
      "Perro hereda de Mamifero, que a su vez hereda de Animal. Perro sobrescribe hacer_sonido() y hereda alimentar() sin redefinirlo.",
    uml: {
      nombre: "Animal",
      pythonVersion: "3.10",
      atributos: [],
      metodos: [{ visibilidad: "+", texto: "hacer_sonido()", retorno: "str" }],
      cadena: [
        {
          nombre: "Mamifero",
          atributos: [],
          metodos: [{ visibilidad: "+", texto: "alimentar()", retorno: "str" }],
        },
        {
          nombre: "Perro",
          atributos: [],
          metodos: [{ visibilidad: "+", texto: "hacer_sonido()", retorno: "str" }],
        },
      ],
    },
    source: `class Animal:
    """Clase base de la jerarquía Animal -> Mamifero -> Perro."""

    def hacer_sonido(self):
        return "El animal hace un sonido."


class Mamifero(Animal):
    """Clase intermedia: hereda de Animal y añade comportamiento propio
    de los mamíferos.
    """

    def alimentar(self):
        return "El mamífero alimenta a sus crías."


class Perro(Mamifero):
    """Extremo de la jerarquía: hereda de Mamifero (y transitivamente de
    Animal) y sobrescribe hacer_sonido().
    """

    def hacer_sonido(self):
        return "El perro ladra: ¡Guau!"`,
  },
];

export const getExercise = (slug) => EXERCISES.find((e) => e.slug === slug) ?? EXERCISES[0];
