import React from "react";

export const Table = ({ areas, onRatingChange }) => {
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
                </tr>
              </thead>
              <tbody className="bg-white">
                {areas.map((area, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      {area.areaName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <input
                        type="number"
                        value={area.rating}
                        onChange={(e) =>
                          onRatingChange(index, parseInt(e.target.value, 10))
                        }
                        className="w-full text-center"
                        min="0"
                        max="5"
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
