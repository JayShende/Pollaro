/**
 * Init Creating An Form
 */

import { client } from "@repo/db/client";

interface createFormData {
  title: string;
  description: string;
  ownerId: string;
}
const create = async (data: createFormData) => {
  const form = await client.form.create({
    data: data,
  });
  return form;
};

export default {
  create,
};
