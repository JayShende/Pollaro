import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { interFont } from "@/fonts/font";
import { CheckSquare, Square } from "lucide-react";

interface CheckboxCardProps {
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
    options?: Array<{
      optionId: string;
    }>;
  };
  responseIndex: number;
}

const CheckboxCard = ({
  question,
  response,
  responseIndex,
}: CheckboxCardProps) => {
  const selectedOptionIds = response.options?.map((opt) => opt.optionId) || [];

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
          {/* Show selected options */}
          <div className="p-4 bg-gray-50 rounded-lg border">
            {selectedOptionIds.length > 0 ? (
              <div className="space-y-2">
                {question.options
                  ?.filter((option) => selectedOptionIds.includes(option.id))
                  .map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2"
                    >
                      <CheckSquare className="h-4 w-4 text-indigo-600 fill-current" />
                      <span
                        className={cn(
                          "text-gray-700 font-medium",
                          interFont.className
                        )}
                      >
                        {option.text}
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className={cn("text-gray-500", interFont.className)}>
                No options selected
              </p>
            )}
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
                {question.options.map((option) => {
                  const isSelected = selectedOptionIds.includes(option.id);
                  return (
                    <div
                      key={option.id}
                      className={cn(
                        "flex items-center space-x-2 p-2 rounded text-sm",
                        isSelected
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-500"
                      )}
                    >
                      {isSelected ? (
                        <CheckSquare className="h-3 w-3 text-indigo-600 fill-current" />
                      ) : (
                        <Square className="h-3 w-3" />
                      )}
                      <span className={interFont.className}>{option.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckboxCard;
