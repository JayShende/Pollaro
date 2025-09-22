import { useGetFormInfo } from "@/app/services/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { interFont, poppinsFont } from "@/fonts/font";
import { cn, formateDate } from "@/lib/utils";
import { BsPerson } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlankFormSchema } from "@/app/schemas/form.schema";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateFormInfo } from "@/app/services/mutations";
import { useState } from "react";
import { toast } from "sonner";

interface FormHeaderCardProps {
  formId: string;
}

const FormHeaderCard = ({ formId }: FormHeaderCardProps) => {
  const useGetFormInfoQuery = useGetFormInfo(formId);
  const useUpdateFormInfoMutation = useUpdateFormInfo();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof BlankFormSchema>>({
    resolver: zodResolver(BlankFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  if (useGetFormInfoQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (useGetFormInfoQuery.isError) {
    return <div>Error</div>;
  }
  const dataObject = useGetFormInfoQuery.data;
  const data = {
    formId: dataObject?.data.id,
    title: dataObject?.data.title,
    description: dataObject?.data.description,
    ownerName: dataObject?.data.owner.name,
    ownerEmail: dataObject?.data.owner.email,
    createdAt: dataObject?.data.createdAt,
  };
  const timeStamp = formateDate(data.createdAt);
  async function formSubmitHandler(values: z.infer<typeof BlankFormSchema>) {
    await useUpdateFormInfoMutation.mutateAsync({ formId, data: values });
    toast.success("Form updated successfully");
    setIsOpen(false);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-x-2">
      <Card className="pt-0 w-full sm:w-3xl">
        <div className="m-0 w-full h-3 bg-indigo-500 rounded-t-xl"></div>
        <CardHeader className="pb-3">
          <CardTitle
            className={cn(
              "text-xl sm:text-3xl font-bold text-indigo-600 break-words",
              poppinsFont.className
            )}
          >
            {useGetFormInfoQuery.data.data.title}
          </CardTitle>
          <CardDescription
            className={cn(
              "font-semibold text-sm sm:text-base break-words",
              interFont.className
            )}
          >
            {data.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          <div>
            <div className="flex gap-1 items-center flex-wrap">
              <button className="p-1 rounded-full bg-gray-100 flex-shrink-0">
                <BsPerson className="text-sm text-indigo-600" />
              </button>
              <span
                className={cn(
                  "text-xs sm:text-sm font-normal text-gray-500 break-all",
                  interFont.className
                )}
              >
                {data.ownerName} ({data.ownerEmail})
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex flex-col gap-y-2 w-full">
            <span
              className={cn(
                "text-xs font-normal text-red-500",
                interFont.className
              )}
            >
              * Indicates required question
            </span>
            <div
              className={cn(
                "flex text-xs text-gray-500 gap-x-1 flex-wrap",
                interFont.className
              )}
            >
              <p>{timeStamp.formattedDate}</p>
              <p>{timeStamp.formattedTime}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
      <div className="h-full bg-emerald-50 flex flex-col sm:flex-shrink-0">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <div className="p-1 rounded-full hover:bg-indigo-100 cursor-pointer flex items-center justify-center">
              <FiEdit className="text-indigo-600 w-5 h-5" />
            </div>
          </DialogTrigger>
          <DialogContent
            className={cn(
              "sm:max-w-[500px] max-w-[95vw] border-indigo-200 mx-4",
              interFont.className
            )}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-t-lg"></div>
            <DialogHeader className="space-y-3">
              <DialogTitle
                className={cn(
                  "text-xl sm:text-2xl font-bold text-indigo-600 flex items-center gap-2",
                  poppinsFont.className
                )}
              >
                <FiEdit className="w-5 h-5 sm:w-6 sm:h-6" />
                Edit Form Details
              </DialogTitle>
              <p className="text-sm text-gray-600">
                Update your form title and description to better reflect its
                purpose.
              </p>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(formSubmitHandler)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Form Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter a descriptive title for your form"
                            type="text"
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20"
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          This will be displayed at the top of your form
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Form Description
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Provide additional context about your form"
                            type="text"
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20"
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Help users understand what this form is for
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter className="gap-3 pt-4 flex-col sm:flex-row">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm w-full sm:w-auto"
                  >
                    Update Form
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FormHeaderCard;
