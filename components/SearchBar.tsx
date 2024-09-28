import React from 'react';

export default function SearchBar() {
  return (
    <div className="mb-6">
      <input 
        type="text" 
        placeholder="Search courses" 
        className="p-2 border rounded"
      />
      <button className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Search
      </button>
    </div>
  );
}