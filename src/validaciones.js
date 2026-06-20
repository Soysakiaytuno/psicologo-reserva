
// --- LÓGICA DE NEGOCIO (EXPORTADA PARA PRUEBAS - HU2) ---
export function hayChoqueDeHorarios(nuevoInicio, nuevoFin, citasExistentes) {
    return (citasExistentes || []).some(cita => {
        const existingStart = new Date(cita.start_time).getTime();
        const existingEnd = new Date(cita.end_time).getTime();
        const newStart = nuevoInicio.getTime();
        const newEnd = nuevoFin.getTime();
        // Lógica de superposición: (InicioA < FinB) y (FinA > InicioB)
        return (newStart < existingEnd && newEnd > existingStart);
    });
}

// Verifica que la hora de finalización sea posterior a la de inicio
export function validarOrdenHoras(inicioObj, finObj) {
    return finObj > inicioObj;
}

export function validarFechaNoPasada(fechaCita, fechaActual = new Date()) {
    const ahora = new Date(fechaActual);
    const seleccion = new Date(fechaCita);
    ahora.setHours(0, 0, 0, 0);
    seleccion.setHours(0, 0, 0, 0);
    return seleccion >= ahora;
}

export function validarDatosPaciente(nombre, edad, tituloMotivo, descripcion) {
    if (!tituloMotivo || tituloMotivo.trim() === '') {
        return { valido: false, mensaje: 'El motivo es obligatorio' };
    }
    return { valido: true };
}
