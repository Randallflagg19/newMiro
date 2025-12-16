import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { Link } from "react-router-dom";

type BoardListCardProps = {
  board: {
    id: string;
    name: string;
    createdAt: string;
    lastOpenedAt: string;
  };
  rightTopActions?: React.ReactNode;
  bottomActions?: React.ReactNode;
};

export function BoardListCard({
  board,
  rightTopActions,
  bottomActions,
}: BoardListCardProps) {
  return (
    <Card className="relative">
      {rightTopActions && (
        <div className="absolute top-2 right-2">{rightTopActions}</div>
      )}
      <CardHeader>
        <div className="flex flex-col gap-2">
          <Button
            asChild
            variant="link"
            className="text-left justify-start h-auto p-0"
          >
            <Link to={`/boards/${board.id}`}>
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
      {bottomActions && <CardFooter>{bottomActions}</CardFooter>}
    </Card>
  );
}
