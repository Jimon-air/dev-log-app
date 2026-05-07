import { Log } from "../types/log";

type Props = {
  log: Log;
  editingId: string | null;
  editText: string;
  setEditText: (v: string) => void;
  setEditingId: (v: string | null) => void;
  saveEdit: (id: string) => void;
  deleteLog: (id: string) => void;
};

export default function LogItem({
  log,
  editingId,
  editText,
  setEditText,
  setEditingId,
  saveEdit,
  deleteLog,
}: Props) {
  return (
    <li>
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
              style={{
                marginTop: "8px",
                display: "flex",
                gap: "12px",
              }}
            >
              <button onClick={() => saveEdit(log.id)}>保存</button>

              <button
                onClick={() => {
                  setEditingId(null);
                  setEditText("");
                }}
              >
                キャンセル
              </button>
            </div>
          </>
        ) : (
          <>
            <div>{log.text}</div>

            <div>{new Date(log.date).toLocaleDateString()}</div>

            <div>
              {log.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>

            <div
              style={{
                marginTop: "8px",
                display: "flex",
                gap: "12px",
              }}
            >
              <button onClick={() => deleteLog(log.id)}>削除</button>

              <button
                onClick={() => {
                  setEditText(log.text);
                  setEditingId(log.id);
                }}
              >
                編集
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
}
