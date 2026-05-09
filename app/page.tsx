"use client";

import { useState } from "react";
import LogForm from "./components/LogForm";
import LogList from "./components/LogList";
import LogSearchControls from "./components/LogSearchControls";
import TagFilter from "./components/TagFilter";
import { getTagCount } from "../utils/getTagCount";
import { useLogs } from "../hooks/useLogs";

export default function Home() {
  const [text, setText] = useState("");
  const { logs, loading, error, isSubmitting, addLog, saveEdit, deleteLog } =
    useLogs();

  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");

  const handleAddLog = async (logText: string) => {
    const success = await addLog(logText);

    if (success) {
      setText("");
    }
  };

  const handleSaveEdit = async (id: string) => {
    const success = await saveEdit(id, editText);

    if (success) {
      setEditText("");
      setEditingId(null);
    }
  };

  const tagCount = getTagCount(logs);

  return (
    <main className="app-shell">
      <h1 className="app-title">開発ログ</h1>

      {editingId === null && (
        <section className="log-input-card">
          <LogForm
            text={text}
            setText={setText}
            addLog={handleAddLog}
            isSubmitting={isSubmitting}
          />

          <LogSearchControls
            search={search}
            setSearch={setSearch}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <TagFilter
            tagCount={tagCount}
            setText={setText}
            setEditingId={setEditingId}
          />
        </section>
      )}

      {error && <p className="error-text">{error}</p>}

      {loading && <p className="status-text">読み込み中...</p>}

      <LogList
        logs={logs}
        search={search}
        editingId={editingId}
        editText={editText}
        setEditText={setEditText}
        setEditingId={setEditingId}
        saveEdit={handleSaveEdit}
        deleteLog={deleteLog}
        sortOrder={sortOrder}
      />
    </main>
  );
}
