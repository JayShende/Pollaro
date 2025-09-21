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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, RotateCcw } from "lucide-react";
import z from "zod";
import { QuestionSchema } from "@/app/schemas/question.schema";
import { useAddShortAnswer } from "@/app/services/mutations";
import { QuestionType } from "@/app/types/questions.types";
import { toast } from "sonner";

interface ShortAnswerProps {
  questionOrder: number;
  setQuestionOrder: React.Dispatch<React.SetStateAction<number>>;
  formId: string;
}

const ShortAnswer = ({
  questionOrder,
  setQuestionOrder,
  formId,
}: ShortAnswerProps) => {
  const useAddShortAnswerMutation = useAddShortAnswer();
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
    },
  });
  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    setQuestionOrder((prev) => prev + 1); // this will update in next render
    const data = {
      text: values.title,
      type: QuestionType.SHORT_ANSWER as QuestionType.SHORT_ANSWER,
      formId: formId,
      order: questionOrder + 1,
      required: false,
    };

    await useAddShortAnswerMutation.mutateAsync(data);
    toast.success("Question Added Successfully");
    onReset();
  }
  function onReset() {
    form.reset();
    form.clearErrors();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={onReset}
        className="space-y-6"
      >
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50/50 to-blue-100/30">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Short Answer Question
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Create a single-line text input question
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
                      placeholder="e.g., What is your full name?"
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
                <FileText className="h-3 w-3 mr-1" />
                Short Answer
              </Badge>
              <span className="text-xs text-gray-500">
                Single line text input
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            type="submit"
            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
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

export default ShortAnswer;
