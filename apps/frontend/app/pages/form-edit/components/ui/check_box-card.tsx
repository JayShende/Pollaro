import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formQuestionsProps } from "@/app/types/form.types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { interFont } from "@/fonts/font";

interface CheckboxCardProps {
  data: formQuestionsProps;
  formId: string;
}

const CheckboxCard = ({ data, formId }: CheckboxCardProps) => {
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
        <div className="flex flex-col gap-2">
          {data.options?.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox id={option.id} checked={false} />
              <Label htmlFor={option.id}>{option.text}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckboxCard;
