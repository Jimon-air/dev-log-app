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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadLogs = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await fetchLogs();

      if (error) {
        console.error(error);
        setError("ログの読み込みに失敗しました。");
        setLoading(false);
        return;
      }

      setLogs(data ?? []);
      setLoading(false);
    };

    loadLogs();
  }, []);

  const addLog = async (text: string) => {
    if (text.trim() === "") return false;

    setIsSubmitting(true);
    setError(null);

    const { data, error } = await createLog(text, extractTags(text));

    if (error) {
      console.error(error);
      setError("ログの追加に失敗しました。");
      setIsSubmitting(false);
      return false;
    }

    setLogs((prev) => [data, ...prev]);
    setIsSubmitting(false);
    return true;
  };

  const saveEdit = async (id: string, editText: string) => {
    if (editText.trim() === "") return false;

    setIsSubmitting(true);
    setError(null);

    const { data, error } = await updateLog(
      id,
      editText,
      extractTags(editText),
    );

    if (error) {
      console.error(error);
      setError("ログの更新に失敗しました。");
      setIsSubmitting(false);
      return false;
    }

    setLogs((prev) => prev.map((log) => (log.id === id ? data : log)));

    setIsSubmitting(false);
    return true;
  };

  const deleteLog = async (id: string) => {
    setIsSubmitting(true);
    setError(null);

    const { error } = await removeLog(id);

    if (error) {
      console.error(error);
      setError("ログの削除に失敗しました。");
      setIsSubmitting(false);
      return false;
    }

    setLogs((prev) => prev.filter((log) => log.id !== id));
    setIsSubmitting(false);
    return true;
  };

  return {
    logs,
    loading,
    error,
    isSubmitting,
    addLog,
    saveEdit,
    deleteLog,
  };
};
