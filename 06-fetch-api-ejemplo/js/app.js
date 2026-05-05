'use strict';

/* =========================
   1. SELECTORES DEL DOM
========================= */

// Botón que dispara la petición
const btn = document.querySelector('#btn-cargar');

// Contenedor donde se van a renderizar las cards
const contenedor = document.querySelector('#contenedor');

// Elemento visual de carga
const loading = document.querySelector('#loading');

// Endpoint (API pública de Simpsons)
const URL = 'https://thesimpsonsapi.com/api/characters';



/* =========================
   2. EVENTO
========================= */

// Escuchamos el evento "click" del botón
btn.addEventListener('click', cargarDatos);



/* =========================
   3. FETCH (GET)
========================= */

async function cargarDatos() {
  try {
    loading.classList.remove('oculto');
    contenedor.innerHTML = '';

    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    renderizar(data.results);

  } catch (error) {
    mostrarError(error.message);
  } finally {
    loading.classList.add('oculto');
  }
}



/* =========================
   4. RENDERIZADO
========================= */

function renderizar(lista) {

  lista.forEach(item => {

    // Card
    const card = document.createElement('div');
    card.className = 'card';

    // Imagen
    const bloqueImagen = document.createElement('div');
    bloqueImagen.className = 'card-imagen';

    const img = document.createElement('img');
    img.src = `https://cdn.thesimpsonsapi.com/500${item.portrait_path}`;
    img.alt = item.name;
    img.width = 100;

    bloqueImagen.appendChild(img);

    // Texto
    const bloqueTexto = document.createElement('div');
    bloqueTexto.className = 'card-contenido';

    const nombre = document.createElement('h3');
    nombre.textContent = item.name;

    const frasesContainer = document.createElement('div');
    frasesContainer.className = 'card-frases';


    if (Array.isArray(item.phrases) && item.phrases.length > 0) {
      item.phrases.slice(0, 5).forEach(frase => {
        const p = document.createElement('p');
        p.textContent = frase;
        frasesContainer.appendChild(p);
      });
    } else {
      const p = document.createElement('p');
      p.textContent = "Sin frases";
      frasesContainer.appendChild(p);
    }

    // Armar card
    bloqueTexto.appendChild(nombre);
    bloqueTexto.appendChild(frasesContainer);

    card.appendChild(bloqueImagen);
    card.appendChild(bloqueTexto);

    contenedor.appendChild(card);
  });
}



/* =========================
   5. MANEJO DE ERRORES
========================= */

function mostrarError(mensaje) {
  const p = document.createElement('p');
  p.textContent = mensaje;
  p.style.color = 'red';

  contenedor.appendChild(p);
}