import { Request, Response } from "express";
import HttpStatus from "http-status";

import formService from "../services/create.service";
import { internalServerError, response } from "../utils/responses";

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

export default {
  create,
};
