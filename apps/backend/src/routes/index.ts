import express, { Router } from "express";

const router:Router=express.Router();

import appRoute from "./app.route"

const defaultRoutes=[
    {
        path:"/app",
        route:appRoute
    }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
  console.log("Hello");
});

export default router;