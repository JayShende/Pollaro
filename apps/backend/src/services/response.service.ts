import { client } from "@repo/db/client";
import ApiError from "../utils/api-error";
import httpStatus from "http-status";

interface optionsProps {
  answerId: string;
  optionId: string;
}

interface answersProps {
  responseId: string;
  questionId: string;
  text?: string;
  files: string[];
  options?: optionsProps[];
}

interface addResponseProps {
  formId: string;
  userId: string;
  answers: answersProps[];
}

const addResponse = async (
  data: addResponseProps,
  userId: string,
  submissionUserId?: string
) => {
  // check if the user has submited the resposne -> when we implement login to add response

  // check if form Exists

  const form = await client.form.findUnique({
    where: {
      id: data.formId,
    },
  });

  if (form === null) {
    throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
  }

  // add the Repsonse

  const formResponse = await client.response.create({
    data: {
      formId: data.formId,
      userId: submissionUserId ?? userId,
      answers: {
        create: data.answers.map((ans) => ({
          questionId: ans.questionId,
          text: ans.text,
          files: ans.files,
          options: ans.options
            ? {
                create: ans.options.map((opt) => ({
                  optionId: opt.optionId,
                })),
              }
            : undefined,
        })),
      },
    },
    include: {
      answers: {
        include: { options: true },
      },
    },
  });

  return formResponse;
};

const getResposnebyId = async (
  formId: string,
  responseId: string,
  userId: string
) => {
  //check if the form exist or not
  const checkForm = await client.form.findUnique({
    where: {
      id: formId,
    },
  });
  if (checkForm === null) {
    throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
  }

  //  check if the Resposne exist or not
  const checkResponse = await client.response.findUnique({
    where: {
      id: responseId,
    },
  });

  if (checkResponse === null) {
    throw new ApiError(httpStatus.NOT_FOUND, "Response Not Found");
  }

  // check if the resposne belong to the form or not

  if (checkResponse.formId != formId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "The Resposne Dont Belong to the Form"
    );
  }

  // check if the user Owns the Form or Not
  if (checkForm.ownerId != userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You Don't Own The Form ");
  }

  // proceed Fetching the Response
  const formResponse = await client.response.findUnique({
    where: { id: responseId },
    select: {
      id: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      form: {
        select: {
          id: true,
          title: true,
          description: true,
          questions: {
            orderBy: { order: "asc" }, // keep consistent order
            select: {
              id: true,
              text: true,
              type: true,
              required: true,
              order: true,
              options: {
                select: {
                  id: true,
                  text: true, // ✅ return option label
                },
              },
              answers: {
                where: { responseId },
                select: {
                  id: true,
                  text: true,
                  files: true,
                  options: {
                    select: {
                      option: {
                        select: {
                          id: true,
                          text: true, // ✅ include option label for selected
                        },
                      },
                    },
                  },
                  createdAt: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return formResponse;
};

const getTotalResponses = async (formId: string, userId: string) => {
  try {
    // check if the form exists
    const form = await client.form.findUnique({
      where: { id: formId },
      include: {
        questions: {
          orderBy: { order: "asc" },
          include: { options: true },
        },
      },
    });
    if (form === null) {
      throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
    } // check if the user is the owner of the form
    if (form.ownerId !== userId) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You Don't Own The Form");
    }
    // get the total responses
    // 2. Get all responses with answers
    const responses = await client.response.findMany({
      where: { formId },
      include: {
        user: { select: { id: true, name: true, email: true } },
        answers: {
          include: {
            options: { include: { option: true } },
            question: true,
          },
        },
      },
    });

    // 3. Merge each response’s answers into questions
    return responses.map((resp) => ({
      id: resp.id,
      createdAt: resp.createdAt,
      user: resp.user,
      questions: form.questions.map((q) => ({
        id: q.id,
        text: q.text,
        type: q.type,
        required: q.required,
        order: q.order,
        options: q.options.map((o) => ({ id: o.id, text: o.text })),
        answers: resp.answers
          .filter((a) => a.questionId === q.id)
          .map((a) => ({
            id: a.id,
            text: a.text,
            files: a.files,
            createdAt: a.createdAt,
            options: a.options.map((opt) => ({
              option: { id: opt.option.id, text: opt.option.text },
            })),
          })),
      })),
    }));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
};

export default {
  addResponse,
  getResposnebyId,
  getTotalResponses,
};
