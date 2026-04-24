"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [logs, setLogs] = useState<
    { id: string; text: string; date: string; tags: string[] }[]
  >([]);
  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const addLog = () => {
    if (text.trim() === "") return;
    const tags = extractTags(text);
    const newLog = {
      id: crypto.randomUUID(),
      text: text,
      date: new Date().toLocaleDateString(),
      tags,
    };

    setLogs((prev) => [newLog, ...prev]);
    setText("");
  };

  const saveEdit = (id: string) => {
    if (editText.trim() === "") return;

    const tags = extractTags(editText); // ← 追加

    const newLogs = logs.map((log) =>
      log.id === id ? { ...log, text: editText, tags } : log
    );

    setLogs(newLogs);
    setEditText("");
    setEditingId(null);
  };

  const deleteLog = (id: string) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  const extractTags = (text: string) => {
    const matches = text.match(/#\S+/g) || [];
    return matches.map(tag => tag.replace("#", ""));
  };

  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    const savedLogs = localStorage.getItem("logs");
    if (savedLogs) {
      const parsedLogs = JSON.parse(savedLogs);

      const logsWithId = parsedLogs.map((log: any) => ({
        ...log,
        id: log.id ?? crypto.randomUUID(),
        date: log.date ?? new Date().toISOString(),
        tags: log.tags ?? [],
      }));

      setLogs(logsWithId);
      localStorage.setItem("logs", JSON.stringify(logsWithId));
    }
  }, []);

  return (
    <main style={{ padding: "20px" }}>
      <h1>開発ログアプリ</h1>

      {editingId === null && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addLog();
                }
              }}
              placeholder="今日やったこと"
            />
            <button onClick={addLog}>追加</button>
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="検索"
          />
        </div>
      )}

      <ul>
        {logs
          .filter(log =>
            log.text.toLowerCase().includes(search.toLowerCase())
          )
          .map(log => (
          <li key={log.id}>
            {editingId === log.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(log.id)}>保存</button>
              </>
            ) : (
              <>
                <div>
                  {log.text}（{log.date}）
                </div>

                <div>
                  {log.tags.map(tag => (
                    <span key={tag}>#{tag} </span>
                  ))}
                </div>

                <button onClick={() => deleteLog(log.id)}>削除</button>
                <button onClick={() => {
                  setEditText(log.text);
                  setEditingId(log.id);
                }}>
                  編集
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}