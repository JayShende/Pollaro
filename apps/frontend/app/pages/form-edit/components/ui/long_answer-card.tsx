import React from "react";
import { formQuestionsProps } from "@/app/types/form.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { interFont, poppinsFont } from "@/fonts/font";
interface LongAnswerCardProps {
  data: formQuestionsProps;
  formId: string;
}

const LongAnswerCard = ({ data, formId }: LongAnswerCardProps) => {
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
            {data.required && <span className="text-red-500">*</span>}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          className={cn(
            "w-[60%] placeholder:text-xs max-h-36 ",
            poppinsFont.className
          )}
          placeholder="Your Answer"
        />
      </CardContent>
    </Card>
  );
};

export default LongAnswerCard;
