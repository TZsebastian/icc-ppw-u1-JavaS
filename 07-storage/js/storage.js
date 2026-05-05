'use strict';

/* =========================
   SERVICIO DE STORAGE
========================= */

const TareaStorage = {
  CLAVE: 'tareas_lista',

  /**
   * Obtener todas las tareas desde localStorage
   * @returns {Array} Array de tareas
   */
  getAll() {
    try {
      const datos = localStorage.getItem(this.CLAVE);
      if (!datos) {
        return [];
      }
      return JSON.parse(datos);
    } catch (error) {
      console.error('Error al leer tareas:', error);
      return [];
    }
  },

  /**
   * Guardar todas las tareas en localStorage
   * @param {Array} tareas - Array de tareas
   */
  guardar(tareas) {
    try {
      localStorage.setItem(this.CLAVE, JSON.stringify(tareas));
    } catch (error) {
      console.error('Error al guardar tareas:', error);
    }
  },

  /**
   * Crear una nueva tarea
   * @param {string} texto - Texto de la tarea
   * @returns {Object} Tarea creada
   */
  crear(texto) {
    // 1. Obtener tareas actuales
    const tareas = this.getAll();

    // 2. Crear nueva tarea
    const nueva = {
      id: Date.now(),
      texto: texto.trim(),
      completada: false
    };

    // 3. Agregar al array
    tareas.push(nueva);

    // 4. Guardar
    this.guardar(tareas);

    // 5. Retornar
    return nueva;
  },

  /**
   * Alternar estado completada/pendiente
   * @param {number} id - ID de la tarea
   */
  toggleCompletada(id) {
    // 1. Obtener tareas
    const tareas = this.getAll();

    // 2. Buscar tarea
    const tarea = tareas.find(t => t.id === id);

    // 3. Invertir estado
    if (tarea) {
      tarea.completada = !tarea.completada;
    }

    // 4. Guardar cambios
    this.guardar(tareas);
  },

  /**
   * Eliminar una tarea
   * @param {number} id - ID de la tarea
   */
  eliminar(id) {
    // 1. Obtener tareas
    const tareas = this.getAll();

    // 2. Filtrar
    const filtradas = tareas.filter(t => t.id !== id);

    // 3. Guardar
    this.guardar(filtradas);
  },

  /**
   * Eliminar todas las tareas
   */
  limpiarTodo() {
    localStorage.removeItem(this.CLAVE);
  }
};


/* =========================
   SERVICIO DE TEMA
========================= */

const TemaStorage = {
  CLAVE: 'tema_app',

  getTema() {
    return localStorage.getItem(this.CLAVE) || 'claro';
  },

  setTema(tema) {
    localStorage.setItem(this.CLAVE, tema);
  }
};