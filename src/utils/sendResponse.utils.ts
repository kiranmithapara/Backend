import { Response } from "express";

interface ResponseType {
  success: boolean;

  message?: string;

  data?: any;
}

export const sendResponse = (
  res: Response,

  statusCode: number,

  response: ResponseType,
) => {
  return res.status(statusCode).json({
    success: response.success,

    message: response.message,

    data: response.data,
  });
};
