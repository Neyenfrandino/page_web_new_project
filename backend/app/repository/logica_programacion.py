
# Si el número es múltiplo de 3, imprime la palabra "FIZZ" en lugar del número.

# Si el número es múltiplo de 5, imprime la palabra "BAS" en lugar del número.

# Si el número es múltiplo de 3 y 5 a la vez, imprime la palabra "FISBAS".

# Si no cumple ninguna de las condiciones anteriores, imprime el número tal cual.


fizz_bus = 0

for i in range(1, 101):

    index = i.index(30)  # Obtiene su posición
    i[index] = 'FIZZ'    
    
    # if i % 3 == 0:
    #     fizz_bus[i] = 'FIZZ'

    #     if i % 5 == 0 :
    #         fizz_bus.append('FIZZBAS') 
    
    # fizz_bus.append(i)
print(fizz_bus)

   