import api from '../api';
import apiJson from 'services/apiForJson';
import { UserUnityModel } from './userUnityModel';

export const getUserUnits = async (): Promise<UserUnityModel[]> => {
  try {
    const response = await api.get('/UsuarioUnidade');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user units');
  }
};

export const getUserUnitsLogin = async (
  dsEmail: string,
  dsSenha: string
): Promise<UserUnityModel[]> => {
  try {
    const response = await api.get('/LoginUsuarioUnidade', {
      params: {
        dsEmail,
        dsSenha,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user units');
  }
};

export const getUserUnitById = async (id: number): Promise<UserUnityModel> => {
  try {
    const response = await api.get(`/UsuarioUnidade/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user unit');
  }
};

export const createUserUnit = async (userUnit: UserUnityModel): Promise<UserUnityModel> => {
  try {
    const response = await apiJson.post('/UsuarioUnidade', userUnit);
    return response.data;
  } catch (error) {
    throw new Error('Error creating user unit');
  }
};

export const updateUserUnit = async (
  id: number,
  userUnit: UserUnityModel
): Promise<UserUnityModel> => {
  try {
    const response = await api.put(`/UsuarioUnidade/${id}`, userUnit);
    return response.data;
  } catch (error) {
    throw new Error('Error updating user unit');
  }
};

export const deleteUserUnit = async (id: number): Promise<void> => {
  try {
    await api.delete(`/UsuarioUnidade/${id}`);
  } catch (error) {
    throw new Error('Error deleting user unit');
  }
};
