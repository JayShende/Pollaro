import React from "react";
import TextResponsesDisplay from "./ui/text-responses-display";
import OptionResponsesChart from "./ui/option-responses-chart";
import FileResponsesDisplay from "./ui/file-responses-display";
import { questionType } from "@/app/types/form.types";

interface SummaryProps {
  totalResponses: number;
  totalResponsesData: Array<{
    id: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    questions: Array<{
      id: string;
      text: string;
      type: string;
      required: boolean;
      order: number;
      options: Array<{
        id: string;
        text: string;
      }>;
      answers: Array<{
        id: string;
        text?: string;
        files: string[];
        createdAt: string;
        options: Array<{
          option: {
            id: string;
            text: string;
          };
        }>;
      }>;
    }>;
  }>;
}

const Summary = ({ totalResponsesData }: SummaryProps) => {
  console.log("Response Data:", totalResponsesData);

  if (!totalResponsesData || totalResponsesData.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">No responses yet</div>
    );
  }

  // Get questions from the first response (all responses have the same questions)
  const questions = totalResponsesData[0]?.questions || [];
  console.log("Questions:", questions);

  // Group responses by question
  const groupResponsesByQuestion = () => {
    const grouped: {
      [key: string]: Array<{
        text?: string;
        files?: string[];
        options?:
          | Array<{
              optionId: string;
            }>
          | {
              optionId: string;
            };
      }>;
    } = {};

    questions.forEach((question) => {
      grouped[question.id] = [];
    });

    totalResponsesData.forEach((response) => {
      response.questions.forEach((question) => {
        question.answers.forEach((answer) => {
          // Transform the answer to match our component interfaces
          const transformedAnswer = {
            text: answer.text,
            files: answer.files || [],
            options:
              answer.options && answer.options.length > 0
                ? answer.options.map((opt) => ({ optionId: opt.option.id }))
                : undefined,
          };

          grouped[question.id]?.push(transformedAnswer);
        });
      });
    });

    return grouped;
  };

  const responsesByQuestion = groupResponsesByQuestion();
  console.log("Grouped responses:", responsesByQuestion);
  const renderQuestionSummary = (
    question: {
      id: string;
      text: string;
      type: string;
      required: boolean;
      options: Array<{ id: string; text: string }>;
    },
    index: number
  ) => {
    const questionResponses = responsesByQuestion[question.id] || [];
    console.log(`Question ${question.id} responses:`, questionResponses);

    switch (question.type) {
      case questionType.SHORT_ANSWER:
      case questionType.LONG_ANSWER:
        return (
          <TextResponsesDisplay
            key={question.id}
            question={question}
            responses={questionResponses}
            questionIndex={index}
          />
        );

      case questionType.MULTIPLE_CHOICE:
      case questionType.CHECKBOX:
      case questionType.DROPDOWN:
        return (
          <OptionResponsesChart
            key={question.id}
            question={question}
            responses={questionResponses}
            questionIndex={index}
          />
        );

      case questionType.FILE_UPLOAD:
        return (
          <FileResponsesDisplay
            key={question.id}
            question={question}
            responses={questionResponses}
            questionIndex={index}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {questions.map(
        (
          question: {
            id: string;
            text: string;
            type: string;
            required: boolean;
            options: Array<{ id: string; text: string }>;
          },
          index: number
        ) => renderQuestionSummary(question, index)
      )}
    </div>
  );
};

export default Summary;
