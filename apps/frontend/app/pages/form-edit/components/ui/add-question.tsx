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
    <div className="w-full sm:w-3xl">
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button
            variant="outline"
            className={cn(
              "group relative w-full rounded-xl border-2 border-dashed border-indigo-200 bg-gradient-to-br from-white to-indigo-50/30 px-4 sm:px-6 py-6 sm:py-8 text-sm font-medium text-indigo-600 transition-all duration-300 hover:border-indigo-300 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-indigo-100/50 hover:text-indigo-700 hover:shadow-lg hover:shadow-indigo-100/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
              interFont.className
            )}
          >
            <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-indigo-100 transition-colors duration-300 group-hover:bg-indigo-200">
                <IoIosAdd className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="text-center">
                <p className="text-sm sm:text-base font-semibold">
                  Add New Question
                </p>
                <p className="text-xs text-indigo-500 mt-1">
                  Choose from various question types
                </p>
              </div>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
          <DialogHeader className="space-y-3 pb-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <IoIosAdd className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                  Add New Question
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600 mt-1">
                  Select a question type and configure it to collect the data
                  you need.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-6">
            <GeneratedForm formId={formId} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddQuestion;
