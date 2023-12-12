export type VehicleMake = {
  id?: string;
  abrv: string;
  name: string;
  description: string;
};

export type GetVehiclesMakeResponse = {
  item: VehicleMake[];
  page: number;
  recordsPerPage: number;
  totalRecords: number;
  sort?: string;
  searchQuery?: string;
};

export type Vehicle = {
  vehicleMake: string;
  vehicleModel: string;
  id?: string;
};
export type GetVehiclesResponse = {
  item: Vehicle[];
  page: number;
  recordsPerPage: number;
  totalRecords: number;
  sort?: string;
  searchQuery?: string;
};

export type GetParamsQuery = {
  page: number;
  rpp: number;
  searchQuery: string;
  sort: string;
};
