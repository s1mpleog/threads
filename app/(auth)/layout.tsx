import Image from "next/image";
import "@/app/globals.css"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen space-y-6 mx-5 overflow-hidden py-24 sm:py-0">
      <div className="hidden sm:block relative max-w-[1600px] mx-auto h-[500px] ">
        <Image
          src="/images/authbanner.png"
          alt="authBanner"
          fill
          quality={100}
        />
      </div>
      <div className="flex items-center justify-center sm:hidden">
        <Image
          src="/images/logo.svg"
          alt="authBanner"
          height={80}
          width={80}
        />
      </div>
      <div className="">
      {children}
      </div>
    </main>
  );
}
