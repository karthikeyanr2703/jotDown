"use server";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const getAllCollections = async () => {
  const { userId } = await auth();
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  if (!user) {
    redirect("/");
  }
  return await unstable_cache(
    async () => {
      let collections = await prisma.collection.findMany();
      return collections;
    },
    ["get-all-collections"],
    {
      tags: ["collections"],
      revalidate: false,
    }
  )();
};

export default getAllCollections;
