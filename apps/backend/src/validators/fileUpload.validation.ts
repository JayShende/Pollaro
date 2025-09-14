import { z } from "zod";

const fileUpload = z.object({
    body: z.object({
        fileName: z.string({ message: "fileName must be a valid String" }),
        fileType: z.string({ message: "fileType must be a valid String" }),
        folder: z.string({ message: "folder must be a valid String" }),
    })
})

export default { fileUpload };