import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { interFont } from "@/fonts/font";
import { Upload, File, Download } from "lucide-react";

interface FileUploadCardProps {
  question: {
    id: string;
    text: string;
    type: string;
    required: boolean;
  };
  response: {
    files?: Array<{
      id: string;
      filename: string;
      url: string;
      size?: number;
    }>;
  };
  responseIndex: number;
}

const FileUploadCard = ({
  question,
  response,
  responseIndex,
}: FileUploadCardProps) => {
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle
          className={cn(
            "text-lg font-semibold text-gray-800",
            interFont.className
          )}
        >
          {responseIndex + 1}. {question.text}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg border">
            {response.files && response.files.length > 0 ? (
              <div className="space-y-3">
                {response.files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 bg-white rounded border"
                  >
                    <div className="flex items-center space-x-3">
                      <File className="h-5 w-5 text-indigo-600" />
                      <div>
                        <p
                          className={cn(
                            "font-medium text-gray-800",
                            interFont.className
                          )}
                        >
                          {file.filename}
                        </p>
                        {file.size && (
                          <p
                            className={cn(
                              "text-sm text-gray-500",
                              interFont.className
                            )}
                          >
                            {formatFileSize(file.size)}
                          </p>
                        )}
                      </div>
                    </div>
                    <a
                      href={file.url}
                      download={file.filename}
                      className="flex items-center space-x-1 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span className={cn("text-sm", interFont.className)}>
                        Download
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-gray-500">
                <Upload className="h-4 w-4" />
                <span className={cn(interFont.className)}>
                  No files uploaded
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploadCard;
