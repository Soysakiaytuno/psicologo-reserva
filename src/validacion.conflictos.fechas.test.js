import { describe, it, expect } from 'vitest';
import { validarFechaNoPasada } from './script.js';
import { hayChoqueDeHorarios } from './formulario.js';

describe('Validación de superposición de horarios', () => {
    const citasExistentesDb = [
        { start_time: '2023-11-05T09:00:00', end_time: '2023-11-05T10:00:00' },
        { start_time: '2023-11-05T14:00:00', end_time: '2023-11-05T15:00:00' }
    ];

    it('Happy Path: Debería permitir agendar si el rango de horario está totalmente libre', () => {
        const nuevoInicio = new Date('2023-11-05T10:30:00');
        const nuevoFin = new Date('2023-11-05T11:30:00');
        
        expect(hayChoqueDeHorarios(nuevoInicio, nuevoFin, citasExistentesDb)).toBe(false);
    });

    it('Negative Path: NO debería permitir agendar si parte del horario se cruza con otra cita', () => {
        const nuevoInicio = new Date('2023-11-05T09:30:00');
        const nuevoFin = new Date('2023-11-05T10:30:00');
        
        expect(hayChoqueDeHorarios(nuevoInicio, nuevoFin, citasExistentesDb)).toBe(true);
    });
});