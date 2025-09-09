import express, { Router } from "express";
import { validate } from "../middlewares/validate";

import formValidation from "../validators/create.validation";
import formController from "../controller/form.controller";
const router: Router = express.Router();

// Create Form init

router.post(
  "/createForm",
  validate(formValidation.createForm),
  formController.create
);

router.get("/getForm/:formId", formController.getForm);

export default router;
