import { useState } from "react";
import Icon from "@/components/ui/icon";
import { FileItem, FILE_ICONS } from "./data";

interface Props {
  file: FileItem;
  view: "grid" | "list";
  onCopyLink: (file: FileItem) => void;
  onOpen?: (file: FileItem) => void;
}

export default function FileCard({ file, view, onCopyLink, onOpen }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const meta = FILE_ICONS[file.type];

  if (view === "list") {
    return (
      <div className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 rounded-xl transition-colors group cursor-pointer">
        <div className={`w-9 h-9 rounded-lg ${meta.bg} flex items-center justify-center shrink-0`}>
          <Icon name={meta.icon} size={18} className={meta.color} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground">{file.size || "Папка"} · {file.modified}</p>
        </div>
        {file.shared && (
          <span className="shrink-0 text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
            Общий
          </span>
        )}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onCopyLink(file)}
            className="p-1.5 rounded-lg hover:bg-border text-muted-foreground hover:text-foreground transition-colors"
            title="Скопировать ссылку"
          >
            <Icon name="Link" size={14} />
          </button>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 rounded-lg hover:bg-border text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="MoreHorizontal" size={14} />
            </button>
            {menuOpen && <ContextMenu file={file} onClose={() => setMenuOpen(false)} onCopyLink={onCopyLink} />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white border border-border rounded-2xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative"
      onClick={() => onOpen?.(file)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl ${meta.bg} flex items-center justify-center`}>
          <Icon name={meta.icon} size={22} className={meta.color} />
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); onCopyLink(file); }}
            className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            title="Скопировать ссылку"
          >
            <Icon name="Link" size={13} />
          </button>
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
              className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="MoreHorizontal" size={13} />
            </button>
            {menuOpen && <ContextMenu file={file} onClose={() => setMenuOpen(false)} onCopyLink={onCopyLink} />}
          </div>
        </div>
      </div>

      <p className="text-sm font-medium text-foreground truncate mb-1">{file.name}</p>
      <p className="text-xs text-muted-foreground">{file.size || "Папка"}</p>

      {file.shared && (
        <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-primary" title="Общий доступ" />
      )}
    </div>
  );
}

function ContextMenu({ file, onClose, onCopyLink }: { file: FileItem; onClose: () => void; onCopyLink: (f: FileItem) => void }) {
  const items = [
    { icon: "Download", label: "Скачать" },
    { icon: "Link", label: "Копировать ссылку", action: () => onCopyLink(file) },
    { icon: "Pencil", label: "Переименовать" },
    { icon: "FolderInput", label: "Переместить" },
    { icon: "Trash2", label: "Удалить", danger: true },
  ];

  return (
    <div
      className="absolute right-0 top-8 z-50 bg-white border border-border rounded-xl shadow-lg py-1.5 min-w-[170px] animate-scale-in"
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => { item.action?.(); onClose(); }}
          className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-sm transition-colors
            ${item.danger
              ? "text-destructive hover:bg-destructive/8"
              : "text-foreground hover:bg-secondary"
            }`}
        >
          <Icon name={item.icon} size={14} className={item.danger ? "text-destructive" : "text-muted-foreground"} />
          {item.label}
        </button>
      ))}
    </div>
  );
}
