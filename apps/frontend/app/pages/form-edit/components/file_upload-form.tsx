import React from "react";

const FileUpload = () => {
  return (
    <div>
      <p>File Upload configuration options will appear here</p>
      <div className="mt-2">
        <input type="file" className="w-full p-2 border rounded" />
        <p className="text-sm text-gray-600 mt-1">
          Configure file types, size limits, etc.
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
