import React, { useState } from "react";

export const AddAreaForm = ({ onAddArea }) => {
  const [newAreaName, setNewAreaName] = useState("");
  const [newAreaRating, setNewAreaRating] = useState(0);

  const handleNewAreaNameChange = (e) => setNewAreaName(e.target.value);
  const handleNewAreaRatingChange = (e) =>
    setNewAreaRating(Number(e.target.value));

  const handleSubmit = () => {
    onAddArea(newAreaName, newAreaRating);
    // Optionally, reset the input fields
    setNewAreaName("");
    setNewAreaRating(0);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="New Area Name"
        value={newAreaName}
        onChange={handleNewAreaNameChange}
        className="border border-gray-300 m-1"
      />
      <input
        type="number"
        placeholder="Rating"
        value={newAreaRating}
        onChange={handleNewAreaRatingChange}
        className="border border-gray-300 m-1"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded m-1"
      >
        Add Area
      </button>
    </div>
  );
};
