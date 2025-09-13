import express, { Router } from "express";
import { validate } from "../middlewares/validate";
import questionValidation from "../validators/question.validation";
import questionController from "../controller/question.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router: Router = express.Router();

router.post(
  "/addShortAnswer",
  authMiddleware,
  validate(questionValidation.shortAnswer),
  questionController.addShortAnswer
);
router.post(
  "/addLongAnswer",
  authMiddleware,
  validate(questionValidation.longAnswer),
  questionController.addLongAnswer
);
router.post(
  "/addMultipleChoice",
  authMiddleware,
  validate(questionValidation.multipleChoice),
  questionController.addMultipleChoice
);

router.post(
  "/addCheckBox",
  authMiddleware,
  validate(questionValidation.checkBox),
  questionController.addCheckBox
);

router.post(
  "/addDropDown",
  authMiddleware,
  validate(questionValidation.dropDown),
  questionController.addDropDown
);

router.post(
  "/addFileUpload",
  authMiddleware,
  validate(questionValidation.fileUpload),
  questionController.addFileUplaod
);

// Delete Question
router.delete(
  "/delete/:formId/:questionId",
  authMiddleware,
  validate(questionValidation.deleteQuestion),
  questionController.deleteQuestion
);

// Edit Question
//  The Edit Question Will Also Have The EndPoint to Update / Delete the Options

export default router;
