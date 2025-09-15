import express, { Router } from "express";
import fileUploadController from "../controller/file.controller";
import { validate } from "../middlewares/validate";
import fileUploadValidation from "../validators/file.validation";
const router: Router = express.Router();

router.post(
  "/upload",
  validate(fileUploadValidation.fileUpload),
  fileUploadController.uploadFile
);
router.post(
  "/delete",
  validate(fileUploadValidation.fileDelete),
  fileUploadController.deleteFile
);

export default router;
