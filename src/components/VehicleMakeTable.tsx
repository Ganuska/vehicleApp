/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { FaRegTrashCan } from 'react-icons/fa6';
import {
  HiMiniArrowLongDown,
  HiMiniArrowLongUp,
  HiArrowsUpDown
} from 'react-icons/hi2';
import { GetParamsQuery, GetVehiclesMakeResponse } from '../types';
import Pagination from './Paggination';
import { useRootStore } from '../common/utils/RootStateContext';

interface TableData {
  data: GetVehiclesMakeResponse;
  setParams: React.Dispatch<React.SetStateAction<GetParamsQuery>>;
}

const VehicleMakeTable = observer(
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
      vehicleStore.deleteOneVehicleMake(id);
    };

    return data.item.length ? (
      <div className="mx-auto my-8 ">
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
                /* eslint-disable react/no-array-index-key */
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
        No Data please create first vehicle make
      </div>
    );
  }
);

export default VehicleMakeTable;
