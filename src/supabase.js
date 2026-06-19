// Configuración centralizada de Supabase
const supabaseUrl = 'https://wftstfgqpulvvoisfdgm.supabase.co';
const supabaseKey = 'sb_publishable_kFSYmTsR1V8YRnN4ny-2cA_W6VYnFbV';

// Prevenimos errores en entornos de testing donde 'window' no existe
export const supabaseClient = typeof window !== 'undefined' && window.supabase 
    ? window.supabase.createClient(supabaseUrl, supabaseKey) 
    : null;