document.addEventListener('DOMContentLoaded', function() {
    // --- GESTIÓN DE MODOS (Normal, Edit, Delete) ---
    let currentMode = 'normal';
    
    var calendarEl = document.getElementById('calendar');

    // 2. Inicialización del Calendario
    var calendar = new FullCalendar.Calendar(calendarEl, {
        // Configuración básica
        initialView: 'dayGridMonth', // Vista mensual
        locale: 'es',               // Idioma español
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: '' // Quitamos los botones de cambio de vista
        },

        // Configuración de horarios (Psicólogo)
        slotDuration: '01:00:00',   // Las citas duran 1 hora por defecto en la grilla visual
        slotMinTime: '08:00:00',    // Hora de inicio de jornada
        slotMaxTime: '20:00:00',    // Hora de fin de jornada
        allDaySlot: false,          // Ocultar la barra de "todo el día" si no es necesaria
        businessHours: {            // Días y horas laborales (se sombrean en gris)
            daysOfWeek: [ 1, 2, 3, 4, 5 ], // Lunes a Viernes
            startTime: '09:00', 
            endTime: '18:00', 
        },
        
        // Interacción
        selectable: true,           // Permite seleccionar huecos vacíos
        editable: true,             // Permite arrastrar y soltar eventos
        
        // Evento: Al hacer clic en un hueco vacío (Crear Cita)
        select: function(info) {
            // --- INICIO DE VALIDACIONES ---

            // 1. No se puede crear en días pasados (pero sí hoy a cualquier hora)
            const ahora = new Date();
            const fechaSeleccionada = new Date(info.start);
            
            // Resetear horas para comparar solo fechas (día/mes/año)
            ahora.setHours(0, 0, 0, 0);
            fechaSeleccionada.setHours(0, 0, 0, 0);

            if (fechaSeleccionada < ahora) {
                alert("No puedes agendar citas en una fecha pasada.");
                calendar.unselect(); // Deseleccionar el hueco
                return;
            }

            // 2. No se puede crear si ya existe una cita en ese hueco
            const citasExistentes = JSON.parse(localStorage.getItem('citas')) || [];
            const yaExiste = citasExistentes.some(
                cita => new Date(cita.start).getTime() === info.start.getTime()
            );

            if (yaExiste) {
                alert("Ya existe una cita en este horario. Por favor, selecciona otro.");
                calendar.unselect();
                return;
            }

            // Ajuste para vista mensual: si no tiene hora, agregamos 09:00 por defecto
            // para que el formulario lo interprete como hora local y no UTC
            let startStr = info.startStr;
            if (!startStr.includes('T')) {
                startStr += 'T09:00:00';
            }

            // Redirigir al formulario enviando las fechas seleccionadas por URL
            const start = encodeURIComponent(startStr);
            const end = encodeURIComponent(info.endStr);
            window.location.href = `formulario.html?start=${start}&end=${end}`;
        },

        // Evento: Al hacer clic en una cita existente (Ver/Borrar)
        eventClick: function(info) {
            const fecha = encodeURIComponent(info.event.startStr);
            
            if (currentMode === 'edit') {
                window.location.href = `editar.html?fecha=${fecha}`;
            } else if (currentMode === 'delete') {
                window.location.href = `eliminar.html?fecha=${fecha}`;
            } else {
                window.location.href = `detalle.html?fecha=${fecha}`;
            }
        },

        // Cargar eventos desde LocalStorage
        events: JSON.parse(localStorage.getItem('citas')) || []
    });

    calendar.render();

    // --- LÓGICA DE LOS BOTONES LATERALES ---
    const btnEdit = document.getElementById('btn-edit-mode');
    const btnDelete = document.getElementById('btn-delete-mode');

    function updateModeUI() {
        btnEdit.classList.remove('active-edit');
        btnDelete.classList.remove('active-delete');
        
        if (currentMode === 'edit') {
            btnEdit.classList.add('active-edit');
        } else if (currentMode === 'delete') {
            btnDelete.classList.add('active-delete');
        }
    }

    btnEdit.addEventListener('click', () => {
        // Si ya está en modo edición, lo apaga. Si no, lo enciende.
        currentMode = (currentMode === 'edit') ? 'normal' : 'edit';
        updateModeUI();
    });

    btnDelete.addEventListener('click', () => {
        // Si ya está en modo eliminación, lo apaga. Si no, lo enciende.
        currentMode = (currentMode === 'delete') ? 'normal' : 'delete';
        updateModeUI();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            currentMode = 'normal';
            updateModeUI();
        }
    });
});