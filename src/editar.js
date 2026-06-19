import { supabaseClient } from './supabase.js';

if (typeof window !== 'undefined' && document.getElementById('citaForm') && window.location.pathname.includes('editar.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    
    async function cargarDatos() {
        if (!idParam) {
            window.location.href = 'index.html';
            return;
        }

        const { data: citaOriginal, error } = await supabaseClient
            .from('citas')
            .select('*')
            .eq('id', idParam)
            .single();

        if (error || !citaOriginal) {
            alert("No se encontró la cita en la base de datos.");
            window.location.href = 'index.html';
        } else {
            const startObj = new Date(citaOriginal.start_time);
            const endObj = new Date(citaOriginal.end_time);

            document.getElementById('fecha').value = `${startObj.getFullYear()}-${String(startObj.getMonth() + 1).padStart(2, '0')}-${String(startObj.getDate()).padStart(2, '0')}`;
            document.getElementById('horaInicio').value = `${String(startObj.getHours()).padStart(2, '0')}:${String(startObj.getMinutes()).padStart(2, '0')}`;
            document.getElementById('horaFin').value = `${String(endObj.getHours()).padStart(2, '0')}:${String(endObj.getMinutes()).padStart(2, '0')}`;
            
            const motivo = citaOriginal.title.split(' - ')[0] || '';
            document.getElementById('titulo').value = motivo;
            
            document.getElementById('nombre').value = citaOriginal.paciente_nombre || '';
            document.getElementById('carnet').value = citaOriginal.paciente_carnet || '';
            document.getElementById('edad').value = citaOriginal.paciente_edad || '';
            document.getElementById('descripcion').value = citaOriginal.descripcion || '';
        }
    }

    cargarDatos();

    document.getElementById('citaForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const fecha = document.getElementById('fecha').value;
        const { error } = await supabaseClient.from('citas').update({
            title: `${document.getElementById('titulo').value} - ${document.getElementById('nombre').value}`,
            start_time: new Date(`${fecha}T${document.getElementById('horaInicio').value}:00`).toISOString(),
            end_time: new Date(`${fecha}T${document.getElementById('horaFin').value}:00`).toISOString(),
            paciente_nombre: document.getElementById('nombre').value,
            paciente_edad: document.getElementById('edad').value,
            paciente_carnet: document.getElementById('carnet').value,
            descripcion: document.getElementById('descripcion').value
        }).eq('id', idParam);

        if (error) {
            alert("Error al actualizar la cita.");
            return;
        }
        window.location.href = 'index.html';
    });
}