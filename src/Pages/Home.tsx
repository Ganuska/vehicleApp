import { useEffect, useState } from 'react';
import VehicleTable from '../components/Table';
import { useRootStore } from '../common/utils/RootStateContext';
import { observer, Observer } from 'mobx-react';
import CreateNew from '../components/createNew';
import { Vehicle, GetParamsVehicleMake } from '../types';
import Loader from '../components/Loader';

export const Home = observer(() => {
  const { vehicleStore } = useRootStore();
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState<GetParamsVehicleMake>({
    page: 1,
    rpp: 10,
    searchQuery: '',
    sort: ''
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await vehicleStore.getVehiclesData(params);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [params]);

  const handleCreate = async (data: Vehicle) => {
    try {
      await vehicleStore.addVehicle(data);
    } catch (error) {
      console.error('Error creating:', error);
    }
  };
  return (
    <Observer>
      {() => (
        <>
          {!isLoading ? (
            <VehicleTable data={vehicleStore.vehicles} setParams={setParams} />
          ) : (
            <Loader loading={isLoading} />
          )}
          {!isLoading && <CreateNew onCreateCar={handleCreate} />}
        </>
      )}
    </Observer>
  );
});
