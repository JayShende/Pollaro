import express, { Router } from "express";
import { validate } from "../middlewares/validate";

import formValidation from "../validators/create.validation";
import formController from "../controller/create.controller";
const router:Router=express.Router();

// Create Form init

router.post("/createForm",validate(formValidation.createForm),formController.create);



export default router;