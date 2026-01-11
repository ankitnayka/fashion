import Link from "next/link";
import { NavItem } from "@/types/nav";

interface Props {
  open: boolean;
  onClose: () => void;
  sections: NavItem[];
}

export default function MobileMenu({ open, onClose, sections }: Props) {
  if (!open) return null;

  return (
    <div className="md:hidden border-t bg-white">
      <div className="flex flex-col gap-4 px-4 py-4">
        {sections.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="text-sm font-medium"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
