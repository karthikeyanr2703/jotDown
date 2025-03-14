"use server";
import { prisma } from "@/lib/prisma";

let updateEntry = async (data, entryId) => {
  let { title, collectionId, content, moodScore } = data;
  try {
    let updatedEntry = await prisma.entry.update({
      where: {
        id: entryId,
      },
      data: {
        title,
        collectionId,
        content,
        moodScore: parseInt(moodScore, 10),
      },
    });
    return updatedEntry;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export default updateEntry;
