import apiJson from 'services/apiForJson';

export const getUnidadeMedicamento = async (cdUnidade: number, snUtilizado: string) => {
  try {
    const response = await apiJson.get(`/UnidadeMedicamento/${1}`, {
      params: {
        snUtilizado: 'S',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching unidade medicamento:', error);
    throw error;
  }
};

export const UnidadeMedicamento = async (medicamento: {
  cdUnidade: number;
  cdMedicamento: number;
}) => {
  try {
    const response = await apiJson.post('/UnidadeMedicamento', medicamento);
    return response.data;
  } catch (error) {
    console.error('Error adding medicamento to unidade', error);
    throw error;
  }
};
