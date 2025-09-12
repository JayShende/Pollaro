import { Request, Response } from "express";
import HttpStatus from "http-status";

import formService from "../services/form.service";
import { internalServerError, response } from "../utils/responses";
import ApiError from "../utils/api-error";

const create = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const form = await formService.createForm(body);
    return response(res, HttpStatus.OK, "Form Created Successfully", form);
  } catch (error) {
    console.log(error);
    return internalServerError(res, "Error in Creating Form");
  }
};

const getForm = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    const form = await formService.getForm(formId as string, req.user?.userId!);
    return response(res, HttpStatus.OK, "Form fetched SuccessFully", form);
  } catch (error) {
    if (error instanceof ApiError) {
      return response(res, error.statusCode, error.message, null);
    }
    return response(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      null
    );
  }
};

const getFormMetaData = async (req: Request, res: Response) => {
  try {
    const metaData = await formService.getFormMetaData(req.user?.userId!);
    return response(res, HttpStatus.OK, "Form fetched SuccessFully", metaData);
  } catch (error) {
    if (error instanceof ApiError) {
      return response(res, error.statusCode, error.message, null);
    }
    return response(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      null
    );
  }
};

export default {
  create,
  getForm,
  getFormMetaData
};
