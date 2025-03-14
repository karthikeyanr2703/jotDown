"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

let createCollection = async (data) => {
  const { userId } = await auth();
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  if (!user) {
    redirect("/");
  }
  await prisma.collection.create({
    data: {
      name: data.name,
      userId: userId,
    },
  });
  revalidateTag("collections");
  revalidatePath("/dashboard");
};

export default createCollection;
