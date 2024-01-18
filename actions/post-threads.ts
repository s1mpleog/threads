"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { postThreadsSchema } from "@/schemas";
import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/get-user-by-email";

export const postThreads = async (
  values: z.infer<typeof postThreadsSchema>
) => {
  const validatedFields = postThreadsSchema.safeParse(values);
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);
  if (!validatedFields.success) {
    return { error: "invalid fields" };
  }
  if (!user || !session) {
    return { error: "Unauthorized" };
  }
  const { image, message } = validatedFields.data;
  await db.thread.create({
    data: {
      postImage: image,
      postMessage: message,
      authorId: user.id,
    },
  });
};
