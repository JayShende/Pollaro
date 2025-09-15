import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formQuestionsProps, questionType } from "@/app/types/form.types";
import { cn } from "@/lib/utils";
import { interFont, poppinsFont } from "@/fonts/font";
import { FormField, FormMessage } from "@/components/ui/form";
import { useFileUpload, UploadedFile } from "../../services/useFileUpload";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

interface QuestionCardProps {
  data: formQuestionsProps;
  formId: string;
}

interface FileUploadFieldProps {
  field: {
    value: string[];
    onChange: (value: string[]) => void;
  };
  questionText: string;
  required: boolean;
  formId: string;
}

const FileUploadField = ({
  field,
  questionText,
  required,
  formId,
}: FileUploadFieldProps) => {
  const { uploading, progress, uploadedFiles, uploadFile, removeFile } =
    useFileUpload(formId);
  const [error, setError] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setError("");

    try {
      const uploadPromises = files.map((file) => uploadFile(file));
      const uploadedFileData = await Promise.all(uploadPromises);

      // Update form field with uploaded file keys
      const currentKeys = field.value || [];
      const newKeys = uploadedFileData.map(
        (file) => `https://d2umaa5a4grwi8.cloudfront.net/${file.key}`
      );
      field.onChange([...currentKeys, ...newKeys]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  };

  const handleRemoveFile = async (fileToRemove: UploadedFile) => {
    removeFile(fileToRemove.key);
    const currentKeys = field.value || [];
    const fileUrl = `https://d2umaa5a4grwi8.cloudfront.net/${fileToRemove.key}`;
    const deleteFile = await axios({
      method: "post",
      url: "/api/proxy/v1/file/delete",
      data: {
        key: fileToRemove.key,
      },
    });
    console.log(deleteFile);
    field.onChange(currentKeys.filter((key: string) => key !== fileUrl));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={cn(
            "text-lg font-semibold text-indigo-600",
            interFont.className
          )}
        >
          {questionText}
          {required && <span className="text-red-500 text-sm">*</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("file-upload")?.click()}
              disabled={uploading}
              className="shrink-0"
            >
              {uploading ? "Uploading..." : "Choose Files"}
            </Button>
          </div>

          {uploading && (
            <div className="w-full">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1 text-center">
                {progress}% uploaded
              </p>
            </div>
          )}

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <p className={cn("text-sm text-gray-500", poppinsFont.className)}>
            Supported formats: PDF, DOC, DOCX, PNG, JPG, GIF (Max 3 MB)
          </p>

          {uploadedFiles.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Uploaded files:
              </p>
              <div className="space-y-2">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.key}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded border"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        • {file.fileName}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({(file.fileSize / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFile(file)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <FormMessage />
      </CardFooter>
    </Card>
  );
};

const QuestionCard = ({ data, formId }: QuestionCardProps) => {
  const fieldName = `question_${data.id}`;

  if (data.type === questionType.SHORT_ANSWER) {
    return (
      <FormField
        name={fieldName}
        render={({ field }) => (
          <Card>
            <CardHeader>
              <CardTitle>
                <div
                  className={cn(
                    "text-lg font-semibold text-indigo-600 flex gap-x-1 items-center",
                    interFont.className
                  )}
                >
                  {data.text}
                  {data.required && (
                    <span className="text-red-500 text-sm">*</span>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                {...field}
                value={field.value || ""}
                className={cn(
                  "w-[60%] placeholder:text-xs ",
                  poppinsFont.className
                )}
                placeholder="Your Answer"
              />
            </CardContent>
            <CardFooter>
              <FormMessage />
            </CardFooter>
          </Card>
        )}
      />
    );
  }
  if (data.type === questionType.LONG_ANSWER) {
    return (
      <FormField
        name={fieldName}
        render={({ field }) => (
          <Card>
            <CardHeader>
              <CardTitle
                className={cn(
                  "text-lg font-semibold text-indigo-600",
                  interFont.className
                )}
              >
                {data.text}
                {data.required && <span className="text-red-500">*</span>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                {...field}
                value={field.value || ""}
                className={cn(
                  "w-[60%] placeholder:text-xs max-h-36 ",
                  poppinsFont.className
                )}
                placeholder="Your Answer"
              />
            </CardContent>
            <CardFooter>
              <FormMessage />
            </CardFooter>
          </Card>
        )}
      />
    );
  }

  if (data.type === questionType.MULTIPLE_CHOICE) {
    return (
      <FormField
        name={fieldName}
        render={({ field }) => (
          <Card>
            <CardHeader>
              <CardTitle
                className={cn(
                  "text-lg font-semibold text-indigo-600",
                  interFont.className
                )}
              >
                {data.text}
                {data.required && (
                  <span className="text-red-500 text-sm">*</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={field.value || ""}
                onValueChange={field.onChange}
              >
                {data.options?.map((option) => {
                  return (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id}>{option.text}</Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <FormMessage />
            </CardFooter>
          </Card>
        )}
      />
    );
  }

  if (data.type === questionType.CHECKBOX) {
    return (
      <FormField
        name={fieldName}
        render={({ field }) => (
          <Card>
            <CardHeader>
              <CardTitle
                className={cn(
                  "text-lg font-semibold text-indigo-600",
                  interFont.className
                )}
              >
                {data.text}
                {data.required && (
                  <span className="text-red-500 text-sm">*</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {data.options?.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={(field.value || []).includes(option.id)}
                      onCheckedChange={(checked) => {
                        const currentValues = field.value || [];
                        if (checked) {
                          field.onChange([...currentValues, option.id]);
                        } else {
                          field.onChange(
                            currentValues.filter(
                              (id: string) => id !== option.id
                            )
                          );
                        }
                      }}
                    />
                    <Label htmlFor={option.id}>{option.text}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <FormMessage />
            </CardFooter>
          </Card>
        )}
      />
    );
  }

  if (data.type === questionType.DROPDOWN) {
    return (
      <FormField
        name={fieldName}
        render={({ field }) => (
          <Card>
            <CardHeader>
              <CardTitle
                className={cn(
                  "text-lg font-semibold text-indigo-600",
                  interFont.className
                )}
              >
                {data.text}
                {data.required && (
                  <span className="text-red-500 text-sm">*</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={field.value || ""} onValueChange={field.onChange}>
                <SelectTrigger className={cn("w-[60%]", poppinsFont.className)}>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {data.options?.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter>
              <FormMessage />
            </CardFooter>
          </Card>
        )}
      />
    );
  }

  if (data.type === questionType.FILE_UPLOAD) {
    return (
      <FormField
        name={fieldName}
        render={({ field }) => (
          <FileUploadField
            field={field}
            questionText={data.text}
            required={data.required}
            formId={formId}
          />
        )}
      />
    );
  }
};

export default QuestionCard;
