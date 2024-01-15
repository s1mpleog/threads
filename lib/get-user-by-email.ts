import { db } from "./db";

export const getUserByEmail = async (email: string) => {
  if (!email) return null;

  const user = await db.user.findFirst({
    where: {
      email,
    },
  });
  return user;
};
