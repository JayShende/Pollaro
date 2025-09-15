import express, { Router } from "express";

const router: Router = express.Router();

import appRoute from "./app.route";
import formRoute from "./form.route";
import questionRoute from "./question.route";
import responseRoute from "./response.route";
import fileRoute from "./file.route";

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
    path: "/file",
    route: fileRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
