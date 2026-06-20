import { describe, it, expect } from 'vitest';
import { validarDatosPaciente } from './validaciones.js';

describe('Validación de Datos del Paciente', () => {

    it('Happy Path: Permite registrar si todos los datos obligatorios del paciente son válidos', () => {
        const resultado = validarDatosPaciente('Juan Perez', 28, 'Consulta general', 'Primera consulta');
        expect(resultado.valido).toBe(true);
    });

    it('Negative Path: Falla si el motivo está vacío', () => {
        const resultado = validarDatosPaciente('Juan Perez', 28, '', 'Primera consulta');
        expect(resultado.valido).toBe(false);
        expect(resultado.mensaje).toContain('El motivo es obligatorio');
    });
});
