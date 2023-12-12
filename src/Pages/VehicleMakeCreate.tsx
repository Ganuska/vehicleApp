import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer, Observer } from 'mobx-react';
import { FaArrowLeft } from 'react-icons/fa6';
import VehicleMakeTable from '../components/VehicleMakeTable';
import { useRootStore } from '../common/utils/RootStateContext';
import { GetParamsQuery } from '../types';
import Loader from '../components/Loader';
import CarMakeForm from '@/forms/carMakeCreateForm/CarMakeForm';
import form from '@/forms/carMakeCreateForm/form';

export const VehicleMakeCreate = observer(() => {
  const navigate = useNavigate();
  const { vehicleStore } = useRootStore();
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState<GetParamsQuery>({
    page: 1,
    rpp: 10,
    searchQuery: '',
    sort: ''
  });
  useEffect(() => {
    vehicleStore.getVehiclesMakeData(params);

    setIsLoading(false);
  }, [params]);

  return (
    <Observer>
      {() => (
        <>
          <button
            onClick={() => navigate('/')}
            className=" flex items-center justify-center gap-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            <FaArrowLeft />
            Vehicles
          </button>
          {!isLoading ? (
            <VehicleMakeTable
              data={vehicleStore.vehicleMake}
              setParams={setParams}
            />
          ) : (
            <Loader loading={isLoading} />
          )}
          <CarMakeForm form={form} />
        </>
      )}
    </Observer>
  );
});
