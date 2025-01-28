/** @format */

import { useState } from "react";

const Files = ({ data, getFileData }) => {
  const dateConverter = (dateString) => {
    if (!dateString) return "Invalid date";
    const date = new Date(dateString);

    if (isNaN(date)) return "Invalid date";

    const readableDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });
    return readableDate;
  };

  const [selectedFileId, setSelectedFileId] = useState(null);

  const handleSelectChange = (event) => {
    setSelectedFileId(event.target.value);
    getFileData(event.target.value);
    console.log(`Selected file ${event.target.value}`);
  };

  const selectedFile = data?.find((file) => file.id === selectedFileId);

  return (
    <div className='mt-5'>
      <h2 className='text-lg font-bold text-gray-800 mb-4'>Files</h2>
      <div className='border border-gray-200 rounded-lg shadow-md p-4'>
        <label
          htmlFor='file-select'
          className='block mb-2 text-gray-700 font-medium'>
          Select a File:
        </label>
        <select
          id='file-select'
          className='w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200'
          onChange={handleSelectChange}
          defaultValue=''>
          <option value='' disabled>
            -- Choose a file --
          </option>
          {data?.map((file) => (
            <option key={file.id} value={file.id}>
              {file.filename || "Unnamed File"}
            </option>
          ))}
        </select>

        {/* File Details */}
        {selectedFile ? (
          <div className='mt-4 bg-green-50 p-4 rounded-md'>
            <p>
              <span className='font-semibold'>File name:</span>{" "}
              {selectedFile.filename || "N/A"}
            </p>
            <p>
              <span className='font-semibold'>Date /Time:</span>{" "}
              {dateConverter(selectedFile.timestamp)}
            </p>
            {selectedFile.errors && (
              <p>
                <span className='font-semibold'>Error:</span>{" "}
                {selectedFile.errors?.[0]?.value || "No error info"}
              </p>
            )}
            <p>
              <span className='font-semibold'>Size:</span>{" "}
              {selectedFile.size || "Unknown size"} kb
            </p>
          </div>
        ) : (
          <p className='mt-4 text-gray-500 italic'>No file selected.</p>
        )}
      </div>
    </div>
  );
};

export default Files;
