import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
import ApiError from "../utils/api-error";
import httpStatus from "http-status";

dotenv.config();

const fileUploadService = async (data: any) => {
  const { fileName, fileType, folder } = data;
  const {
    AWS_REGION,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME,
  } = process.env;
  if (
    !AWS_REGION ||
    !AWS_ACCESS_KEY_ID ||
    !AWS_SECRET_ACCESS_KEY ||
    !S3_BUCKET_NAME
  ) {
    throw new Error("Missing AWS env vars. Check .env");
  }
  // ---- AWS S3 Client ----
  const s3 = new S3Client({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });

  // Helpers
  const sanitizeFileName = (name: string) =>
    name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 200);

  const s3ObjectUrl = (bucket: string, region: string, key: string) =>
    `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

  try {
    const ext = (fileName.split(".").pop() || "").toLowerCase();
    const base = sanitizeFileName(fileName.replace(/\.[^/.]+$/, ""));
    const key = `${
      folder ? folder.replace(/\/+$/, "") + "/" : ""
    }${base}-${randomUUID()}${ext ? "." + ext : ""}`;

    // --- Restrict conditions ---
    const MAX_FILE_SIZE = 3 * 1024 * 1024; // 5 MB limit
    const presignedPost = await createPresignedPost(s3, {
      Bucket: S3_BUCKET_NAME!,
      Key: key,
      Conditions: [
        ["content-length-range", 0, MAX_FILE_SIZE], // Max 5 MB
        ["eq", "$Content-Type", fileType], // Must match client fileType
      ],
      Fields: {
        "Content-Type": fileType,
      },
      Expires: 300, // URL expires in 60s
    });
    return {
      ...presignedPost,
      key,
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request");
  }
};

export default fileUploadService;
