import { useBoardsList } from "./model/use-boards-list";
import { useDeleteBoard } from "./model/use-delete-board";
import { useUpdateFavorite } from "./model/use-update-favorite";
import { useEffect, useRef, useState } from "react";
import {
  BoardsListLayout,
  BoardsListLayoutHeader,
  BoardsListLayoutContent,
  BoardsListListLayout,
  BoardsListCardsLayout,
} from "./ui/boards-list-layout";
import { ViewModeToggle } from "./ui/view-mode-toggle";
import type { ViewMode } from "./ui/view-mode-toggle";
import { BoardListCard } from "./ui/board-list-card";

function BoardsListFavoritePage() {
  const deleteBoard = useDeleteBoard();
  const updateFavorite = useUpdateFavorite();
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const boardsQuery = useBoardsList({
    isFavorite: true,
  });

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = boardsQuery;

  useEffect(() => {
    const el = cursorRef.current;
    if (!el || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const [viewMode, setViewMode] = useState<ViewMode>("list");

  return (
    <BoardsListLayout
      header={
        <BoardsListLayoutHeader
          title="Избранные доски"
          description="Здесь вы можете просматривать и управлять вашими досками"
          actions={
            <ViewModeToggle
              value={viewMode}
              onChange={(value) => setViewMode(value)}
            />
          }
        />
      }
    >
      <BoardsListLayoutContent
        isPending={boardsQuery.isPending}
        isEmpty={boardsQuery.boards.length === 0}
        isPendingNext={boardsQuery.isFetchingNextPage}
        hasCursor={boardsQuery.hasNextPage}
        cursorRef={cursorRef}
      >
        {viewMode === "list" ? (
          <BoardsListListLayout>
            {boardsQuery.boards.map((board) => (
              <BoardListCard
                key={board.id}
                board={board}
                isFavorite={updateFavorite.isOptimisticFavorite(board)}
                onFavoriteToggle={() => updateFavorite.toggle(board)}
                onDelete={() => deleteBoard.deleteBoard(board.id)}
                isDeletePending={deleteBoard.getIsPending(board.id)}
              />
            ))}
          </BoardsListListLayout>
        ) : (
          <BoardsListCardsLayout>
            {boardsQuery.boards.map((board) => (
              <BoardListCard
                key={board.id}
                board={board}
                isFavorite={updateFavorite.isOptimisticFavorite(board)}
                onFavoriteToggle={() => updateFavorite.toggle(board)}
                onDelete={() => deleteBoard.deleteBoard(board.id)}
                isDeletePending={deleteBoard.getIsPending(board.id)}
              />
            ))}
          </BoardsListCardsLayout>
        )}
      </BoardsListLayoutContent>
    </BoardsListLayout>
  );
}
export const Component = BoardsListFavoritePage;
