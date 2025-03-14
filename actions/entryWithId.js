"use server";
import { prisma } from "@/lib/prisma";

let entryWithId = async (id) => {
  try {
    let entry = await prisma.entry.findUnique({
      where: {
        id: id,
      },
      include: {
        collection: true,
      },
    });
    return entry;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export default entryWithId;
