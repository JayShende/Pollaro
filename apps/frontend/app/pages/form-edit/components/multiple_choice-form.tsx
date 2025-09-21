import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import z from "zod";
import { MultipleChoiceSchema } from "@/app/schemas/question.schema";
import { useAddMultipleChoice } from "@/app/services/mutations";
import { QuestionType } from "@/app/types/questions.types";
import { toast } from "sonner";
import { Plus, X, Circle, CheckCircle, RotateCcw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface MultipleChoiceProps {
  questionOrder: number;
  setQuestionOrder: React.Dispatch<React.SetStateAction<number>>;
  formId: string;
}

const MultipleChoice = ({
  questionOrder: _questionOrder,
  setQuestionOrder,
  formId: _formId,
}: MultipleChoiceProps) => {
  const useAddMultipleChoiceMutation = useAddMultipleChoice();
  const form = useForm<z.infer<typeof MultipleChoiceSchema>>({
    resolver: zodResolver(MultipleChoiceSchema),
    defaultValues: {
      title: "",
      options: [{ text: "" }], // Start with one empty option
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  async function onSubmit(values: z.infer<typeof MultipleChoiceSchema>) {
    try {
      console.log("Response Received");

      // Filter out empty options before submitting
      const validOptions = values.options.filter(
        (option) => option.text.trim() !== ""
      );

      if (validOptions.length === 0) {
        toast.error("Please add at least one option");
        return;
      }
      console.log(values);
      console.log(validOptions);
      const data = {
        text: values.title,
        type: QuestionType.MULTIPLE_CHOICE as QuestionType.MULTIPLE_CHOICE,
        formId: _formId,
        order: _questionOrder + 1,
        required: false,
        options: validOptions,
      };

      // Call the mutation here when ready
      await useAddMultipleChoiceMutation.mutateAsync(data);

      setQuestionOrder((prev) => prev + 1);
      toast.success("Multiple choice question added successfully!");
      form.reset();
    } catch (error) {
      toast.error("Failed to add question");
      console.error("Error:", error);
    }
  }

  function onReset() {
    form.reset({
      title: "",
      options: [{ text: "" }],
    });
    form.clearErrors();
  }

  const addOption = () => {
    append({ text: "" });
  };

  const removeOption = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={onReset}
        className="space-y-6"
      >
        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50/50 to-purple-100/30">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <Circle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Multiple Choice Question
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Create a question with multiple options (single selection)
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
                      placeholder="e.g., What is your favorite color?"
                      type="text"
                      className="h-12 text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base font-medium text-gray-900">
                  Answer Options
                </FormLabel>
                <span className="text-xs text-gray-500">
                  {fields.length} option{fields.length !== 1 ? "s" : ""}
                </span>
              </div>
              <FormDescription className="text-sm text-gray-600">
                Add the choices that respondents can select from.
              </FormDescription>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`options.${index}.text`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-3 items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 text-sm font-medium">
                            {index + 1}
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={`Option ${index + 1}`}
                              type="text"
                              className="flex-1 h-10"
                            />
                          </FormControl>
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeOption(index)}
                              className="shrink-0 h-10 w-10 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={addOption}
                className="w-full h-10 border-dashed border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            </div>

            <div className="flex items-center space-x-2 pt-4">
              <Badge variant="secondary" className="px-3 py-1">
                <Circle className="h-3 w-3 mr-1" />
                Multiple Choice
              </Badge>
              <span className="text-xs text-gray-500">
                Single selection from options
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            type="submit"
            className="flex-1 h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium"
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

export default MultipleChoice;
