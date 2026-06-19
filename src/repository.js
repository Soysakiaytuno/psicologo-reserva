import { supabaseClient } from './supabase.js';

export const Repository =
{
    async cargarCitas() {
        return await supabaseClient
            .from('citas')
            .select('*')
            .order('start_time', { ascending: true });
    },
    async obtenerPorId(id) {
        return await supabaseClient
            .from('citas')
            .select('*')
            .eq('id', id)
            .single();
    },
    async verificarConflictoHorario(fechaISO) {
        return await supabaseClient
            .from('citas')
            .select('start_time')
            .eq('start_time', fechaISO);
    },
    async obtenerCitasDelDia(fechaYMD) {
        return await supabaseClient
            .from('citas')
            .select('start_time, end_time')
            .gte('start_time', `${fechaYMD}T00:00:00`)
            .lte('start_time', `${fechaYMD}T23:59:59`);
    },
    async crear(citaData) {
        return await supabaseClient.from('citas').insert([citaData]);
    },
    async actualizar(id, citaData) {
        return await supabaseClient.from('citas').update(citaData).eq('id', id);
    },
    async eliminar(id) {
        return await supabaseClient.from('citas').delete().eq('id', id);
    }
};
