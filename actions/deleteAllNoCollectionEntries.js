"use server"
import { prisma } from "@/lib/prisma";

let deleteAllNoCollectionEntries = async () => {
  try {
    let deletedEntriesWithoutCollection = await prisma.entry.deleteMany({
      where: {
        collectionId: null,
      },
    });
    return deletedEntriesWithoutCollection;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export default deleteAllNoCollectionEntries;
