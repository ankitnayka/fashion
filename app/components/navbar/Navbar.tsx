"use client";

import { useState } from "react";
import Link from "next/link";
import { NavItem } from "@/types/nav";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  sections: NavItem[];
}

export default function Navbar({ sections }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <nav className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Left: Logo + Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              LOGO
            </Link>
            <NavLinks sections={sections} />
          </div>

          {/* Middle: Search */}
          <SearchBar />

          {/* Right: Icons */}
          <UserActions onMenuClick={() => setOpen(!open)} />
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        sections={sections}
      />
    </header>
  );
}
