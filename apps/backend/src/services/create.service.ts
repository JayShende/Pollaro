import { client } from "@repo/db/client";


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

export default {
  createForm,
};
