import api from '../api';
import { Unidade, UnidadePayload } from './unidadeModel';

// GET: Fetch all Unidades
export const getUnidades = async (): Promise<Unidade[]> => {
  try {
    const response = await api.get('/Unidade');
    return response.data;
  } catch (error) {
    console.error('Error fetching unidades', error);
    throw error;
  }
};

// GET: Fetch Unidade by ID
export const getUnidadeById = async (id: number): Promise<Unidade> => {
  try {
    const response = await api.get(`/Unidade/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching unidade with id ${id}`, error);
    throw error;
  }
};

// POST: Create a new Unidade
export const postUnidade = async <T>(unidade: UnidadePayload): Promise<T> => {
  try {
    const response = await api.post<T>('/Unidade', unidade);
    return response.data;
  } catch (error) {
    console.error('Error creating unidade', error);
    throw error;
  }
};

// PUT: Update an existing Unidade by ID
export const updateUnidade = async <T>(id: number, unidade: Partial<Unidade>): Promise<T> => {
  try {
    const response = await api.put<T>(`/Unidade/${id}`, unidade);
    return response.data;
  } catch (error) {
    console.error(`Error updating unidade with id ${id}`, error);
    throw error;
  }
};

// DELETE: Delete a Unidade by ID
export const deleteUnidade = async (id: number): Promise<void> => {
  try {
    await api.delete(`/Unidade/${id}`);
  } catch (error) {
    console.error(`Error deleting unidade with id ${id}`, error);
    throw error;
  }
};
