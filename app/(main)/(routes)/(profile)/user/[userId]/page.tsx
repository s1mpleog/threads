import { auth } from "@/auth";
import ProfilePage from "../_components/ProfilePage";
import { db } from "@/lib/db";

export default async function UserProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const username = params?.userId;
  const user = await db.user.findFirst({
    where: {
      userName: username,
    },
  });
  return (
    <div>
      <ProfilePage user={user!} />
    </div>
  );
}
