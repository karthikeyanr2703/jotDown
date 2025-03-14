"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

let deleteEntryWithId = async (id, collectionId) => {
  try {
    let deletedEntry = await prisma.entry.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard");
    revalidatePath(
      `/collection/${collectionId ? collectionId : "unorganized"}`
    );

    return deletedEntry;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export default deleteEntryWithId;
