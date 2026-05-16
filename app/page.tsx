"use client";

import AuthForm from "./components/AuthForm";
import LogApp from "./components/LogApp";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const {
    user,
    loading,
    authError,
    isSubmitting,
    signIn,
    signUp,
    signOut,
  } = useAuth();

  return (
    <main className="app-shell">
      <h1 className="app-title">開発ログ</h1>

      {loading && (
        <section className="state-card">
          <div className="state-title">認証状態を確認しています</div>
          <div className="state-description">少しだけお待ちください。</div>
        </section>
      )}

      {!loading && !user && (
        <AuthForm
          authError={authError}
          isSubmitting={isSubmitting}
          signIn={signIn}
          signUp={signUp}
        />
      )}

      {!loading && user && (
        <>
          <section className="user-bar">
            <div className="user-email">{user.email}</div>
            <button
              type="button"
              onClick={signOut}
              disabled={isSubmitting}
              className="ghost-button sign-out-button"
            >
              ログアウト
            </button>
          </section>

          {authError && (
            <section className="state-card state-card-error">
              <div className="state-title">エラーが発生しました</div>
              <div className="state-description">{authError}</div>
            </section>
          )}

          <LogApp />
        </>
      )}
    </main>
  );
}
