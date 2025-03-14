"use client";

import getRandomQuote from "@/actions/getRandomQuote";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const RandomQuote = () => {
  let [quote, setQuote] = useState("");
  useEffect(() => {
    const fetchRandomQuote = async () => {
      let randomQuoteObj = await getRandomQuote();
      setQuote(randomQuoteObj?.quote);
    };
    fetchRandomQuote();

    let intervalId = setInterval(() => fetchRandomQuote(), 60000);

    return () => clearInterval(intervalId);
  }, []);

  if (quote === "") {
    return (
      <div className="w-full flex items-center justify-center">
        <BeatLoader />
      </div>
    );
  }
  return (
    <h1 className="text-xl text-center text-slate-600 w-full font-bold">
      {quote}
    </h1>
  );
};

export default RandomQuote;
