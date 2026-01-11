import Link from "next/link";
import { NavItem } from "@/types/nav";

export default function NavLinks({ sections }: { sections: NavItem[] }) {
  return (
    <div className="hidden md:flex items-center gap-6">
      {sections.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="text-sm font-medium text-gray-700 hover:text-black"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
