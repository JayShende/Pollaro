import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formQuestionsProps } from "@/app/types/form.types";
import { cn } from "@/lib/utils";
import { interFont, poppinsFont } from "@/fonts/font";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FileUploadCardProps {
  data: formQuestionsProps;
  formId: string;
}

const FileUploadCard = ({ data, formId }: FileUploadCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={cn(
            "text-lg font-semibold text-indigo-600",
            interFont.className
          )}
        >
          {data.text}
          {data.required && <span className="text-red-500 text-sm">*</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input type="file" id="file-upload" className="hidden" />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("file-upload")?.click()}
              className="shrink-0"
            >
              Choose Files
            </Button>
          </div>

          <p className={cn("text-sm text-gray-500", poppinsFont.className)}>
            Supported formats: PDF, DOC, DOCX, PNG, JPG, GIF (Max 3 MB) - One
            file only
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploadCard;
