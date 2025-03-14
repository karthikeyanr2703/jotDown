import getMood from "@/lib/getMood";
import { format } from "date-fns";
import Link from "next/link";

const EntryCardList = ({ entries, collection }) => {
  return (
    <div className="w-[100%] mt-5 flex flex-col gap-4 items-center justify-start">
      {entries.map((entry) => {
        return (
          <Link
            href={`/journal/${entry?.id}`}
            className="w-full flex flex-row items-center justify-center"
          >
            <div className="w-[165px] sm:w-[30%] rounded-lg bg-slate-100 shadow-[0px_0px_3px_0.5px_#00000038] text-center flex flex-col items-center justify-start gap-3 p-2">
              <h2 className="text-3xl font-bold">{entry?.title}</h2>
              <p className="text-lg">{getMood(entry?.moodScore)}</p>
              <div className="w-full flex flex-row items-baseline justify-between">
                <p className=" p-1 sm:p-2 text-[6px] sm:text-xs bg-[#BE4EF1] shadow-[0px_0px_2px_1px_#BE4EF1] text-white rounded-lg flex flex-row items-center justify-center font-bold tracking-wider">
                  {collection?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(entry?.createdAt, "MMM dd, yyyy")}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default EntryCardList;
