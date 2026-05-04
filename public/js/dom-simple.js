/**
 * ================================================================
 * INTRODUCCIÓN AL DOM - PARA PRINCIPIANTES
 * Proyecto: Watchlist App
 * ================================================================
 * 
 * FASES (Muy simple):
 * 1. ¿QUÉ ES EL DOM?
 * 2. BUSCAR ELEMENTOS
 * 3. CAMBIAR ELEMENTOS
 * 4. CREAR ELEMENTOS
 * 
 * Copia en la consola (F12) y ejecuta:
 * fase1()
 * fase2()
 * fase3()
 * fase4()
 */

// ================================================================
// FASE 1: ¿QUÉ ES EL DOM?
// ================================================================

const fase1 = () => {
  console.clear();
  console.log('╔════════════════════════════════════════╗');
  console.log('║    FASE 1: ¿QUÉ ES EL DOM?             ║');
  console.log('╚════════════════════════════════════════╝\n');

  console.log('El DOM es el HTML que ves en la página.');
  console.log('Lo controlas con JavaScript.\n');

  console.log('Puedes acceder al DOM así:');
  console.log('  document');
  console.log('  document.body');
  console.log('  document.head\n');

  console.log('Ya entiendes qué es el DOM.\n');
}

// ================================================================
// FASE 2: BUSCAR ELEMENTOS
// ================================================================

const fase2 = () => {
  console.clear();
  console.log('╔════════════════════════════════════════╗');
  console.log('║    FASE 2: BUSCAR ELEMENTOS            ║');
  console.log('╚════════════════════════════════════════╝\n');

  console.log('Para trabajar con un elemento, primero lo buscas.\n');

  // Ejemplo 1
  console.log('--- EJEMPLO 1: Buscar el título ---');
  const titulo = document.querySelector('.content-title');
  titulo.textContent = 'Mi watchlist modificado'
  console.log(titulo);

  // Ejemplo 2
  console.log('\n--- EJEMPLO 2: Buscar todos los cards ---');
  const tarjetas = document.querySelectorAll('.watchlist-card');
  console.log(tarjetas);
  // Ejemplo 3: Mostrar los títulos
  console.log('\n--- EJEMPLO 3: Mostrar los títulos ---');
  tarjetas.forEach((card, i) => {
    const nombre = card.querySelector('.card-title');
    console.log(nombre);
  });
}

// ================================================================
// FASE 3: CAMBIAR ELEMENTOS
// ================================================================

const fase3 = () => {
  console.clear();
  console.log('╔════════════════════════════════════════╗');
  console.log('║    FASE 3: CAMBIAR ELEMENTOS           ║');
  console.log('╚════════════════════════════════════════╝\n');

  console.log('Puedes cambiar el texto, colores, estilos, etc.\n');
  const titulo = document.querySelector('.content-title');
  // Cambiar texto
  console.log('--- CAMBIAR TEXTO ---');

  titulo.textContent = "☕ Mis peliculas/Series favoritas";

  // Cambiar color
  console.log('--- CAMBIAR COLOR ---');
  titulo.style.color = 'red';
  // Cambiar tamaño
  console.log('--- CAMBIAR TAMAÑO ---');
  titulo.style.fontSize = '2rem';

}

// ================================================================
// FASE 4: CREAR ELEMENTOS
// ================================================================

const fase4 = () => {
  console.clear();
  console.log('╔════════════════════════════════════════╗');
  console.log('║    FASE 4: CREAR ELEMENTOS             ║');
  console.log('╚════════════════════════════════════════╝\n');

  console.log('Puedes crear elementos nuevos desde cero.\n');

  console.log('--- PASO 1: Crear un elemento ---');
  const nuevaTarjeta = document.createElement('div');
  
  console.log('\n--- PASO 2: Agregarle clase ---');
  nuevaTarjeta.classList.add('watchlist-card');
  
  console.log('\n--- PASO 3: Agregarle contenido ---');
  nuevaTarjeta.setAttribute('data-id', 'Scream');
  
  nuevaTarjeta.innerHTML = `
  <div class="card-poster">
              <i class="bi bi-film"></i>
              <div class="card-overlay">
                <div class="card-title">Scream</div>
                <div class="card-meta">2002</div>
              </div>
            </div>
            <div class="card-body">
              <div class="card-badges">
                <span class="badge-custom badge-movie">Película</span>
                <span class="badge-custom badge-watched">Visto</span>
              </div>
              <div class="card-rating">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <span>4.0</span>
              </div>
              <div class="card-genre">Terror</div>
            </div>`;

  
  const gridContainer = document.querySelector('.watchlist-grid');
  const referencia = document.querySelector('.watchlist-card');
  referencia.before(nuevaTarjeta);

  console.log(nuevaTarjeta);
}

// ================================================================
// FUNCIÓN PARA RESTAURAR
// ================================================================

const restaurar = () => {
  location.reload();
}

// ================================================================
// MENSAJE INICIAL
// ================================================================

console.log(`
╔════════════════════════════════════════════════════════╗
║  BIENVENIDO - INTRODUCCIÓN AL DOM PARA PRINCIPIANTES   ║
╚════════════════════════════════════════════════════════╝

En la consola (F12), escribe una de estas:

  fase1()     ← Qué es el DOM
  fase2()     ← Buscar elementos
  fase3()     ← Cambiar elementos
  fase4()     ← Crear elementos

También puedes:
  restaurar() ← Volver a cargar la página

¡Adelante!
`);
