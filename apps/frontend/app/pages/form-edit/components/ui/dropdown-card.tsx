import React from "react";

import { formQuestionsProps } from "@/app/types/form.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { interFont, poppinsFont } from "@/fonts/font";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DropdownCardProps {
  data: formQuestionsProps;
  formId: string;
}

const DropdownCard = ({ data, formId }: DropdownCardProps) => {
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
        <Select>
          <SelectTrigger className={cn("w-[60%]", poppinsFont.className)}>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {data.options?.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default DropdownCard;
