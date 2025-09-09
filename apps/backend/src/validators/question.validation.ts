import { z } from "zod";

const shortAnswer = z.object({
  body: z.object({
    text: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(100, { message: "Title must not exceed 100 characters" }),
    type: z.enum(
      [
        "SHORT_ANSWER",
        "LONG_ANSWER",
        "MULTIPLE_CHOICE",
        "CHECKBOX",
        "DROPDOWN",
        "FILE_UPLOAD",
      ],
      { message: "No Enum Given" }
    ),
    formId: z.string(),
    order: z.number().int().min(1, { message: "Order must be at least 1" }),
    required: z.boolean().optional(),
  }),
});

const longAnswer = z.object({
  body: z.object({
    text: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(100, { message: "Title must not exceed 100 characters" }),
    type: z.enum([
      "SHORT_ANSWER",
      "LONG_ANSWER",
      "MULTIPLE_CHOICE",
      "CHECKBOX",
      "DROPDOWN",
      "FILE_UPLOAD",
    ]),
    formId: z.string(),
    order: z.number().int().min(1, { message: "Order must be at least 1" }),
    required: z.boolean().optional(),
  }),
});

const multipleChoice = z.object({
  body: z.object({
    text: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(100, { message: "Title must not exceed 100 characters" }),

    type: z.enum([
      "SHORT_ANSWER",
      "LONG_ANSWER",
      "MULTIPLE_CHOICE",
      "CHECKBOX",
      "DROPDOWN",
      "FILE_UPLOAD",
    ]),
    formId: z.string({ message: "formId must be a valid UUID" }),
    order: z.number().int().min(1, { message: "Order must be at least 1" }),
    required: z.boolean().optional(),
    options: z
      .array(
        z.object({
          text: z
            .string()
            .min(1, { message: "Option text is required" })
            .max(50, { message: "Option must not exceed 50 characters" }),
        })
      )
      .min(1, { message: "At least one option is required" }),
  }),
});

const checkBox = z.object({
  body: z.object({
    text: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(100, { message: "Title must not exceed 100 characters" }),

    type: z.enum([
      "SHORT_ANSWER",
      "LONG_ANSWER",
      "MULTIPLE_CHOICE",
      "CHECKBOX",
      "DROPDOWN",
      "FILE_UPLOAD",
    ]),
    formId: z.string({ message: "formId must be a valid UUID" }),
    order: z.number().int().min(1, { message: "Order must be at least 1" }),
    required: z.boolean().optional(),
    options: z
      .array(
        z.object({
          text: z
            .string()
            .min(1, { message: "Option text is required" })
            .max(50, { message: "Option must not exceed 50 characters" }),
        })
      )
      .min(1, { message: "At least one option is required" }),
  }),
});

const dropDown = z.object({
  body: z.object({
    text: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(100, { message: "Title must not exceed 100 characters" }),

    type: z.enum([
      "SHORT_ANSWER",
      "LONG_ANSWER",
      "MULTIPLE_CHOICE",
      "CHECKBOX",
      "DROPDOWN",
      "FILE_UPLOAD",
    ]),
    formId: z.string({ message: "formId must be a valid UUID" }),
    order: z.number().int().min(1, { message: "Order must be at least 1" }),
    required: z.boolean().optional(),
    options: z
      .array(
        z.object({
          text: z
            .string()
            .min(1, { message: "Option text is required" })
            .max(50, { message: "Option must not exceed 50 characters" }),
        })
      )
      .min(1, { message: "At least one option is required" }),
  }),
});

const fileUpload = z.object({
  body: z.object({
    text: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(100, { message: "Title must not exceed 100 characters" }),
    type: z.enum([
      "SHORT_ANSWER",
      "LONG_ANSWER",
      "MULTIPLE_CHOICE",
      "CHECKBOX",
      "DROPDOWN",
      "FILE_UPLOAD",
    ]),
    formId: z.string(),
    order: z.number().int().min(1, { message: "Order must be at least 1" }),
    required: z.boolean().optional(),
  }),
});

const deleteQuestion = z.object({
  params: z.object({
    formId: z.string({ message: "FormId Should be a String" }),
    questionId: z.string({ message: "QuestionID Should be a String" }),
  }),
});

export default {
  shortAnswer,
  longAnswer,
  multipleChoice,
  checkBox,
  dropDown,
  fileUpload,
  deleteQuestion,
};
