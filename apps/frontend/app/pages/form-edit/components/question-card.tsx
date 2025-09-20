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

const QuestionCard = ({ selectedValueVar,formId }: QuestionCardProps) => {
  const [questionOrder,setQuestionOrder] = useState<number>(0);
  console.log(selectedValueVar);
  console.log("Question Order Inside Question Card",questionOrder);
  return (
    <div>
      {/* Render different content based on selected value */}
      {selectedValueVar && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-2">
            Selected Question Type: {selectedValueVar}
          </h3>

          {selectedValueVar === "short_answer" && <ShortAnswer questionOrder={questionOrder} setQuestionOrder={setQuestionOrder} formId={formId} />}

          {selectedValueVar === "long_answer" && <LongAnswer />}

          {selectedValueVar === "multiple_choice" && <MultipleChoice />}

          {selectedValueVar === "dropdown" && <Dropdown />}

          {selectedValueVar === "checkbox" && <Checkbox />}

          {selectedValueVar === "file_upload" && <FileUpload />}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
