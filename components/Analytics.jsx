"use client";
import { getAnalytics } from "@/actions/dashboardActions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import ChartSection from "./ChartSection";

const Analytics = () => {
  const [data, setData] = useState();
  const [period, setPeriod] = useState();

  useEffect(() => {
    const analyticsData = async (period) => {
      const response = await getAnalytics(period);
      setData(response);
    };
    analyticsData(period);
  }, [period]);
  console.log(data, "data");

  return (
    <div className="w-full mt-5">
      <div className="flex flex-row items-center justify-between w-full">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Period</SelectLabel>
              <SelectItem value="7">Past 7 days</SelectItem>
              <SelectItem value="15">Past 15 days</SelectItem>
              <SelectItem value="30">Past 30 days</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row items-center justify-center sm:justify-between gap-5 mt-5 w-full flex-wrap ">
        <div className="w-[300px] h-[200px] rounded-lg bg-yellow-300 p-5 flex flex-col items-start justify-between">
          <h2 className="text-2xl font-medium">Total Entries</h2>
          <p className="text-4xl font-bold">{data?.data?.entries.length}</p>
          <p className="text-sm text-slate-500">
            ~{data?.data?.stats?.entriesPerDay} entries per day
          </p>
        </div>
        <div className="w-[300px] h-[200px] rounded-lg bg-green-300 p-5 flex flex-col items-start justify-between">
          <h2 className="text-2xl font-medium">Average Mood</h2>
          <p className="text-4xl font-bold ">
            {data?.data?.stats?.averageScore}/10
          </p>
          <p className="text-sm text-slate-500 ">Overall mood score</p>
        </div>
        <div className="w-[300px] h-[200px] rounded-lg bg-red-300 p-5 flex flex-col items-start justify-between">
          <h2 className="text-2xl font-medium">Mood Summary</h2>
          <p className="text-lg font-bold">{data?.data?.stats?.moodSummary}</p>
          <p className="text-sm text-slate-500">Your custom summary</p>
        </div>
      </div>
      <ChartSection data={data?.data?.timeline} />
    </div>
  );
};

export default Analytics;
