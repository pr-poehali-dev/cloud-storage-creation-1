import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  onAuth: (user: { name: string; email: string }) => void;
}

export default function AuthPage({ onAuth }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }
    if (mode === "register" && !name) {
      setError("Введите ваше имя");
      return;
    }
    if (password.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      return;
    }

    onAuth({
      name: mode === "register" ? name : email.split("@")[0],
      email,
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] animate-slide-up">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <img
            src="https://cdn.poehali.dev/projects/187c5bcb-93f4-4c67-9f51-b20c259b9815/bucket/9773d817-05d0-4e9c-9481-bbad289cb82e.jpg"
            alt="TPV RUS"
            className="h-16 w-16 rounded-2xl object-cover shadow-md"
          />
          <div className="text-center">
            <span className="text-xl font-bold tracking-tight text-foreground block">TPV Облако</span>
            <span className="text-xs text-muted-foreground">Личное облачное хранилище</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-8">
          <h1 className="text-2xl font-semibold mb-1.5 text-foreground">
            {mode === "login" ? "Добро пожаловать" : "Создать аккаунт"}
          </h1>
          <p className="text-muted-foreground text-sm mb-7">
            {mode === "login"
              ? "Войдите, чтобы получить доступ к файлам"
              : "Зарегистрируйтесь, чтобы начать работу"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Петров"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Пароль</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Не менее 6 символов"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/8 px-3 py-2 rounded-lg animate-fade-in">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors mt-2"
            >
              {mode === "login" ? "Войти" : "Создать аккаунт"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              {mode === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
              <button
                onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
                className="text-primary font-medium hover:underline transition-colors"
              >
                {mode === "login" ? "Зарегистрироваться" : "Войти"}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Ваши данные защищены шифрованием
        </p>
      </div>
    </div>
  );
}