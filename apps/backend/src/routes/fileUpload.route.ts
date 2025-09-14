import express, { Router } from "express";
import fileUploadController from "../controller/fileUpload.controller";
import { validate } from "../middlewares/validate";
import fileUploadValidation from "../validators/fileUpload.validation";
const router: Router = express.Router();

router.post(
  "/upload",
  validate(fileUploadValidation.fileUpload),
  fileUploadController.uploadFile
);

export default router;
