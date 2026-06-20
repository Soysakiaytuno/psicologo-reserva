export function cargarCita(cita, index) {
    if (!cita) {
        `<div class="card-date"></div><div class="card-title">Datos no disponibles</div>`;
    }
    const titleObj = cita.title || 'Consulta sin titulo';
    const fechaObj = new Date(cita.start_time);
    const fechaLegible = fechaObj.toLocaleString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    const card = `<div class="card-date">📅 ${fechaLegible}</div><div class="card-title">${titleObj}</div>`;
    return card;
}

export function ordenarCitas(citas) {
    if (!citas) return [];
    const citasOrdenadas = [...citas].sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
    return citasOrdenadas;
}

