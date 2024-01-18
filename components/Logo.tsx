import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href='/'>
    <Image className="hover:scale-105 transition-all duration-100" src='/images/logo.svg' width={35} height={35} alt="logo" />
    </Link>
  )
}
