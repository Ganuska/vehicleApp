/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { FaRegTrashCan } from 'react-icons/fa6';
import {
  HiMiniArrowLongDown,
  HiMiniArrowLongUp,
  HiArrowsUpDown
} from 'react-icons/hi2';
import { GetParamsQuery, GetVehiclesResponse, VehicleMake } from '../types';
import Pagination from './Paggination';
import { useRootStore } from '../common/utils/RootStateContext';

interface TableData {
  data: GetVehiclesResponse;
  setParams: React.Dispatch<React.SetStateAction<GetParamsQuery>>;
}

const VehicleTable = observer(
  ({ data, setParams }: TableData): React.ReactElement | null => {
    const { vehicleStore } = useRootStore();
    const [currentPage, setCurrentPage] = useState(data.page);
    const [pageSize, setPageSize] = useState(data.recordsPerPage || 10);
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;

    useEffect(() => {
      vehicleStore.getVehiclesMakeData();
    }, []);

    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
      setParams((prevParams) => ({ ...prevParams, page: pageNumber }));
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newSize = parseInt(e.target.value, 10);
      setPageSize(newSize);
      setCurrentPage(1);
      setParams((prevParams) => ({
        ...prevParams,
        rpp: newSize,
        page: 1
      }));
    };
    const totalPages =
      data.totalRecords / data.recordsPerPage > 1
        ? Math.ceil(data.totalRecords / data.recordsPerPage)
        : 1;

    const handleDelete = (id: string) => {
      vehicleStore.deleteOneVehicle(id);
    };

    return (
      <>
        <div className=" mt-12 flex items-center">
          <label className="mr-2 text-sm text-gray-500">Filter:</label>
          <select
            name="vehicleMake"
            value={data.searchQuery || ''}
            onChange={(e) =>
              setParams((prevParams) => ({
                ...prevParams,
                page: 1,
                searchQuery: e.target.value
              }))
            }
            className="mt-1 block  rounded-md border-transparent bg-gray-100 p-2 focus:border-gray-500 focus:bg-white focus:ring-0"
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
        {data.item.length ? (
          <div className="mx-auto my-8  ">
            <table className="min-w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200">
                  <th
                    className="w-1/3 border px-4 py-2 text-center"
                    onClick={() =>
                      setParams((prevParams) => ({
                        ...prevParams,
                        sort:
                          prevParams.sort === ''
                            ? 'vehicleMake|asc'
                            : prevParams.sort === 'vehicleMake|desc'
                            ? 'vehicleMake|asc'
                            : 'vehicleMake|desc'
                      }))
                    }
                  >
                    <div className="flex items-center justify-center gap-2">
                      Vehicle Make
                      {data.sort !== 'vehicleMake|asc' &&
                        data.sort !== 'vehicleMake|desc' && <HiArrowsUpDown />}
                      {data.sort === 'vehicleMake|asc' && (
                        <HiMiniArrowLongDown />
                      )}
                      {data.sort === 'vehicleMake|desc' && (
                        <HiMiniArrowLongUp />
                      )}
                    </div>
                  </th>
                  <th
                    className="w-1/3 border px-4 py-2 text-center"
                    onClick={() =>
                      setParams((prevParams) => ({
                        ...prevParams,
                        sort:
                          prevParams.sort === ''
                            ? 'vehicleModel|asc'
                            : prevParams.sort === 'vehicleModel|desc'
                            ? 'vehicleModel|asc'
                            : 'vehicleModel|desc'
                      }))
                    }
                  >
                    Vehicle Model
                  </th>
                  <th className=" w-1/3 border px-4 py-2 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.item.map((item, index) => (
                  <tr
                    /* eslint-disable react/no-array-index-key */
                    key={index}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                  >
                    <td className="border px-4 py-2">{item.vehicleMake}</td>
                    <td className="border px-4 py-2">{item.vehicleModel}</td>
                    <td className=" border">
                      {item.id && (
                        <button
                          className="flex w-full justify-end pr-4"
                          onClick={() =>
                            item.id !== undefined && handleDelete(item.id)
                          }
                        >
                          <FaRegTrashCan color="black" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstItem + 1} to{' '}
                {currentPage * data.recordsPerPage -
                  (data.recordsPerPage - data.item.length)}{' '}
                of {data.totalRecords} entries
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />

              <div className="flex items-center">
                <label className="mr-2 text-sm text-gray-500">Page Size:</label>
                <select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className="rounded border px-2 py-1 text-sm"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-4 flex justify-center text-center">
            No Data please create first vehicle
          </div>
        )}
      </>
    );
  }
);

export default VehicleTable;
