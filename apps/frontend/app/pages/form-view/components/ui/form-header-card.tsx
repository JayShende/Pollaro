import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { geistFont, interFont, poppinsFont } from "@/fonts/font";
import { cn, formateDate } from "@/lib/utils";
import { BsPerson } from "react-icons/bs";

interface FormHeaderCardProps {
  data: {
    formId: string;
    title: string;
    description: string;
    ownerName: string;
    ownerEmail: string;
    createdAt: string;
  };
}

const FormHeaderCard = ({ data }: FormHeaderCardProps) => {
  const initials = data.ownerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const timeStamp = formateDate(data.createdAt);
  return (
    <Card className="pt-0">
      <div className="m-0 w-full h-3 bg-indigo-500 rounded-t-xl"></div>
      <CardHeader>
        <CardTitle
          className={cn(
            "text-3xl font-bold text-indigo-600",
            poppinsFont.className
          )}
        >
          {data.title}
        </CardTitle>
        <CardDescription
          className={cn("font-semibold text-base", interFont.className)}
        >
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex gap-1 items-center">
            <button className="p-1 rounded-full bg-gray-100">
              <BsPerson className="text-sm text-indigo-600" />
            </button>
            <span
              className={cn(
                "text-sm font-normal text-gray-500",
                interFont.className
              )}
            >
              {data.ownerName} ({data.ownerEmail})
            </span>
            <div></div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div
          className={cn(
            "flex text-xs text-gray-500 gap-x-1",
            interFont.className
          )}
        >
          <p>{timeStamp.formattedDate}</p>
          <p>{timeStamp.formattedTime}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FormHeaderCard;
