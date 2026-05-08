import { Log } from "../app/types/log";

type SortOrder = "new" | "old";

export const getVisibleLogs = (
  logs: Log[],
  search: string,
  sortOrder: SortOrder,
): Log[] => {
  const keyword = search.toLowerCase();

  const sortedLogs = [...logs].sort((a, b) => {
    if (sortOrder === "new") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  return sortedLogs.filter(
    (log) =>
      log.text.toLowerCase().includes(keyword) ||
      log.tags.some((tag) => tag.toLowerCase().includes(keyword)),
  );
};
