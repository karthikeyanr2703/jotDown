"use server"
import { prisma } from "@/lib/prisma";

let getUnorganizedCollection = async () => {
  try {
    let unorganizedEntries = await prisma.entry.findMany({
      where: {
        collectionId: null,
      },
      select: {
        id: true,
        title: true,
        moodScore: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const unorganized = {
      id: null,
      name: "Unorganized",
      entries: unorganizedEntries,
      createdAt: unorganizedEntries[unorganizedEntries.length - 1].createdAt,
    };

    return unorganized;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export default getUnorganizedCollection;
