import { supabase } from "../supabase";

export const fetchLogs = async () => {
  return await supabase
    .from("logs")
    .select("*")
    .order("date", { ascending: false });
};

export const createLog = async (text: string, tags: string[]) => {
  return await supabase
    .from("logs")
    .insert([
      {
        text,
        date: new Date().toISOString(),
        tags,
      },
    ])
    .select()
    .single();
};

export const updateLog = async (id: string, text: string, tags: string[]) => {
  return await supabase
    .from("logs")
    .update({
      text,
      tags,
    })
    .eq("id", id)
    .select()
    .single();
};

export const removeLog = async (id: string) => {
  return await supabase.from("logs").delete().eq("id", id);
};
