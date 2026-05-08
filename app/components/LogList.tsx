import { Log } from "../types/log";
import { getVisibleLogs } from "../../utils/getVisibleLogs";
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
  const visibleLogs = getVisibleLogs(logs, search, sortOrder);

  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
      }}
    >
      {visibleLogs.map((log) => (
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
