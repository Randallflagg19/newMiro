import { rqClient } from "@/shared/api/instance";
import { useEffect } from "react";

type UseBoardsListParams = {
  limit?: number;
  isFavorite?: boolean;
  search?: string;
  sort?: "createdAt" | "updatedAt" | "lastOpenedAt" | "name";
};

export function useBoardsList({
  limit = 20,
  isFavorite,
  search,
  sort,
}: UseBoardsListParams) {
  const boardsListQuery = rqClient.useInfiniteQuery(
    "get",
    "/boards",
    {
      params: {
        query: {
          page: 1,
          limit,
          isFavorite,
          search,
          sort,
        },
      },
    },
    {
      initialPageParam: 1,
      pageParamName: "page",
      getNextPageParam: (lastPage, _, lastPageParems) =>
        Number(lastPageParems) < lastPage.totalPages
          ? Number(lastPageParems) + 1
          : null,
    }
  );
}
