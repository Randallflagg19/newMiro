import { StarIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type BoardFavoriteToggleProps = {
  isFavorite: boolean;
  onToggle: () => void;
  className?: string;
};

export function BoardFavoriteToggle({
  isFavorite,
  onToggle,
  className,
}: BoardFavoriteToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "p-1 rounded-full hover:bg-gray-100 transition-colors",
        className
      )}
    >
      <StarIcon
        className={cn(
          isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
        )}
      />
    </button>
  );
}
