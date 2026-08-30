# Ejercicio 1 — Implementación de Abstracción de Datos

## Enunciado

Implementar un tipo de dato abstracto que oculte los detalles de implementación del saldo de
una cuenta bancaria, exponiendo únicamente operaciones públicas para depositar, retirar y
consultar el saldo.

## Diseño

`CuentaBancaria` (`cuenta_bancaria.py`) guarda el saldo en `self.__saldo`. El doble guion bajo
activa el *name mangling* de Python (el atributo pasa a llamarse `_CuentaBancaria__saldo`),
que es la forma real de restringir el acceso desde fuera de la clase — un solo guion bajo es
solo una convención de lectura, no una restricción. Toda interacción externa pasa por tres
métodos públicos:

- `depositar(monto)`: valida que el monto sea positivo antes de sumarlo al saldo.
- `retirar(monto)`: valida que el monto sea positivo y que exista saldo suficiente; si no hay
  fondos suficientes lanza `SaldoInsuficienteError`.
- `obtener_saldo()`: devuelve el saldo actual sin exponer el atributo subyacente.

Montos inválidos (`None`, cero o negativos) lanzan `ValueError`.

## Cómo ejecutar

```bash
pip install -r requirements-dev.txt

# Ejecutar el demo de consola
python main.py

# Ejecutar las pruebas
pytest
```
