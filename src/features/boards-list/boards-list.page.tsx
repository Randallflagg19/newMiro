import { useBoardsList } from "./model/use-boards-list";
import { useBoardsFilters } from "./model/use-boards-filters";
import { useDebouncedValue } from "@/shared/lib/react";
import { useDeleteBoard } from "./model/use-delete-board";
import { useUpdateFavorite } from "./model/use-update-favorite";
import { useEffect, useRef, useState } from "react";
import {
  BoardsListLayout,
  BoardsListLayoutHeader,
  BoardsListLayoutFilters,
  BoardsListLayoutContent,
} from "./ui/boards-list-layout";
import { BoardsSortSelect } from "./ui/boards-sort-select";
import { BoardsSearchInput } from "./ui/boards-search-input";
import { ViewModeToggle } from "./ui/view-mode-toggle";
import type { ViewMode } from "./ui/view-mode-toggle";
import { BoardListCard } from "./ui/board-list-card";
import { Button } from "@/shared/ui/kit/button";
import { BoardFavoriteToggle } from "./ui/board-favorite-toggle";
import { DropdownMenuItem } from "@/shared/ui/kit/dropdown-menu";
import { BoardListItem } from "./ui/board-list-item";

function BoardsListPage() {
  const boardsFilters = useBoardsFilters();
  const deleteBoard = useDeleteBoard();
  const updateFavorite = useUpdateFavorite();
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const boardsQuery = useBoardsList({
    sort: boardsFilters.sort,
    search: useDebouncedValue(boardsFilters.search, 300),
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
          title="Доски"
          description="Здесь вы можете просматривать и управлять вашими досками"
          actions={
            <ViewModeToggle
              value={viewMode}
              onChange={(value) => setViewMode(value)}
            />
          }
        />
      }
      filters={
        <BoardsListLayoutFilters
          sort={
            <BoardsSortSelect
              value={boardsFilters.sort}
              onValueChange={boardsFilters.setSort}
            />
          }
          filters={
            <BoardsSearchInput
              value={boardsFilters.search}
              onChange={boardsFilters.setSearch}
            />
          }
        />
      }
    >
      <BoardsListLayoutContent
        isEmpty={boardsQuery.boards.length === 0}
        isPending={boardsQuery.isPending}
        isPendingNext={boardsQuery.isFetchingNextPage}
        hasCursor={boardsQuery.hasNextPage}
        cursorRef={cursorRef}
        mode={viewMode}
        renderList={() =>
          boardsQuery.boards.map((board) => (
            <BoardListItem
              key={board.id}
              board={board}
              rightActions={
                <BoardFavoriteToggle
                  isFavorite={updateFavorite.isOptimisticFavorite(board)}
                  onToggle={() => updateFavorite.toggle(board)}
                />
              }
              menuActions={
                <DropdownMenuItem
                  variant="destructive"
                  disabled={deleteBoard.getIsPending(board.id)}
                  onClick={() => deleteBoard.deleteBoard(board.id)}
                >
                  Удалить
                </DropdownMenuItem>
              }
            />
          ))
        }
        renderGrid={() =>
          boardsQuery.boards.map((board) => (
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
          ))
        }
      />
    </BoardsListLayout>
  );
}

export const Component = BoardsListPage;
