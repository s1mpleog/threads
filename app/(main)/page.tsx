import { auth } from "@/auth";
import ShowThreads from "./_components/ShowThreads";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = auth();
  if (!session) {
    return redirect("/login");
  }
  return (
    <div className="">
      <ShowThreads />
    </div>
  );
}
