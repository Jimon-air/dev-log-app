"use client";

import { useState } from "react";
import LogForm from "./components/LogForm";
import LogList from "./components/LogList";
import { getTagCount } from "../utils/getTagCount";
import { useLogs } from "../hooks/useLogs";

export default function Home() {
  const [text, setText] = useState("");
  const { logs, addLog, saveEdit, deleteLog } = useLogs();

  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");

  const handleAddLog = async () => {
    const success = await addLog(text);

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

      <LogForm
        text={text}
        setText={setText}
        addLog={handleAddLog}
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
        saveEdit={handleSaveEdit}
        deleteLog={deleteLog}
        sortOrder={sortOrder}
      />
    </main>
  );
}
