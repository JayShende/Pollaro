import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { interFont } from "@/fonts/font";
import { Upload, File, Download, FileText } from "lucide-react";

interface FileResponsesDisplayProps {
  question: {
    id: string;
    text: string;
    type: string;
    required: boolean;
  };
  responses: Array<{
    files?: string[];
  }>;
  questionIndex: number;
}

const FileResponsesDisplay = ({
  question,
  responses,
  questionIndex,
}: FileResponsesDisplayProps) => {
  console.log("responses files", responses);
  console.log("responses length:", responses.length);

  // More detailed logging to understand the data structure
  responses.forEach((response, index) => {
    console.log(`Response ${index}:`, response);
    console.log(`Response ${index} files:`, response.files);
  });

  // Create array with response numbers for each file
  const allFilesWithResponseNumbers = responses
    .map((response, responseIndex) => ({
      responseNumber: responseIndex + 1,
      files: response.files || [],
    }))
    .filter((response) => response.files.length > 0)
    .flatMap((response) =>
      response.files
        .filter((file) => file && typeof file === "string")
        .map((fileUrl) => ({
          url: fileUrl,
          responseNumber: response.responseNumber,
        }))
    );

  console.log("allFilesWithResponseNumbers:", allFilesWithResponseNumbers);
  console.log(
    "responses with files:",
    responses.filter((response) => response.files && response.files.length > 0)
  );

  const getFileIcon = (url: string) => {
    if (!url) {
      return <File className="h-5 w-5 text-gray-600" />;
    }
    const extension = url.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-600" />;
      case "doc":
      case "docx":
        return <FileText className="h-5 w-5 text-blue-600" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "webp":
        return <File className="h-5 w-5 text-green-600" />;
      case "mp4":
      case "avi":
      case "mov":
        return <File className="h-5 w-5 text-purple-600" />;
      case "zip":
      case "rar":
      case "7z":
        return <File className="h-5 w-5 text-orange-600" />;
      default:
        return <File className="h-5 w-5 text-gray-600" />;
    }
  };

  const getFileNameFromUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const filename = pathname.split("/").pop() || "file";
      return filename;
    } catch {
      return "file";
    }
  };

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle
          className={cn(
            "text-lg font-semibold text-gray-800 flex items-center gap-2",
            interFont.className
          )}
        >
          <Upload className="h-5 w-5 text-indigo-600" />
          {questionIndex + 1}. {question.text}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </CardTitle>
        <p className={cn("text-sm text-gray-600", interFont.className)}>
          {allFilesWithResponseNumbers.length} file
          {allFilesWithResponseNumbers.length !== 1 ? "s" : ""} uploaded
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {allFilesWithResponseNumbers.length > 0 ? (
            <div className="space-y-3">
              {allFilesWithResponseNumbers.map((fileData, index) => (
                <div
                  key={`file-${index}`}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 min-w-0"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span
                        className={cn(
                          "bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full",
                          interFont.className
                        )}
                      >
                        #{fileData.responseNumber}
                      </span>
                      {getFileIcon(fileData.url)}
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p
                        className={cn(
                          "font-medium text-gray-800 truncate",
                          interFont.className
                        )}
                        title={getFileNameFromUrl(fileData.url)}
                      >
                        {getFileNameFromUrl(fileData.url)}
                      </p>
                      <p
                        className={cn(
                          "text-sm text-gray-500 truncate",
                          interFont.className
                        )}
                        title={fileData.url}
                      >
                        {fileData.url}
                      </p>
                    </div>
                  </div>
                  <a
                    href={fileData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors ml-3"
                  >
                    <File className="h-4 w-4" />
                    <span className={cn("text-sm", interFont.className)}>
                      View
                    </span>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Upload className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className={cn(interFont.className)}>No files uploaded yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileResponsesDisplay;
