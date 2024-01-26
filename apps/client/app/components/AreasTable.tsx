import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

export const AreasTable = ({
  areas,
  onRatingChange,
  onRemoveArea,
  onEdit,
  editingIndex,
}) => {
  return (
    <div className="w-3/5 px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                  >
                    Area
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Rating
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {areas.map((area, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {area.areaName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingIndex === index ? (
                        <input
                          type="number"
                          autoFocus
                          value={area.rating}
                          onBlur={() => onEdit(null)}
                          onChange={(e) =>
                            onRatingChange(index, parseInt(e.target.value, 10))
                          }
                          className="w-full text-center border-none focus:ring-0"
                          min="0"
                          max="10"
                        />
                      ) : (
                        <span onClick={() => onEdit(index)}>{area.rating}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <PencilIcon
                        onClick={() => onEdit(index)}
                        className="h-5 w-5 text-gray-400 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <TrashIcon
                        onClick={() => onRemoveArea(index)}
                        className="h-5 w-5 text-gray-400 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
