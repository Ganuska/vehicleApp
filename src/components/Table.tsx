import React, { useState } from 'react';
import { useRootStore } from '../common/utils/RootStateContext';
import Pagination from './Paggination';
import { GetParamsVehicleMake, GetVehiclesResponse } from '../types';
import { observer } from 'mobx-react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { HiArrowsUpDown } from 'react-icons/hi2';
import { HiMiniArrowLongDown } from 'react-icons/hi2';
import { HiMiniArrowLongUp } from 'react-icons/hi2';

interface TableData {
  data: GetVehiclesResponse;
  setParams: React.Dispatch<React.SetStateAction<GetParamsVehicleMake>>;
}

const VehicleTable = observer(
  ({ data, setParams }: TableData): React.ReactElement | null => {
    const { vehicleStore } = useRootStore();
    const [currentPage, setCurrentPage] = useState(data.page);
    const [pageSize, setPageSize] = useState(data.recordsPerPage);
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;

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

    return data.item.length ? (
      <div className="mx-auto my-8 ">
        <div className="mb-4 flex items-center">
          <label className="mr-2 text-sm text-gray-500">Filter:</label>
          <select
            name="name"
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
            {[
              '',
              'BMW',
              'FORD',
              'CITROEN',
              'PEUGEOT',
              'ALFA ROMEO',
              'RENAULT',
              'MERCEDES'
            ].map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
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
                        ? 'abrv|asc'
                        : prevParams.sort === 'abrv|desc'
                        ? 'abrv|asc'
                        : 'abrv|desc'
                  }))
                }
              >
                <div className="flex items-center justify-center gap-2">
                  Abbreviation
                  {data.sort !== 'abrv|asc' && data.sort !== 'abrv|desc' && (
                    <HiArrowsUpDown />
                  )}
                  {data.sort === 'abrv|asc' && <HiMiniArrowLongDown />}
                  {data.sort === 'abrv|desc' && <HiMiniArrowLongUp />}
                </div>
              </th>
              <th
                className="w-1/3 border px-4 py-2 text-center"
                onClick={() =>
                  setParams((prevParams) => ({
                    ...prevParams,
                    sort:
                      prevParams.sort === ''
                        ? 'name|asc'
                        : prevParams.sort === 'name|desc'
                        ? 'name|asc'
                        : 'name|desc'
                  }))
                }
              >
                Name
              </th>
              <th className="w-1/3 border px-4 py-2 text-center">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {data.item.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
              >
                <td className="border px-4 py-2">{item.abrv}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="flex justify-between border px-4 py-2">
                  {item.description}{' '}
                  {item.id && (
                    <button
                      onClick={() =>
                        item.id !== undefined && handleDelete(item.id)
                      }
                    >
                      <FaRegTrashCan
                        color="black"
                        style={{
                          backgroundColor: 'white'
                        }}
                      />
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
    );
  }
);

export default VehicleTable;
