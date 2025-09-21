import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { interFont } from "@/fonts/font";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { BarChart3 } from "lucide-react";

interface OptionResponsesChartProps {
  question: {
    id: string;
    text: string;
    type: string;
    required: boolean;
    options?: Array<{
      id: string;
      text: string;
    }>;
  };
  responses: Array<{
    options?:
      | Array<{
          optionId: string;
        }>
      | {
          optionId: string;
        };
  }>;
  questionIndex: number;
}

const COLORS = [
  "#3B82F6", // blue
  "#10B981", // emerald
  "#F59E0B", // amber
  "#EF4444", // red
  "#8B5CF6", // violet
  "#06B6D4", // cyan
  "#84CC16", // lime
  "#F97316", // orange
  "#EC4899", // pink
  "#6B7280", // gray
];

const OptionResponsesChart = ({
  question,
  responses,
  questionIndex,
}: OptionResponsesChartProps) => {
  // Count responses for each option
  const optionCounts =
    question.options?.map((option) => {
      const count = responses.filter((response) => {
        if (!response.options) return false;

        // Handle both single option and multiple options
        if (Array.isArray(response.options)) {
          return response.options.some((opt) => opt.optionId === option.id);
        } else {
          return response.options.optionId === option.id;
        }
      }).length;
      return {
        name: option.text,
        value: count,
        optionId: option.id,
      };
    }) || [];

  const totalResponses = optionCounts.reduce(
    (sum, option) => sum + option.value,
    0
  );

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: { name: string; value: number } }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload;
      if (data) {
        const percentage =
          totalResponses > 0
            ? ((data.value / totalResponses) * 100).toFixed(1)
            : 0;
        return (
          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
            <p className={cn("font-medium text-gray-800", interFont.className)}>
              {data.name}
            </p>
            <p className={cn("text-sm text-gray-600", interFont.className)}>
              {data.value} response{data.value !== 1 ? "s" : ""} ({percentage}%)
            </p>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle
          className={cn(
            "text-lg font-semibold text-gray-800 flex items-center gap-2",
            interFont.className
          )}
        >
          <BarChart3 className="h-5 w-5 text-indigo-600" />
          {questionIndex + 1}. {question.text}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </CardTitle>
        <p className={cn("text-sm text-gray-600", interFont.className)}>
          {totalResponses} total response{totalResponses !== 1 ? "s" : ""}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {totalResponses > 0 ? (
            <>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={optionCounts}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props: any) =>
                        props.percent > 5
                          ? `${(props.percent * 100).toFixed(0)}%`
                          : ""
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {optionCounts.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value: string) => (
                        <span className={cn("text-sm", interFont.className)}>
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Detailed breakdown */}
              <div className="mt-4">
                <h4
                  className={cn(
                    "text-sm font-medium text-gray-700 mb-3",
                    interFont.className
                  )}
                >
                  Response Breakdown:
                </h4>
                <div className="space-y-2">
                  {optionCounts.map((option, index) => (
                    <div
                      key={option.optionId}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        <span className={cn("text-sm", interFont.className)}>
                          {option.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-sm font-medium",
                            interFont.className
                          )}
                        >
                          {option.value}
                        </span>
                        <span
                          className={cn(
                            "text-xs text-gray-500",
                            interFont.className
                          )}
                        >
                          (
                          {totalResponses > 0
                            ? ((option.value / totalResponses) * 100).toFixed(1)
                            : 0}
                          %)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className={cn(interFont.className)}>No responses yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OptionResponsesChart;
