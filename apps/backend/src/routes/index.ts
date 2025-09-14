import express, { Router } from "express";

const router: Router = express.Router();

import appRoute from "./app.route";
import formRoute from "./form.route";
import questionRoute from "./question.route";
import responseRoute from "./response.route";
import fileUploadRoute from "./fileUpload.route";

const defaultRoutes = [
  {
    path: "/app",
    route: appRoute,
  },
  {
    path: "/form",
    route: formRoute,
  },
  {
    path: "/question",
    route: questionRoute,
  },
  {
    path: "/response",
    route: responseRoute,
  },
  {
    path: "/fileUpload",
    route: fileUploadRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
