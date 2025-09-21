import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { interFont } from "@/fonts/font";

interface ShortAnswerCardProps {
  question: {
    id: string;
    text: string;
    type: string;
    required: boolean;
  };
  response: {
    text?: string;
  };
  responseIndex: number;
}

const ShortAnswerCard = ({
  question,
  response,
  responseIndex,
}: ShortAnswerCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle
          className={cn(
            "text-lg font-semibold text-gray-800",
            interFont.className
          )}
        >
          {responseIndex + 1}. {question.text}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="p-4 bg-gray-50 rounded-lg border">
            <p className={cn("text-gray-700", interFont.className)}>
              {response.text || "No response provided"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShortAnswerCard;
