import { client } from "@repo/db/client";
import ApiError from "../utils/api-error";
import httpStatus from "http-status";

interface createFormData {
  title: string;
  description: string;
  ownerId: string;
}

/**
 * Init Creating An Form
 *
 */

const createForm = async (data: createFormData) => {
  const form = await client.form.create({
    data: data,
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

export default {
  createForm,
  getForm,
  getFormMetaData,
};
