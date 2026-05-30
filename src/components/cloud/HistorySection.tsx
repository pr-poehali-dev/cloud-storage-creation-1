import Icon from "@/components/ui/icon";
import { MOCK_HISTORY, HISTORY_ACTIONS } from "./data";

export default function HistorySection() {
  const grouped: Record<string, typeof MOCK_HISTORY> = {};
  MOCK_HISTORY.forEach((item) => {
    const day = item.time.split(",")[0];
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(item);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">История</h1>
        <p className="text-sm text-muted-foreground mt-1">Все действия с файлами</p>
      </div>

      {Object.entries(grouped).map(([day, items]) => (
        <div key={day}>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">{day}</p>
          <div className="bg-white border border-border rounded-2xl overflow-hidden">
            {items.map((item, i) => {
              const a = HISTORY_ACTIONS[item.action];
              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 px-4 py-3.5 hover:bg-secondary/40 transition-colors
                    ${i < items.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                    <Icon name={a.icon} size={16} className={a.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{a.label}</span>
                    </p>
                    <p className="text-sm text-muted-foreground truncate">{item.file}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {item.time.split(", ")[1] || item.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
