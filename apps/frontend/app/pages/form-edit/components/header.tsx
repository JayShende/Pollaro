"use client";

import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/ui/user-avatar";
import { interFont } from "@/fonts/font";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

import { IoSettingsOutline } from "react-icons/io5";
import { IoLinkOutline } from "react-icons/io5";
import { formInfoProps } from "@/app/types/form.types";
import { IoCheckmark } from "react-icons/io5";
import { useCheckIfFormIsAcceptingResponses } from "@/app/services/queries";
import { useToggleAcceptingResponses } from "@/app/services/mutations";

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
import { toast } from "sonner";

interface HeaderFormEditProps {
  formId: string;
  name: string;
  image: string;
  email: string;
  initials: string;
  formInfo: formInfoProps;
}

const HeaderFormEdit = ({
  formId,
  name,
  image,
  email,
  initials,
  formInfo,
}: HeaderFormEditProps) => {
  const isAcceptingResponsesQuery = useCheckIfFormIsAcceptingResponses(formId);
  const toggleAcceptingResponsesMutation = useToggleAcceptingResponses();
  const [copyLink, setCopyLink] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  if (isAcceptingResponsesQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (isAcceptingResponsesQuery.isError) {
    return <div>Error...</div>;
  }
  const isAcceptingResponses = isAcceptingResponsesQuery.data.data;

  const formLink = `http://localhost:3000/form/${formId}/view`;

  async function toggleAcceptingResponses() {
    try {
      await toggleAcceptingResponsesMutation.mutateAsync(formId);
      toast.success(
        isAcceptingResponses
          ? "Accepting responses updated successfully"
          : "Form published successfully"
      );
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to update accepting responses");
      console.error("Error:", error);
    }
  }
  return (
    <div className="bg-indigo-50 h-16 px-6 py-2 flex justify-between items-center sticky top-0 z-50">
      <div className="flex  items-center">
        <Image
          src="https://d2umaa5a4grwi8.cloudfront.net/projects/pollaro/assets/logo_2.png"
          width={60}
          height={60}
          alt="logo-pollaro"
        />
        <span
          className={cn(
            "text-2xl font-bold text-gray-900",
            interFont.className
          )}
        >
          {formInfo.title}
        </span>
      </div>
      <div className="flex items-center justify-between gap-x-4">
        <div
          className="p-1 rounded-full hover:bg-indigo-100 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(formLink);
            setCopyLink(true);
            setTimeout(() => {
              setCopyLink(false);
            }, 1000);
          }}
        >
          {copyLink ? (
            <IoCheckmark className="text-indigo-600 w-5 h-5" />
          ) : (
            <IoLinkOutline className="text-indigo-600 w-5 h-5" />
          )}
        </div>
        <div className="p-1 rounded-full hover:bg-indigo-100 cursor-pointer">
          <IoSettingsOutline className="text-indigo-600 w-5 h-5" />
        </div>

        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "bg-indigo-500 text-white hover:bg-indigo-600 hover:text-white",
                interFont.className
              )}
            >
              {isAcceptingResponses
                ? "Stop Accepting Responses"
                : "Publish Form"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {isAcceptingResponses
                  ? " Stop Accepting Responses"
                  : "Publish Form"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {isAcceptingResponses
                  ? "This will  stop accepting responses."
                  : "This will  publish the form and allow users to submit responses."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {isAcceptingResponses && (
                <AlertDialogAction onClick={() => toggleAcceptingResponses()}>
                  Stop Accepting Responses
                </AlertDialogAction>
              )}
              {!isAcceptingResponses && (
                <AlertDialogAction onClick={() => toggleAcceptingResponses()}>
                  Publish Form
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <UserAvatar
          name={name}
          image={image}
          email={email}
          initials={initials}
        />
      </div>
    </div>
  );
};

export default HeaderFormEdit;
