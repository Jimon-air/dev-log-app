type Props = {
  text: string;
  setText: (v: string) => void;
  addLog: () => void;
  search: string;
  setSearch: (v: string) => void;
  tagCount: Record<string, number>;
  editingId: string | null;
  setEditingId: (v: string | null) => void;
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
}: Props) {
  if (editingId !== null) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addLog();
          }}
          placeholder="今日やったこと"
        />
        <button onClick={addLog}>追加</button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="検索"
      />

      {search && (
        <div>
          「{search}」で検索中
          <button onClick={() => setSearch("")}>クリア</button>
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
                    setSearch(tag);
                    setEditingId(null);
                  }}
                  style={{ marginRight: "8px", cursor: "pointer" }}
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