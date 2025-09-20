import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formQuestionsProps } from "@/app/types/form.types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { interFont } from "@/fonts/font";

interface MultipleChoiceCardProps {
  data: formQuestionsProps;
  formId: string;
}

const MultipleChoiceCard = ({ data, formId }: MultipleChoiceCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={cn(
            "text-lg font-semibold text-indigo-600",
            interFont.className
          )}
        >
          {data.text}
          {data.required && <span className="text-red-500 text-sm">*</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup>
          {data.options?.map((option) => {
            return (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id}>{option.text}</Label>
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default MultipleChoiceCard;
