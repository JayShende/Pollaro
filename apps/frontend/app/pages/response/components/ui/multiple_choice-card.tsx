import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { interFont } from "@/fonts/font";
import { Circle } from "lucide-react";

interface MultipleChoiceCardProps {
  question: {
    id: string;
    text: string;
    type: string;
    required: boolean;
    options?: Array<{
      id: string;
      text: string;
    }>;
  };
  response: {
    options?: {
      optionId: string;
    };
  };
  responseIndex: number;
}

const MultipleChoiceCard = ({
  question,
  response,
  responseIndex,
}: MultipleChoiceCardProps) => {
  const selectedOption = question.options?.find(
    (option) => option.id === response.options?.optionId
  );

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
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center space-x-2">
              <Circle className="h-4 w-4 text-indigo-600 fill-current" />
              <span
                className={cn("text-gray-700 font-medium", interFont.className)}
              >
                {selectedOption?.text || "No response provided"}
              </span>
            </div>
          </div>

          {/* Show all available options for context */}
          {question.options && question.options.length > 0 && (
            <div className="mt-4">
              <p
                className={cn(
                  "text-sm text-gray-600 mb-2",
                  interFont.className
                )}
              >
                Available options:
              </p>
              <div className="space-y-1">
                {question.options.map((option) => (
                  <div
                    key={option.id}
                    className={cn(
                      "flex items-center space-x-2 p-2 rounded text-sm",
                      option.id === response.options?.optionId
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-500"
                    )}
                  >
                    <Circle className="h-3 w-3" />
                    <span className={interFont.className}>{option.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MultipleChoiceCard;
