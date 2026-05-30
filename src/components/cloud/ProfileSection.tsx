import Icon from "@/components/ui/icon";

interface Props {
  user: { name: string; email: string };
}

export default function ProfileSection({ user }: Props) {
  return (
    <div className="space-y-6 animate-fade-in max-w-lg">
      <h1 className="text-2xl font-semibold text-foreground">Профиль</h1>

      {/* Avatar card */}
      <div className="bg-white border border-border rounded-2xl p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <span className="text-primary text-2xl font-bold">{user.name[0].toUpperCase()}</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <span className="inline-flex items-center gap-1 mt-1.5 text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Синхронизировано
          </span>
        </div>
      </div>

      {/* Edit form */}
      <div className="bg-white border border-border rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-semibold text-foreground">Личные данные</h3>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Имя</label>
          <input
            defaultValue={user.name}
            className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Email</label>
          <input
            defaultValue={user.email}
            className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <button className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
          Сохранить изменения
        </button>
      </div>

      {/* Change password */}
      <div className="bg-white border border-border rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-semibold text-foreground">Безопасность</h3>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Текущий пароль</label>
          <input type="password" placeholder="••••••••" className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Новый пароль</label>
          <input type="password" placeholder="••••••••" className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
        </div>
        <button className="px-4 py-2.5 bg-secondary text-foreground rounded-xl text-sm font-medium hover:bg-border transition-colors">
          Обновить пароль
        </button>
      </div>
    </div>
  );
}
