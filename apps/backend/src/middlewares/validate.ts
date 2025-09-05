// middlewares/validate.ts
import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // parseAsync gives better error handling for async checks too
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next(); // if validation passes
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors, // Zod provides detailed errors
      });
    }
  };
