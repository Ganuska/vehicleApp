/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { observer } from 'mobx-react';
import { useRootStore } from '@/common/utils/RootStateContext';
import { VehicleMake } from '@/types';

interface props {
  form: any;
}

export default observer(({ form }: props) => {
  const { vehicleStore } = useRootStore();
  return (
    <div className="flex justify-center">
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => vehicleStore.toggleModal()}
      >
        Create New car
      </button>
      {vehicleStore.isCarModalOpen && (
        <form
          onSubmit={form.onSubmit}
          className="fixed inset-0 overflow-y-auto"
        >
          <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" />
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="min-w-[350px] bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <h3
                  className="text-center text-lg font-medium leading-6 text-gray-900"
                  id="modal-headline"
                >
                  Create New Car
                </h3>

                <div className="mt-2">
                  <div>
                    <label htmlFor={form.$('vehicleMake').id}>
                      {form.$('vehicleMake').label}
                    </label>
                    <select
                      className="mt-1 block w-full cursor-pointer  rounded-md border-transparent bg-gray-200 p-2 focus:border-gray-500 focus:bg-white focus:ring-0"
                      {...form.$('vehicleMake').bind()}
                    >
                      <option value="" />
                      {vehicleStore.vehicleMake.item
                        .map((make: VehicleMake) => make.name)
                        .map((name: string) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <small className="text-red-500">
                    {form.$('vehicleMake').error}
                  </small>
                  <br />
                  <label htmlFor={form.$('vehicleModel').id}>
                    {form.$('vehicleModel').label}
                  </label>
                  <br />
                  <input
                    className="mt-1 block w-full rounded-md border-transparent bg-gray-200 p-2 focus:border-gray-500 focus:bg-white focus:ring-0"
                    {...form.$('vehicleModel').bind()}
                  />
                </div>
                <small className="text-red-500">
                  {form.$('vehicleModel').error}
                </small>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  onClick={form.onSubmit}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-300 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => {
                    vehicleStore.toggleModal();
                    form.clear();
                  }}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
});
