import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://vjrfgmxgmvxhtbkytuli.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqcmZnbXhnbXZ4aHRia3l0dWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MDEyMjAsImV4cCI6MjA5MzE3NzIyMH0.fgsg5dJUyadWurpZOoRMsWNsaM68O-HkCXWimiGwvwg",
);
