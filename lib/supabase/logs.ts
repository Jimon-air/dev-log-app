import { supabase } from "../supabase";

export const fetchLogs = async (userId: string) => {
  return await supabase
    .from("logs")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });
};

export const createLog = async (
  userId: string,
  text: string,
  tags: string[],
) => {
  return await supabase
    .from("logs")
    .insert([
      {
        text,
        date: new Date().toISOString(),
        tags,
        user_id: userId,
      },
    ])
    .select()
    .single();
};

export const updateLog = async (
  userId: string,
  id: string,
  text: string,
  tags: string[],
) => {
  return await supabase
    .from("logs")
    .update({
      text,
      tags,
    })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();
};

export const removeLog = async (userId: string, id: string) => {
  return await supabase.from("logs").delete().eq("id", id).eq("user_id", userId);
};
