/* eslint-disable */
import React from 'react';
import vehicleStore, { VehicleStore } from '../../Stores/VehicleStore';

type RootStateContextValue = {
  vehicleStore: VehicleStore;
};

const RootStateContext = React.createContext<RootStateContextValue>(
  {} as RootStateContextValue
);

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children
}) => {
  return (
    <RootStateContext.Provider value={{ vehicleStore }}>
      {' '}
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => React.useContext(RootStateContext);
