/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import ModelItem from "./ModelItem";
import ModelSelector from "./ModelSelector";
import saveDecisionResult from "@/lib/saveDecisionResult";
import DecisionResult from "./DecisionResult";

const ModelForm = ({ modelId, setModeId }) => {
  const [modelType, setModelType] = useState([]);
  const [models, setModels] = useState([]);
  const [drinksType, setDrinksType] = useState([]);
  const [inputVariables, setInputVariables] = useState({});
  const [isloaded, setIsloaded] = useState(false);
  const [decisionSaved, setDecisionSaved] = useState(false);
  const [decisionResult, setDecisionResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get("https://api.up2tom.com/v3/models", {
          headers: {
            "Content-Type": "application/vnd.api+json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        });
        console.log(response.data.data);
        setModels(response.data.data);
      } catch (error) {
        setError(error.response.data.errors[0].detail);
      }
    };

    fetchModels();
  }, []);

  const handleInputChange = (event) => {
    setInputVariables({
      ...inputVariables,
      [event.target.name]: event.target.value,
    });
  };

  const getModel = async (event) => {
    event.preventDefault();
    setModeId(event.target.value);
    try {
      const response = await axios.get(
        `https://api.up2tom.com/v3/models/${event.target.value}`,
        {
          headers: {
            "Content-Type": "application/vnd.api+json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      );
      setInputVariables({});
      const attributes = response.data.data.attributes.metadata.attributes;
      setDrinksType(response.data.data.attributes.metadata.prediction);
      setModelType(attributes);
      setIsloaded(true);
      setDecisionSaved(false);
      setDecisionResult("");
      setError("");
    } catch (error) {
      setError(error.response.data.errors[0].detail);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDecisionSaved(false);
    setError("");
    setDecisionResult("");
    try {
      let data = JSON.stringify({
        data: {
          type: "scenario",
          attributes: {
            input: Object.keys(inputVariables).reduce((acc, key) => {
              if (key.startsWith("INPUTVAR")) {
                const value = inputVariables[key];
                acc[key] = isNaN(parseInt(value, 10))
                  ? value || ""
                  : parseInt(value, 10) || 0;
              }
              return acc;
            }, {}),
          },
        },
      });
      const config = {
        method: "post",
        url: `https://api.up2tom.com/v3/decision/${modelId}`,
        headers: {
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        data,
      };

      const response = await axios.request(config);
      let res = await saveDecisionResult(response.data);
      if (res.status == 201) {
        setDecisionSaved(true);
        setDecisionResult(
          res.data.newDecision.inputVariables.data.attributes.decision
        );
      }
    } catch (error) {
      setError(error.response.data.errors[0].detail);
    }
  };

  return (
    <>
      <ModelSelector options={models} handleInputChange={getModel} />
      {error && (
        <div className='text-white bg-red-500 mb-4 p-4 rounded'>{error}</div>
      )}{" "}
      {isloaded ? (
        <form className='grid grid-cols-2 gap-4' onSubmit={handleSubmit}>
          <ModelItem
            options={drinksType}
            handleInputChange={handleInputChange}
          />

          {modelType.map((i) => (
            <ModelItem
              key={i.name}
              options={i}
              handleInputChange={handleInputChange}
            />
          ))}

          <button
            type='submit'
            className='col-span-2 bg-green-500 text-white p-2 rounded w-1/2 hover:bg-green-900'>
            Submit
          </button>
        </form>
      ) : (
        ""
      )}
      {decisionSaved && (
        <>
          <DecisionResult decision={decisionResult} />
          <h3 className='text-xl font-bold mb-4'>
            Decision submitted successfully!
          </h3>
        </>
      )}
    </>
  );
};

export default ModelForm;
