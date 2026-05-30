import { useState } from "react";
import Icon from "@/components/ui/icon";
import { FileItem, MOCK_FILES } from "./data";
import FilesSection from "./FilesSection";

interface Props {
  onCopyLink: (file: FileItem) => void;
}

export default function FoldersSection({ onCopyLink }: Props) {
  const [openFolder, setOpenFolder] = useState<FileItem | null>(null);
  const folders = MOCK_FILES.filter((f) => f.type === "folder");

  if (openFolder) {
    return (
      <div className="animate-fade-in">
        <button
          onClick={() => setOpenFolder(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <Icon name="ArrowLeft" size={15} />
          Назад к папкам
        </button>
        <FilesSection onCopyLink={onCopyLink} folderId={openFolder.id} title={openFolder.name} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Папки</h1>
        <button className="flex items-center gap-2 px-3.5 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
          <Icon name="FolderPlus" size={15} />
          Новая папка
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {folders.map((folder) => {
          const fileCount = MOCK_FILES.filter((f) => f.folderId === folder.id).length;
          return (
            <div
              key={folder.id}
              onClick={() => setOpenFolder(folder)}
              className="bg-white border border-border rounded-2xl p-5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                  <Icon name="Folder" size={24} className="text-amber-500" />
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); onCopyLink(folder); }}
                    className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                    title="Скопировать ссылку на папку"
                  >
                    <Icon name="Link" size={14} />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name="MoreHorizontal" size={14} />
                  </button>
                </div>
              </div>

              <p className="text-base font-semibold text-foreground mb-1">{folder.name}</p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{fileCount} файл{fileCount === 1 ? "" : fileCount < 5 ? "а" : "ов"}</span>
                {folder.shared && (
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                    Общий доступ
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{folder.modified}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
