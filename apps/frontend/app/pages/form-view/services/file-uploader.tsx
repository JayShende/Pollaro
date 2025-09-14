import React, { useRef, useState } from "react";
import axios from "axios";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "application/pdf"];

export default function FileUploader() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // --- Validate type ---
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("❌ Only PNG, JPEG, or PDF files are allowed.");
      return;
    }

    // --- Validate size ---
    if (file.size > MAX_FILE_SIZE) {
      alert("❌ File is too large. Max size is 5 MB.");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);
      // await uploadFile(file, setProgress);
      await uploadFileWithPost(file, setProgress);
      alert("✅ File uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed. See console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleButtonClick}
        disabled={uploading}
        className={`px-4 py-2 rounded-lg text-white ${
          uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? "Uploading..." : "Select File"}
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".png,.jpg,.jpeg,.pdf"
        hidden
      />

      {uploading && (
        <div className="w-full max-w-xs">
          <div className="bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-600 h-3 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1 text-center">{progress}%</p>
        </div>
      )}
    </div>
  );
}

// --- Upload logic with Axios ---
// async function uploadFile(file: File, onProgress: (progress: number) => void) {
//   // 1) Get presigned URL from backend
//   console.log({
//     fileName: file.name,
//     fileType: file.type,
//     folder: "uploads",
//   });
//   const { data: presignRes } = await axios.post(
//     "http://localhost:4000/api/s3/presign-upload",
//     {
//       fileName: file.name,
//       fileType: file.type,
//       folder: "uploads",
//     }
//   );

//   if (!presignRes.uploadUrl) {
//     throw new Error("Failed to get presigned URL");
//   }

//   const { uploadUrl, key, objectUrl } = presignRes;

//   // 2) Upload file to S3 using PUT
//   await axios.put(uploadUrl, file, {
//     headers: {
//       "Content-Type": file.type,
//     },
//     onUploadProgress: (progressEvent) => {
//       const total = progressEvent.total ?? file.size; // fallback
//       if (total) {
//         const percent = Math.round((progressEvent.loaded * 100) / total);
//         onProgress(percent);
//       }
//     },
//   });

//   console.log("✅ Uploaded key:", key);
//   console.log("📂 S3 object URL (private unless made public):", objectUrl);

//   return { key, objectUrl };
// }

async function uploadFileWithPost(file: File, onProgress: (p: number) => void) {
  // 1) Get presigned POST data
  const { data: presignRes } = await axios.post(
    "http://localhost:4000/api/s3/presign-upload_Post",
    {
      fileName: file.name,
      fileType: file.type,
      folder: "uploads/postFE",
    }
  );

  const { url, fields, key } = presignRes;

  // 2) Build form data with fields + file
  const formData = new FormData();
  Object.entries(fields).forEach(([k, v]) => {
    formData.append(k, v as string);
  });
  formData.append("file", file);

  // 3) Upload using POST to S3
  await axios.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      const total = progressEvent.total ?? file.size;
      const percent = Math.round((progressEvent.loaded * 100) / total);
      onProgress(percent);
    },
  });

  console.log("✅ Uploaded key:", key);
  return { key, objectUrl: `${url}/${key}` };
}
