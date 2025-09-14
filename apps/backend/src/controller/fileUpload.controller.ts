import { Request, Response } from "express";
import HttpStatus from "http-status";
import { response } from "../utils/responses";
import ApiError from "../utils/api-error";
import fileUploadService from "../services/fileUpload.service";

const uploadFile = async (req: Request, res: Response) => {
  try {
    const { fileName, fileType, folder } = req.body;
    const data = {
      fileName,
      fileType,
      folder,
    };
    const file = await fileUploadService(data);
    return response(res, HttpStatus.OK, "Presigned URL generated successfully", file);
  } catch (error) {
    if (error instanceof ApiError) {
      return response(res, error.statusCode, error.message, null);
    }
    return response(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error",
      null
    );
  }
};

export default { uploadFile };