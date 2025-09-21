"use client";
import React, { useState } from "react";
import ShortAnswer from "./short_answer-form";
import LongAnswer from "./long_answer-form";
import MultipleChoice from "./multiple_choice-form";
import Dropdown from "./dropdown-form";
import Checkbox from "./checkbox-form";
import FileUpload from "./file_upload-form";

interface QuestionCardProps {
  selectedValueVar: string;
  formId: string;
}

const QuestionCard = ({ selectedValueVar, formId }: QuestionCardProps) => {
  const [questionOrder, setQuestionOrder] = useState<number>(0);

  return (
    <div className="w-full">
      {/* Render different content based on selected value */}
      {selectedValueVar && (
        <div className="w-full">
          {selectedValueVar === "short_answer" && (
            <ShortAnswer
              questionOrder={questionOrder}
              setQuestionOrder={setQuestionOrder}
              formId={formId}
            />
          )}

          {selectedValueVar === "long_answer" && (
            <LongAnswer
              questionOrder={questionOrder}
              setQuestionOrder={setQuestionOrder}
              formId={formId}
            />
          )}

          {selectedValueVar === "multiple_choice" && (
            <MultipleChoice
              questionOrder={questionOrder}
              setQuestionOrder={setQuestionOrder}
              formId={formId}
            />
          )}

          {selectedValueVar === "dropdown" && (
            <Dropdown
              questionOrder={questionOrder}
              setQuestionOrder={setQuestionOrder}
              formId={formId}
            />
          )}

          {selectedValueVar === "checkbox" && (
            <Checkbox
              questionOrder={questionOrder}
              setQuestionOrder={setQuestionOrder}
              formId={formId}
            />
          )}

          {selectedValueVar === "file_upload" && (
            <FileUpload
              questionOrder={questionOrder}
              setQuestionOrder={setQuestionOrder}
              formId={formId}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
