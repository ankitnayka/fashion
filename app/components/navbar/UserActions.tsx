"use client";

import { Heart, ShoppingCart, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import UserDropdown from "./UserDropdown";
import { useAuthModal } from "@/hooks/useAuthModal";
import { motion, AnimatePresence } from "framer-motion";

export default function UserActions() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const authModal = useAuthModal();

  // ✅ outside click handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center gap-4" ref={dropdownRef}>
      <User
        className="h-5 w-5 cursor-pointer"
        onClick={() => setOpenDropdown((prev) => !prev)}
      />
      <Heart className="h-5 w-5 cursor-pointer" />
      <ShoppingCart className="h-5 w-5 cursor-pointer" />

      {openDropdown && (
        <UserDropdown
          onLoginClick={() => {
            setOpenDropdown(false);
            authModal.openModal();
          }}
        />
      )}
    </div>
  );
}
