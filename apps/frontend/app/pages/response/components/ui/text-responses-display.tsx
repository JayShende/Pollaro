import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { interFont } from "@/fonts/font";
import { MessageSquare } from "lucide-react";

interface TextResponsesDisplayProps {
  question: {
    id: string;
    text: string;
    type: string;
    required: boolean;
  };
  responses: Array<{
    text?: string;
  }>;
  questionIndex: number;
}

const TextResponsesDisplay = ({
  question,
  responses,
  questionIndex,
}: TextResponsesDisplayProps) => {
  const validResponses = responses.filter(
    (response) => response.text && response.text.trim() !== ""
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle
          className={cn(
            "text-lg font-semibold text-gray-800 flex items-center gap-2",
            interFont.className
          )}
        >
          <MessageSquare className="h-5 w-5 text-indigo-600" />
          {questionIndex + 1}. {question.text}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </CardTitle>
        <p className={cn("text-sm text-gray-600", interFont.className)}>
          {validResponses.length} response
          {validResponses.length !== 1 ? "s" : ""}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {validResponses.length > 0 ? (
            <div className="space-y-2">
              {validResponses.map((response, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={cn(
                        "text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full flex-shrink-0 mt-0.5",
                        interFont.className
                      )}
                    >
                      #{index + 1}
                    </span>
                    <p
                      className={cn(
                        "text-gray-700 whitespace-pre-wrap",
                        interFont.className
                      )}
                    >
                      {response.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className={cn(interFont.className)}>No responses yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TextResponsesDisplay;
