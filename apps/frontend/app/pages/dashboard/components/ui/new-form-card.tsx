import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { interFont } from "@/fonts/font";
import { cn } from "@/lib/utils";

import { IoAdd } from "react-icons/io5";

const CreateNewFormCard = () => {
  return (
    <Card className="w-full min-h-36">
      <CardContent className="w-full h-full">
        <div className="flex items-center justify-center">
          <IoAdd className="text-7xl font-medium text-gray-600" />
        </div>
      </CardContent>
      <CardFooter>
        <button
          className={cn(
            "w-full rounded-lg border border-gray-300 px-4 py-2 text-xs text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer",
            interFont.className
          )}
        >
          Blank Form
        </button>
      </CardFooter>
    </Card>
  );
};

export default CreateNewFormCard;
