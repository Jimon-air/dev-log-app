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
      <div className="log-form">
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
          className="textarea"
        />
        <button
          onClick={handleAddLog}
          disabled={isSubmitting}
          className="primary-button"
        >
          追加
        </button>
      </div>

      {suggestedTags.length > 0 && (
        <div className="suggested-tags">
          <span>おすすめタグ</span>
          {suggestedTags.map((tag) => (
            <span key={tag} className="suggested-chip">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
