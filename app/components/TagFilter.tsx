type Props = {
  tagCount: Record<string, number>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setEditingId: (v: string | null) => void;
};

export default function TagFilter({
  tagCount,
  setText,
  setEditingId,
}: Props) {
  return (
    <div className="tag-section">
      <div className="tag-heading">タグ一覧</div>
      <div className="tag-list">
        {Object.keys(tagCount).length === 0 ? (
          <div className="empty-text">タグなし</div>
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
                className="tag-chip tag-filter-chip"
              >
                #{tag} ({count})
              </span>
            ))
        )}
      </div>
    </div>
  );
}
