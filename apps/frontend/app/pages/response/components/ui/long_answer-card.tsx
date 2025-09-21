import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { interFont } from "@/fonts/font";

interface LongAnswerCardProps {
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

const LongAnswerCard = ({
  question,
  response,
  responseIndex,
}: LongAnswerCardProps) => {
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
            <p
              className={cn(
                "text-gray-700 whitespace-pre-wrap",
                interFont.className
              )}
            >
              {response.text || "No response provided"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LongAnswerCard;
