type Props = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  addLog: () => void;
  search: string;
  setSearch: (v: string) => void;
  tagCount: Record<string, number>;
  editingId: string | null;
  setEditingId: (v: string | null) => void;
  sortOrder: "new" | "old";
  setSortOrder: (v: "new" | "old") => void;
};

export default function LogForm({
  text,
  setText,
  addLog,
  search,
  setSearch,
  tagCount,
  editingId,
  setEditingId,
  sortOrder,
  setSortOrder,
}: Props) {
  if (editingId !== null) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", gap: "12px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addLog();
          }}
          placeholder="今日やったこと（例：#UI #React）"
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #e5e5e5",
            fontSize: "14px",
            outline: "none",
          }}
        />
        <button
          onClick={addLog}
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#3b82f6",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          追加
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="検索"
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #e5e5e5",
          fontSize: "14px",
        }}
      />

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "new" | "old")}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #e5e5e5",
          fontSize: "14px",
          background: "#fff",
        }}
      >
        <option value="new">新しい順</option>
        <option value="old">古い順</option>
      </select>

      {search && (
        <div>
          「{search}」で検索中
          <button
            onClick={() => setSearch("")}
            style={{
              marginLeft: "8px",
              padding: "4px 8px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            クリア
          </button>
        </div>
      )}

      <div style={{ marginTop: "10px" }}>
        <div>タグ一覧</div>
        <div>
          {Object.keys(tagCount).length === 0 ? (
            <div>タグなし</div>
          ) : (
            Object.entries(tagCount)
              .sort((a, b) => b[1] - a[1])
              .map(([tag, count]) => (
                <span
                  key={tag}
                  onClick={() => {
                    setText((prev) => (prev ? prev + ` #${tag}` : `#${tag}`));
                    setEditingId(null);
                  }}
                  style={{
                    background: "#f1f5f9",
                    padding: "6px 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    marginRight: "8px",
                    cursor: "pointer",
                    display: "inline-block",
                  }}
                >
                  #{tag} ({count})
                </span>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
