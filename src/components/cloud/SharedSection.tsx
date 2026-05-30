import Icon from "@/components/ui/icon";
import { FileItem, MOCK_FILES, FILE_ICONS } from "./data";

interface Props {
  onCopyLink: (file: FileItem) => void;
}

export default function SharedSection({ onCopyLink }: Props) {
  const shared = MOCK_FILES.filter((f) => f.shared);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Общие файлы</h1>
        <p className="text-sm text-muted-foreground mt-1">Файлы с открытым доступом по ссылке</p>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3.5 flex items-center gap-3">
        <Icon name="Info" size={18} className="text-blue-500 shrink-0" />
        <p className="text-sm text-blue-700">
          Ссылки на файлы доступны любому пользователю. Нажмите иконку ссылки, чтобы скопировать.
        </p>
      </div>

      {/* Shared list */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        {shared.map((file, i) => {
          const meta = FILE_ICONS[file.type];
          return (
            <div
              key={file.id}
              className={`flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/40 transition-colors group
                ${i < shared.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className={`w-9 h-9 rounded-lg ${meta.bg} flex items-center justify-center shrink-0`}>
                <Icon name={meta.icon} size={18} className={meta.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.size || "Папка"} · {file.modified}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-secondary px-2.5 py-1 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-foreground">Открыт</span>
                </div>
                <button
                  onClick={() => onCopyLink(file)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Icon name="Link" size={12} />
                  Ссылка
                </button>
                <button className="p-1.5 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors opacity-0 group-hover:opacity-100">
                  <Icon name="X" size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
