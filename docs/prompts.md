# Prompts 

## Generar modelo watchlistItem

Construye una arrow function llamada crearWatchlistItem que reciba un objeto como parametro
y desestructure las siguientes propiedades:

- userId
- titulo
- tipo
- genero (opcional, valor por defecto: cadena vacía)
- rating (opcional, valor por defecto: null)
- estado (opcional, valor por defecto: 'pendiente')
- coverUrl (opcional, valor por defecto: cadena vacía)
- notas (opcional, valor por defecto: cadena vacía)

Retorna un nuevo objeto literal que: genere un id  utilizando Date.now(),
incluya todas las propiedades recibidas como argumento ademas que limpie
las propiedades titulo y normalize el atributo email a minusculas ademas agrega las propiedades:

- createdAt con la fecha actual en formato ISO (new Date().toISOString())
- updatedAt con la fecha actual en formato ISO (new Date().toISOString())

## Generar clase WatchlistRepository

En el archivo watchlist.service.js
escribe una clase llamada WatchlistRepository.

Importa jsonDb desde "../db/jsonDb.js".
La clase debe tener una propiedad privada _COLECCION cuyo valor sea la cadena "watchlist".

Implementa los siguientes métodos asíncronos:

- obtenerTodosPorUsuario(userId_)
  - Lee la colección con jsonDb.leer(this._COLECCION).
  - Devuelve un array con todos los elementos cuyo userId coincida.
- buscarPorIdyUsuario(id, userId)
  - Lee la colección y busca un elemento con el id y userId dados.
  - Devuelve el elemento encontrado o null si no existe.
- guardar(item)
  - Lee la colección, agrega el item al final, guarda la colección con jsonDb.guardar(this._COLECCION, datos) y devuelve el item.
- actualizar(id, userId, cambios)
  - Lee la colección y encuentra el índice del elemento con el id y userId.
  - Si no se encuentra, devuelve null.
  - Si se encuentra, actualiza la entrada fusionando el objeto original con cambios y
  - añadiendo un campo updatedAt con la fecha ISO actual (new Date().toISOString()).
  - Guarda la colección y devuelve el objeto actualizado.
- eliminar(id, userId)
  - Lee la colección y encuentra el índice del elemento con el id y userId.
  - Si no se encuentra, devuelve null.
  - Si se encuentra, elimina la entrada con splice, guarda la colección y devuelve true.


## Generar WatchlistService

En el archivo watchlist.service.js
escribe una clase JavaScript llamada WatchlistService que implemente los siguientes métodos,
usando el repositorio watchlistRepository(que ya está importado y expone las funciones mencionadas).

- obtenerTodos(userId = '', filtros)
  - Devuelve una promesa que resuelve con todos los ítems del watch‑list del usuario indicado, filtrados por el objeto filtros.
  - Debe delegar en watchlistRepository.obtenerTodosPorUsuario(userId, filtros).
- obtenerUno({ id, userId })
  - Busca un ítem por su id y el userId.
  - Usa watchlistRepository.buscarPorIdyUsuario(id, userId) y devuelve el resultado.
  - Si no se encuentra, lanza un Error con mensaje "Título no encontrado." y propiedad status = 404.
- crear(userId, data)
  - Crea un nuevo ítem usando la función auxiliar crearWatchlistItem(ya definida en tu código base).
  - Llama a watchlistRepository.guardar(newItem) y devuelve el resultado.
- actualizar(id, userId, cambios)
  - Actualiza un ítem existente llamando a watchlistRepository.actualizar(id, userId, cambios).
  - Si el ítem no existe, lanza el mismo error que obtenerUno.
  - Devuelve el ítem actualizado.
- eliminar(id, userId)
  - Elimina un ítem con watchlistRepository.eliminar(id, userId).
  - Si el ítem no se encuentra, lanza el error descrito antes.
  - Devuelve el ítem eliminado.

- Requisitos adicionales
  - Todos los métodos deben ser async y retornar promesas.
  - No incluyas lógica adicional; solo delega al repositorio y maneja errores.
  - Agrega documentacion en formato JSDoc para clase y sus metodos


## Generar WatchlistController
En el archivo watchlist.controller.js
escribe un módulo de controladores dentro del archivo watchlist.controller.js
Express (Node.js) para gestionar una “watch‑list” de películas/series.

Requisitos:

Implementa cinco funciones asíncronas:
- obtenerTodos(req = request, res = response)
- obtenerUno(req = request, res = response)
- crear(req = request, res = response)
- actualizar(req = request, res = response)
- eliminar(req = request, res = response)

Cada función debe envolver su lógica en un bloque try…catch.

Dentro de try:
Extrae los parámetros necesarios del objeto req (query, headers, params, body, user, etc.).
el paramtro userId se debe de obtener de los headers a traves de la llave x-token
Llama al método correspondiente de watchlistService (p.ej. watchlistService.obtenerTodos(id, filtros)).

Envía una respuesta JSON con res.status().json():
obtenerTodos: status 200, cuerpo { count: items.length, data: items }.
obtenerUno: status 200, cuerpo { data: item }.
crear: status 201, cuerpo { message: 'Título agregado a la watchlist.', data: item }.
actualizar: status 200, cuerpo { message: 'Título actualizado correctamente.', data: item }.
eliminar: status 200, cuerpo { message: 'Título eliminado correctamente.' }.

En el bloque catch envía una respuesta con:
Status: error.status si existe, de lo contrario 500.
Cuerpo: { mensaje: 'Ocurrio un error en la solicitud', error: error.message }.
Al final del módulo exporta todas las funciones:
export { obtenerTodos, obtenerUno, crear, actualizar, eliminar };

Agrega documentacion en formato JSDoc a cada funcion

## Generar Watchlist router

En el archivo watchlist.api.route.js

- Importe Router de "express" y los controladores actualizar, crear, eliminar, obtenerTodos, obtenerUno desde "../controllers/watchlist.controller.js".

Cree una instancia de router con Router().

Defina las siguientes rutas:
- GET '/' → obtenerTodos
- GET '/:id' → obtenerUno
- POST '/' → crear
- PUT '/:id' → actualizar
- DELETE '/:id' → eliminar

Exporte el router como export { router }.
