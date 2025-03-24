import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full h-fit p-4 flex justify-between text-[#4B4B4B] font-semibold">
      <Image src="/dark-logo.svg" width={32} height={32} alt="Galantara Logo" />
      <ul className="flex uppercase">
        <li>digital invitation</li>
        <li>card invitation</li>
      </ul>
      <Link href="/">galantara@gmail.com</Link>
    </nav>
  );
}
