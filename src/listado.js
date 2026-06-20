import { Repository } from './repository.js';

export function cargarCita(cita, index) {
    const titleObj = cita.title || 'Consulta sin titulo';
    const fechaObj = new Date(cita.start_time);
    const fechaLegible = fechaObj.toLocaleString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    return `<div class="card-date">📅 ${fechaLegible}</div><div class="card-title">${titleObj}</div>`;
}

if (typeof window !== 'undefined' && document.getElementById('lista-citas')) {
    let citasGlobal = [];
    const contenedor = document.getElementById('lista-citas');
    async function cargarCitas() {
        const { data: citas, error } = await Repository.cargarCitas();

        citasGlobal = citas;

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