import { useFileUpload } from "./useFileUpload";

export const useDeferredFileUpload = (formId: string) => {
  const fileUploadHook = useFileUpload(formId);

  // Upload all pending files and return the S3 keys
  const uploadPendingFiles = async (): Promise<string[]> => {
    if (fileUploadHook.pendingFiles.length === 0) return [];

    try {
      const uploadedFiles = await fileUploadHook.uploadAllPendingFiles();
      return uploadedFiles.map((file) => file.key);
    } catch (error) {
      console.error("Error uploading pending files:", error);
      throw error;
    }
  };

  return {
    ...fileUploadHook,
    uploadPendingFiles,
  };
};

