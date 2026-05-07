import { Log } from "../app/types/log";

export const getTagCount = (logs: Log[]) => {
  return logs
    .flatMap((log) => log.tags)
    .reduce(
      (acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
};
