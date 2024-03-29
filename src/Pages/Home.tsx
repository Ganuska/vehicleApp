import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer, Observer } from 'mobx-react';
import VehicleTable from '../components/VehicleTable';
import { useRootStore } from '../common/utils/RootStateContext';
import { GetParamsQuery } from '../types';
import Loader from '../components/Loader';
import CarForm from '@/forms/carCreateForm/CarForm';
import form from '@/forms/carCreateForm/form';

export const Home = observer(() => {
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
    vehicleStore.getVehiclesData(params);

    setIsLoading(false);
  }, [params]);

  return (
    <Observer>
      {() => (
        <>
          <button
            onClick={() => navigate('vehicleMake')}
            className="absolute right-4 flex rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Create New Vehicle Make
          </button>
          {!isLoading ? (
            <VehicleTable data={vehicleStore.vehicles} setParams={setParams} />
          ) : (
            <Loader loading={isLoading} />
          )}
          <CarForm form={form} />
        </>
      )}
    </Observer>
  );
});
