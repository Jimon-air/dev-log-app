type Props = {
  search: string;
  setSearch: (v: string) => void;
  sortOrder: "new" | "old";
  setSortOrder: (v: "new" | "old") => void;
};

export default function LogSearchControls({
  search,
  setSearch,
  sortOrder,
  setSortOrder,
}: Props) {
  return (
    <>
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
    </>
  );
}
