import { useGetFormQuestions } from "@/app/services/queries";
import React from "react";
import ShortAnswerCard from "./ui/short_answer-card";
import { formQuestionsProps, questionType } from "@/app/types/form.types";
import LongAnswerCard from "./ui/long_answer-card";
import MultipleChoiceCard from "./ui/multiple_choice-card";
import CheckboxCard from "./ui/check_box-card";
import FileUploadCard from "./ui/fileupload-card";
import DropdownCard from "./ui/dropdown-card";

const QuestionsCards = ({ formId }: { formId: string }) => {
  const questionsData = useGetFormQuestions(formId);
  if (questionsData.isLoading) {
    return <div>Loading...</div>;
  }
  if (questionsData.isError) {
    return <div>Error...</div>;
  }
  console.log(questionsData.data);
  console.log(questionsData.data.data.questions);
  return (
    <div className="flex flex-col gap-4 w-3xl">
      {questionsData.data.data.questions.map((question: formQuestionsProps) => {
        if (question.type === questionType.SHORT_ANSWER) {
          return (
            <ShortAnswerCard
              data={question}
              formId={formId}
              key={question.id}
            />
          );
        }
      })}
    </div>
  );
};

export default QuestionsCards;
