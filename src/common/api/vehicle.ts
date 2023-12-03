import { axios } from '../../lib/api/axios';
import { GetParamsVehicleMake } from '../../types';

export const getVehicle = async (
  params: GetParamsVehicleMake
): Promise<any> => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== '')
  );

  const response: any = await axios.get('/resources/vehicleMake', {
    params: filteredParams
  });

  return response;
};

export const createNewVehicle = async (data: any): Promise<any> => {
  const response: any = await axios.post(`/resources/vehicleMake`, data);

  return response;
};

export const deleteVehicle = async (id: string): Promise<any> => {
  const response: any = await axios.delete(`/resources/vehicleMake/${id}`);
  return response;
};
