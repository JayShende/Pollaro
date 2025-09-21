import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import z from "zod";
import { FileUploadSchema } from "@/app/schemas/question.schema";
import { useAddFileUpload } from "@/app/services/mutations";
import { QuestionType } from "@/app/types/questions.types";
import { toast } from "sonner";
import { Upload, CheckCircle, RotateCcw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FileUploadProps {
  questionOrder: number;
  setQuestionOrder: React.Dispatch<React.SetStateAction<number>>;
  formId: string;
}

const FileUpload = ({
  questionOrder: _questionOrder,
  setQuestionOrder,
  formId: _formId,
}: FileUploadProps) => {
  const useAddFileUploadMutation = useAddFileUpload();
  const form = useForm<z.infer<typeof FileUploadSchema>>({
    resolver: zodResolver(FileUploadSchema),
    defaultValues: {
      title: "",
    },
  });

  const fileTypes = [
    { value: "image", label: "Images (PNG, JPG, GIF)" },
    { value: "document", label: "Documents (PDF, DOC, DOCX)" },
    { value: "spreadsheet", label: "Spreadsheets (XLS, XLSX, CSV)" },
    { value: "presentation", label: "Presentations (PPT, PPTX)" },
    { value: "text", label: "Text files (TXT, MD)" },
    { value: "archive", label: "Archives (ZIP, RAR)" },
  ];

  async function onSubmit(values: z.infer<typeof FileUploadSchema>) {
    try {
      console.log("Response Received");

      const data = {
        text: values.title,
        type: QuestionType.FILE_UPLOAD as QuestionType.FILE_UPLOAD,
        formId: _formId,
        order: _questionOrder + 1,
        required: false,
      };

      await useAddFileUploadMutation.mutateAsync(data);

      setQuestionOrder((prev) => prev + 1);
      toast.success("File upload question added successfully!");
      form.reset();
    } catch (error) {
      toast.error("Failed to add question");
      console.error("Error:", error);
    }
  }

  function onReset() {
    form.reset({
      title: "",
    });
    form.clearErrors();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={onReset}
        className="space-y-6"
      >
        <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-50/50 to-indigo-100/30">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <Upload className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  File Upload Question
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Create a question for file uploads
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-900">
                    Question Text
                  </FormLabel>
                  <FormDescription className="text-sm text-gray-600">
                    Enter the question you want to ask your respondents.
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Please upload your resume"
                      type="text"
                      className="h-12 text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2 pt-4">
              <Badge variant="secondary" className="px-3 py-1">
                <Upload className="h-3 w-3 mr-1" />
                File Upload
              </Badge>
              <span className="text-xs text-gray-500">
                Upload files and documents
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            type="submit"
            className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Add Question
          </Button>
          <Button
            type="reset"
            variant="outline"
            className="flex-1 h-12 border-gray-300 hover:bg-gray-50"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FileUpload;
