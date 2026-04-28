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
            <div style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "10px"
            }}>

              {editingId === log.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{ width: "100%" }}
                  />

                  <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                    <button onClick={() => saveEdit(log.id)}>保存</button>
                    <button onClick={() => setEditingId(null)}>キャンセル</button>
                  </div>
                </>
              ) : (
                <>
                  <div>{log.text}</div>

                  <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
                    {log.date}
                  </div>

                  <div>
                    {log.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          background: "#eee",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          marginRight: "4px"
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                    <button onClick={() => deleteLog(log.id)}>削除</button>
                    <button onClick={() => {
                      setEditText(log.text);
                      setEditingId(log.id);
                    }}>
                      編集
                    </button>
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
    </ul>
  );
}