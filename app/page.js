/** @format */
"use client";
// pages/index.js
import React, { useState } from "react";
import Head from "next/head";
import ModelForm from "./Components/ModelForm";
import DecisionResult from "./Components/DecisionResult";
import BatachModel from "./Components/BatchModel";

export default function Home() {
  const [modelId, setModeId] = useState("");

  return (
    <div className='container mx-auto p-4 min-h-screen'>
      <Head>
        <title>Decision Maker</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <ModelForm modelId={modelId} setModeId={setModeId} />
        {modelId && <BatachModel modelId={modelId} />}
      </main>
    </div>
  );
}
