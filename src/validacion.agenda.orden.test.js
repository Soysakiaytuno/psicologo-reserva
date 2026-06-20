import { describe, it, expect } from 'vitest';
import { ordenarCitas } from './listado.js';

describe('Validación de orden de citas', () => {

    it('Happy Path: Mostrar las citas ordenadas', () => {
        const citasDesordenadas = [
            { title: 'Cita Tarde', start_time: '2026-09-05T14:00:00' },
            { title: 'Cita Mañana', start_time: '2026-09-05T09:00:00' },
            { title: 'Cita Mediodia', start_time: '2026-09-05T11:00:00' }
        ];

        const resultado = ordenarCitas(citasDesordenadas);

        expect(resultado[0].title).toBe('Cita Mañana');
        expect(resultado[1].title).toBe('Cita Mediodia');
        expect(resultado[2].title).toBe('Cita Tarde');
    });

    it('Negative Path: Manejar una lista vacia', () => {
        const resultado = ordenarCitas([]);
        expect(resultado).toEqual([]);
    });
});
