# Sistema de Gestión de Consultas para Psicólogos Independientes

Este proyecto surge como una solución tecnológica para optimizar la administración de citas y el seguimiento de pacientes de un psicólogo independiente, reemplazando los métodos manuales y de mensajería instantánea por una plataforma centralizada y automatizada.

🚀 Ejecución del Proyecto

Para visualizar y probar la plataforma en un entorno local, sigue estos pasos:

Descargar el código: Descarga el repositorio o los archivos del proyecto a tu computadora.

Abrir en Visual Studio Code: Inicia VS Code y abre la carpeta que contiene los archivos del proyecto.

Instalar Live Server: Asegúrate de tener instalada la extensión Live Server (de Ritwick Dey) desde el marketplace de extensiones.

Iniciar el servidor: * Haz clic derecho sobre el archivo principal (index.html).

Selecciona la opción "Open with Live Server".

La aplicación se abrirá automáticamente en tu navegador predeterminado.

📝 Descripción del Problema

Actualmente, el profesional gestiona sus reservas a través de WhatsApp y registros manuales en papel. Esta metodología presenta los siguientes inconvenientes:

Inversión excesiva de tiempo en la organización de la agenda.

Pérdida frecuente de información relevante de los pacientes.

Dificultad administrativa, incluso con una carga baja de consultas, lo que impide un manejo fluido de la información.

🎯 Objetivo y Alcance

El objetivo principal es desarrollar una plataforma web que registre, organice y gestione consultas médicas mediante un sistema de horarios inteligente.

Alcance del Sistema

Como base mínima de funcionamiento, el sistema permite:

Registro completo de pacientes.

Clasificación del tipo de consulta.

Asignación precisa de fecha y hora para cada sesión.

👥 Perfiles de Usuario

La plataforma está diseñada para dos perfiles principales:

Psicólogo: Administrador total de la agenda, encargado de gestionar citas y mantener notas clínicas.

Pacientes: Usuarios finales que acceden para agendar, modificar o cancelar sus propias sesiones.

⚙️ Requerimientos del Sistema

Requerimientos Funcionales (Historias de Usuario)

ID

Usuario

Requerimiento

Propósito

1

Psicólogo

Inicio de sesión seguro (Email/Password).

Garantizar la privacidad de la información sensible.

2

Psicólogo

Lista de pacientes con datos básicos.

Centralizar la información y eliminar registros físicos.

3

Psicólogo

Gestión manual de consultas (CRUD).

Flexibilidad ante cambios fuera de la plataforma.

4

Paciente

Visualización de horarios disponibles.

Autogestión inmediata sin depender de WhatsApp.

5

Sistema

Vinculación automática de reservas.

Evitar el double-booking o sobreposición de citas.

6

Paciente

Formulario de motivo de consulta.

Proveer contexto clínico previo a la sesión.

7

Psicólogo

Agenda cronológica del día actual.

Optimizar la atención diaria sin pérdida de tiempo.

8

General

Notificaciones el día de la consulta.

Reducir el ausentismo y mejorar la preparación.

9

Psicólogo

Notas privadas por sesión.

Mantener un registro histórico del progreso del paciente.

10

Paciente

Cancelación o reprogramación con límite de tiempo.

Facilitar cambios sin intervención manual constante.

Requerimientos No Funcionales

Validación Temporal: El sistema impide el registro de consultas en fechas u horarios pasados.

Estado Visual: Diferenciación visual (colores) entre consultas realizadas, pendientes y canceladas.

Bloqueo Dinámico: Los horarios ocupados se inhabilitan automáticamente para evitar errores humanos.

📋 Priorización y Restricciones

Fases de Prioridad

Prioridad Alta: Flujo de registro de consultas, llenado de datos y validaciones de agenda.

Prioridad Media: Panel de visualización centralizada (Dashboard) para el psicólogo con visión diaria.

Supuestos y Restricciones

El sistema está diseñado para un profesional independiente, por lo que el manejo de alta concurrencia no es crítico inicialmente.

No se requiere, por el momento, un sistema de chat interno ni tipos de consultas altamente complejos.

La prioridad absoluta es la integridad de los datos de registro.


Base de Datos: PostgreSQL o Firebase (para tiempo real en notificaciones).

Este documento fue generado como parte del análisis de requerimientos para el sistema de gestión psicológica.
