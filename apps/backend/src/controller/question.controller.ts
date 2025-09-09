import { Request, Response } from "express";
import HttpStatus from "http-status";
import { response } from "../utils/responses";
import questionService from "../services/question.service";

const addShortAnswer = async (req: Request, res: Response) => {
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
};

const addLongAnswer = async (req: Request, res: Response) => {
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
};

const addMultipleChoice = async (req: Request, res: Response) => {
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

  const form = await questionService.addMultipleChoice(data, req.user?.userId!);
  return response(res, HttpStatus.OK, "Question Added Successfully", form);
};

const addCheckBox = async (req: Request, res: Response) => {
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
};

const addDropDown = async (req: Request, res: Response) => {
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
};

const addFileUplaod = async (req: Request, res: Response) => {
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
};

export default {
  addShortAnswer,
  addLongAnswer,
  addMultipleChoice,
  addCheckBox,
  addDropDown,
  addFileUplaod,
};
