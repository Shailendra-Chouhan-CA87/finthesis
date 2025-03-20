import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  console.log("Clerk Current User:", user); // 👀 Debug Log


  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });


    console.log("LoggedIn User from DB:", loggedInUser); // 👀 Debug Log

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });


    console.log("New User Created in DB:", newUser); // 👀 Debug Log

    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};