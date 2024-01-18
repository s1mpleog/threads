import { HomeIcon, Search } from "lucide-react";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { PiPlusCircle } from "react-icons/pi";
import { IoHeartOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import Logo from "./Logo";
import Link from "next/link";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import LogoutButton from "./LogoutButton";

export default async function Sidebar() {
  const session = await auth();
  const user = await db?.user?.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  const sidebarRoutes = [
    {
      label: "Home",
      href: "/",
      icon: MdHomeFilled,
    },
    {
      label: "Search",
      href: "/search",
      icon: MdSearch,
    },
    {
      label: "Create",
      href: "/create",
      icon: PiPlusCircle,
    },
    {
      label: "Activity",
      href: "/activity",
      icon: IoHeartOutline,
    },
    {
      label: "Profile",
      href: `/user/${user?.userName}`,
      icon: GoPerson,
    },
  ];
  return (
    <aside className="flex flex-col  sm:space-y-6 w-full sm:w-auto min-h-screen items-center sm:my-2 sm:justify-start justify-center">
      <div className="sm:flex hidden">
        <Logo />
      </div>
      <div className="sm:block flex sm:gap-0 sm:relative absolute sm:bottom-0 sm:bg-transparent bg-white w-full items-start justify-evenly pt-4 bottom-0">
        {sidebarRoutes.map((route) => (
          <div
            key={route.href}
            className="flex items-center justify-center sm:my-10"
          >
            <Link
              href={route.href}
              className="flex items-center justify-center sm:gap-x-2 pb-2 text-lg font-medium"
            >
              <route.icon size={30} />
              <p className="sm:flex hidden">{route.label}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="sm:hidden flex absolute sm:bottom-4 top-2 right-5">
        <LogoutButton />
      </div>
      <div className="sm:flex hidden absolute sm:bottom-4">
        <LogoutButton />
      </div>
    </aside>
  );
}
