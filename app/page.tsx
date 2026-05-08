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
    <main style={{ padding: "24px", maxWidth: "640px", margin: "40px auto" }}>
      <h1>開発ログ</h1>

      {editingId === null && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
        </div>
      )}

      {error && <p style={{ color: "#dc2626" }}>{error}</p>}

      {loading && <p>読み込み中...</p>}

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
