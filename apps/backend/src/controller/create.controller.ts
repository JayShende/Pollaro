import { Request, Response } from "express";
import HttpStatus from "http-status";

import formService from "../services/create.service";
import { response } from "../utils/responses";

const create = async (req: Request, res: Response) => {
  const body = req.body;
  const form = await formService.createForm(body);
  return response(res, HttpStatus.OK, "Form Created Successfully", form);
};

export default {
  create,
};
