import { client } from "@repo/db/client";
import { handlePrismaError } from "../utils/prismaErrorHandler";

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
  try {
    const form = await client.form.create({
      data: data,
    });
    return form;
  } catch (error) {
    handlePrismaError(error);
  }
};

export default {
  createForm,
};
