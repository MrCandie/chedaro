import { NextResponse } from "next/server";

export const sendBadRequestResponse = (message, data = {}, code) => {
  return NextResponse.json(
    {
      status: "error",
      statusCode: code || 400,
      message: message,
      data: data,
    },
    {
      status: code || 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
};

export const sendServerErrorResponse = (data = {}, message) => {
  return NextResponse.json(
    {
      status: "error",
      statusCode: 500,
      message: message || "Something went wrong... Try again",
      data: data,
    },
    {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
};

export const sendSuccessResponse = (message, data = {}, code) => {
  return NextResponse.json(
    {
      status: "success",
      statusCode: code || 200,
      message: message,
      data: data,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
};
