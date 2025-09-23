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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTabs } from "../../response/components/tabs-provider";
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
  const { tab, setTab } = useTabs();
  if (isAcceptingResponsesQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (isAcceptingResponsesQuery.isError) {
    return <div>Error...</div>;
  }
  const isAcceptingResponses = isAcceptingResponsesQuery.data.data;

  const formLink = `${process.env.NEXT_PUBLIC_APP_URL}/form/${formId}/view`;

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
    <div className="bg-indigo-50 min-h-16 px-3 sm:px-6 py-2 sticky top-0 z-50">
      {/* Mobile Layout */}
      <div className="flex flex-col space-y-3 sm:hidden">
        {/* Top row: Logo and title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="https://d2umaa5a4grwi8.cloudfront.net/projects/pollaro/assets/logo_2.png"
              width={40}
              height={40}
              alt="logo-pollaro"
            />
            <span
              className={cn(
                "text-lg font-bold text-gray-900 truncate max-w-[150px]",
                interFont.className
              )}
            >
              {formInfo.title.length > 15
                ? `${formInfo.title.slice(0, 15)}...`
                : formInfo.title}
            </span>
          </div>
          <UserAvatar
            name={name}
            image={image}
            email={email}
            initials={initials}
          />
        </div>

        {/* Bottom row: Tabs and actions */}
        <div className="flex items-center justify-between">
          <Tabs
            value={tab}
            onValueChange={(val) => setTab(val as "edit_form" | "responses")}
          >
            <TabsList
              className={cn("bg-indigo-50 gap-x-1 h-8", interFont.className)}
            >
              <TabsTrigger value="edit_form" className="text-xs px-2">
                Edit
              </TabsTrigger>
              <TabsTrigger value="responses" className="text-xs px-2">
                Responses
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-x-2">
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
                <IoCheckmark className="text-indigo-600 w-4 h-4" />
              ) : (
                <IoLinkOutline className="text-indigo-600 w-4 h-4" />
              )}
            </div>
            <div className="p-1 rounded-full hover:bg-indigo-100 cursor-pointer">
              <IoSettingsOutline className="text-indigo-600 w-4 h-4" />
            </div>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "bg-indigo-500 text-white hover:bg-indigo-600 hover:text-white text-xs px-2",
                    interFont.className
                  )}
                >
                  {isAcceptingResponses ? "Stop" : "Publish"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="mx-4">
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
                    <AlertDialogAction
                      onClick={() => toggleAcceptingResponses()}
                    >
                      Stop Accepting Responses
                    </AlertDialogAction>
                  )}
                  {!isAcceptingResponses && (
                    <AlertDialogAction
                      onClick={() => toggleAcceptingResponses()}
                    >
                      Publish Form
                    </AlertDialogAction>
                  )}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:grid grid-cols-3 h-12">
        <div className="flex items-center col-span-1">
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
            {formInfo.title.length > 10
              ? `${formInfo.title.slice(0, 10)}...`
              : formInfo.title}
          </span>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <Tabs
            value={tab}
            onValueChange={(val) => setTab(val as "edit_form" | "responses")}
          >
            <TabsList
              className={cn("bg-indigo-50 gap-x-1", interFont.className)}
            >
              <TabsTrigger value="edit_form">Edit Form</TabsTrigger>
              <TabsTrigger value="responses">Responses</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center justify-end gap-x-4 col-span-1">
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
    </div>
  );
};

export default HeaderFormEdit;
