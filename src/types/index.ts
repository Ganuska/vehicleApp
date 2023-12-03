export type Vehicle = {
  id?: string;
  abrv: string;
  name: string;
  description: string;
};

export type GetVehiclesResponse = {
  item: Vehicle[];
  page: number;
  recordsPerPage: number;
  totalRecords: number;
  sort?: string;
  searchQuery?: string;
};

export type GetParamsVehicleMake = {
  page: number;
  rpp: number;
  searchQuery: string;
  sort: string;
};
