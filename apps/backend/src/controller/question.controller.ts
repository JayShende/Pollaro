import { Request, Response } from "express";
import HttpStatus from "http-status";
import { response } from "../utils/responses";
import questionService from "../services/question.service";
import ApiError from "../utils/api-error";

const addShortAnswer = async (req: Request, res: Response) => {
  try {
    const { text, type, formId, order } = req.body;
    let required = true;
    if (req.body.required == undefined) {
      required = false;
    }
    const data = {
      text,
      type,
      formId,
      order,
      required,
    };

    const form = await questionService.addShortAnswer(data, req.user?.userId!);

    return response(res, HttpStatus.OK, "Question Added Successfully", form);
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

const addLongAnswer = async (req: Request, res: Response) => {
  try {
    const { text, type, formId, order } = req.body;
    let required = true;
    if (req.body.required == undefined) {
      required = false;
    }
    const data = {
      text,
      type,
      formId,
      order,
      required,
    };

    const form = await questionService.addLongAnswer(data, req.user?.userId!);
    return response(res, HttpStatus.OK, "Question Added Successfully", form);
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

const addMultipleChoice = async (req: Request, res: Response) => {
  try {
    const { text, type, formId, order, options } = req.body;
    let required = true;
    if (req.body.required == undefined) {
      required = false;
    }
    const data = {
      text,
      type,
      formId,
      order,
      required,
      options,
    };

    const form = await questionService.addMultipleChoice(
      data,
      req.user?.userId!
    );
    return response(res, HttpStatus.OK, "Question Added Successfully", form);
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

const addCheckBox = async (req: Request, res: Response) => {
  try {
    const { text, type, formId, order, options } = req.body;
    let required = true;
    if (req.body.required == undefined) {
      required = false;
    }
    const data = {
      text,
      type,
      formId,
      order,
      required,
      options,
    };

    const form = await questionService.addCheckBox(data, req.user?.userId!);
    return response(res, HttpStatus.OK, "Question Added Successfully", form);
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

const addDropDown = async (req: Request, res: Response) => {
  try {
    const { text, type, formId, order, options } = req.body;
    let required = true;
    if (req.body.required == undefined) {
      required = false;
    }
    const data = {
      text,
      type,
      formId,
      order,
      required,
      options,
    };

    const form = await questionService.addDropDown(data, req.user?.userId!);
    return response(res, HttpStatus.OK, "Question Added Successfully", form);
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

const addFileUplaod = async (req: Request, res: Response) => {
  try {
    const { text, type, formId, order } = req.body;
    let required = true;
    if (req.body.required == undefined) {
      required = false;
    }
    const data = {
      text,
      type,
      formId,
      order,
      required,
    };

    const form = await questionService.addFileUplaod(data, req.user?.userId!);
    return response(res, HttpStatus.OK, "Question Added Successfully", form);
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

// Delete an Question

const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { questionId, formId } = req.params;
    if (!questionId) {
      return response(res, HttpStatus.BAD_REQUEST, "Not Question ID Provided");
    }
    if (!formId) {
      return response(res, HttpStatus.BAD_REQUEST, "Not formId Provided");
    }
    const data = {
      questionId,
      formId,
    };

    const question = await questionService.deleteQuestion(
      data,
      req.user?.userId!
    );
    return response(
      res,
      HttpStatus.OK,
      "Question Delete SuccessFully",
      question
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

export default {
  addShortAnswer,
  addLongAnswer,
  addMultipleChoice,
  addCheckBox,
  addDropDown,
  addFileUplaod,

  deleteQuestion,
};
