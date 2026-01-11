import { Heart, ShoppingCart, User, Menu } from "lucide-react";

export default function UserActions({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <User className="h-5 w-5 cursor-pointer" />
      <Heart className="h-5 w-5 cursor-pointer" />
      <ShoppingCart className="h-5 w-5 cursor-pointer" />

      {/* Mobile Menu Button */}
      <button onClick={onMenuClick} className="md:hidden">
        <Menu className="h-6 w-6" />
      </button>
    </div>
  );
}
