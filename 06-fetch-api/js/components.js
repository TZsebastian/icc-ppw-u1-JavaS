'use strict';

/* =========================
   COMPONENTES
========================= */

/**
 * Componente para renderizar una tarjeta de post
 * Construye el elemento usando la API del DOM (createElement)
 * @param {object} post - Objeto con los datos del post
 * @returns {HTMLElement} - Elemento article del DOM
 */
function PostCard(post) {
  // Crear el contenedor principal
  const article = document.createElement('article');
  article.className = 'post-card fade-in';
  article.dataset.id = post.id;

  // Crear el header
  const header = document.createElement('div');
  header.className = 'post-card-header';

  const title = document.createElement('h3');
  title.className = 'post-card-title';
  title.textContent = post.title;

  const badge = document.createElement('span');
  badge.className = 'post-card-id';
  badge.textContent = `#${post.id}`;

  header.appendChild(title);
  header.appendChild(badge);

  // Crear el body
  const body = document.createElement('p');
  body.className = 'post-card-body';
  body.textContent = post.body;

  // Crear el footer con botones
  const footer = document.createElement('div');
  footer.className = 'post-card-footer';

  const btnEditar = document.createElement('button');
  btnEditar.className = 'btn-editar';
  btnEditar.textContent = 'Editar';
  btnEditar.dataset.action = 'editar';
  btnEditar.dataset.id = post.id;

  const btnEliminar = document.createElement('button');
  btnEliminar.className = 'btn-eliminar';
  btnEliminar.textContent = 'Eliminar';
  btnEliminar.dataset.action = 'eliminar';
  btnEliminar.dataset.id = post.id;

  footer.appendChild(btnEditar);
  footer.appendChild(btnEliminar);

  // Ensamblar el article
  article.appendChild(header);
  article.appendChild(body);
  article.appendChild(footer);

  return article;
}