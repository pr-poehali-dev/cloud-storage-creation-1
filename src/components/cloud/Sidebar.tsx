import Icon from "@/components/ui/icon";

export type Section =
  | "home"
  | "files"
  | "folders"
  | "shared"
  | "history"
  | "profile"
  | "settings";

interface Props {
  active: Section;
  onNav: (s: Section) => void;
  user: { name: string; email: string };
  onLogout: () => void;
  usedGB: number;
  totalGB: number;
}

const NAV: { key: Section; label: string; icon: string }[] = [
  { key: "home", label: "Главная", icon: "Home" },
  { key: "files", label: "Файлы", icon: "Files" },
  { key: "folders", label: "Папки", icon: "FolderOpen" },
  { key: "shared", label: "Общие", icon: "Share2" },
  { key: "history", label: "История", icon: "Clock" },
];

const BOTTOM_NAV: { key: Section; label: string; icon: string }[] = [
  { key: "profile", label: "Профиль", icon: "User" },
  { key: "settings", label: "Настройки", icon: "Settings" },
];

export default function Sidebar({ active, onNav, user, onLogout, usedGB, totalGB }: Props) {
  const pct = Math.round((usedGB / totalGB) * 100);

  return (
    <aside className="w-60 shrink-0 flex flex-col h-screen bg-white border-r border-border">
      {/* Logo */}
      <div className="px-5 py-4 flex items-center gap-3 border-b border-border">
        <img
          src="https://cdn.poehali.dev/projects/187c5bcb-93f4-4c67-9f51-b20c259b9815/bucket/9773d817-05d0-4e9c-9481-bbad289cb82e.jpg"
          alt="TPV RUS"
          className="h-8 w-8 rounded-lg object-cover shrink-0"
        />
        <div className="leading-tight">
          <span className="font-bold text-sm text-foreground tracking-tight block">TPV Облако</span>
          <span className="text-xs text-muted-foreground">RUS</span>
        </div>
      </div>

      {/* Upload button */}
      <div className="px-4 pt-4 pb-2">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
          <Icon name="Plus" size={16} />
          Загрузить файл
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => (
          <button
            key={item.key}
            onClick={() => onNav(item.key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
              ${active === item.key
                ? "bg-accent text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
          >
            <Icon name={item.icon} size={17} />
            {item.label}
          </button>
        ))}

        <div className="pt-2 pb-1">
          <div className="h-px bg-border" />
        </div>

        {BOTTOM_NAV.map((item) => (
          <button
            key={item.key}
            onClick={() => onNav(item.key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
              ${active === item.key
                ? "bg-accent text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
          >
            <Icon name={item.icon} size={17} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Storage indicator */}
      <div className="px-4 pb-3">
        <div className="bg-secondary rounded-xl p-3.5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-foreground">Хранилище</span>
            <span className="text-xs text-muted-foreground">{usedGB} / {totalGB} ГБ</span>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">{pct}% использовано</p>
        </div>
      </div>

      {/* User */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-primary text-sm font-semibold">
              {user.name[0].toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <button
            onClick={onLogout}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
            title="Выйти"
          >
            <Icon name="LogOut" size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}