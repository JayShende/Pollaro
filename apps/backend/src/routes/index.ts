import express, { Router } from "express";

const router: Router = express.Router();

import appRoute from "./app.route";
import formRoute from "./form.route";
import questionRoute from "./question.route";

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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
