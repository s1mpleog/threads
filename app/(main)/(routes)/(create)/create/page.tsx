import { auth } from "@/auth";
import ThreadsForm from "./_components/ThreadsForm";
import { getUserByEmail } from "@/lib/get-user-by-email";

export default async function THreadsCreatePage() {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email as string)
  return (
    <div>
        <ThreadsForm user={user!} />
    </div>
  )
}
