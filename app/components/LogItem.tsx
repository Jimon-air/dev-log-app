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
      <div className="log-card">
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
              className="field"
            />

            <div className="edit-actions">
              <button onClick={() => saveEdit(log.id)} className="primary-button">
                保存
              </button>

              <button
                onClick={() => {
                  setEditingId(null);
                  setEditText("");
                }}
                className="ghost-button"
              >
                キャンセル
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="log-text">{log.text}</div>

            <div className="log-date">{new Date(log.date).toLocaleDateString()}</div>

            <div className="log-tags">
              {log.tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="log-actions">
              <button onClick={() => deleteLog(log.id)} className="danger-button">
                削除
              </button>

              <button
                onClick={() => {
                  setEditText(log.text);
                  setEditingId(log.id);
                }}
                className="ghost-button"
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
