import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { interFont, poppinsFont } from "@/fonts/font";
import { cn } from "@/lib/utils";
import { CheckCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

interface AlreadyRespondedProps {
  formTitle?: string;
  formDescription?: string;
  responseDate?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
}

const AlreadyResponded = ({
  formTitle = "Form Already Responded",
  formDescription = "You have already submitted a response to this form.",
  responseDate,
  showBackButton = false,
  backButtonText = "Go Back",
  backButtonHref = "/dashboard",
}: AlreadyRespondedProps) => {
  return (
    <div className="flex flex-col gap-y-6 max-w-4xl mx-auto p-6">
      <Card className="pt-0">
        {/* Indigo top border matching the form header */}
        <div className="m-0 w-full h-3 bg-indigo-500 rounded-t-xl"></div>

        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/20">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <CardTitle
            className={cn(
              "text-3xl font-bold text-indigo-600 dark:text-indigo-400",
              poppinsFont.className
            )}
          >
            {formTitle}
          </CardTitle>

          <CardDescription
            className={cn(
              "font-semibold text-base text-gray-600 dark:text-gray-300",
              interFont.className
            )}
          >
            {formDescription}
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center">
          <div className="space-y-4">
            {responseDate && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p
                  className={cn(
                    "text-sm text-gray-600 dark:text-gray-300",
                    interFont.className
                  )}
                >
                  Response submitted on
                </p>
                <p
                  className={cn(
                    "font-semibold text-indigo-600 dark:text-indigo-400",
                    poppinsFont.className
                  )}
                >
                  {responseDate}
                </p>
              </div>
            )}

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p
                className={cn(
                  "text-sm text-blue-800 dark:text-blue-200",
                  interFont.className
                )}
              >
                Thank you for your response! Your submission has been recorded
                and will be reviewed by the form owner.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          {showBackButton && (
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                asChild
                variant="outline"
                className="flex items-center gap-2"
              >
                <Link href={backButtonHref}>
                  <ArrowLeft className="h-4 w-4" />
                  {backButtonText}
                </Link>
              </Button>

              <Button
                variant="ghost"
                onClick={() => window.location.reload()}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Page
              </Button>
            </div>
          )}

          <div className="text-center">
            <p
              className={cn(
                "text-xs text-gray-500 dark:text-gray-400",
                interFont.className
              )}
            >
              If you believe this is an error, please contact the form owner or
              try refreshing the page.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AlreadyResponded;
