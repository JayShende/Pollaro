"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  AlignLeft,
  CheckSquare,
  ChevronDown,
  Upload,
  Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { interFont } from "@/fonts/font";
import FileUpload from "./file_upload-form";
import Checkbox from "./checkbox-form";
import Dropdown from "./dropdown-form";
import MultipleChoice from "./multiple_choice-form";
import LongAnswer from "./long_answer-form";
import ShortAnswer from "./short_answer-form";
import QuestionCard from "./question-card";

interface GeneratedFormProps {
  formId: string;
}

const questionTypes = [
  {
    value: "short_answer",
    label: "Short Answer",
    description: "Single line text input",
    icon: FileText,
    color: "bg-blue-100 text-blue-600",
  },
  {
    value: "long_answer",
    label: "Long Answer",
    description: "Multi-line text input",
    icon: AlignLeft,
    color: "bg-green-100 text-green-600",
  },
  {
    value: "multiple_choice",
    label: "Multiple Choice",
    description: "Single selection from options",
    icon: Circle,
    color: "bg-purple-100 text-purple-600",
  },
  {
    value: "dropdown",
    label: "Dropdown",
    description: "Select from dropdown menu",
    icon: ChevronDown,
    color: "bg-orange-100 text-orange-600",
  },
  {
    value: "checkbox",
    label: "Checkbox",
    description: "Multiple selections allowed",
    icon: CheckSquare,
    color: "bg-pink-100 text-pink-600",
  },
  {
    value: "file_upload",
    label: "File Upload",
    description: "Upload files and documents",
    icon: Upload,
    color: "bg-indigo-100 text-indigo-600",
  },
];

export default function GeneratedForm({ formId }: GeneratedFormProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const selectedQuestionType = questionTypes.find(
    (type) => type.value === selectedValue
  );

  return (
    <div className="space-y-6">
      {/* Question Type Selection */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Question Type
          </h3>
          <p className="text-sm text-gray-600">
            Choose the type of question you want to add to your form.
          </p>
        </div>

        <Select onValueChange={setSelectedValue} value={selectedValue}>
          <SelectTrigger className="w-full h-12 text-left">
            <SelectValue placeholder="Select a question type..." />
          </SelectTrigger>
          <SelectContent>
            {questionTypes.map((type) => {
              const Icon = type.icon;
              return (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center space-x-3 py-2">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg",
                        type.color
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{type.label}</p>
                      <p className="text-xs text-gray-500">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Selected Question Type Badge */}
      {selectedQuestionType && (
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="px-3 py-1">
            <div
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded-full mr-2",
                selectedQuestionType.color
              )}
            >
              {React.createElement(selectedQuestionType.icon, {
                className: "h-2.5 w-2.5",
              })}
            </div>
            {selectedQuestionType.label}
          </Badge>
          <span className="text-sm text-gray-600">
            {selectedQuestionType.description}
          </span>
        </div>
      )}

      {/* Question Configuration */}
      {selectedValue && (
        <Card className="border-0 shadow-sm bg-gray-50/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-medium text-gray-900">
              Configure Your Question
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Set up the question details and options.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <QuestionCard selectedValueVar={selectedValue} formId={formId} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
