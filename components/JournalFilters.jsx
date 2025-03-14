"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { moods } from "@/lib/data";
import { format } from "date-fns";
import EntryCardList from "./EntryCardList";

const JournalFilters = ({ entries, collection }) => {
  let [date, setDate] = useState("");
  let [mood, setMood] = useState("");
  let [query, setQuery] = useState("");
  let [filteredEntries, setFilteredEntries] = useState(entries);

  // console.log(entries);
  let clearFilters = () => {
    setDate("");
    setMood("");
    setQuery("");
  };
  useEffect(() => {
    let filtered = entries;
    if (query.trim() !== "") {
      filtered = filtered.filter(({ title }) => {
        return title.toLowerCase().includes(query.toLowerCase());
      });
    }
    if (mood !== "") {
      filtered = filtered.filter(({ moodScore }) => {
        return moodScore === parseInt(mood, 10);
      });
    }

    if (date !== "") {
      filtered = filtered.filter(({ createdAt }) => {
        return createdAt.getTime() === date.getTime();
      });
    }

    setFilteredEntries(filtered);
  }, [query, mood, date, entries]);
  return (
    <>
      <div className="w-full flex-wrap justify-start flex flex-row items-center sm:justify-between gap-4">
        <Input
          type="text"
          placeholder="Search entries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 placeholder:text-xs placeholder:tracking-wider"
        />
        <Select value={mood} onValueChange={setMood}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select a mood" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Moods</SelectLabel>
              {moods.map(({ id, mood, moodScore }) => {
                return (
                  <SelectItem key={id} value={moodScore.toString(10)}>
                    {mood}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-fit sm:w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date ? (
                format(date, "PPP")
              ) : (
                <span className="hidden sm:inline-block">Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {(date || mood || query) && (
          <Button
            className="text-[#fff] shadow-[0px_0px_1px_1px_#000]"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Showing {filteredEntries.length} of {entries.length}
      </p>
      <EntryCardList entries={filteredEntries} collection={collection} />
    </>
  );
};

export default JournalFilters;
