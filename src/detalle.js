import { supabaseClient } from './supabase.js';

if (typeof window !== 'undefined' && document.getElementById('info-cita')) {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    const contenedor = document.getElementById('info-cita');

    async function cargarDetalles() {
        if (!idParam) return;
        
        const { data: citaEncontrada, error } = await supabaseClient
            .from('citas')
            .select('*')
            .eq('id', idParam)
            .single();

        if (citaEncontrada && !error) {
            const fechaLegible = new Date(citaEncontrada.start_time).toLocaleString('es-ES', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
            const horaInicio = new Date(citaEncontrada.start_time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            const horaFin = new Date(citaEncontrada.end_time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

            contenedor.innerHTML = `
                <div class="form-group">
                    <label>Título / Motivo:</label>
                    <div style="font-size: 1.2em; color: #2c3e50;">${citaEncontrada.title}</div>
                </div>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;">
                <p><strong>📅 Fecha:</strong> ${fechaLegible}</p>
                <p><strong>⏰ Horario:</strong> ${horaInicio} - ${horaFin}</p>
                <p><strong>👤 Paciente:</strong> ${citaEncontrada.paciente_nombre || 'No especificado'}</p>
                <p><strong>🎂 Edad:</strong> ${citaEncontrada.paciente_edad || 'No especificada'}</p>
                <p><strong>🆔 Carnet:</strong> ${citaEncontrada.paciente_carnet || 'No especificado'}</p>
                <p><strong>📝 Descripción:</strong></p>
                <div style="background: #f0f0f0; padding: 10px; border-radius: 4px; min-height: 60px;">${citaEncontrada.descripcion || 'Sin descripción adicional.'}</div>
            `;
        } else {
            contenedor.innerHTML = "<p style='color: red; text-align: center;'>No se encontró la cita solicitada.</p>";
        }
    }
    cargarDetalles();
}