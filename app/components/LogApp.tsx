"use client";

import { useState } from "react";
import LogForm from "./LogForm";
import LogList from "./LogList";
import LogSearchControls from "./LogSearchControls";
import TagFilter from "./TagFilter";
import { getTagCount } from "../../utils/getTagCount";
import { useLogs } from "../../hooks/useLogs";

type Props = {
  userId: string;
};

export default function LogApp({ userId }: Props) {
  const [text, setText] = useState("");
  const { logs, loading, error, isSubmitting, addLog, saveEdit, deleteLog } =
    useLogs(userId);

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
    <>
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

      {error && (
        <section className="state-card state-card-error">
          <div className="state-title">エラーが発生しました</div>
          <div className="state-description">{error}</div>
        </section>
      )}

      {loading && (
        <section className="state-card">
          <div className="state-title">ログを読み込んでいます</div>
          <div className="state-description">少しだけお待ちください。</div>
        </section>
      )}

      {!loading && (
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
      )}
    </>
  );
}
