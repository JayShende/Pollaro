import express, { Router } from "express";
import { validate } from "../middlewares/validate";

import formValidation from "../validators/create.validation";
import formController from "../controller/form.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router: Router = express.Router();

// Create Form init

router.post(
  "/createForm",
  authMiddleware,
  validate(formValidation.createForm),
  formController.create
);

// this is an Public Route
router.get("/getForm/:formId", formController.getForm);

router.get("/", authMiddleware, formController.getFormMetaData);

router.get("/checkOwner/:formId", authMiddleware, formController.checkOwner);

router.get("/info/:formId", authMiddleware, formController.getFormInfo);

router.put(
  "/info/:formId",
  validate(formValidation.updateFormInfo),
  authMiddleware,
  formController.updateFormInfo
);

router.get(
  "/questions/:formId",
  authMiddleware,
  formController.getFormQuestions
);

export default router;
