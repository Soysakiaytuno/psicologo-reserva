import { Repository } from './repository.js';
import { hayChoqueDeHorarios, validarOrdenHoras } from './validaciones.js';

// --- DOM Y BASE DE DATOS ---
if (typeof window !== 'undefined' && document.getElementById('citaForm')) {
    const urlParams = new URLSearchParams(window.location.search);
    const startParam = urlParams.get('start');

    const fechaInput = document.getElementById('fecha');
    const horaInicioInput = document.getElementById('horaInicio');
    const horaFinInput = document.getElementById('horaFin');

    if (startParam) {
        const fechaObj = new Date(startParam);

        const year = fechaObj.getFullYear();
        const month = String(fechaObj.getMonth() + 1).padStart(2, '0');
        const day = String(fechaObj.getDate()).padStart(2, '0');
        fechaInput.value = `${year}-${month}-${day}`;

        const hours = String(fechaObj.getHours()).padStart(2, '0');
        const minutes = String(fechaObj.getMinutes()).padStart(2, '0');
        horaInicioInput.value = `${hours}:${minutes}`;

        const finObj = new Date(fechaObj.getTime() + 60 * 60 * 1000);
        const finHours = String(finObj.getHours()).padStart(2, '0');
        const finMinutes = String(finObj.getMinutes()).padStart(2, '0');
        horaFinInput.value = `${finHours}:${finMinutes}`;
    } else {
        window.location.href = 'index.html';
    }

    document.getElementById('citaForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const fecha = document.getElementById('fecha').value;
        const horaInicio = document.getElementById('horaInicio').value;
        const horaFin = document.getElementById('horaFin').value;
        const nombre = document.getElementById('nombre').value;
        const edad = document.getElementById('edad').value;
        const carnet = document.getElementById('carnet').value;
        const tituloMotivo = document.getElementById('titulo').value;
        const descripcion = document.getElementById('descripcion').value;

        const fechaInicioObj = new Date(`${fecha}T${horaInicio}:00`);
        const fechaFinObj = new Date(`${fecha}T${horaFin}:00`);

        const ahora = new Date();
        const fechaActualSinHora = new Date(ahora);
        fechaActualSinHora.setHours(0, 0, 0, 0);

        const fechaCheck = new Date(fechaInicioObj);
        fechaCheck.setHours(0, 0, 0, 0);

        if (fechaCheck < fechaActualSinHora) {
            alert("Error: La fecha seleccionada es anterior a hoy.");
            return;
        }
        if (fechaCheck.getTime() === fechaActualSinHora.getTime() && fechaInicioObj < ahora) {
            alert("Error: La hora de inicio seleccionada ya pasó.");
            return;
        }

        if (!validarOrdenHoras(fechaInicioObj, fechaFinObj)) {
            alert("La hora de finalización debe ser posterior a la hora de inicio.");
            return;
        }

        const { data: citasGuardadas, error: fetchError } = await Repository.obtenerCitasDelDia(fecha);

        if (fetchError) {
            alert("Error al verificar disponibilidad en la base de datos.");
            return;
        }

        // *** AQUÍ USAMOS LA FUNCIÓN EXTRAIDA ***
        const conflicto = hayChoqueDeHorarios(fechaInicioObj, fechaFinObj, citasGuardadas);

        if (conflicto) {
            alert("ERROR: Ya existe una cita en ese rango de horario. Por favor verifica las horas.");
            return;
        }

        const { error: insertError } = await Repository.crear({
            title: `${tituloMotivo} - ${nombre}`,
            start_time: fechaInicioObj.toISOString(),
            end_time: fechaFinObj.toISOString(),
            paciente_nombre: nombre,
            paciente_edad: edad,
            paciente_carnet: carnet,
            descripcion: descripcion
        });

        if (!insertError) window.location.href = 'index.html';
    });
}