"use server";
import { prisma } from "@/lib/prisma";

const getCollectionWithId = async (id) => {
  try {
    let collection = await prisma.collection.findUnique({
      where: {
        id: id,
      },
      include: {
        entries: true,
      },
    });
    return collection;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export default getCollectionWithId;
