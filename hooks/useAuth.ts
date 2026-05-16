import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
        setAuthError("認証状態の取得に失敗しました。");
      }

      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsSubmitting(true);
    setAuthError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      setAuthError("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
      setIsSubmitting(false);
      return false;
    }

    setIsSubmitting(false);
    return true;
  };

  const signUp = async (email: string, password: string) => {
    setIsSubmitting(true);
    setAuthError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error);
      setAuthError("新規登録に失敗しました。入力内容を確認してください。");
      setIsSubmitting(false);
      return { success: false, needsConfirmation: false };
    }

    setIsSubmitting(false);

    return {
      success: true,
      needsConfirmation: data.session === null,
    };
  };

  const signOut = async () => {
    setIsSubmitting(true);
    setAuthError(null);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      setAuthError("ログアウトに失敗しました。");
      setIsSubmitting(false);
      return false;
    }

    setIsSubmitting(false);
    return true;
  };

  return {
    session,
    user,
    loading,
    authError,
    isSubmitting,
    signIn,
    signUp,
    signOut,
  };
};
