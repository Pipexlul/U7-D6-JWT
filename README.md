# Unidad 7 - Desafio 6: JWT

## Instrucciones

- Instalar dependencias:
  `npm i`

- Hacer una copia del archivo `.env.example` y nombrarla `.env`

- Editar el archivo `.env` y llenar los campos segun corresponda (En la mayoria de los casos, solo hay que llenar el campo `DB_PASSWORD` con su password de superuser)

- Correr el proyecto con el comando:
  `npm run start` <br/>
  <b>Esto hara que la base de datos se vuelva a crear cada vez que se corra el comando. Recomiendo usar esta comando por lo menos 1 vez para crear la base de datos</b>

- Opcional: Correr el proyecto con el siguiente comando para evitar volver a recrear la base de datos:
  `npm run start:skip`

- Llamar los endpoints <br/>
  `POST /usuarios` <br/>
  `POST /login` <br/>
  `GET /usuarios` <br/>

## Notas

- En el archivo .env, se puede modificar la cantidad de rondas para generar el salt de las claves.
- Si quieres generar un secret de JWT distinto al que se usa por defecto en este proyecto:
  - Recuerda hacer una copia de `.env.example` y llama a la copia `.env` la primera vez que corras este proyecto.
  - Corre el script `npm run genSecret`.
  - En la consola aparecerá un secret pseudo-random para llenar en el archivo `.env`, en la key `JWT_SECRET`.
  - Listo!
