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
import { AlignLeft, CheckCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { interFont } from "@/fonts/font";
import z from "zod";
import { QuestionSchema } from "@/app/schemas/question.schema";
import { useAddLongAnswer } from "@/app/services/mutations";
import { QuestionType } from "@/app/types/questions.types";
import { toast } from "sonner";
interface LongAnswerProps {
  questionOrder: number;
  setQuestionOrder: React.Dispatch<React.SetStateAction<number>>;
  formId: string;
}
const LongAnswer = ({
  questionOrder,
  setQuestionOrder,
  formId,
}: LongAnswerProps) => {
  const useAddLongAnswerMutation = useAddLongAnswer();
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
    },
  });
  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    console.log("Response Recived");
    setQuestionOrder((prev) => prev + 1); // this will update in next render
    const data = {
      text: values.title,
      type: QuestionType.LONG_ANSWER as QuestionType.LONG_ANSWER,
      formId: formId,
      order: questionOrder + 1,
      required: false,
    };
    console.log(data);
    await useAddLongAnswerMutation.mutateAsync(data);
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
        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50/50 to-green-100/30">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <AlignLeft className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Long Answer Question
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Create a multi-line text input question
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
                      placeholder="e.g., Please describe your experience in detail..."
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
                <AlignLeft className="h-3 w-3 mr-1" />
                Long Answer
              </Badge>
              <span className="text-xs text-gray-500">
                Multi-line text input
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            type="submit"
            className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
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

export default LongAnswer;
