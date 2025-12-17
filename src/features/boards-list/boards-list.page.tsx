import { useBoardsList } from "./model/use-boards-list";
import { useBoardsFilters } from "./model/use-boards-filters";
import { useDebouncedValue } from "@/shared/lib/react";
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
import { BoardItem } from "./compose/board-item";
import { BoardCard } from "./compose/board-card";
import { BoardsSidebar } from "./ui/boards-sidebar";
import { Button } from "@/shared/ui/kit/button";
import { PlusIcon } from "lucide-react";
import { useCreateBoard } from "./model/use-create-board";
import { TemplatesGallery, TemplatesModal } from "@/features/board-templates";
import { useTemplatesModal } from "@/features/board-templates";

function BoardsListPage() {
  const boardsFilters = useBoardsFilters();
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const createBoard = useCreateBoard();
  const boardsQuery = useBoardsList({
    sort: boardsFilters.sort,
    search: useDebouncedValue(boardsFilters.search, 300),
  });

  const templatesModal = useTemplatesModal();

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
    <>
      <BoardsListLayout
        templates={<TemplatesGallery />}
        sidebar={<BoardsSidebar />}
        header={
          <BoardsListLayoutHeader
            title="Доски"
            description="Здесь вы можете просматривать и управлять вашими досками"
            actions={
              <>
                <Button variant="outline" onClick={templatesModal.open}>
                  Выбрать шаблон
                </Button>
                <Button
                  disabled={createBoard.isPending}
                  onClick={createBoard.createBoard}
                >
                  <PlusIcon />
                  Создать доску
                </Button>
              </>
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
          isEmpty={boardsQuery.boards.length === 0}
          isPending={boardsQuery.isPending}
          isPendingNext={boardsQuery.isFetchingNextPage}
          hasCursor={boardsQuery.hasNextPage}
          cursorRef={cursorRef}
          mode={viewMode}
          renderList={() =>
            boardsQuery.boards.map((board) => (
              <BoardItem key={board.id} board={board} />
            ))
          }
          renderGrid={() =>
            boardsQuery.boards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))
          }
        />
      </BoardsListLayout>
      <TemplatesModal />
    </>
  );
}

export const Component = BoardsListPage;
