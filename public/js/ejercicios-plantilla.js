/**
 * ================================================================
 * EJERCICIOS DE DOM - PLANTILLA PARA COMPLETAR
 * ================================================================
 * 
 * TEMAS A APRENDER:
 * 1. ¿Qué es el DOM?
 * 2. Acceder y Recorrer nodos del DOM
 * 3. Modificar el DOM (atributos, contenido, estilos)
 * 4. Creación de nodos
 * 5. Inserción avanzada (insertAdjacentHTML)
 * 6. Eliminar nodos
 * 
 * INSTRUCCIONES:
 * 1. Lee la descripción de cada ejercicio
 * 2. Completa el código donde dice "// TU CÓDIGO AQUÍ"
 * 3. En consola (F12), ejecuta: tema1_ejercicio1(), etc.
 * 4. ¡Verifica que funcione!
 * 
 * Si no sabes qué hacer, mira "2-ejercicios-completo.js"
 */

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║  EJERCICIOS DE DOM - PLANTILLA PARA COMPLETAR                 ║');
console.log('║  (6 TEMAS, 30 EJERCICIOS)                                     ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

// ================================================================
// TEMA 1: ¿QUÉ ES EL DOM?
// ================================================================

/**
 * TEMA 1 - EJERCICIO 1: Acceso básico al DOM
 * 
 * Objetivo: Entender que el DOM es accesible desde JavaScript
 * 
 * Pasos:
 * 1. Muestra el documento completo: console.log(document)
 * 2. Muestra el body: console.log(document.body)
 * 3. Muestra el head: console.log(document.head)
 */
const tema1_ejercicio1 = () => {
  console.log('\n--- TEMA 1: Acceso básico al DOM ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 1 - EJERCICIO 2: Explorar propiedades
 * 
 * Objetivo: Leer propiedades del DOM
 * 
 * Pasos:
 * 1. Obtén el body en una variable
 * 2. Muestra: body.className
 * 3. Muestra: body.children.length
 * 4. Muestra: body.id
 */
const tema1_ejercicio2 = () => {
  console.log('\n--- TEMA 1: Explorar propiedades del DOM ---\n');

  // TU CÓDIGO AQUÍ

};

// ================================================================
// TEMA 2: ACCEDER Y RECORRER NODOS
// ================================================================

/**
 * TEMA 2 - EJERCICIO 1: querySelector
 * 
 * Objetivo: Buscar UN elemento específico
 * 
 * Pasos:
 * 1. Usa querySelector para buscar '.content-title'
 * 2. Guarda en variable 'titulo'
 * 3. Muestra: titulo
 * 4. Muestra: titulo.textContent
 */
const tema2_ejercicio1 = () => {
  console.log('\n--- TEMA 2: querySelector ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 2 - EJERCICIO 2: querySelectorAll
 * 
 * Objetivo: Buscar TODOS los elementos
 * 
 * Pasos:
 * 1. Usa querySelectorAll para buscar '.watchlist-card'
 * 2. Guarda en variable 'cards'
 * 3. Muestra: 'Total de cards:', cards.length
 * 4. Muestra: cards
 */
const tema2_ejercicio2 = () => {
  console.log('\n--- TEMA 2: querySelectorAll ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 2 - EJERCICIO 3: forEach para recorrer
 * 
 * Objetivo: Hacer algo con CADA elemento
 * 
 * Pasos:
 * 1. Obtén todos los cards
 * 2. Usa forEach((card, i) => { })
 * 3. Para cada card, busca '.card-title' y '.card-genre'
 * 4. Muestra: '1. Inception (Ciencia Ficción)'
 */
const tema2_ejercicio3 = () => {
  console.log('\n--- TEMA 2: forEach ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 2 - EJERCICIO 4: Navegar la estructura
 * 
 * Objetivo: Moverte por el árbol del DOM
 * 
 * Pasos:
 * 1. Obtén el primer card
 * 2. Muestra: card.parentElement (el padre)
 * 3. Muestra: card.firstElementChild (primer hijo)
 * 4. Muestra: card.nextElementSibling (hermano siguiente)
 */
const tema2_ejercicio4 = () => {
  console.log('\n--- TEMA 2: Navegar la estructura ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 2 - EJERCICIO 5: Leer atributos
 * 
 * Objetivo: Acceder a atributos de elementos
 * 
 * Pasos:
 * 1. Obtén el grid (querySelector '.watchlist-grid')
 * 2. Muestra: grid.id
 * 3. Muestra: grid.className
 * 4. Muestra: grid.getAttribute('class')
 */
const tema2_ejercicio5 = () => {
  console.log('\n--- TEMA 2: Leer atributos ---\n');

  // TU CÓDIGO AQUÍ

};

// ================================================================
// TEMA 3: MODIFICAR EL DOM
// ================================================================

/**
 * TEMA 3 - EJERCICIO 1: Cambiar texto (textContent)
 * 
 * Objetivo: Modificar el contenido de texto
 * 
 * Pasos:
 * 1. Obtén el título (querySelector '.content-title')
 * 2. Muestra el texto ANTES: console.log(titulo.textContent)
 * 3. Cambia el texto a: '🎬 Mi Watchlist Especial'
 * 4. Muestra el texto DESPUÉS
 */
const tema3_ejercicio1 = () => {
  console.log('\n--- TEMA 3: Cambiar texto ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 3 - EJERCICIO 2: Cambiar color (style)
 * 
 * Objetivo: Modificar estilos
 * 
 * Pasos:
 * 1. Obtén el título
 * 2. Muestra el color ANTES
 * 3. Cambia el color a '#ff6b6b' (rojo)
 * 4. Muestra el color DESPUÉS
 */
const tema3_ejercicio2 = () => {
  console.log('\n--- TEMA 3: Cambiar color ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 3 - EJERCICIO 3: Cambiar múltiples estilos
 * 
 * Objetivo: Cambiar varios estilos a la vez
 * 
 * Pasos:
 * 1. Obtén el título
 * 2. Cambia: fontSize = '2.5rem'
 * 3. Cambia: fontWeight = 'bold'
 * 4. Cambia: textShadow = '0 2px 4px rgba(0,0,0,0.2)'
 * 5. Muestra: '✓ Cambié 3 estilos'
 */
const tema3_ejercicio3 = () => {
  console.log('\n--- TEMA 3: Múltiples estilos ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 3 - EJERCICIO 4: Cambiar atributos (setAttribute)
 * 
 * Objetivo: Modificar atributos del elemento
 * 
 * Pasos:
 * 1. Obtén el grid
 * 2. Usa setAttribute('data-version', '1.0')
 * 3. Usa setAttribute('data-user', 'MiNombre')
 * 4. Muestra con getAttribute lo que setaste
 */
const tema3_ejercicio4 = () => {
  console.log('\n--- TEMA 3: Cambiar atributos ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 3 - EJERCICIO 5: Cambiar clases (classList)
 * 
 * Objetivo: Agregar/quitar clases CSS
 * 
 * Pasos:
 * 1. Obtén el título
 * 2. Usa: titulo.classList.add('highlight')
 * 3. Verifica: titulo.classList.contains('highlight')
 * 4. Usa: titulo.classList.remove('highlight')
 * 5. Verifica nuevamente que no tiene la clase
 */
const tema3_ejercicio5 = () => {
  console.log('\n--- TEMA 3: Cambiar clases ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 3 - EJERCICIO 6: Cambiar HTML (innerHTML)
 * 
 * Objetivo: Modificar el HTML adentro de un elemento
 * 
 * Pasos:
 * 1. Obtén el primer card
 * 2. Muestra el innerHTML ANTES (primeras 100 caracteres)
 * 3. Cambia el innerHTML a:
 *    <div class="card-body">
 *      <div class="card-title">PELÍCULA ESPECIAL</div>
 *      <div class="card-genre">Importante</div>
 *    </div>
 * 4. Muestra que cambió
 */
const tema3_ejercicio6 = () => {
  console.log('\n--- TEMA 3: Cambiar innerHTML ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 3 - EJERCICIO 7: Cambiar estilo de múltiples elementos
 * 
 * Objetivo: Modificar todos los elementos de una vez
 * 
 * Pasos:
 * 1. Obtén todos los '.card-title'
 * 2. Usa forEach para recorrer cada uno
 * 3. Para cada uno, cambia:
 *    - style.color = '#6c8eff' (azul)
 *    - style.fontWeight = 'bold'
 * 4. Muestra: 'Cambié X títulos'
 */
const tema3_ejercicio7 = () => {
  console.log('\n--- TEMA 3: Cambiar múltiples elementos ---\n');

  // TU CÓDIGO AQUÍ

};

// ================================================================
// TEMA 4: CREACIÓN DE NODOS
// ================================================================

/**
 * TEMA 4 - EJERCICIO 1: Crear un elemento
 * 
 * Objetivo: Crear un elemento HTML nuevo
 * 
 * Pasos:
 * 1. Usa document.createElement('div')
 * 2. Guarda en variable 'nuevoDiv'
 * 3. Muestra: nuevoDiv
 * 4. Muestra: nuevoDiv.tagName
 */
const tema4_ejercicio1 = () => {
  console.log('\n--- TEMA 4: Crear un elemento ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 4 - EJERCICIO 2: Configurar el elemento
 * 
 * Objetivo: Agregar propiedades al elemento creado
 * 
 * Pasos:
 * 1. Crea un div
 * 2. Agrega clase: elemento.className = 'watchlist-card'
 * 3. Agrega ID: elemento.id = 'card-nuevo'
 * 4. Agrega texto: elemento.textContent = 'Mi película'
 * 5. Muestra el elemento
 */
const tema4_ejercicio2 = () => {
  console.log('\n--- TEMA 4: Configurar elemento ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 4 - EJERCICIO 3: Crear card con HTML
 * 
 * Objetivo: Crear un elemento con estructura HTML completa
 * 
 * Pasos:
 * 1. Crea un div
 * 2. Dale clase 'watchlist-card'
 * 3. Usa innerHTML para agregar:
 *    <div class="card-body">
 *      <div class="card-title">Avatar 2</div>
 *      <div class="card-genre">Ciencia Ficción</div>
 *    </div>
 * 4. Muestra el card creado
 */
const tema4_ejercicio3 = () => {
  console.log('\n--- TEMA 4: Card con HTML ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 4 - EJERCICIO 4: Crear y agregar a la página
 * 
 * Objetivo: Crear un elemento y agregarlo al DOM
 * 
 * Pasos:
 * 1. Crea un card (como en ejercicio 3)
 * 2. Busca el grid: document.querySelector('.watchlist-grid')
 * 3. Agrega el card: grid.appendChild(nuevoCard)
 * 4. Muestra: 'Total de cards:', grid.children.length
 * 5. ¡Verifica que aparece en la página!
 */
const tema4_ejercicio4 = () => {
  console.log('\n--- TEMA 4: Crear y agregar ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 4 - EJERCICIO 5: Función reutilizable
 * 
 * Objetivo: Crear una función para generar cards
 * 
 * Pasos:
 * 1. Crea una función: function crearCard(titulo, genero) { }
 * 2. Dentro crea el div, clase, innerHTML con parámetros
 * 3. Retorna el card: return card
 * 4. USA LA FUNCIÓN para crear 2 cards:
 *    crearCard('Oppenheimer', 'Drama')
 *    crearCard('Avatar 3', 'Ciencia Ficción')
 * 5. Agrega ambos al grid
 */
const tema4_ejercicio5 = () => {
  console.log('\n--- TEMA 4: Función reutilizable ---\n');

  // TU CÓDIGO AQUÍ

};

// ================================================================
// TEMA 5: INSERCIÓN AVANZADA
// ================================================================

/**
 * TEMA 5 - EJERCICIO 1: appendChild (agregar al final)
 * 
 * Objetivo: Agregar un elemento al final del contenedor
 * 
 * Pasos:
 * 1. Crea un card nuevo
 * 2. Obtén el grid
 * 3. Muestra: grid.children.length ANTES
 * 4. Usa: grid.appendChild(card)
 * 5. Muestra: grid.children.length DESPUÉS
 * 6. El card debe estar al FINAL
 */
const tema5_ejercicio1 = () => {
  console.log('\n--- TEMA 5: appendChild ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 5 - EJERCICIO 2: insertBefore (agregar antes)
 * 
 * Objetivo: Agregar un elemento ANTES de otro
 * 
 * Pasos:
 * 1. Crea un card nuevo (con texto "DESTACADO")
 * 2. Obtén el grid
 * 3. Usa: grid.insertBefore(card, grid.firstElementChild)
 * 4. El card debe estar al PRINCIPIO
 * 5. Muestra: 'Total de cards:', grid.children.length
 */
const tema5_ejercicio2 = () => {
  console.log('\n--- TEMA 5: insertBefore ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 5 - EJERCICIO 3: insertAdjacentHTML básico
 * 
 * Objetivo: Insertar HTML cerca de un elemento
 * 
 * Pasos:
 * 1. Obtén el grid
 * 2. Usa insertAdjacentHTML:
 *    grid.insertAdjacentHTML('afterend', '<div style="...">Texto nuevo</div>')
 * 3. Esto inserta HTML DESPUÉS del grid
 * 4. Verifica en la página que aparece
 */
const tema5_ejercicio3 = () => {
  console.log('\n--- TEMA 5: insertAdjacentHTML básico ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 5 - EJERCICIO 4: insertAdjacentHTML posiciones
 * 
 * Objetivo: Usar las 4 posiciones de insertAdjacentHTML
 * 
 * POSICIONES:
 * - 'beforebegin': ANTES del elemento
 * - 'afterbegin': DENTRO, al principio
 * - 'beforeend': DENTRO, al final
 * - 'afterend': DESPUÉS del elemento
 * 
 * Pasos:
 * 1. Obtén el título
 * 2. Usa insertAdjacentHTML('beforebegin', '<p>Antes</p>')
 * 3. Usa insertAdjacentHTML('afterend', '<p>Después</p>')
 * 4. Verifica que aparecen antes y después del título
 */
const tema5_ejercicio4 = () => {
  console.log('\n--- TEMA 5: insertAdjacentHTML posiciones ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 5 - EJERCICIO 5: Diferencias entre métodos
 * 
 * Objetivo: Entender cuándo usar cada método
 * 
 * Pasos:
 * 1. Muestra las diferencias:
 *    - appendChild: 1 elemento, al final
 *    - insertBefore: 1 elemento, posición específica
 *    - insertAdjacentHTML: HTML text, cualquier posición
 * 2. Cuando usar cada uno
 */
const tema5_ejercicio5 = () => {
  console.log('\n--- TEMA 5: Diferencias ---\n');

  console.log('appendChild: Agrega UN ELEMENTO al final');
  console.log('insertBefore: Agrega UN ELEMENTO antes de otro');
  console.log('insertAdjacentHTML: Inserta HTML TEXT cerca');
  console.log('');
  console.log('✓ Cada uno tiene su uso');
};

// ================================================================
// TEMA 6: ELIMINAR NODOS
// ================================================================

/**
 * TEMA 6 - EJERCICIO 1: remove()
 * 
 * Objetivo: Eliminar un elemento
 * 
 * Pasos:
 * 1. Obtén el grid
 * 2. Muestra: grid.children.length ANTES
 * 3. Obtén el último card: grid.lastElementChild
 * 4. Usa: ultimoCard.remove()
 * 5. Muestra: grid.children.length DESPUÉS
 * 6. El card debe desaparecer
 */
const tema6_ejercicio1 = () => {
  console.log('\n--- TEMA 6: remove() ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 6 - EJERCICIO 2: removeChild()
 * 
 * Objetivo: Eliminar un hijo de un contenedor
 * 
 * Pasos:
 * 1. Obtén el grid
 * 2. Muestra: grid.children.length ANTES
 * 3. Obtén el primer card: grid.firstElementChild
 * 4. Usa: grid.removeChild(primerCard)
 * 5. Muestra: grid.children.length DESPUÉS
 */
const tema6_ejercicio2 = () => {
  console.log('\n--- TEMA 6: removeChild() ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 6 - EJERCICIO 3: Eliminar múltiples
 * 
 * Objetivo: Eliminar TODOS los elementos
 * 
 * CUIDADO: Si usas querySelectorAll y luego remove en forEach,
 * la lista cambia. Por eso hacemos Array.from() primero.
 * 
 * Pasos:
 * 1. Obtén el grid
 * 2. Obtén los cards: grid.querySelectorAll('.watchlist-card')
 * 3. COPIA A ARRAY: Array.from(cards)
 * 4. Usa forEach((card) => card.remove())
 * 5. Muestra: grid.children.length (debe ser 0)
 */
const tema6_ejercicio3 = () => {
  console.log('\n--- TEMA 6: Eliminar múltiples ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 6 - EJERCICIO 4: Eliminar específico
 * 
 * Objetivo: Eliminar un elemento específico
 * 
 * Pasos:
 * 1. Obtén el grid
 * 2. Obtén todos los cards: grid.querySelectorAll('.watchlist-card')
 * 3. Si hay más de 2 cards:
 *    - Elimina cards[2] (el tercero)
 *    - Muestra: 'Eliminé el card número 3'
 */
const tema6_ejercicio4 = () => {
  console.log('\n--- TEMA 6: Eliminar específico ---\n');

  // TU CÓDIGO AQUÍ

};

/**
 * TEMA 6 - EJERCICIO 5: Deshacer
 * 
 * Objetivo: Entender cómo deshacer eliminaciones
 * 
 * Pasos:
 * 1. Muestra en consola:
 *    'Para deshacer: actualiza la página (F5)'
 * 2. Explica:
 *    'En una app real, guardas en localStorage o API'
 */
const tema6_ejercicio5 = () => {
  console.log('\n--- TEMA 6: Deshacer ---\n');
  console.log('Para deshacer: actualiza la página (F5)');
  console.log('En una app real: localStorage o API');
};

// ================================================================
// INSTRUCCIONES FINALES
// ================================================================

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║  CÓMO COMPLETAR ESTOS EJERCICIOS                              ║
╚═══════════════════════════════════════════════════════════════╝

PASO 1: Lee la descripción del ejercicio
        (Está en los comentarios /* ... */)

PASO 2: Completa el código donde dice "// TU CÓDIGO AQUÍ"

PASO 3: En la consola (F12), ejecuta:
        tema1_ejercicio1()
        tema2_ejercicio3()
        etc...

PASO 4: Verifica:
        ✓ ¿Aparece mensaje en consola?
        ✓ ¿Cambió algo en la página?
        ✓ ¿El resultado es el esperado?

SI NO FUNCIONA:
  • Actualiza la página (F5)
  • Revisa que escribiste bien
  • Mira "2-ejercicios-completo.js" para ver cómo se hace
  • ¡Pregunta!

ESTRUCTURA:
✓ 30 ejercicios en total
✓ 6 temas diferentes
✓ De fácil a más difícil
✓ Cada uno explica qué hacer

CONSEJOS:
✓ Haz uno a la vez
✓ No saltes ejercicios
✓ Lee bien qué pide
✓ Si ves error, LEE QUÉ DICE
✓ Las PISTAS te ayudan

¡ADELANTE!
`);