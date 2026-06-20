import { Repository } from './repository.js';
import { cargarCita, ordenarCitas } from './listado.js';

if (typeof window !== 'undefined' && document.getElementById('lista-citas')) {
    let citasGlobal = [];
    const contenedor = document.getElementById('lista-citas');
    async function cargarCitas() {
        const { data: citas, error } = await Repository.cargarCitas();
        const citasOrdenadas = ordenarCitas(citas);
        citasGlobal = citasOrdenadas;

        if (citas.length === 0) {
            contenedor.innerHTML = "<p style='text-align:center'>No hay citas agendadas.</p>";
        } else {
            citas.forEach((cita, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.setAttribute('onclick', `abrirModal(${index})`);
                card.innerHTML = cargarCita(cita, index);
                contenedor.appendChild(card);
            });
        }
    }

    cargarCitas();

    window.abrirModal = function (index) {
        const cita = citasGlobal[index];
        document.getElementById('m-titulo').innerText = cita.title;
        document.getElementById('m-fecha').innerText = new Date(cita.start_time).toLocaleString('es-ES');
        document.getElementById('m-paciente').innerText = cita.paciente_nombre || 'No especificado';
        document.getElementById('m-edad').innerText = cita.paciente_edad || 'No especificada';
        document.getElementById('m-carnet').innerText = cita.paciente_carnet || 'No especificado';
        document.getElementById('m-descripcion').innerText = cita.descripcion || 'Sin descripción adicional';

        document.getElementById('modalDetalle').style.display = 'flex';
    };

    window.cerrarModal = function () {
        document.getElementById('modalDetalle').style.display = 'none';
    };

    window.onclick = function (event) {
        const modal = document.getElementById('modalDetalle');
        if (event.target == modal) {
            window.cerrarModal();
        }
    };
}