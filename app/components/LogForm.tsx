import { suggestTags } from "../../utils/suggestTags";

const reflectionTemplate = `今日やったこと:

詰まったこと:

学んだこと:

明日やること:`;

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

  const insertReflectionTemplate = () => {
    setText((prev) =>
      prev.trim() === "" ? reflectionTemplate : `${prev}\n\n${reflectionTemplate}`,
    );
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
          placeholder={`今日やったことや学んだことを書いてください
例: Reactのフォームを改善した #UI`}
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

      <div className="suggested-tags">
        <button
          type="button"
          onClick={insertReflectionTemplate}
          className="clear-button"
        >
          振り返りテンプレートを挿入
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
