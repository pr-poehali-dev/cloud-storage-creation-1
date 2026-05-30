import { useState } from "react";
import Icon from "@/components/ui/icon";
import FileCard from "./FileCard";
import { FileItem, MOCK_FILES } from "./data";

interface Props {
  onCopyLink: (file: FileItem) => void;
  folderId?: string | null;
  title?: string;
}

export default function FilesSection({ onCopyLink, folderId = null, title = "Файлы" }: Props) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"name" | "modified" | "size">("modified");

  const files = MOCK_FILES.filter((f) => {
    const matchFolder = folderId !== undefined ? f.folderId === folderId : f.folderId === null;
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchFolder && matchSearch;
  });

  const sorted = [...files].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const folders = sorted.filter((f) => f.type === "folder");
  const rest = sorted.filter((f) => f.type !== "folder");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3.5 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
            <Icon name="Plus" size={15} />
            Создать
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск файлов..."
            className="w-full pl-8.5 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="px-3 py-2.5 rounded-xl border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
        >
          <option value="modified">По дате</option>
          <option value="name">По имени</option>
          <option value="size">По размеру</option>
        </select>

        <div className="flex items-center bg-white border border-border rounded-xl p-1 gap-0.5">
          <button
            onClick={() => setView("grid")}
            className={`p-1.5 rounded-lg transition-colors ${view === "grid" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Icon name="LayoutGrid" size={15} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-1.5 rounded-lg transition-colors ${view === "list" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Icon name="List" size={15} />
          </button>
        </div>
      </div>

      {/* Folders */}
      {folders.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Папки</p>
          <div className={view === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
            : "space-y-1"
          }>
            {folders.map((f) => (
              <FileCard key={f.id} file={f} view={view} onCopyLink={onCopyLink} />
            ))}
          </div>
        </div>
      )}

      {/* Files */}
      {rest.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Файлы · {rest.length}
          </p>
          <div className={view === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
            : "space-y-1"
          }>
            {rest.map((f) => (
              <FileCard key={f.id} file={f} view={view} onCopyLink={onCopyLink} />
            ))}
          </div>
        </div>
      )}

      {sorted.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-4">
            <Icon name="FolderOpen" size={26} className="text-muted-foreground" />
          </div>
          <p className="text-base font-medium text-foreground">Нет файлов</p>
          <p className="text-sm text-muted-foreground mt-1">Загрузите первый файл</p>
        </div>
      )}
    </div>
  );
}
