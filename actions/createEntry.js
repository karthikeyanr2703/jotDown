"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import getPromptFromMoodScore from "@/lib/getPrompt";

const createEntry = async (data) => {
  const { userId } = await auth();

  let prompt = encodeURIComponent(
    getPromptFromMoodScore(parseInt(data.moodScore, 10))
  );
  let randomSeed = Math.floor(Math.random() * 10000 + 1);
  const url = `https://image.pollinations.ai/prompt/${prompt}?width=1280&height=720&seed=${randomSeed}&nologo=true`;
  await fetch(url);

  await prisma.entry.create({
    data: {
      title: data.title,
      moodScore: parseInt(data.moodScore, 10),
      content: data.content,
      collectionId: data.collectionId === "" ? null : data.collectionId,
      userId: userId,
      imageUrl: url,
    },
  });
};

export default createEntry;
