import {
  Card,
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { IoOpenOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaUserLock } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useDeleteForm } from "@/app/services/mutations";
import { toast } from "sonner";

interface FormCardProps {
  formId: string;
  title: string;
  description: string;
  updatedAt: string;
  isAcceptingResponses: boolean;
}

const FormCard = ({
  formId,
  title,
  description,
  updatedAt,
  isAcceptingResponses,
}: FormCardProps) => {
  const [copyLink, setCopyLink] = useState(false);
  const date = new Date(updatedAt);
  const deleteFormMutation = useDeleteForm();
  // Extract date & time
  const formattedDate = date.toLocaleDateString("en-IN"); // 🇮🇳 dd/mm/yyyy
  const formattedTime = date.toLocaleTimeString("en-IN"); // hh:mm:ss AM/PM
  const formLink = `http://localhost:3000/form/${formId}/view`;
  const formEditLink = `http://localhost:3000/form/${formId}/edit`;

  async function deleteForm() {
    await deleteFormMutation.mutateAsync(formId);
    toast.success("Form deleted successfully");
  }

  return (
    <Card className={cn("w-full h-64", interFont.className)}>
      <CardHeader>
        <Link href={formEditLink} target="_blank">
          <CardTitle className="sm:text-lg text-md font-semibold text-indigo-500 hover:underline cursor-pointer">
            {title}
          </CardTitle>
        </Link>
        <CardDescription className="text-gray-900 text-xs">
          {description.length > 40
            ? `${description.slice(0, 40)}...`
            : description}
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
          {!isAcceptingResponses ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex items-center justify-center p-2 rounded-full hover:bg-indigo-50 transition-colors">
                  <FaUserLock size={18} className="text-indigo-600" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="rounded-md bg-gray-900 text-white px-3 py-1.5 text-xs shadow-md">
                <p>Not Accepting Response</p>
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
                <p>Accepting Response</p>
              </TooltipContent>
            </Tooltip>
          )}
          <Link href={formLink} target="_blank">
            <button className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
              <IoOpenOutline size={20} />
            </button>
          </Link>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(formLink);
              setCopyLink(true);
              setTimeout(() => {
                setCopyLink(false);
              }, 1000);
            }}
          >
            {copyLink ? <IoCheckmark size={20} /> : <MdContentCopy size={20} />}
          </button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 rounded-full hover:bg-gray-100 text-red-500 transition cursor-pointer">
                <MdDeleteOutline size={20} />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your form and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteForm}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FormCard;
