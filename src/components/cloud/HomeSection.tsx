import Icon from "@/components/ui/icon";
import { MOCK_FILES, MOCK_HISTORY, FILE_ICONS, HISTORY_ACTIONS } from "./data";

interface Props {
  user: { name: string; email: string };
  onNav: (s: string) => void;
}

export default function HomeSection({ user, onNav }: Props) {
  const recent = MOCK_FILES.filter((f) => f.type !== "folder").slice(0, 4);

  const stats = [
    { label: "Файлов", value: "9", icon: "Files", color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Папок", value: "3", icon: "Folder", color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Общих", value: "5", icon: "Share2", color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "ГБ занято", value: "2.4", icon: "HardDrive", color: "text-purple-500", bg: "bg-purple-50" },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Доброе утро" : hour < 18 ? "Добрый день" : "Добрый вечер";

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          {greeting}, {user.name.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Ваши файлы синхронизированы и готовы к работе
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-border rounded-2xl p-4 hover-scale">
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <Icon name={s.icon} size={18} className={s.color} />
            </div>
            <p className="text-2xl font-semibold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent files */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">Недавние файлы</h2>
          <button
            onClick={() => onNav("files")}
            className="text-sm text-primary hover:underline font-medium"
          >
            Все файлы
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {recent.map((file) => {
            const meta = FILE_ICONS[file.type];
            return (
              <div
                key={file.id}
                className="bg-white border border-border rounded-2xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl ${meta.bg} flex items-center justify-center mb-3`}>
                  <Icon name={meta.icon} size={20} className={meta.color} />
                </div>
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{file.size} · {file.modified}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">Последние действия</h2>
          <button
            onClick={() => onNav("history")}
            className="text-sm text-primary hover:underline font-medium"
          >
            Вся история
          </button>
        </div>
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          {MOCK_HISTORY.slice(0, 4).map((item, i) => {
            const a = HISTORY_ACTIONS[item.action];
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 px-4 py-3.5 ${i < 3 ? "border-b border-border" : ""}`}
              >
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Icon name={a.icon} size={15} className={a.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{a.label}:</span>{" "}
                    <span className="truncate">{item.file}</span>
                  </p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
