import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { formQuestionsProps, questionType } from "@/app/types/form.types";
import { cn } from "@/lib/utils";
import { interFont, poppinsFont } from "@/fonts/font";
import { FormField, FormMessage } from "@/components/ui/form";

interface QuestionCardProps {
  data: formQuestionsProps;
}

const QuestionCard = ({ data }: QuestionCardProps) => {
  const fieldName = `question_${data.id}`;

  if (data.type === questionType.SHORT_ANSWER) {
    return (
      <FormField
        name={fieldName}
        render={({ field }) => (
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
                  {data.required && (
                    <span className="text-red-500 text-sm">*</span>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                {...field}
                value={field.value || ""}
                className={cn(
                  "w-[60%] placeholder:text-xs ",
                  poppinsFont.className
                )}
                placeholder="Your Answer"
              />
            </CardContent>
            <CardFooter>
              <FormMessage />
            </CardFooter>
          </Card>
        )}
      />
    );
  }
  if (data.type === questionType.LONG_ANSWER) {
    return (
      <FormField
        name={fieldName}
        render={({ field }) => (
          <Card>
            <CardHeader>
              <CardTitle
                className={cn(
                  "text-lg font-semibold text-indigo-600",
                  interFont.className
                )}
              >
                {data.text}
                {data.required && <span className="text-red-500">*</span>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                {...field}
                value={field.value || ""}
                className={cn(
                  "w-[60%] placeholder:text-xs max-h-36 ",
                  poppinsFont.className
                )}
                placeholder="Your Answer"
              />
            </CardContent>
            <CardFooter>
              <FormMessage />
            </CardFooter>
          </Card>
        )}
      />
    );
  }

  if (data.type === questionType.MULTIPLE_CHOICE) {
    return (
      <FormField
        name={fieldName}
        render={({ field }) => (
          <Card>
            <CardHeader>
              <CardTitle
                className={cn(
                  "text-lg font-semibold text-indigo-600",
                  interFont.className
                )}
              >
                {data.text}
                {data.required && (
                  <span className="text-red-500 text-sm">*</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={field.value || ""}
                onValueChange={field.onChange}
              >
                {data.options?.map((option) => {
                  return (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id}>{option.text}</Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <FormMessage />
            </CardFooter>
          </Card>
        )}
      />
    );
  }

  if (data.type === questionType.CHECKBOX) {
    return (
      <FormField
        name={fieldName}
        render={({ field }) => (
          <Card>
            <CardHeader>
              <CardTitle
                className={cn(
                  "text-lg font-semibold text-indigo-600",
                  interFont.className
                )}
              >
                {data.text}
                {data.required && (
                  <span className="text-red-500 text-sm">*</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {data.options?.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={(field.value || []).includes(option.id)}
                      onCheckedChange={(checked) => {
                        const currentValues = field.value || [];
                        if (checked) {
                          field.onChange([...currentValues, option.id]);
                        } else {
                          field.onChange(
                            currentValues.filter(
                              (id: string) => id !== option.id
                            )
                          );
                        }
                      }}
                    />
                    <Label htmlFor={option.id}>{option.text}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <FormMessage />
            </CardFooter>
          </Card>
        )}
      />
    );
  }

  if (data.type === questionType.DROPDOWN) {
    return (
      <FormField
        name={fieldName}
        render={({ field }) => (
          <Card>
            <CardHeader>
              <CardTitle
                className={cn(
                  "text-lg font-semibold text-indigo-600",
                  interFont.className
                )}
              >
                {data.text}
                {data.required && (
                  <span className="text-red-500 text-sm">*</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={field.value || ""} onValueChange={field.onChange}>
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
            <CardFooter>
              <FormMessage />
            </CardFooter>
          </Card>
        )}
      />
    );
  }

  if (data.type === questionType.FILE_UPLOAD) {
    return (
      <FormField
        name={fieldName}
        render={({ field }) => (
          <Card>
            <CardHeader>
              <CardTitle
                className={cn(
                  "text-lg font-semibold text-indigo-600",
                  interFont.className
                )}
              >
                {data.text}
                {data.required && (
                  <span className="text-red-500 text-sm">*</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    id="file-upload"
                    multiple
                    className={cn(
                      "w-[60%] file:mr-4 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100",
                      poppinsFont.className
                    )}
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      field.onChange(files);
                    }}
                  />
                </div>
                <p
                  className={cn("text-sm text-gray-500", poppinsFont.className)}
                >
                  Supported formats: PDF, DOC, DOCX, PNG, JPG, GIF (Max 10MB)
                </p>
                {(field.value || []).length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">
                      Selected files:
                    </p>
                    <ul className="text-sm text-gray-600">
                      {(field.value || []).map((file: File, index: number) => (
                        <li key={index}>• {file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <FormMessage />
            </CardFooter>
          </Card>
        )}
      />
    );
  }
};

export default QuestionCard;
