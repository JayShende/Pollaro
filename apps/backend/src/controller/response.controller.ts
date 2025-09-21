import e, { Request, Response } from "express";
import HttpStatus from "http-status";
import { response } from "../utils/responses";
import ApiError from "../utils/api-error";
import responseService from "../services/response.service";

const addFormResponse = async (req: Request, res: Response) => {
  try {
    const { formId, userId, answers, submissionUserId } = req.body;
    const data = {
      formId,
      userId,
      answers,
    };
    const formRepsonse = await responseService.addResponse(
      data,
      req.user?.userId!,
      submissionUserId
    );

    return response(
      res,
      HttpStatus.OK,
      "Response Added Successfully",
      formRepsonse
    );
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

const getResposnebyId = async (req: Request, res: Response) => {
  const { formId, responseId } = req.params;
  if (!formId) {
    return response(res, HttpStatus.BAD_REQUEST, "Form Id not Provided", null);
  }
  if (!responseId) {
    return response(
      res,
      HttpStatus.BAD_REQUEST,
      "Response ID not Provided",
      null
    );
  }
  try {
    const formRepsonse = await responseService.getResposnebyId(
      formId,
      responseId,
      req.user?.userId!
    );
    return response(
      res,
      HttpStatus.OK,
      "Response Fetched Successfully",
      formRepsonse
    );
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

const getTotalResponses = async (req: Request, res: Response) => {
  const { formId } = req.params;
  if (!formId) {
    return response(res, HttpStatus.BAD_REQUEST, "Form Id not Provided", null);
  }
  try {
    const totalResponses = await responseService.getTotalResponses(
      formId,
      req.user?.userId!
    );
    return response(
      res,
      HttpStatus.OK,
      "Total Responses Fetched Successfully",
      totalResponses
    );
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
  addFormResponse,
  getResposnebyId,
  getTotalResponses,
};
