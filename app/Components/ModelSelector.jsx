/** @format */

"use client";
import React from "react";

export default function ModelSelector({ options, handleInputChange }) {
  if (!options) {
    return null;
  }
  return (
    <div className='mb-4'>
      <>
        <select
          name={options.name}
          className='block w-full
           px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300
           rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          onChange={handleInputChange}>
          <option value=''>Select a model</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.attributes.name}
            </option>
          ))}
        </select>
      </>
    </div>
  );
}
