import { observable, action, makeObservable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { Vehicle, GetVehiclesResponse, GetParamsVehicleMake } from '../types';
import {
  createNewVehicle,
  getVehicle,
  deleteVehicle
} from '../common/api/vehicle';

export class VehicleStore {
  constructor() {
    makeObservable(this);
  }

  @observable vehicles: GetVehiclesResponse = {
    item: [],
    page: 1,
    totalRecords: 0,
    recordsPerPage: 0
  };

  @action getVehiclesData = async (params: GetParamsVehicleMake) => {
    await getVehicle(params).then((vehicleData) =>
      runInAction(() => {
        this.vehicles = vehicleData;
      })
    );
  };

  @action deleteOneVehicle = async (id: string) => {
    await deleteVehicle(id)
      .then(() => {
        runInAction(() => {
          toast.success('vehicle successfuly deleted');
          this.vehicles.item = this.vehicles.item.filter(
            (vehicle) => vehicle.id !== id
          );
        });
      })
      .catch((error) => toast.error(error as string));
  };

  @action addVehicle = async (vehicle: Vehicle) => {
    try {
      runInAction(() => {
        this.vehicles.item.push(vehicle);
        toast.success('successfuly created');
      });
      await createNewVehicle(vehicle);
    } catch (error) {
      toast.error(error as string);
    }
  };
}
