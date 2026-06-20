import { describe, it, expect } from 'vitest';
import { cargarCita } from './listado.js';
describe('Validación de visualizacion de la lista de pacientes', () => {

    it('Happy Path: Mostrar una lista de pacientes mostrando datos basicos de previsualizacion', () => {
        const citaMock =
        {
            title: 'Consulta General - Juan Perez',
            start_time: '2026-11-05T10:00:00',
        };
        const resultado = cargarCita(citaMock);
        expect(resultado).toContain('Consulta General - Juan Perez');
        expect(resultado).toContain('jueves, 5 de noviembre de 2026, 10:00');
    });

    it('Negative Path: No muestra los pacientes o no muestra la informacion completa', () => {
        const citaMock =
        {
            title: '',
            start_time: '2026-11-05T10:00:00',
        };
        const resultado = cargarCita(citaMock);
        expect(resultado).toContain('Consulta sin titulo');
    });
});