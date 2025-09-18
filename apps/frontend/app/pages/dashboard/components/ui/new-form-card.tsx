import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { interFont } from "@/fonts/font";
import { cn, delay } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoAdd } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { BlankFormSchema } from "@/app/schemas/form.schema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { useCreateForm } from "@/app/services/mutations";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreateNewFormCard = () => {
  function formSubmitHandler(values: z.infer<typeof BlankFormSchema>) {
    console.log("Hello");
    console.log(values);
  }

  const form = useForm<z.infer<typeof BlankFormSchema>>({
    resolver: zodResolver(BlankFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  // return (
  //   <Card className="w-full h-64">
  //     <CardContent className="w-full h-full flex items-center justify-center">
  //       <IoAdd className="text-7xl font-medium text-indigo-600" />
  //     </CardContent>
  //     <CardFooter className="w-full">
  //       <Dialog>
  //         <DialogTrigger asChild>
  //           <Button
  //             variant="outline"
  //             className={cn(
  //               "w-full rounded-lg border font-normal border-gray-300 px-4 py-2 text-sm text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer",
  //               interFont.className
  //             )}
  //           >
  //             Blank Form
  //           </Button>
  //         </DialogTrigger>

  //         {/* 👇 DialogContent must be directly here */}
  //         <DialogContent
  //           className={cn("sm:max-w-[425px]", interFont.className)}
  //         >
  //           <DialogHeader>
  //             <DialogTitle className="text-lg font-semibold text-indigo-600">
  //               New Form
  //             </DialogTitle>
  //             <DialogDescription className="text-gray-500 text-sm">
  //               Create a new blank form to start collecting data.
  //             </DialogDescription>
  //           </DialogHeader>

  //           <Form {...form}>
  //             <form
  //               onSubmit={form.handleSubmit(formSubmitHandler)}
  //               className="space-y-4"
  //             >
  //               <FormField
  //                 control={form.control}
  //                 name="title"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Title</FormLabel>
  //                     <FormControl>
  //                       <Input {...field} placeholder="Title" type="text"/>
  //                     </FormControl>
  //                     <FormDescription>Enter the Form Title</FormDescription>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               <FormField
  //                 control={form.control}
  //                 name="description"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Description</FormLabel>
  //                     <FormControl>
  //                       <Input
  //                         {...field}
  //                         placeholder="Description"
  //                         type="text"
  //                       />
  //                     </FormControl>
  //                     <FormDescription>
  //                       Enter the Form Description
  //                     </FormDescription>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               <DialogFooter>
  //                 <DialogClose asChild>
  //                   <Button variant="outline">Cancel</Button>
  //                 </DialogClose>
  //                 <Button type="submit" variant="outline">
  //                   Create Form
  //                 </Button>
  //               </DialogFooter>
  //             </form>
  //           </Form>
  //         </DialogContent>
  //       </Dialog>
  //     </CardFooter>
  //   </Card>
  // );
  const router = useRouter();
  const createFormMutation = useCreateForm();
  async function createForm() {
    const data = {
      title: "Untitled Form",
      description: "No description",
    };
    try {
      const response = await createFormMutation.mutateAsync(data);
      toast.success("Form created successfully");
      await delay(2000);
      toast.success("Redirecting to form");
      setTimeout(() => {
        router.push(`/form/${response.data.id}/edit`);
      }, 5000);
    } catch {
      toast.error("Failed to create form", {
        description: "Please try again",
      });
    }
  }
  return (
    <Card className="w-full h-64">
      <CardContent className="w-full h-full flex items-center justify-center">
        <IoAdd className="text-7xl font-medium text-indigo-600" />
      </CardContent>
      <CardFooter className="w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full rounded-lg border font-normal border-gray-300 px-4 py-2 text-sm text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer",
                interFont.className
              )}
            >
              Blank Form
            </Button>
          </DialogTrigger>

          {/* 👇 DialogContent must be directly here */}
          <DialogContent
            className={cn("sm:max-w-[425px]", interFont.className)}
          >
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-indigo-600">
                New Form
              </DialogTitle>
              <DialogDescription className="text-gray-500 text-sm">
                Create a new blank form to start collecting data.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className={cn(
                    " text-sm transition hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer",
                    interFont.className
                  )}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant="outline"
                className={cn(
                  " text-sm transition hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer",
                  interFont.className
                )}
                onClick={createForm}
              >
                Create Form
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default CreateNewFormCard;
