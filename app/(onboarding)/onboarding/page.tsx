import { auth } from "@/auth";
import BoardingForm from "../_components/BoardingForm";
import { Metadata } from "next";
import { getUserByEmail } from "@/lib/get-user-by-email";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Threads | onBoarding",
  description: "A Next Generation Social Media Web App.",
};

export default async function OnBoardingPage() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);
  if (user?.userName) {
    return redirect("/");
  }
  return (
    <div>
      <BoardingForm />
    </div>
  );
}
