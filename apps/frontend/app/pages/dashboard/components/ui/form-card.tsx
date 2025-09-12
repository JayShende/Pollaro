import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { interFont } from "@/fonts/font";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { IoOpenOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaUserLock } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";

import Image from "next/image";

interface FormCardProps {
  formId: string;
  title: string;
  description: string;
  updatedAt: string;
}

const FormCard = ({ formId, title, description, updatedAt }: FormCardProps) => {
  const date = new Date(updatedAt);

  // Extract date & time
  const formattedDate = date.toLocaleDateString("en-IN"); // 🇮🇳 dd/mm/yyyy
  const formattedTime = date.toLocaleTimeString("en-IN"); // hh:mm:ss AM/PM

  //   temp var
  const isPublic = true;
  return (
    <Card className={cn("w-full h-52", interFont.className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-indigo-500">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-900 text-xs">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full flex items-center justify-center">
        <div className="w-full flex items-center justify-start gap-x-1">
          <Image
            src="https://d2umaa5a4grwi8.cloudfront.net/projects/pollaro/assets/logo_2.png"
            width={30}
            height={30}
            alt="logo-pollaro"
          />
          <span className="text-xs text-gray-500">{formattedDate}</span>
          <span className="text-xs text-gray-500">{formattedTime}</span>
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <div className="flex w-full items-center justify-center gap-3">
          {isPublic ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex items-center justify-center p-2 rounded-full hover:bg-indigo-50 transition-colors">
                  <FaUserLock size={18} className="text-indigo-600" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="rounded-md bg-gray-900 text-white px-3 py-1.5 text-xs shadow-md">
                <p>Accepting Response</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex items-center justify-center p-2 rounded-full hover:bg-indigo-50 transition-colors">
                  <FaUserClock size={18} className="text-indigo-600" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="rounded-md bg-gray-900 text-white px-3 py-1.5 text-xs shadow-md">
                <p>Not Accepting Response</p>
              </TooltipContent>
            </Tooltip>
          )}
          <button className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
            <IoOpenOutline size={20} />
          </button>

          <button className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
            <MdContentCopy size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 text-red-500 transition cursor-pointer">
            <MdDeleteOutline size={20} />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FormCard;
