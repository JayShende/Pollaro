import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { interFont } from "@/fonts/font";
import Summary from "./components/summary";
import Responses from "./components/individual_responses";
import { useGetTotalResponses } from "@/app/services/queries";
import { useParams } from "next/navigation";
const ResponseMain = () => {
  const [tab, setTab] = useState<string>("summary");
  const params = useParams();
  const formId = params.formId?.toString();
  const totalResponses = useGetTotalResponses(formId as string);
  if (totalResponses.isLoading) {
    return <div>Loading...</div>;
  }
  if (totalResponses.isError) {
    return <div>Error...</div>;
  }
  const totalResponsesData = totalResponses.data.data;
  const totalResponsesCount = totalResponsesData.length;
  return (
    <div className="flex flex-col gap-y-6 max-w-4xl mx-auto p-6 ">
      <Card>
        <CardHeader>
          <CardTitle
            className={cn(
              "text-3xl font-bold text-indigo-600",
              interFont.className
            )}
          >
            {totalResponsesCount} Responses
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full flex justify-center items-center ">
          <Tabs defaultValue="summary" className="w-fit">
            <TabsList
              className={cn("gap-x-3 bg-transparent", interFont.className)}
            >
              <TabsTrigger
                value="summary"
                onClick={() => setTab("summary")}
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600"
              >
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="individual"
                onClick={() => setTab("individual")}
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600"
              >
                Individual Responses
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>
      {tab === "summary" && <Summary totalResponses={totalResponsesCount} totalResponsesData={totalResponsesData} />}
      {tab === "individual" && <Responses />}
    </div>
  );
};

export default ResponseMain;
