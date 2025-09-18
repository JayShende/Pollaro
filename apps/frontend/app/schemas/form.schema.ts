import z from "zod";

export const BlankFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" }),

  description: z
    .string()
    .max(200, { message: "Description must not exceed 200 characters" })
    .optional(),
});
