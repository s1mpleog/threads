"use server";
import * as z from "zod";
import { onBoardingSchema } from "@/schemas";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const onBoarding = async (values: z.infer<typeof onBoardingSchema>) => {
  const validatedFields = onBoardingSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid Fields" };

  const session = await auth();

  const { image, bio, username, name } = validatedFields.data;

  if (!session) return { error: "Unauthorized" };

  const existingUserProfile = await db.user.findFirst({
    where: {
      userName: null,
    },
  });
  if (existingUserProfile?.userName === null) {
    await db.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        bio,
        image,
        name,
        userName: username,
      },
    });
  }
  return { error: "there is already a profile" };
};
