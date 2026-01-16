
import { NavItem } from "@/types/nav";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import AuthModal from "./components/(auth)/AuthModel";

const sections: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Contact", href: "/contact" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar sections={sections} />
        <AuthModal />
        {children}
      </body>
    </html>
  );
}
