/** @format */

import { NextResponse } from "next/server";
import Decision from "../../../lib/models/decision";
import connect from "@/lib/db";

export const GET = async () => {
  try {
    await connect();
    const decision = await Decision.find();
    return new NextResponse(JSON.stringify(decision), { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse("Error in fetching decision: " + error.message, {
        status: 500,
      });
    }
    return new NextResponse("An unknown error occurred.", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    const body = await request.json();

    const { inputVariables } = body;

    await connect();

    const decision = new Decision({ inputVariables });
    let newDecision = await decision.save();
    return new NextResponse(JSON.stringify({ newDecision }), { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse("Error in adding a decision: " + error.message, {
        status: 500,
      });
    }

    return new NextResponse("An unknown error occurred.", { status: 500 });
  }
};
