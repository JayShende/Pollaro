import { client } from "@repo/db/client";
import ApiError from "../utils/api-error";
import httpStatus from "http-status";

interface createFormData {
  title: string;
  description: string;
}

/**
 * Init Creating An Form
 *
 */

const createForm = async (data: createFormData, userId: string) => {
  const form = await client.form.create({
    data: {
      ...data,
      ownerId: userId,
    },
  });
  return form;
};

//  This is an Public Route
const getForm = async (formId: string, userId: string) => {
  // check if the form Exist or Not
  const checkForm = await client.form.findUnique({
    where: {
      id: formId,
    },
  });
  if (checkForm === null) {
    throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
  }

  // if Form Exist Then Check for the Form Onwer

  // if (checkForm.ownerId != userId) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, "You Don't Own The Form");
  // }

  // Proceed with fetching of the Form

  const form = await client.form.findUnique({
    where: {
      id: formId,
    },
    include: {
      owner: {
        select: {
          name: true,
          email: true,
        },
      },
      questions: {
        include: {
          options: true,
        },
      },
    },
  });

  return form;
};

const getFormMetaData = async (userId: string) => {
  const metaData = client.form.findMany({
    where: {
      ownerId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      updatedAt: true,
    },
  });
  return metaData;
};

const checkOwner = async (formId: string, userId: string) => {
  try {
    const form = await client.form.findUnique({
      where: {
        id: formId,
      },
    });

    if (form === null) {
      throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
    }
    if (form.ownerId !== userId) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You Don't Own The Form");
    }

    return form;
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
const getFormInfo = async (formId: string, userId: string) => {
  try {
    //  check if the user is the owner of the form
    const form = await client.form.findUnique({
      where: {
        id: formId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        ownerId: true,
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    if (form === null) {
      throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
    }
    if (form.ownerId !== userId) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You Don't Own The Form");
    }
    return form;
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

const updateFormInfo = async (
  formId: string,
  data: createFormData,
  userId: string
) => {
  try {
    // check if the user is the owner of the form
    const form = await client.form.findUnique({
      where: {
        id: formId,
      },
    });
    if (form === null) {
      throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
    }
    if (form.ownerId !== userId) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You Don't Own The Form");
    }

    // update the form info
    const updatedForm = await client.form.update({
      where: {
        id: formId,
      },
      data: data,
    });
    return updatedForm;
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

const getFormQuestions = async (formId: string, userId: string) => {
  try {
    // check if the user is the owner of the form
    const form = await client.form.findUnique({
      where: {
        id: formId,
      },
    });
    if (form === null) {
      throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
    }
    if (form.ownerId !== userId) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You Don't Own The Form");
    }
    // get the questions of the form
    const questions = await client.form.findUnique({
      where: {
        id: formId,
      },
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
    return questions;
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

// check if the form is accepting responses
const checkIfFormIsAcceptingResponses = async (
  formId: string,
  userId: string
) => {
  try {
    // check if the form exists
    const form = await client.form.findUnique({
      where: { id: formId },
    });
    if (form === null) {
      throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
    }

    const checkAcceptingResponses = form.acceptingResponses;
    return checkAcceptingResponses;
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

// update the accepting responses
const updateAcceptingResponses = async (formId: string, userId: string) => {
  try {
    // check if the form exists
    const form = await client.form.findUnique({
      where: { id: formId },
    });
    if (form === null) {
      throw new ApiError(httpStatus.NOT_FOUND, "Form Not Found");
    }
    if (form.ownerId !== userId) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You Don't Own The Form");
    }
    const updatedForm = await client.form.update({
      where: { id: formId },
      data: { acceptingResponses: !form.acceptingResponses },
    });
    return updatedForm;
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
  createForm,
  getForm,
  getFormMetaData,
  checkOwner,
  getFormInfo,
  updateFormInfo,
  getFormQuestions,
  checkIfFormIsAcceptingResponses,
  updateAcceptingResponses,
};
