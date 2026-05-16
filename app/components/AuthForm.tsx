import { FormEvent, useState } from "react";

type Props = {
  authError: string | null;
  isSubmitting: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; needsConfirmation: boolean }>;
};

export default function AuthForm({
  authError,
  isSubmitting,
  signIn,
  signUp,
}: Props) {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const isSignIn = mode === "signIn";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    if (isSignIn) {
      await signIn(email, password);
      return;
    }

    const result = await signUp(email, password);

    if (result.success && result.needsConfirmation) {
      setMessage("確認メールを送信しました。メール内のリンクから登録を完了してください。");
    } else if (result.success) {
      setMessage("登録が完了しました。");
    }
  };

  const switchMode = () => {
    setMode((current) => (current === "signIn" ? "signUp" : "signIn"));
    setMessage(null);
  };

  return (
    <section className="auth-card">
      <h2 className="auth-title">{isSignIn ? "ログイン" : "新規登録"}</h2>
      <p className="auth-description">
        開発ログを表示するにはメールアドレスとパスワードでログインしてください。
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        <label className="auth-field">
          <span>メールアドレス</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            className="field"
          />
        </label>

        <label className="auth-field">
          <span>パスワード</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={isSignIn ? "current-password" : "new-password"}
            required
            minLength={6}
            className="field"
          />
        </label>

        {authError && (
          <div className="auth-message auth-message-error">{authError}</div>
        )}

        {message && <div className="auth-message">{message}</div>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="primary-button auth-submit"
        >
          {isSubmitting ? "処理中..." : isSignIn ? "ログイン" : "新規登録"}
        </button>
      </form>

      <button type="button" onClick={switchMode} className="auth-switch-button">
        {isSignIn
          ? "アカウントがない場合は新規登録"
          : "アカウントがある場合はログイン"}
      </button>
    </section>
  );
}
