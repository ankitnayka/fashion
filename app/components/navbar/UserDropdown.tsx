"use client";

import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function UserDropdown({
  onLoginClick,
}: {
  onLoginClick: () => void;
}) {
  const   { user, loading } = useUser();
  
  if (loading) {
    return (
      <div className="absolute right-0 mt-60 w-80 rounded-lg border bg-white shadow-lg z-50 p-4 text-sm">
        Loading...
      </div>
    );
  }
  return (
     <div className="absolute right-0 mt-60 w-80 rounded-lg border bg-white shadow-lg z-50">
      {/* NOT LOGGED IN */}
      {!user && (
        <div className="p-4 text-sm text-gray-700">
          <p className="font-medium">
            Becoming a Mahii Fashion member comes with easy order tracking,
            rewards, offers and more.
          </p>

          <button
            onClick={onLoginClick}
            className="mt-4 w-full rounded-md bg-black py-2 text-white text-sm font-semibold"
          >
            Login / Signup
          </button>
        </div>
      )}

      {/* LOGGED IN */}
      {user && (
        <>
          <div className="p-4 border-b">
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>

          <div className="py-2">
            <Link
              href="/components/profile"
              className="block px-4 py-2 text-sm hover:bg-gray-50"
            >
              Profile
            </Link>

            <Link
              href="/components/orders"
              className="block px-4 py-2 text-sm hover:bg-gray-50"
            >
              Orders
            </Link>

            <button
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                window.location.reload();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
