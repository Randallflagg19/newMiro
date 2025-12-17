import { Button } from "@/shared/ui/kit/button";
import { BoardListCard } from "../ui/board-list-card";
import { useUpdateFavorite } from "../model/use-update-favorite";
import { useDeleteBoard } from "../model/use-delete-board";
import { BoardFavoriteToggle } from "../ui/board-favorite-toggle";
import type { ApiSchemas } from "@/shared/api/schema";

export function BoardCard({ board }: { board: ApiSchemas["Board"] }) {
  const deleteBoard = useDeleteBoard();
  const updateFavorite = useUpdateFavorite();

  return (
    <BoardListCard
      key={board.id}
      board={board}
      rightTopActions={
        <BoardFavoriteToggle
          isFavorite={updateFavorite.isOptimisticFavorite(board)}
          onToggle={() => updateFavorite.toggle(board)}
        />
      }
      bottomActions={
        <Button
          variant="destructive"
          disabled={deleteBoard.getIsPending(board.id)}
          onClick={() => deleteBoard.deleteBoard(board.id)}
        >
          Удалить
        </Button>
      }
    />
  );
}
