type Log = {
  id: string;
  text: string;
  date: string;
  tags: string[];
};

type Props = {
  logs: Log[];
  search: string;
  editingId: string | null;
  editText: string;
  setEditText: (v: string) => void;
  setEditingId: (v: string | null) => void;
  saveEdit: (id: string) => void;
  deleteLog: (id: string) => void;
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
}: Props) {
  const keyword = search.toLowerCase();

  return (
    <ul>
      {logs
        .filter(
          (log) =>
            log.text.toLowerCase().includes(keyword) ||
            log.tags.some((tag) => tag.toLowerCase().includes(keyword))
        )
        .map((log) => (
          <li key={log.id}>
            {editingId === log.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(log.id)}>保存</button>
              </>
            ) : (
              <>
                <div>
                  {log.text}（{log.date}）
                </div>

                <div>
                  {log.tags.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => {
                        setEditingId(null);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      #{tag}{" "}
                    </span>
                  ))}
                </div>

                <button onClick={() => deleteLog(log.id)}>削除</button>
                <button
                  onClick={() => {
                    setEditText(log.text);
                    setEditingId(log.id);
                  }}
                >
                  編集
                </button>
              </>
            )}
          </li>
        ))}
    </ul>
  );
}