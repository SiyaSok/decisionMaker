/** @format */

import React from "react";

const DecisionResult = ({ decision }) => {
  return (
    <div className='text-white bg-blue-500 my-5 p-4 rounded'>
      <h2>Decision:</h2>
      <p className='my-2'>{decision}</p>
      <h2 className='text-xl font-bold my-4 '>
        Decision submitted successfully!
      </h2>
    </div>
  );
};

export default DecisionResult;
