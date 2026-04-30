"use client";

import { useState, useEffect } from "react";
import LogForm from "./components/LogForm";
import LogList from "./components/LogList";
import { Log } from "./types/log";

export default function Home() {
  const [text, setText] = useState("");
  const [logs, setLogs] = useState<Log[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");

  const extractTags = (text: string) => {
    const matches = text.match(/#\S+/g) || [];
    return matches.map((tag) => tag.replace("#", ""));
  };

  const addLog = () => {
    if (text.trim() === "") return;

    const tags = extractTags(text);

    const newLog: Log = {
      id: crypto.randomUUID(),
      text,
      date: new Date().toISOString(),
      tags,
    };

    setLogs((prev) => [newLog, ...prev]);
    setText("");
  };

  const saveEdit = (id: string) => {
    if (editText.trim() === "") return;

    const tags = extractTags(editText);

    const newLogs = logs.map((log) =>
      log.id === id ? { ...log, text: editText, tags } : log,
    );

    setLogs(newLogs);
    setEditText("");
    setEditingId(null);
  };

  const deleteLog = (id: string) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  const tagCount = logs
    .flatMap((log) => log.tags)
    .reduce(
      (acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

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
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs, isLoaded]);

  if (!isLoaded) return null;

  return (
    <main
      style={{
        padding: "24px",
        maxWidth: "640px",
        margin: "40px auto",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: "16px",
        }}
      >
        開発ログ
      </h1>

      <LogForm
        text={text}
        setText={setText}
        addLog={addLog}
        search={search}
        setSearch={setSearch}
        tagCount={tagCount}
        editingId={editingId}
        setEditingId={setEditingId}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <LogList
        logs={logs}
        search={search}
        editingId={editingId}
        editText={editText}
        setEditText={setEditText}
        setEditingId={setEditingId}
        saveEdit={saveEdit}
        deleteLog={deleteLog}
        sortOrder={sortOrder}
      />
    </main>
  );
}
