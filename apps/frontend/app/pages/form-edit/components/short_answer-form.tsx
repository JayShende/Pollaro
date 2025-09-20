import React, { useState } from "react";
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
    console.log("Response Recived");
    setQuestionOrder((prev) => prev + 1); // this will update in next render
    const data = {
      text: values.title,
      type: QuestionType.SHORT_ANSWER as QuestionType.SHORT_ANSWER,
      formId: formId,
      order: questionOrder + 1,
      required: false,
    };
    console.log(data);
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
      <form onSubmit={form.handleSubmit(onSubmit)} onReset={onReset}>
        <div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter title" type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </form>
    </Form>
  );
};

export default ShortAnswer;
