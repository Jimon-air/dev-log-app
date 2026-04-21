"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [logs, setLogs] = useState<{ text: string; date: string }[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    const savedLogs = localStorage.getItem("logs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const addLog = () => {
  if (text.trim() === "") return;

  const newLog = {
      text: text,
      date: new Date().toLocaleDateString(),
    };

    setLogs([newLog, ...logs]);
    setText("");
  };

  const saveEdit = (index: number) => {
    if (text.trim() === "") return;

    const newLogs = [...logs];
    newLogs[index].text = text;

    setLogs(newLogs);
    setText("");
    setEditingIndex(null);
  };

  const deleteLog = (index: number) => {
    const newLogs = logs.filter((_, i) => i !== index);
    setLogs(newLogs);
  };

  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  return (
    <main style={{ padding: "20px" }}>
      <h1>開発ログアプリ</h1>

      {editingIndex === null && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
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
          .map((log, index) => ({ log, index }))
          .filter(({ log }) =>
            log.text.toLowerCase().includes(search.toLowerCase())
          )
          .map(({ log, index }) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>保存</button>
              </>
            ) : (
              <>
                {log.text}（{log.date}）
                <button onClick={() => deleteLog(index)}>削除</button>
                <button onClick={() => {
                  setText(log.text);
                  setEditingIndex(index);
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