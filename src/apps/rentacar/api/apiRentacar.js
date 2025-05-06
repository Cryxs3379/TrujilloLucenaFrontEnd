// src/apps/rentacar/api/apiRentacar.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cconduimaixefwjscunr.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getCoches = async () => {
  const { data, error } = await supabase.from('coches').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const getClientes = async () => {
  const { data, error } = await supabase.from('clientes').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const crearReserva = async (reserva) => {
  const { data, error } = await supabase.from('reservas').insert([reserva]);
  if (error) throw new Error(error.message);
  return data;
};

export const getReservas = async () => {
  const { data, error } = await supabase.from('reservas').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const confirmarCliente = async (reserva) => {
  const clienteData = {
    nombre: reserva.nombre,
    apellidos: reserva.apellidos,
    email: reserva.email,
    dni: reserva.dni,
    telefono: reserva.telefono,
    categoriacoche: reserva.categoriacoche,
    fecharecogercoche: reserva.fecharecogercoche,
    horarecogercoche: reserva.horarecogercoche,
    fechadevolvercoche: reserva.fechadevolvercoche,
    horadevolvercoche: reserva.horadevolvercoche,
  };

  const { error: insertError } = await supabase.from('clientes').insert([clienteData]);
  if (insertError) throw insertError;

  const { error: deleteError } = await supabase.from('reservas').delete().eq('id', reserva.id);
  if (deleteError) throw deleteError;
};
