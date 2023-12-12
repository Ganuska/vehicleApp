/* eslint-disable */
import { axios } from '../../lib/api/axios';
import { GetParamsQuery } from '../../types';

export const getVehicleMake = async (params?: GetParamsQuery): Promise<any> => {
  let filteredParams;
  if (params) {
    filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== '')
    );
  }

  const response: any = await axios.get('/resources/vehicleMake', {
    params: filteredParams
  });

  return response;
};

export const createNewVehicleMake = async (data: any): Promise<any> => {
  const response: any = await axios.post(`/resources/vehicleMake`, data);

  return response;
};

export const deleteVehicleMake = async (id: string): Promise<any> => {
  const response: any = await axios.delete(`/resources/vehicleMake/${id}`);
  return response;
};

export const getVehicle = async (params: GetParamsQuery): Promise<any> => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== '')
  );

  const response: any = await axios.get('/resources/vehicle', {
    params: filteredParams
  });

  return response;
};

export const createNewVehicle = async (data: any): Promise<any> => {
  const response: any = await axios.post(`/resources/vehicle`, data);

  return response;
};

export const deleteVehicle = async (id: string): Promise<any> => {
  const response: any = await axios.delete(`/resources/vehicle/${id}`);
  return response;
};
