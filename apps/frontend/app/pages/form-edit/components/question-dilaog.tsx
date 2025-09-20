"use client";
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
import FileUpload from "./file_upload-form";
import Checkbox from "./checkbox-form";
import Dropdown from "./dropdown-form";
import MultipleChoice from "./multiple_choice-form";
import LongAnswer from "./long_answer-form";
import ShortAnswer from "./short_answer-form";
import { useState, useEffect } from "react";
import QuestionCard from "./question-card";
interface GeneratedFormProps {
  formId: string;
}
export default function GeneratedForm({ formId }: GeneratedFormProps) {


  const [selectedValue,setSelectedValue] = useState<string>("");

  return (
    <>
      <Select key="select-0" onValueChange={setSelectedValue} value={selectedValue}>
        <SelectTrigger id="select-0" className="w-full ">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key="short_answer" value="short_answer">
            Short Answer
          </SelectItem>

          <SelectItem key="long_answer" value="long_answer">
            Long Answer
          </SelectItem>

          <SelectItem key="multiple_choice" value="multiple_choice">
            Multiple Choice
          </SelectItem>

          <SelectItem key="dropdown" value="dropdown">
            Dropdown
          </SelectItem>

          <SelectItem key="checkbox" value="checkbox">
            Checkbox
          </SelectItem>

          <SelectItem key="file_upload" value="file_upload">
            File Upload
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Render different content based on selected value */}
      <QuestionCard selectedValueVar={selectedValue} formId={formId} />
      
    </>
  );
}
