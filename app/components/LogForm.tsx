import { suggestTags } from "../../utils/suggestTags";

type Props = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  addLog: (text: string) => void;
  isSubmitting: boolean;
};

export default function LogForm({
  text,
  setText,
  addLog,
  isSubmitting,
}: Props) {
  const existingTags = new Set(
    (text.match(/#\S+/g) || []).map((tag) => tag.replace("#", "").toLowerCase()),
  );
  const suggestedTags = suggestTags(text).filter(
    (tag) => !existingTags.has(tag.toLowerCase()),
  );

  const handleAddLog = () => {
    if (isSubmitting) return;

    const tagsText =
      suggestedTags.length > 0
        ? ` ${suggestedTags.map((tag) => `#${tag}`).join(" ")}`
        : "";

    addLog(`${text}${tagsText}`);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "12px" }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              handleAddLog();
            }
          }}
          placeholder="今日やったこと（例：#UI #React）"
          rows={3}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #e5e5e5",
            fontSize: "14px",
            outline: "none",
            resize: "vertical",
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={handleAddLog}
          disabled={isSubmitting}
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#3b82f6",
            color: "#fff",
            fontWeight: "600",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            alignSelf: "flex-start",
          }}
        >
          追加
        </button>
      </div>

      {suggestedTags.length > 0 && (
        <div style={{ marginTop: "6px", fontSize: "12px", color: "#64748b" }}>
          おすすめタグ{" "}
          {suggestedTags.map((tag) => (
            <span key={tag} style={{ marginRight: "6px" }}>
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
