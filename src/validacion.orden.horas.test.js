import { describe, it, expect } from 'vitest';
import { validarOrdenHoras } from './formulario.js';

describe('Validación de congruencia de horarios (Inicio vs Fin)', () => {
    
    it('Happy Path: Debería permitir agendar si la hora de fin es posterior a la de inicio', () => {
        const inicio = new Date('2023-11-05T10:00:00');
        const fin = new Date('2023-11-05T11:00:00');
        
        expect(validarOrdenHoras(inicio, fin)).toBe(true);
    });
});