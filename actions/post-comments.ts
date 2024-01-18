"use server";
import { db } from "@/lib/db";
import * as z from "zod";
import { commentSchema } from "@/schemas";
import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/get-user-by-email";

export const postComments = async (
  values: z.infer<typeof commentSchema>,
  postId: string
) => {
  const validatedFields = commentSchema.safeParse(values);
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);
  if (!session) {
    return { error: "Unauthorized" };
  }
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  const { content } = validatedFields.data;

  await db.comment.create({
    data: {
      content,
      authorId: user?.id,
      threadPostId: postId,
    },
    include: {
      author: true,
    },
  });
};
