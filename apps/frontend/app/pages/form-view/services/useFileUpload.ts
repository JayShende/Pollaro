import { useState } from "react";
import axios from "axios";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB
const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/gif",
];

export interface UploadedFile {
  key: string;
  objectUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}

export const useFileUpload = (formId: string) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  // Upload a single file immediately
  const uploadFile = async (file: File): Promise<UploadedFile> => {
    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(
        "❌ Only PNG, JPEG, JPG, PDF, DOC, DOCX, or GIF files are allowed."
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("❌ File is too large. Max size is 3 MB.");
    }

    try {
      setUploading(true);
      setProgress(0);

      // Get presigned POST data
      const { data: presignRes } = await axios.post(
        "/api/proxy/v1/file/upload",
        {
          fileName: file.name,
          fileType: file.type,
          folder: `projects/pollaro/files/response_files/${formId}`,
        }
      );

      const { url, fields, key } = presignRes.data;

      // Build form data with fields + file
      const formData = new FormData();
      Object.entries(fields).forEach(([k, v]) => {
        formData.append(k, v as string);
      });
      formData.append("file", file);

      // Upload using POST to S3
      await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total ?? file.size;
          const percent = Math.round((progressEvent.loaded * 100) / total);
          setProgress(percent);
        },
      });

      const uploadedFile: UploadedFile = {
        key,
        objectUrl: `${url}/${key}`,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      };

      setUploadedFiles((prev) => [...prev, uploadedFile]);
      return uploadedFile;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const removeFile = (key: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.key !== key));
  };

  const clearFiles = () => {
    setUploadedFiles([]);
  };

  return {
    uploading,
    progress,
    uploadedFiles,
    uploadFile,
    removeFile,
    clearFiles,
  };
};
