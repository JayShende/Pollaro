import { z } from "zod";

const addNumbers = z.object({
  body: z.object({
    a: z.number(),
    b: z.number(),
  }),
});

export default {
  addNumbers,
};
