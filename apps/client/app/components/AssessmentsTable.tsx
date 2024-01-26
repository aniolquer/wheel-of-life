import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

const AssessmentsTable = () => {
  const [assessments, setAssessments] = useState([
    { id: 1, name: "Assessment #1", date: "12/01/2020" },
    { id: 2, name: "Assessment #2", date: "14/10/2021" },
    { id: 3, name: "Assessment #3", date: "13/07/2022" },
  ]);
  const [editId, setEditId] = useState(null);
  const [editedName, setEditedName] = useState("");

  const handleEdit = (assessment) => {
    setEditId(assessment.id);
    setEditedName(assessment.name);
  };

  const handleDelete = (id) => {
    setAssessments(assessments.filter((assessment) => assessment.id !== id));
  };

  const handleSave = (id) => {
    setAssessments(
      assessments.map((assessment) => {
        if (assessment.id === id) {
          return { ...assessment, name: editedName };
        }
        return assessment;
      })
    );
    setEditId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className=" divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Assessment
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Edit
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assessments.map((assessment) => (
            <tr key={assessment.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {editId === assessment.id ? (
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onBlur={() => handleSave(assessment.id)}
                    autoFocus
                  />
                ) : (
                  assessment.name
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  type="button"
                  onClick={() => handleEdit(assessment)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <PencilIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {assessment.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  type="button"
                  onClick={() => handleDelete(assessment.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssessmentsTable;
