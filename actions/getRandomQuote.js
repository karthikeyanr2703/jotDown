"use server";

import { unstable_cache } from "next/cache";

const getRandomQuote = unstable_cache(
  async () => {
    const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": "FwnqFRXdvyLYOcqI9N50IA==eH4AwDrQpRjYZdoN",
      },
    });
    const quote = await response.json();
    return quote?.[0];
  },
  ["get-random-quote"],
  {
    tags: ["quote"],
    revalidate: 58,
  }
);

export default getRandomQuote;
