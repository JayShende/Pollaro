import { z } from "zod";

export const resposneSchema = z.object({
  formId: z.string({ message: "formId must be a valid String" }),
  submissionUserId: z
    .string({ message: "submissionUserId must be a valid String" })
    .optional()
    .nullable(),

  answers: z.array(
    z.object({
      questionId: z.string({ message: "questionId must be a valid String" }),

      text: z.string({ message: "text must be a valid String" }).optional(),
      files: z
        .array(z.string({ message: "Each file must be a valid URL" }))
        .optional(),

      options: z
        .array(
          z.object({
            optionId: z.string({
              message: "optionId must be a valid String",
            }),
          })
        )
        .optional(),
    })
  ),
});

// Dynamic form schema generator based on questions
export const createFormSchema = (
  questions: Array<{
    id: string;
    type: string;
    text: string;
    required: boolean;
  }>
) => {
  const fields: Record<string, z.ZodTypeAny> = {};

  questions.forEach((question) => {
    const fieldName = `question_${question.id}`;

    switch (question.type) {
      case "SHORT_ANSWER":
      case "LONG_ANSWER":
        fields[fieldName] = question.required
          ? z.string().min(1, `${question.text} is required`)
          : z.string().optional();
        break;
      case "MULTIPLE_CHOICE":
        fields[fieldName] = question.required
          ? z.string().min(1, `${question.text} is required`)
          : z.string().optional();
        break;
      case "CHECKBOX":
        fields[fieldName] = z.array(z.string()).optional();
        break;
      case "DROPDOWN":
        fields[fieldName] = question.required
          ? z.string().min(1, `${question.text} is required`)
          : z.string().optional();
        break;
      case "FILE_UPLOAD":
        fields[fieldName] = z.array(z.any()).optional();
        break;
      default:
        fields[fieldName] = z.string().optional();
    }
  });

  return z.object(fields);
};

// export default {
//   resposneSchema,
// };
