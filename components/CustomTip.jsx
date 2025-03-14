"use client";
import { format, parseISO } from "date-fns";

const CustomTip = ({ active, payload, label }) => {
  // console.log(typeof label);

  if (active && payload && payload.length && label) {
    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg">
        <p className="font-medium">{format(parseISO(label), "MMM d , yyyy")}</p>
        <p>Average Mood: {payload[0].value}</p>
        <p>Entries: {payload[1].value}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default CustomTip;
