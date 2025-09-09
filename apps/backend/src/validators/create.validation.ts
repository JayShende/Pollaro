import { z } from "zod";

const createForm = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(100, { message: "Title must not exceed 100 characters" }),

    description: z
      .string()
      .min(3, { message: "Description must be at least 3 characters long" })
      .max(200, { message: "Description must not exceed 200 characters" }),

    ownerId: z.string().min(1, { message: "Owner ID is required" }),
  }),
});

export default { createForm };
