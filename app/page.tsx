"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [logs, setLogs] = useState<{ text: string; date: string }[]>([]);
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

    setLogs([...logs, newLog]);
    setText("");
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

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="今日やったこと"
      />

      <button onClick={addLog}>追加</button>

      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            {log.text}（{log.date}）
            <button onClick={() => deleteLog(index)}>削除</button>
          </li>
        ))}
      </ul>
    </main>
  );
}