import z from "zod";

export const QuestionSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" }),
});

export const MultipleChoiceSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" }),
  options: z.array(
    z.object({
      text: z
        .string()
        .min(1, { message: "Option text is required" })
        .max(50, { message: "Option must not exceed 50 characters" }),
    })
  ),
});

export const CheckboxSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" }),
  options: z.array(
    z.object({
      text: z
        .string()
        .min(1, { message: "Option text is required" })
        .max(50, { message: "Option must not exceed 50 characters" }),
    })
  ),
});

export const DropdownSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" }),
  options: z.array(
    z.object({
      text: z
        .string()
        .min(1, { message: "Option text is required" })
        .max(50, { message: "Option must not exceed 50 characters" }),
    })
  ),
});

export const FileUploadSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" }),
});
