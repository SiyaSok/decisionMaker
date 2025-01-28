/** @format */

"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Files from "./Files";
import SelectedfileData from "./SelectedfileData";

const BatachModel = ({ modelId }) => {
  const [files, setFiles] = useState([]);
  const [SelectedData, setSelectedData] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(
          `https://api.up2tom.com/v3/batch/${modelId}`,
          {
            headers: {
              "Content-Type": "application/vnd.api+json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        );
        setFiles(response.data.data.files);
        setSelectedData([]);
        setError("");
      } catch (error) {
        setError(error.response.data.errors[0].detail);
      }
    };

    fetchModels();
  }, [modelId]);

  const convertCsvToJson = (csv, delimiter = ",") => {
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(delimiter).map((header) => header.trim());

    return lines.slice(1).map((line) => {
      // Handle quoted values correctly
      const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
      const entry = {};

      headers.forEach((header, index) => {
        let value = values[index] ? values[index].trim() : "";

        // Remove surrounding quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }

        // Convert numbers automatically
        if (!isNaN(value) && value !== "") {
          value = Number(value);
        }

        entry[header] = value;
      });

      return entry;
    });
  };

  const getFileData = async (id) => {
    try {
      const response = await axios.get(
        `https://api.up2tom.com/v3/batch/${modelId}/${id}`,
        {
          headers: {
            "Content-Type": "application/vnd.api+json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      );

      const jsonData = convertCsvToJson(response.data);
      setSelectedData(jsonData);
      setError("");
    } catch (error) {
      setError(error.response.data.errors[0].detail);
    }
  };

  return (
    <div className='mt-5 mb-5'>
      {error && (
        <div className='text-white bg-red-500 mb-4 p-4 rounded'>{error}</div>
      )}{" "}
      {files.length > 0 && (
        <div className=''>
          <Files
            data={files}
            heading='Processed Files'
            getFileData={getFileData}
          />
        </div>
      )}
      {SelectedData && (
        <div className=''>
          <SelectedfileData data={SelectedData} heading='Selected File Data' />
        </div>
      )}
    </div>
  );
};

export default BatachModel;
