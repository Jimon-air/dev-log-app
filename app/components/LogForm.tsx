type Props = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  addLog: () => void;
  isSubmitting: boolean;
};

export default function LogForm({
  text,
  setText,
  addLog,
  isSubmitting,
}: Props) {
  return (
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
        disabled={isSubmitting}
        style={{
          padding: "12px 16px",
          borderRadius: "8px",
          border: "none",
          background: "#3b82f6",
          color: "#fff",
          fontWeight: "600",
          cursor: isSubmitting ? "not-allowed" : "pointer",
        }}
      >
        追加
      </button>
    </div>
  );
}
