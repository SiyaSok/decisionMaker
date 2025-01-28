/** @format */

import axios from "axios";

const saveDecisionResult = async (inputVariables) => {
  try {
    let data = JSON.stringify({
      inputVariables,
    });

    let config = {
      method: "post",
      url: "/api/decisions",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error fetching models:", error);
  }

  return response.data;
};

export default saveDecisionResult;
