import { User } from './userModel';
import api from '../api';

const createUser = async (pessoa: Partial<User>) => {
  try {
    const response = await api.post('/Pessoa', pessoa);
    return response.data;
  } catch (error) {
    console.error('Error creating user', error);
    throw error;
  }
};

const getUserById = async (id: number) => {
  try {
    const response = await api.get(`/Pessoa/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user', error);
    throw error;
  }
};

const updateUser = async (id: number, pessoa: Partial<User>) => {
  try {
    const response = await api.put(`/Pessoa/${id}`, pessoa);
    return response.data;
  } catch (error) {
    console.error('Error updating user', error);
    throw error;
  }
};

const deleteUser = async (id: number) => {
  try {
    const response = await api.delete(`/Pessoa/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user', error);
    throw error;
  }
};

export default {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
