import { describe, it, expect } from 'vitest';
import { validarFechaNoPasada } from './validaciones.js';

describe('Validación de fechas pasadas', () => {
    const fechaActualMock = new Date('2023-11-01T10:00:00');

    it('Happy Path: Debería ser válido agendar en una fecha y hora futura', () => {
        const fechaPropuesta = new Date('2023-11-05T10:00:00');

        const resultado = validarFechaNoPasada(fechaPropuesta, fechaActualMock);
        expect(resultado).toBe(true);
    });

    it('Negative Path: NO debería ser válido agendar en una fecha pasada', () => {
        const fechaPropuesta = new Date('2023-10-31T10:00:00');

        const resultado = validarFechaNoPasada(fechaPropuesta, fechaActualMock);
        expect(resultado).toBe(false);
    });
});