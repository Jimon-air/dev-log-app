"use client";

import { useState, useEffect } from "react";
import LogForm from "./components/LogForm";
import LogList from "./components/LogList";
import { Log } from "./types/log";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [text, setText] = useState("");
  const [logs, setLogs] = useState<Log[]>([]);

  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");

  const extractTags = (text: string) => {
    const matches = text.match(/#\S+/g) || [];
    return matches.map((tag) => tag.replace("#", ""));
  };

  const addLog = async () => {
    if (text.trim() === "") return;

    const { data, error } = await supabase
      .from("logs")
      .insert([
        {
          text,
          date: new Date().toISOString(),
          tags: extractTags(text),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setLogs((prev) => [data, ...prev]);
    setText("");
  };

  const saveEdit = async (id: string) => {
    if (editText.trim() === "") return;

    const { data, error } = await supabase
      .from("logs")
      .update({
        text: editText,
        tags: extractTags(editText),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setLogs((prev) => prev.map((log) => (log.id === id ? data : log)));

    setEditText("");
    setEditingId(null);
  };

  const deleteLog = async (id: string) => {
    const { error } = await supabase.from("logs").delete().eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setLogs((prev) => prev.filter((log) => log.id !== id));
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
    const fetchLogs = async () => {
      const { data, error } = await supabase
        .from("logs")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setLogs(data ?? []);
    };

    fetchLogs();
  }, []);

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
