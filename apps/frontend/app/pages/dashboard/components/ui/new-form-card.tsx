import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { interFont } from "@/fonts/font";
import { cn } from "@/lib/utils";

import { IoAdd } from "react-icons/io5";

const CreateNewFormCard = () => {
  return (
    <Card className="w-full h-52">
      <CardContent className="w-full h-full flex items-center justify-center">
        <IoAdd className="text-7xl font-medium text-indigo-600" />
      </CardContent>
      <CardFooter className="w-full">
        <Button
          variant="outline"
          className={cn(
            " w-full rounded-lg border font-normal border-gray-300 px-4 py-2 text-sm text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer",
            interFont.className
          )}
        >
          Blank Form
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateNewFormCard;
