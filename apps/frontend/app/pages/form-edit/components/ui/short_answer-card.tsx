import { formQuestionsProps } from "@/app/types/form.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { interFont, poppinsFont } from "@/fonts/font";
import { cn } from "@/lib/utils";
import React from "react";

interface ShortAnswerCardProps {
  data: formQuestionsProps;
  formId: string;
}

const ShortAnswerCard = ({ data, formId }: ShortAnswerCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div
            className={cn(
              "text-lg font-semibold text-indigo-600 flex gap-x-1 items-center",
              interFont.className
            )}
          >
            {data.text}
            {data.required && <span className="text-red-500 text-sm">*</span>}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          className={cn("w-[60%] placeholder:text-xs ", poppinsFont.className)}
          placeholder="Your Answer"
        />
      </CardContent>
    </Card>
  );
};

export default ShortAnswerCard;
