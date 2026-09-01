export const EXERCISES = [
  {
    slug: "cuenta-bancaria",
    numero: 1,
    titulo: "Abstracción",
    tituloLargo: "Abstracción de Datos",
    resumen:
      "Ocultar los detalles de implementación complejos y mostrar solo las características esenciales del objeto al mundo exterior.",
    uml: {
      nombre: "CuentaBancaria",
      atributos: [{ visibilidad: "-", texto: "saldo: Decimal" }],
      metodos: [
        { visibilidad: "+", texto: "depositar(monto)" },
        { visibilidad: "+", texto: "retirar(monto)" },
        { visibilidad: "+", texto: "obtener_saldo()" },
      ],
    },
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
    tituloLargo: "Encapsulación",
    resumen:
      "Restringir el acceso directo a los atributos de un objeto y exponerlos solo a través de propiedades que validan cada valor asignado.",
    uml: {
      nombre: "Empleado",
      atributos: [
        { visibilidad: "-", texto: "nombre: str" },
        { visibilidad: "-", texto: "edad: int" },
      ],
      metodos: [
        { visibilidad: "+", texto: "nombre (getter/setter)" },
        { visibilidad: "+", texto: "edad (getter/setter)" },
      ],
    },
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
    tituloLargo: "Herencia Simple",
    resumen:
      "Una clase (Coche) reutiliza el comportamiento de otra (Vehiculo) mediante herencia, y añade su propio comportamiento especializado.",
    uml: {
      nombre: "Vehiculo",
      atributos: [],
      metodos: [
        { visibilidad: "+", texto: "arrancar()" },
        { visibilidad: "+", texto: "detener()" },
      ],
      hijo: {
        nombre: "Coche",
        atributos: [],
        metodos: [{ visibilidad: "+", texto: "conducir()" }],
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
    tituloLargo: "Polimorfismo",
    resumen:
      "Una misma referencia de tipo Animal invoca hacer_sonido(); el comportamiento real depende de la subclase concreta detrás del objeto.",
    uml: {
      nombre: "Animal",
      atributos: [],
      metodos: [{ visibilidad: "+", texto: "hacer_sonido()" }],
      hermanos: [
        { nombre: "Perro", metodos: [{ visibilidad: "+", texto: "hacer_sonido()" }] },
        { nombre: "Gato", metodos: [{ visibilidad: "+", texto: "hacer_sonido()" }] },
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
    tituloLargo: "Herencia Multinivel",
    resumen:
      "Perro hereda de Mamifero, que a su vez hereda de Animal. Perro sobrescribe hacer_sonido() y hereda alimentar() sin redefinirlo.",
    uml: {
      nombre: "Animal",
      atributos: [],
      metodos: [{ visibilidad: "+", texto: "hacer_sonido()" }],
      cadena: [
        {
          nombre: "Mamifero",
          atributos: [],
          metodos: [{ visibilidad: "+", texto: "alimentar()" }],
        },
        {
          nombre: "Perro",
          atributos: [],
          metodos: [{ visibilidad: "+", texto: "hacer_sonido()" }],
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
