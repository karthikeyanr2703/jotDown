"use server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

const createUser = async () => {
  const { userId } = await auth();
  const currentUserClerk = await currentUser();
  if (!userId) {
    return;
  } else {
    const user = await prisma.user.findUnique({
      where: {
        email: currentUserClerk?.emailAddresses?.[0]?.emailAddress,
      },
    });
    if (user) {
      return;
    } else if (!user) {
      await prisma.user.create({
        data: {
          clerkId: userId,
          name: currentUserClerk?.firstName,
          email: currentUserClerk?.emailAddresses?.[0]?.emailAddress,
          imageUrl: currentUserClerk?.imageUrl,
        },
      });
    }
  }
};

export default createUser;
