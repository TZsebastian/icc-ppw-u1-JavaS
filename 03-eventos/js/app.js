'use strict';

/* =========================
   FORMULARIO
========================= */

const formulario = document.querySelector('#formulario');
const inputNombre = document.querySelector('#nombre');
const inputEmail = document.querySelector('#email');
const selectAsunto = document.querySelector('#asunto');
const textMensaje = document.querySelector('#mensaje');
const charCount = document.querySelector('#chars');
const resultado = document.querySelector('#resultado');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


function validarCampo(input, esValido, errorId) {
    const errorMsg = document.getElementById(errorId);

    if (esValido) {
        input.classList.remove('error');
        errorMsg.classList.remove('visible');
    } else {
        input.classList.add('error');
        errorMsg.classList.add('visible');
    }

    return esValido;
}


function validarNombre() {
    return validarCampo(
        inputNombre,
        inputNombre.value.trim().length >= 3,
        'error-nombre'
    );
}

function validarEmail() {
    return validarCampo(
        inputEmail,
        EMAIL_REGEX.test(inputEmail.value.trim()),
        'error-email'
    );
}

function validarAsunto() {
    return validarCampo(
        selectAsunto,
        selectAsunto.value.trim() !== '',
        'error-asunto'
    );
}

function validarMensaje() {
    return validarCampo(
        textMensaje,
        textMensaje.value.trim().length >= 10,
        'error-mensaje'
    );
}

function actualizarContador(e) {

    // 4.4.1: Crear una constante 'longitud' y asignarle e.target.value.length
    const longitud = e.target.value.length;

    // 4.4.2: Actualizar el texto del contador con charCount.textContent = longitud;

    charCount.textContent = longitud;

    // 4.4.3: Cambiar el color del contador:
    charCount.style.color = longitud > 270 ? '#e74c3c' : '#999';
}

// 4.4.4: Conectar el evento 'input' del textMensaje a la función actualizarContador
textMensaje.addEventListener('input', actualizarContador);


// 4.5.1: Valida el nombre cuando el usuario sale del campo
inputNombre.addEventListener('blur', validarNombre);

// 4.5.2: Valida el email al perder el foco
inputEmail.addEventListener('blur', validarEmail);

// 4.5.3: Valida que se haya seleccionado un asunto
selectAsunto.addEventListener('blur', validarAsunto);

// 4.5.4: Valida la longitud del mensaje al salir del textarea
textMensaje.addEventListener('blur', validarMensaje);


function limpiarError(input, errorId) {
    input.classList.remove('error');
    document.getElementById(errorId).classList.remove('visible');
}


// 5.2.1: Limpia el error del nombre mientras el usuario escribe
inputNombre.addEventListener('input', () => limpiarError(inputNombre, 'error-nombre'));

// 5.2.2: Limpia el error del email mientras el usuario escribe
inputEmail.addEventListener('input', () => limpiarError(inputEmail, 'error-email'));

// 5.2.3: Limpia el error del asunto cuando el usuario selecciona una opción
selectAsunto.addEventListener('change', () => limpiarError(selectAsunto, 'error-asunto'));

// 5.2.4: Limpia el error del mensaje mientras el usuario escribe
textMensaje.addEventListener('input', () => limpiarError(textMensaje, 'error-mensaje'));

function mostrarResultado() {
    resultado.innerHTML = '';

    const titulo = document.createElement('strong');
    titulo.textContent = 'Datos recibidos:';

    const pNombre = document.createElement('p');
    pNombre.textContent = `Nombre: ${inputNombre.value.trim()}`;

    const pEmail = document.createElement('p');
    pEmail.textContent = `Email: ${inputEmail.value.trim()}`;

    const pAsunto = document.createElement('p');
    pAsunto.textContent = `Asunto: ${selectAsunto.options[selectAsunto.selectedIndex].text}`;

    const pMensaje = document.createElement('p');
    pMensaje.textContent = `Mensaje: ${textMensaje.value.trim()}`;

    resultado.appendChild(titulo);
    resultado.appendChild(pNombre);
    resultado.appendChild(pEmail);
    resultado.appendChild(pAsunto);
    resultado.appendChild(pMensaje);

    resultado.classList.add('visible');
}

function resetearFormulario() {
    formulario.reset();
    charCount.textContent = '0';
    charCount.style.color = '#999';

    [inputNombre, inputEmail, selectAsunto, textMensaje].forEach((campo) => {
        campo.classList.remove('error');
    });

    document.querySelectorAll('.error-msg').forEach((msg) => {
        msg.classList.remove('visible');
    });
}


formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue al hacer clic en enviar

    // 5.5.1: Ejecutamos todas las validaciones y guardamos si pasaron o no
    const nombreValido = validarNombre();
    const emailValido = validarEmail();
    const asuntoValido = validarAsunto();
    const mensajeValido = validarMensaje();

    // 5.5.2: Si todas las constantes son true, el formulario es perfecto
    if (nombreValido && emailValido && asuntoValido && mensajeValido) {
        mostrarResultado();
        formulario.reset(); // O usa resetearFormulario() si tienes esa función definida
        return; // Salimos de la función porque ya terminamos con éxito
    }

    // 5.5.3: Si llegamos aquí, algo falló. Llevamos al usuario al primer error:
    if (!nombreValido) {
        inputNombre.focus();
        return;
    }

    if (!emailValido) {
        inputEmail.focus();
        return;
    }

    if (!asuntoValido) {
        selectAsunto.focus();
        return;
    }

    // Si ninguno de los anteriores falló, el error está en el mensaje
    textMensaje.focus();
});


