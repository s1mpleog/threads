import { signOut } from "@/auth";
import { Button } from "./ui/button";

export default async function LogoutButton() {
  const onSubmit = async () => {
    "use server";
    await signOut();
  };
  return (
    <form action={onSubmit}>
      <Button>Log out</Button>
    </form>
  );
}
