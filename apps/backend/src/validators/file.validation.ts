import { z } from "zod";

const fileUpload = z.object({
    body: z.object({
        fileName: z.string({ message: "fileName must be a valid String" }),
        fileType: z.string({ message: "fileType must be a valid String" }),
        folder: z.string({ message: "folder must be a valid String" }),
    })
})

const fileDelete = z.object({
    body: z.object({
        key: z.string({ message: "key must be a valid String" }),
    })
})

export default { fileUpload, fileDelete };