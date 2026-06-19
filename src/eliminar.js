import { Repository } from "./repository.js";
if (typeof window !== 'undefined' && document.getElementById('info-cita') && document.getElementById('btn-confirmar-eliminar')) {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');

    const contenedor = document.getElementById('info-cita');
    const btnEliminar = document.getElementById('btn-confirmar-eliminar');

    async function cargarDatosEliminar() {
        if (!idParam) return;

        const { data: citaEncontrada, error } = await Repository.obtenerPorId(idParam);

        if (citaEncontrada && !error) {
            const fechaLegible = new Date(citaEncontrada.start_time).toLocaleString('es-ES');

            contenedor.innerHTML = `
                <h3 style="text-align:center;">¿Estás seguro de que deseas eliminar esta cita?</h3>
                <p><strong>Paciente:</strong> ${citaEncontrada.paciente_nombre || 'Desconocido'}</p>
                <p><strong>Fecha y Hora:</strong> ${fechaLegible}</p>
                <p style="color: #666; text-align:center; margin-top: 20px;">Esta acción no se puede deshacer.</p>
            `;

            btnEliminar.style.display = 'block';
            btnEliminar.addEventListener('click', async function () {
                await Repository.eliminar(idParam);
                window.location.href = 'index.html';
            });
        } else {
            contenedor.innerHTML = "<p style='color: red; text-align: center;'>Error: No se encontró la cita.</p>";
        }
    }
    cargarDatosEliminar();
}