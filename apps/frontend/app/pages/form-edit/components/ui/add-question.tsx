import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoIosAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { interFont } from "@/fonts/font";
import GeneratedForm from "../question-dilaog";
interface AddQuestionProps {
  formId: string;
}
const AddQuestion = ({ formId }: AddQuestionProps) => {
  return (
    <div className="flex items-center justify-center  w-3xl">
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full  rounded-lg border font-normal border-gray-300 px-4 py-4 text-sm text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
              interFont.className
            )}
          >
            <IoIosAdd className="w-4 h-4" />
            Add Question
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Question To Your Form</DialogTitle>
            <DialogDescription>
              Add a new question to your form to collect more data.
            </DialogDescription>
          </DialogHeader>
          <GeneratedForm formId={formId}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddQuestion;
