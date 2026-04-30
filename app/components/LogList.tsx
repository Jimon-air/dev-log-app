import { Log } from "../types/log";

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
          <li key={log.id}>
            <div
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "12px",
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.1)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.04)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {editingId === log.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(log.id);
                      if (e.key === "Escape") {
                        setEditingId(null);
                        setEditText("");
                      }
                    }}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #e5e5e5",
                    }}
                  />

                  <div
                    style={{ marginTop: "8px", display: "flex", gap: "12px" }}
                  >
                    <button
                      onClick={() => saveEdit(log.id)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: "6px",
                        border: "none",
                        background: "#3b82f6",
                        color: "#fff",
                      }}
                    >
                      保存
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditText("");
                      }}
                      style={{
                        padding: "6px 10px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                        background: "#fff",
                      }}
                    >
                      キャンセル
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      fontSize: "15px",
                      lineHeight: "1.5",
                    }}
                  >
                    {log.text}
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      marginTop: "4px",
                    }}
                  >
                    {new Date(log.date).toLocaleDateString()}
                  </div>

                  <div>
                    {log.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "#f1f5f9",
                          padding: "4px 8px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          marginRight: "6px",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{ marginTop: "8px", display: "flex", gap: "12px" }}
                  >
                    <button
                      onClick={() => deleteLog(log.id)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: "6px",
                        border: "none",
                        background: "#ef4444",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      削除
                    </button>
                    <button
                      onClick={() => {
                        setEditText(log.text);
                        setEditingId(log.id);
                      }}
                      style={{
                        padding: "6px 10px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
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
