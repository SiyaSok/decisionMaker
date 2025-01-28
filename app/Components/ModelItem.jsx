/** @format */

"use client";

import React from "react";

export default function ModelItem({ options, handleInputChange }) {
  if (!options || !options.domain) {
    return null;
  }
  let type = options.type === "Nominal";
  return (
    <div className='mb-4'>
      {type ? (
        <>
          <select
            name={options.name}
            className='border border-gray-300 p-2 rounded w-full'
            onChange={handleInputChange}>
            <option value=''>{options.question}</option>
            {options?.domain?.values?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <select
            name={options.name}
            className='border border-gray-300 p-2 rounded w-full'
            onChange={handleInputChange}>
            <option value=''>{options.question}</option>

            {Array.from(
              {
                length:
                  parseInt(options.domain.upper) -
                  parseInt(options.domain.lower) +
                  1,
              },
              (_, i) => {
                // Calculate the value to display, accounting for the lower domain value
                const value = parseInt(options.domain.lower) + i;
                return (
                  <option key={i} value={value}>
                    {value}
                  </option>
                );
              }
            )}
          </select>
        </>
      )}
    </div>
  );
}
