import express, { Router } from "express";
import { validate } from "../middlewares/validate";
import responseValidation from "../validators/response.validation";
import responseController from "../controller/response.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router: Router = express.Router();

router.post(
  "/addResponse",
  validate(responseValidation.resposne),
  responseController.addFormResponse
);

//  get Resposne By ID
router.get(
  "/getResponse/:formId/:responseId",
  authMiddleware,
  responseController.getResposnebyId
);
// get all Resposne per form
router.get(
  "/getTotalResponses/:formId",
  authMiddleware,
  responseController.getTotalResponses
);

export default router;
