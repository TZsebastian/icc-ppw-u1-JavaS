'use strict';

const estudiante = {
    nombre: 'Sebastián Zurita',
    carrera: 'Ingeniería de Sistemas',
    semestre: 5
};

let elementos = [
    { id: 1, titulo: 'Proyecto Web', descripcion: 'Terminar práctica JS', categoria: 'Estudio', prioridad: 'Alta', activo: true },
    { id: 2, titulo: 'Comprar comida', descripcion: 'Ir al supermercado', categoria: 'Personal', prioridad: 'Media', activo: true },
    { id: 3, titulo: 'Reunión', descripcion: 'Equipo de trabajo', categoria: 'Trabajo', prioridad: 'Alta', activo: false },
    { id: 4, titulo: 'Leer libro', descripcion: 'Capítulo de JS', categoria: 'Estudio', prioridad: 'Baja', activo: true },
    { id: 5, titulo: 'Ejercicio', descripcion: 'Salir a correr 5km', categoria: 'Personal', prioridad: 'Media', activo: false },
    { id: 6, titulo: 'Deploy', descripcion: 'Subir proyecto a GitHub', categoria: 'Trabajo', prioridad: 'Alta', activo: true },
    { id: 7, titulo: 'Descanso', descripcion: 'Ir al cine', categoria: 'Personal', prioridad: 'Baja', activo: true }
];

function mostrarInfoEstudiante() {
    document.getElementById('estudiante-nombre').textContent = estudiante.nombre;
    document.getElementById('estudiante-carrera').textContent = estudiante.carrera;
    document.getElementById('estudiante-semestre').textContent = `${estudiante.semestre}° semestre`;
}

function renderizarLista(datos) {
    const contenedor = document.getElementById('contenedor-lista');
    contenedor.innerHTML = ''; 
    
    datos.forEach(el => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <h3>${el.titulo}</h3>
            <p>${el.descripcion}</p>
            <div class="card-footer">
                <div class="badges">
                    <span class="badge badge-categoria">${el.categoria}</span>
                    <span class="badge prioridad-${el.prioridad.toLowerCase()}">${el.prioridad}</span>
                    <span class="badge estado-${el.activo ? 'activo' : 'inactivo'}">${el.activo ? 'Activo' : 'Inactivo'}</span>
                </div>
                <button class="btn-eliminar" onclick="eliminarElemento(${el.id})">Eliminar</button>
            </div>
        `;
        contenedor.appendChild(card);
    });
    actualizarEstadisticas();
}

function eliminarElemento(id) {
    elementos = elementos.filter(el => el.id !== id);
    renderizarLista(elementos);
}

function actualizarEstadisticas() {
    document.getElementById('total-elementos').textContent = elementos.length;
    document.getElementById('elementos-activos').textContent = elementos.filter(el => el.activo).length;
}

function inicializarFiltros() {
    const botones = document.querySelectorAll('.btn-filtro');
    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            botones.forEach(b => b.classList.remove('btn-filtro-activo'));
            btn.classList.add('btn-filtro-activo');
            
            const cat = btn.dataset.categoria;
            const filtrados = cat === 'todas' ? elementos : elementos.filter(e => e.categoria === cat);
            renderizarLista(filtrados);
        });
    });
}

// Inicialización
mostrarInfoEstudiante();
renderizarLista(elementos);
inicializarFiltros();