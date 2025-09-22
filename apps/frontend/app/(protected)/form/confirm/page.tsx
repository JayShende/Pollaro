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
import { CheckCircle, Home } from "lucide-react";
import Link from "next/link";

const ResponseConfirm = () => {
  return (
    <div className="flex flex-col gap-y-6 max-w-4xl mx-auto p-6 bg-[#EFEFEF] min-w-full min-h-screen items-center">
      <Card className="pt-0 w-[60%]">
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
            Response Submitted Successfully
          </CardTitle>

          <CardDescription
            className={cn(
              "font-semibold text-base text-gray-600 dark:text-gray-300",
              interFont.className
            )}
          >
            Thank you for your response! Your submission has been recorded.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center">
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p
                className={cn(
                  "text-sm text-green-800 dark:text-green-200",
                  interFont.className
                )}
              >
                Your response has been successfully submitted and will be
                reviewed by the form owner. You will be notified if any
                follow-up is required.
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p
                className={cn(
                  "text-sm text-blue-800 dark:text-blue-200",
                  interFont.className
                )}
              >
                <strong>What&apos;s next?</strong> The form owner will review
                your response and may contact you if additional information is
                needed.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <div className="flex justify-center">
            <Button asChild className="flex items-center gap-2">
              <Link href="/dashboard">
                <Home className="h-4 w-4" />
                Go to Dashboard
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <p
              className={cn(
                "text-xs text-gray-500 dark:text-gray-400",
                interFont.className
              )}
            >
              Need help? Contact the form owner or check your email for a
              confirmation receipt.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResponseConfirm;
