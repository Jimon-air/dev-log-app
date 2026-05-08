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
  );
}