/* =========================   ATAJO DE TECLADO ========================= */

// 6.1: Escuchamos cuando se presiona cualquier tecla en todo el documento
document.addEventListener('keydown', (e) => {

    // 6.2: Verificamos si la combinación es Ctrl + Enter
    if (e.ctrlKey && e.key === 'Enter') {

        // 6.3: Si se cumple la condición:
        e.preventDefault(); // Evitamos saltos de línea u otros efectos

        // Usamos requestSubmit() para que se dispare la validación que hicimos antes
        formulario.requestSubmit();
    }
});

/* =========================
   TAREAS CON DELEGACIÓN
========================= */

const inputNuevaTarea = document.querySelector('#nueva-tarea');
const btnAgregar = document.querySelector('#btn-agregar');
const listaTareas = document.querySelector('#lista-tareas');
const contadorTareas = document.querySelector('#contador-tareas');

let tareas = [
    { id: 1, texto: 'Estudiar JavaScript', completada: false },
    { id: 2, texto: 'Hacer la práctica', completada: false },
    { id: 3, texto: 'Subir al repositorio', completada: true }
];


function crearBotonEliminar() {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = 'Eliminar';
    boton.className = 'btn-eliminar';
    boton.dataset.action = 'eliminar';
    return boton;
}

function crearTextoTarea(tarea) {
    const span = document.createElement('span');
    span.textContent = tarea.texto;
    span.className = 'tarea-texto';
    span.dataset.action = 'toggle';
    return span;
}

function crearItemTarea(tarea) {
    const li = document.createElement('li');
    li.className = `tarea-item${tarea.completada ? ' completada' : ''}`;
    li.dataset.id = tarea.id;

    const texto = crearTextoTarea(tarea);
    const botonEliminar = crearBotonEliminar();

    li.appendChild(texto);
    li.appendChild(botonEliminar);

    return li;
}


function actualizarContadorTareas() {
    const pendientes = tareas.filter((tarea) => !tarea.completada).length;
    contadorTareas.textContent = `${pendientes} pendiente(s)`;
}


function renderizarTareas() {
    listaTareas.innerHTML = '';

    // 7.4.1: Manejar el caso cuando no hay tareas
    if (tareas.length === 0) {
        const itemVacio = document.createElement('li');
        itemVacio.className = 'estado-vacio';
        itemVacio.textContent = 'No hay tareas registradas';
        listaTareas.appendChild(itemVacio);
        contadorTareas.textContent = '0 pendiente(s)';
        return;
    }

    //  7.4.2: Renderizar cada tarea usando forEach
    tareas.forEach((tarea) => {
        const item = crearItemTarea(tarea);
        listaTareas.appendChild(item);
    });

    //  7.4.3: Actualizar el contador de pendientes
    actualizarContadorTareas();
}


function agregarTarea() {
    //  7.5.1: Obtener el texto del input y quitarle espacios
    const texto = inputNuevaTarea.value.trim();

    // 7.5.2: Validar que no esté vacío
    if (texto === '') {
        inputNuevaTarea.focus();  // Mejorar UX
        return;  // No hacer nada si está vacío
    }

    //  7.5.3: Agregar la nueva tarea al array usando push()
    tareas.push({
        id: Date.now(),  // ID único basado en timestamp
        texto,           // Shorthand property (equivale a texto: texto)
        completada: false
    });

    //  7.5.4: Limpiar el input
    inputNuevaTarea.value = '';

    //  7.5.5: Re-renderizar la lista para mostrar la nueva tarea
    renderizarTareas();

    //  7.5.6: Volver a hacer focus en el input para mejor UX
    inputNuevaTarea.focus();
}


// 7.6.1: Conectar el botón de agregar
btnAgregar.addEventListener('click', agregarTarea);

//  7.6.2: Permitir agregar con Enter en el input
inputNuevaTarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();  // Evitar comportamiento por defecto
        agregarTarea();
    }
});


listaTareas.addEventListener('click', (e) => {
    const action = e.target.dataset.action;

    //  7.7.1: Verificar si el elemento clickeado tiene data-action
    if (!action) {
        return;  // Si no tiene action, no es un elemento interactivo
    }

    //  7.7.2: Obtener el <li> más cercano que contiene el elemento clickeado
    const item = e.target.closest('li');
    if (!item || !item.dataset.id) {
        return;  // Si no encontramos el <li> o no tiene id, salir
    }

    //  7.7.3: Convertir el id de string a número
    const id = Number(item.dataset.id);

    //  7.7.4: Manejar acción de eliminar
    if (action === 'eliminar') {
        tareas = tareas.filter((tarea) => tarea.id !== id);
        renderizarTareas();
        return;  // Salir después de eliminar
    }

    //  7.7.5: Manejar acción de toggle (marcar como completada/pendiente)
    if (action === 'toggle') {
        const tarea = tareas.find((itemTarea) => itemTarea.id === id);
        if (tarea) {
            tarea.completada = !tarea.completada;  // Invertir el estado
            renderizarTareas();
        }
    }
});

renderizarTareas();