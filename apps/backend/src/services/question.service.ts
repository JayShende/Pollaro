import { client } from "@repo/db/client";
import { handlePrismaError } from "../utils/prismaErrorHandler";
import ApiError from "../utils/api-error";
import httpStatus from "http-status";
interface AnswerProps {
  text: string;
  type: string;
  formId: string;
  required?: boolean;
  order: number;
}

interface option {
  text: string;
}

interface optionsProps {
  text: string;
  type: string;
  formId: string;
  required?: boolean;
  order: number;
  options: option[];
}

interface deleteQuestionProps {
  questionId: string;
  formId: string;
}

/**
 * Add an Question of Type Short Answer
 */

const addShortAnswer = async (data: AnswerProps, userId: string) => {
  // check if form exist
  const check = await client.form.findUnique({
    where: {
      id: data.formId,
    },
  });
  if (check === null) {
    throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
  }

  // check if the form is owned by the current user or not
  if (check.ownerId != userId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorised You Don't Own The Form "
    );
  }

  const question = await client.question.create({
    data: {
      text: data.text,
      type: "SHORT_ANSWER",
      formId: data.formId,
      required: data.required,
      order: data.order,
    },
  });

  return question;
};

const addLongAnswer = async (data: AnswerProps, userId: string) => {
  // check if form exist
  const check = await client.form.findUnique({
    where: {
      id: data.formId,
    },
  });
  if (check === null) {
    throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
  }

  // check if the form is owned by the current user or not
  if (check.ownerId != userId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorised You Don't Own The Form "
    );
  }

  // Proceed with the Addition of Question
  const question = await client.question.create({
    data: {
      text: data.text,
      type: "LONG_ANSWER",
      formId: data.formId,
      required: data.required,
      order: data.order,
    },
  });
  return question;
};

const addMultipleChoice = async (data: optionsProps, userId: string) => {
  // check if form exist
  const check = await client.form.findUnique({
    where: {
      id: data.formId,
    },
  });
  if (check === null) {
    throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
  }

  // check if the form is owned by the current user or not
  if (check.ownerId != userId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorised You Don't Own The Form "
    );
  }

  // Proceed with the Addition of Question
  const question = await client.question.create({
    data: {
      text: data.text,
      type: "MULTIPLE_CHOICE",
      formId: data.formId,
      required: data.required,
      order: data.order,
      options: {
        create: data.options,
      },
    },
  });
  return question;
};

const addCheckBox = async (data: optionsProps, userId: string) => {
  // check if form exist
  const check = await client.form.findUnique({
    where: {
      id: data.formId,
    },
  });
  if (check === null) {
    throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
  }

  // check if the form is owned by the current user or not
  if (check.ownerId != userId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorised You Don't Own The Form "
    );
  }

  // Proceed with the Addition of Question
  const question = await client.question.create({
    data: {
      text: data.text,
      type: "CHECKBOX",
      formId: data.formId,
      required: data.required,
      order: data.order,
      options: {
        create: data.options,
      },
    },
  });
  return question;
};

const addDropDown = async (data: optionsProps, userId: string) => {
  // check if form exist
  const check = await client.form.findUnique({
    where: {
      id: data.formId,
    },
  });
  if (check === null) {
    throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
  }

  // check if the form is owned by the current user or not
  if (check.ownerId != userId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorised You Don't Own The Form "
    );
  }

  // Proceed with the Addition of Question
  const question = await client.question.create({
    data: {
      text: data.text,
      type: "DROPDOWN",
      formId: data.formId,
      required: data.required,
      order: data.order,
      options: {
        create: data.options,
      },
    },
  });
  return question;
};

const addFileUplaod = async (data: AnswerProps, userId: string) => {
  // check if form exist
  const check = await client.form.findUnique({
    where: {
      id: data.formId,
    },
  });
  console.log(check);
  if (check === null) {
    throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
  }

  // check if the form is owned by the current user or not
  if (check.ownerId != userId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorised You Don't Own The Form "
    );
  }

  // Proceed with the Addition of Question
  const question = await client.question.create({
    data: {
      text: data.text,
      type: "FILE_UPLOAD",
      formId: data.formId,
      required: data.required,
      order: data.order,
    },
  });
  return question;
};

//  Delete An Question Given the Form ID and The Question ID

const deleteQuestion = async (data: deleteQuestionProps, userId: string) => {
  // check if the Form exist or not
  const checkForm = await client.form.findUnique({
    where: {
      id: data.formId,
    },
  });

  if (checkForm === null) {
    throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
  }
  //  check if user owns the Form or Not
  if (checkForm.ownerId != userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "The User Dont Own The Form");
  }

  // check if the Question Beleong to the Form

  const checkQuestion = await client.question.findUnique({
    where: {
      id: data.questionId,
    },
  });

  if (checkQuestion?.formId != data.formId) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Question Not Found - Question Dont Belong to the Form "
    );
  }

  //  Proceed with the Question Deletion

  const deleteQuestion = await client.question.delete({
    where: {
      id: data.questionId,
    },
  });
  return deleteQuestion;

  // handlePrismaError(error);
};

export default {
  // add questions
  addShortAnswer,
  addLongAnswer,
  addMultipleChoice,
  addCheckBox,
  addDropDown,
  addFileUplaod,

  // delete an Question By Id
  deleteQuestion,
};
