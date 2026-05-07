import { Log } from "../types/log";
import LogItem from "./LogItem";

type Props = {
  logs: Log[];
  search: string;
  editingId: string | null;
  editText: string;
  setEditText: (v: string) => void;
  setEditingId: (v: string | null) => void;
  saveEdit: (id: string) => void;
  deleteLog: (id: string) => void;
  sortOrder: "new" | "old";
};

export default function LogList({
  logs,
  search,
  editingId,
  editText,
  setEditText,
  setEditingId,
  saveEdit,
  deleteLog,
  sortOrder,
}: Props) {
  const keyword = search.toLowerCase();

  const sortedLogs = [...logs].sort((a, b) => {
    if (sortOrder === "new") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
      }}
    >
      {sortedLogs
        .filter(
          (log) =>
            log.text.toLowerCase().includes(keyword) ||
            log.tags.some((tag) => tag.toLowerCase().includes(keyword)),
        )
        .map((log) => (
          <LogItem
            key={log.id}
            log={log}
            editingId={editingId}
            editText={editText}
            setEditText={setEditText}
            setEditingId={setEditingId}
            saveEdit={saveEdit}
            deleteLog={deleteLog}
          />
        ))}
    </ul>
  );
}
