import express, { Router } from "express";
import { validate } from "../middlewares/validate";

import formValidation from "../validators/form.validation";
import formController from "../controller/form.controller";
const router:Router=express.Router();

// Create Form init

router.post("/create",validate(formValidation.createForm),formController.create);

export default router;