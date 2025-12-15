import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { Link } from "react-router-dom";
import { Switch } from "@/shared/ui/kit/switch";
import { StarIcon } from "lucide-react";

type Board = {
  id: string;
  name: string;
  createdAt: string;
  lastOpenedAt: string;
  isFavorite: boolean;
};

export function BoardListCard({
  board,
  isFavorite,
  onFavoriteToggle,
  onDelete,
  isDeletePending,
}: {
  board: Board;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onDelete: () => void;
  isDeletePending: boolean;
}) {
  return (
    <Card className="relative">
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <span className="text-sm text-gray-500">
          <StarIcon />
        </span>
        <Switch checked={isFavorite} onCheckedChange={onFavoriteToggle} />
      </div>
      <CardHeader>
        <div className="flex flex-col gap-2">
          <Button
            asChild
            variant="link"
            className="text-left justify-start h-auto p-0"
          >
            <Link to={`/boards/${board.id}`}>
              <span>{board.name}</span>
              <span className="text-xl font-medium">{board.name}</span>
            </Link>
          </Button>
          <div className="text-sm text-gray-500">
            Создано: {new Date(board.createdAt).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-500">
            Последнее открытие:{" "}
            {new Date(board.lastOpenedAt).toLocaleDateString()}
          </div>
        </div>
      </CardHeader>
      <CardFooter>
        <Button
          variant="destructive"
          disabled={isDeletePending}
          onClick={onDelete}
        >
          Удалить
        </Button>
      </CardFooter>
    </Card>
  );
}
