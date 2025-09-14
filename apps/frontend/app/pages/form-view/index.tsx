import { useGetForm } from "@/app/services/queries";
import { formQuestionsProps } from "@/app/types/form.types";
import FormHeaderCard from "./components/ui/form-header-card";
import QuestionCard from "./components/ui/question-card";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { createFormSchema } from "@/app/schemas/addreponse-schmea";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { useAddResponse } from "@/app/services/mutations";

interface ViewFormProps {
  formId: string;
}

const ViewForm = ({ formId }: ViewFormProps) => {
  const getForm = useGetForm(formId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formInitialized, setFormInitialized] = useState(false);
  const addReponseMutation = useAddResponse();
  // Initialize form with empty schema and values first
  const form = useForm({
    defaultValues: {},
    mode: "onChange", // Enable real-time validation
  });

  // Get questions data safely with memoization
  const questions = useMemo(() => {
    return getForm.data?.data?.questions || [];
  }, [getForm.data?.data?.questions]);

  const dataObject = getForm.data;

  // Create dynamic schema based on questions
  type FormData = z.infer<ReturnType<typeof createFormSchema>>;

  // Create default values for the form using useMemo to prevent recreation
  const defaultValues: FormData = useMemo(() => {
    const values: FormData = {};
    questions.forEach((question: formQuestionsProps) => {
      const fieldName = `question_${question.id}`;
      switch (question.type) {
        case "CHECKBOX":
          values[fieldName] = [];
          break;
        case "FILE_UPLOAD":
          values[fieldName] = [];
          break;
        default:
          values[fieldName] = "";
      }
    });
    return values;
  }, [questions]);

  // Use useEffect to reset form only once when data is loaded
  useEffect(() => {
    if (!formInitialized && questions.length > 0) {
      form.reset(defaultValues);
      setFormInitialized(true);
    }
  }, [questions.length, formInitialized, form, defaultValues]);

  // Watch form values to trigger re-validation
  const watchedValues = form.watch() as Record<
    string,
    string | string[] | File[]
  >;

  // Function to check if all required questions are answered
  const areAllRequiredQuestionsAnswered = useMemo(() => {
    if (!formInitialized || questions.length === 0) return false;

    return questions.every((question: formQuestionsProps) => {
      if (!question.required) return true; // Skip non-required questions

      const fieldName = `question_${question.id}`;
      const fieldValue = watchedValues[fieldName];

      switch (question.type) {
        case "SHORT_ANSWER":
        case "LONG_ANSWER":
          return typeof fieldValue === "string" && fieldValue.trim().length > 0;
        case "MULTIPLE_CHOICE":
        case "DROPDOWN":
          return typeof fieldValue === "string" && fieldValue.trim().length > 0;
        case "CHECKBOX":
          return Array.isArray(fieldValue) && fieldValue.length > 0;
        case "FILE_UPLOAD":
          return Array.isArray(fieldValue) && fieldValue.length > 0;
        default:
          return true;
      }
    });
  }, [formInitialized, questions, watchedValues]);

  if (getForm.isPending) {
    return <div>Loading.....</div>;
  }
  if (getForm.isError) {
    return <div>Some Error</div>;
  }
  if (!dataObject) {
    return <div>No data available</div>;
  }

  const headerCardData = {
    formId: dataObject.data.id,
    title: dataObject.data.title,
    description: dataObject.data.description,
    ownerName: dataObject.data.owner.name,
    ownerEmail: dataObject.data.owner.email,
    createdAt: dataObject.data.createdAt,
  };

  async function onSubmitFun(data: FormData) {
    try {
      setIsSubmitting(true);
      console.log("Form submitted with data:", data);

      // Transform form data to match the response schema
      const answers = questions.map((question: formQuestionsProps) => {
        const fieldName = `question_${question.id}`;
        const fieldValue = data[fieldName];

        const answer: {
          questionId: string;
          text?: string;
          files?: string[];
          options?: Array<{ optionId: string }>;
        } = {
          questionId: question.id,
        };

        switch (question.type) {
          case "SHORT_ANSWER":
          case "LONG_ANSWER":
            answer.text = fieldValue as string;
            break;
          case "MULTIPLE_CHOICE":
          case "DROPDOWN":
            answer.options = fieldValue
              ? [{ optionId: fieldValue as string }]
              : [];
            break;
          case "CHECKBOX":
            answer.options = Array.isArray(fieldValue)
              ? fieldValue.map((optionId: string) => ({ optionId }))
              : [];
            break;
          case "FILE_UPLOAD":
            // Handle file upload - you'll need to implement file upload logic
            answer.files = Array.isArray(fieldValue)
              ? fieldValue.map((file: File) => file.name) // This should be actual file URLs
              : [];
            break;
        }

        return answer;
      });

      const responseData = {
        formId: dataObject.data.id,
        submissionUserId: null, // You can get this from auth context
        answers,
      };

      console.log("Transformed response data:", responseData);

      // Submit the form data
      await addReponseMutation.mutateAsync(responseData);

      // Show success message or redirect
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-y-6 max-w-4xl mx-auto p-6">
      <FormHeaderCard data={headerCardData} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitFun)} className="space-y-6">
          <div className="space-y-4">
            {questions.map((question: formQuestionsProps) => {
              const questionCardData = {
                id: question.id,
                text: question.text,
                type: question.type,
                formId: question.formId,
                required: question.required,
                order: question.order,
                createdAt: question.createdAt,
                updatedAt: question.updatedAt,
                options: question.options,
              };
              return <QuestionCard key={question.id} data={questionCardData} />;
            })}
          </div>

          <div className="flex flex-col items-end gap-3 pt-6">
            {/* Show remaining required questions count */}
            {!areAllRequiredQuestionsAnswered && formInitialized && (
              <div className="text-sm text-gray-500">
                {(() => {
                  const requiredQuestions = questions.filter(
                    (q: formQuestionsProps) => q.required
                  );
                  const answeredRequired = requiredQuestions.filter(
                    (question: formQuestionsProps) => {
                      const fieldName = `question_${question.id}`;
                      const fieldValue = watchedValues[fieldName];

                      switch (question.type) {
                        case "SHORT_ANSWER":
                        case "LONG_ANSWER":
                          return (
                            typeof fieldValue === "string" &&
                            fieldValue.trim().length > 0
                          );
                        case "MULTIPLE_CHOICE":
                        case "DROPDOWN":
                          return (
                            typeof fieldValue === "string" &&
                            fieldValue.trim().length > 0
                          );
                        case "CHECKBOX":
                          return (
                            Array.isArray(fieldValue) && fieldValue.length > 0
                          );
                        case "FILE_UPLOAD":
                          return (
                            Array.isArray(fieldValue) && fieldValue.length > 0
                          );
                        default:
                          return true;
                      }
                    }
                  );

                  const remaining =
                    requiredQuestions.length - answeredRequired.length;
                  return remaining > 0
                    ? `${remaining} required question${remaining > 1 ? "s" : ""} remaining`
                    : "All required questions answered";
                })()}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || !areAllRequiredQuestionsAnswered}
              variant="outline"
              className={`flex items-center gap-x-2 rounded-lg border px-4 py-2 text-xs transition ${
                isSubmitting || !areAllRequiredQuestionsAnswered
                  ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Form"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ViewForm;
