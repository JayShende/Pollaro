import express, { Router } from "express";
import { validate } from "../middlewares/validate";
import questionValidation from "../validators/question.validation";
import questionController from "../controller/question.controller";

const router: Router = express.Router();

router.post(
  "/addShortAnswer",
  validate(questionValidation.shortAnswer),
  questionController.addShortAnswer
);
router.post(
  "/addLongAnswer",
  validate(questionValidation.longAnswer),
  questionController.addLongAnswer
);
router.post(
  "/addMultipleChoice",
  validate(questionValidation.multipleChoice),
  questionController.addMultipleChoice
);

router.post(
  "/addCheckBox",
  validate(questionValidation.checkBox),
  questionController.addCheckBox
);

router.post(
  "/addDropDown",
  validate(questionValidation.dropDown),
  questionController.addDropDown
);

router.post(
  "/addFileUpload",
  validate(questionValidation.fileUpload),
  questionController.addFileUplaod
);

export default router;
