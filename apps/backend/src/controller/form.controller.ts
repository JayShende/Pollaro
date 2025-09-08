import { Request, Response } from "express";
import HttpStatus from "http-status";

import formService from "../services/form.service";
import { response } from "../utils/responses";

const create = async (req: Request, res: Response) => {
  const body = req.body;
  const form = await formService.create(body);
  return response(res, HttpStatus.OK, "Form Created Successfully",form);
};


export default{
    create
}
