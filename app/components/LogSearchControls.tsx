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
    <div className="search-controls">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="検索"
        className="field"
      />

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "new" | "old")}
        className="select"
      >
        <option value="new">新しい順</option>
        <option value="old">古い順</option>
      </select>

      {search && (
        <div className="search-status">
          「{search}」で検索中
          <button onClick={() => setSearch("")} className="clear-button">
            クリア
          </button>
        </div>
      )}
    </div>
  );
}
