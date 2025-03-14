"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

const deleteCollection = async (collectionId) => {
  try {
    let deletedCollection = await prisma.collection.delete({
      where: {
        id: collectionId,
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/journal/write");
    revalidateTag("collections");
    console.log(deletedCollection);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export default deleteCollection;
