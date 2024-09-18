import apiJson from 'services/apiForJson';
import api from '../api';
import { Medicamento, MedicamentoPayload } from './medimentoModel';

export const getMedicamentos = async (): Promise<Medicamento[]> => {
  try {
    const response = await api.get('/Medicamento');
    return response.data;
  } catch (error) {
    console.error('Error fetching medicamentos', error);
    throw error;
  }
};

export const getMedicamentoById = async (id: number): Promise<Medicamento> => {
  try {
    const response = await api.get(`/Medicamento/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching medicamento with id ${id}`, error);
    throw error;
  }
};

export const postMedicamento = async <T>(medicamento: MedicamentoPayload): Promise<T> => {
  try {
    const response = await apiJson.post<T>('/Medicamento', medicamento);
    return response.data;
  } catch (error) {
    console.error('Error creating medicamento', error);
    throw error;
  }
};

export const updateMedicamento = async <T>(
  id: number,
  medicamento: Partial<Medicamento>
): Promise<T> => {
  try {
    const response = await api.put<T>(`/Medicamento/${id}`, medicamento);
    return response.data;
  } catch (error) {
    console.error(`Error updating medicamento with id ${id}`, error);
    throw error;
  }
};

export const deleteMedicamento = async (id: number): Promise<void> => {
  try {
    await api.delete(`/Medicamento/${id}`);
  } catch (error) {
    console.error(`Error deleting medicamento with id ${id}`, error);
    throw error;
  }
};
