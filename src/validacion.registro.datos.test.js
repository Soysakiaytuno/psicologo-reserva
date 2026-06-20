import { describe, it, expect } from 'vitest';
import { validarDatosPaciente } from './validaciones.js';

describe('Validación de Datos del Paciente', () => {

    it('Happy Path: Permite registrar si todos los datos obligatorios del paciente son válidos', () => {
        const paciente =
        {
            nombre: 'Juan Perez',
            edad: 28,
            tituloMotivo: 'Consulta general',
            descripcion: 'Primera consulta'
        }
        const resultado = validarDatosPaciente(paciente);
        expect(resultado.valido).toBe(true);
    });

    it('Negative Path: Falla si el motivo está vacío', () => {
        const paciente =
        {
            nombre: 'Juan Perez',
            edad: 28,
            tituloMotivo: '',
            descripcion: 'Primera consulta'
        }
        const resultado = validarDatosPaciente(paciente); expect(resultado.valido).toBe(false);
        expect(resultado.mensaje).toContain('El motivo es obligatorio');
    });
});
