import React from "react";
import Link from "next/link";

export default function Evolution() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">Evolution</h1>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        {/* Replace this with your actual graph component */}
        <div className="h-96 flex items-center justify-center text-2xl text-gray-500">
          Graph Placeholder
        </div>
      </div>
      <Link
        href="/"
        className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}
