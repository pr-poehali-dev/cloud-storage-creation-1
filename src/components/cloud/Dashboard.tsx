import { useState, useCallback } from "react";
import Sidebar, { Section } from "./Sidebar";
import HomeSection from "./HomeSection";
import FilesSection from "./FilesSection";
import FoldersSection from "./FoldersSection";
import SharedSection from "./SharedSection";
import HistorySection from "./HistorySection";
import ProfileSection from "./ProfileSection";
import SettingsSection from "./SettingsSection";
import Toast from "./Toast";
import { FileItem } from "./data";

interface Props {
  user: { name: string; email: string };
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: Props) {
  const [section, setSection] = useState<Section>("home");
  const [toast, setToast] = useState<string | null>(null);

  const handleCopyLink = useCallback((file: FileItem) => {
    const link = `https://oblako.app/share/${file.id}`;
    navigator.clipboard.writeText(link).catch(() => {});
    setToast(`Ссылка на «${file.name}» скопирована`);
  }, []);

  const renderSection = () => {
    switch (section) {
      case "home": return <HomeSection user={user} onNav={(s) => setSection(s as Section)} />;
      case "files": return <FilesSection onCopyLink={handleCopyLink} />;
      case "folders": return <FoldersSection onCopyLink={handleCopyLink} />;
      case "shared": return <SharedSection onCopyLink={handleCopyLink} />;
      case "history": return <HistorySection />;
      case "profile": return <ProfileSection user={user} />;
      case "settings": return <SettingsSection />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc] overflow-hidden">
      <Sidebar
        active={section}
        onNav={setSection}
        user={user}
        onLogout={onLogout}
        usedGB={2.4}
        totalGB={100}
      />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-8">
          {renderSection()}
        </div>
      </main>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}