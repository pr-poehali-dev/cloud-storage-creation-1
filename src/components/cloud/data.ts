export type FileItem = {
  id: string;
  name: string;
  type: "folder" | "image" | "document" | "video" | "audio" | "archive" | "other";
  size?: string;
  modified: string;
  shared?: boolean;
  folderId?: string | null;
};

export type HistoryItem = {
  id: string;
  action: "upload" | "delete" | "share" | "rename" | "download";
  file: string;
  time: string;
};

export const MOCK_FILES: FileItem[] = [
  { id: "f1", name: "Рабочие документы", type: "folder", modified: "Сегодня", shared: true, folderId: null },
  { id: "f2", name: "Фотографии", type: "folder", modified: "Вчера", shared: false, folderId: null },
  { id: "f3", name: "Проекты 2024", type: "folder", modified: "3 дня назад", shared: true, folderId: null },
  { id: "f4", name: "Презентация_финал.pptx", type: "document", size: "4.2 МБ", modified: "Сегодня", shared: true, folderId: null },
  { id: "f5", name: "Отчёт_Q4.xlsx", type: "document", size: "1.8 МБ", modified: "Вчера", shared: false, folderId: null },
  { id: "f6", name: "фото_отпуск.jpg", type: "image", size: "3.1 МБ", modified: "5 дней назад", shared: false, folderId: null },
  { id: "f7", name: "Договор_подряда.pdf", type: "document", size: "890 КБ", modified: "Неделю назад", shared: true, folderId: null },
  { id: "f8", name: "backup_2024.zip", type: "archive", size: "128 МБ", modified: "2 недели назад", shared: false, folderId: null },
  { id: "f9", name: "Лого_компании.png", type: "image", size: "560 КБ", modified: "Вчера", shared: true, folderId: null },
  { id: "f10", name: "Видео_презентация.mp4", type: "video", size: "245 МБ", modified: "3 дня назад", shared: false, folderId: null },
  { id: "f11", name: "Заметки.txt", type: "other", size: "12 КБ", modified: "Сегодня", shared: false, folderId: "f1" },
  { id: "f12", name: "Справка_2024.docx", type: "document", size: "340 КБ", modified: "Вчера", shared: false, folderId: "f1" },
];

export const MOCK_HISTORY: HistoryItem[] = [
  { id: "h1", action: "upload", file: "Презентация_финал.pptx", time: "Сегодня, 14:32" },
  { id: "h2", action: "share", file: "Договор_подряда.pdf", time: "Сегодня, 11:15" },
  { id: "h3", action: "download", file: "Отчёт_Q4.xlsx", time: "Вчера, 18:44" },
  { id: "h4", action: "rename", file: "фото_отпуск.jpg", time: "Вчера, 12:00" },
  { id: "h5", action: "upload", file: "backup_2024.zip", time: "2 нед. назад, 09:30" },
  { id: "h6", action: "delete", file: "старый_документ.docx", time: "3 нед. назад, 16:20" },
];

export const FILE_ICONS: Record<FileItem["type"], { icon: string; color: string; bg: string }> = {
  folder: { icon: "Folder", color: "text-amber-500", bg: "bg-amber-50" },
  image: { icon: "Image", color: "text-emerald-500", bg: "bg-emerald-50" },
  document: { icon: "FileText", color: "text-blue-500", bg: "bg-blue-50" },
  video: { icon: "Film", color: "text-purple-500", bg: "bg-purple-50" },
  audio: { icon: "Music", color: "text-pink-500", bg: "bg-pink-50" },
  archive: { icon: "Archive", color: "text-orange-500", bg: "bg-orange-50" },
  other: { icon: "File", color: "text-gray-400", bg: "bg-gray-50" },
};

export const HISTORY_ACTIONS: Record<HistoryItem["action"], { label: string; icon: string; color: string }> = {
  upload: { label: "Загружен", icon: "Upload", color: "text-emerald-500" },
  delete: { label: "Удалён", icon: "Trash2", color: "text-red-500" },
  share: { label: "Поделились", icon: "Share2", color: "text-blue-500" },
  rename: { label: "Переименован", icon: "Pencil", color: "text-amber-500" },
  download: { label: "Скачан", icon: "Download", color: "text-purple-500" },
};
