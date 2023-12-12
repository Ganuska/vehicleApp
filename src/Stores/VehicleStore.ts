import { observable, action, makeObservable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import {
  VehicleMake,
  GetVehiclesResponse,
  GetVehiclesMakeResponse,
  GetParamsQuery,
  Vehicle
} from '../types';
import {
  createNewVehicle,
  getVehicle,
  deleteVehicle,
  createNewVehicleMake,
  getVehicleMake,
  deleteVehicleMake
} from '../common/api/vehicle';

export class VehicleStore {
  constructor() {
    makeObservable(this);
  }

  @observable vehicleMake: GetVehiclesMakeResponse = {
    item: [],
    page: 1,
    totalRecords: 0,
    recordsPerPage: 0
  };

  @observable vehicles: GetVehiclesResponse = {
    item: [],
    page: 1,
    totalRecords: 0,
    recordsPerPage: 0
  };

  @observable isCarModalOpen: boolean = false;

  @observable isCarMakeModalOpen: boolean = false;

  @action toggleModal = () => {
    runInAction(() => {
      this.isCarModalOpen = !this.isCarModalOpen;
    });
  };

  @action toggleMakeModal = () => {
    runInAction(() => {
      this.isCarMakeModalOpen = !this.isCarMakeModalOpen;
    });
  };

  @action getVehiclesMakeData = async (params?: GetParamsQuery) => {
    await getVehicleMake(params).then((vehicleMakeData) =>
      runInAction(() => {
        this.vehicleMake = vehicleMakeData;
      })
    );
  };

  @action deleteOneVehicleMake = async (id: string) => {
    await deleteVehicleMake(id)
      .then(() => {
        runInAction(() => {
          toast.success('vehicle successfuly deleted');
          this.vehicleMake.item = this.vehicleMake.item.filter(
            (vehicle) => vehicle.id !== id
          );
        });
      })
      .catch((error) => toast.error(error as string));
  };

  @action addVehicleMake = async (vehicle: VehicleMake) => {
    try {
      runInAction(() => {
        this.vehicleMake.item.push(vehicle);
        toast.success('successfuly created');
      });
      await createNewVehicleMake(vehicle);
    } catch (error) {
      toast.error(error as string);
    }
  };

  @action getVehiclesData = async (params: GetParamsQuery) => {
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

const vehicleStore = new VehicleStore();

export default vehicleStore;
