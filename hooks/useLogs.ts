import { useEffect, useState } from "react";
import { Log } from "../app/types/log";
import {
  fetchLogs,
  createLog,
  updateLog,
  removeLog,
} from "../lib/supabase/logs";
import { extractTags } from "../utils/extractTags";

export const useLogs = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const loadLogs = async () => {
      const { data, error } = await fetchLogs();

      if (error) {
        console.error(error);
        return;
      }

      setLogs(data ?? []);
    };

    loadLogs();
  }, []);

  const addLog = async (text: string) => {
    if (text.trim() === "") return false;

    const { data, error } = await createLog(text, extractTags(text));

    if (error) {
      console.error(error);
      return false;
    }

    setLogs((prev) => [data, ...prev]);
    return true;
  };

  const saveEdit = async (id: string, editText: string) => {
    if (editText.trim() === "") return false;

    const { data, error } = await updateLog(
      id,
      editText,
      extractTags(editText),
    );

    if (error) {
      console.error(error);
      return false;
    }

    setLogs((prev) => prev.map((log) => (log.id === id ? data : log)));

    return true;
  };

  const deleteLog = async (id: string) => {
    const { error } = await removeLog(id);

    if (error) {
      console.error(error);
      return false;
    }

    setLogs((prev) => prev.filter((log) => log.id !== id));
    return true;
  };

  return {
    logs,
    addLog,
    saveEdit,
    deleteLog,
  };
};
