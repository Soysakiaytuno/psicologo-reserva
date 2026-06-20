export function mapeoFullCallendar(data) {
    if (!data) {
        return [];
    }
    return data.map(cita => ({
        id: cita.id,
        title: cita.title,
        start: cita.start_time,
        end: cita.end_time,
        extendedProps: {
            nombrePaciente: cita.paciente_nombre,
            edad: cita.paciente_edad,
            carnet: cita.paciente_carnet,
            descripcion: cita.descripcion
        }
    }));
}