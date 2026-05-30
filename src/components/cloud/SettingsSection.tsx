import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ToggleProps {
  label: string;
  desc?: string;
  defaultOn?: boolean;
}

function Toggle({ label, desc, defaultOn = false }: ToggleProps) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-start justify-between py-4 border-b border-border last:border-0">
      <div className="flex-1 pr-4">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`w-10 h-5.5 rounded-full transition-all duration-200 relative shrink-0 mt-0.5
          ${on ? "bg-primary" : "bg-border"}`}
        style={{ height: "22px", width: "40px" }}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200
            ${on ? "left-5" : "left-0.5"}`}
        />
      </button>
    </div>
  );
}

export default function SettingsSection() {
  return (
    <div className="space-y-6 animate-fade-in max-w-lg">
      <h1 className="text-2xl font-semibold text-foreground">Настройки</h1>

      <div className="bg-white border border-border rounded-2xl p-6">
        <h3 className="text-base font-semibold text-foreground mb-1">Синхронизация</h3>
        <p className="text-sm text-muted-foreground mb-4">Управление автоматической синхронизацией</p>
        <Toggle label="Автосинхронизация" desc="Файлы обновляются между всеми устройствами автоматически" defaultOn={true} />
        <Toggle label="Синхронизация по Wi-Fi" desc="Загружать только при подключении к Wi-Fi" defaultOn={true} />
        <Toggle label="Синхронизация фото" desc="Автоматически загружать новые фотографии" />
      </div>

      <div className="bg-white border border-border rounded-2xl p-6">
        <h3 className="text-base font-semibold text-foreground mb-1">Уведомления</h3>
        <p className="text-sm text-muted-foreground mb-4">Когда отправлять уведомления</p>
        <Toggle label="Новые файлы" desc="При загрузке новых файлов" defaultOn={true} />
        <Toggle label="Общий доступ" desc="Когда с вами поделились файлом" defaultOn={true} />
        <Toggle label="Место на диске" desc="Предупреждать при заполнении хранилища" defaultOn={true} />
      </div>

      <div className="bg-white border border-border rounded-2xl p-6">
        <h3 className="text-base font-semibold text-foreground mb-1">Приватность</h3>
        <p className="text-sm text-muted-foreground mb-4">Контроль доступа и безопасности</p>
        <Toggle label="Двухфакторная аутентификация" desc="Дополнительная защита аккаунта" />
        <Toggle label="Шифрование файлов" desc="Сквозное шифрование хранимых данных" defaultOn={true} />
        <Toggle label="Журнал активности" desc="Сохранять историю всех действий" defaultOn={true} />
      </div>

      <div className="bg-white border border-border rounded-2xl p-6 space-y-3">
        <h3 className="text-base font-semibold text-foreground mb-1">Опасная зона</h3>
        <button className="flex items-center gap-2 w-full px-4 py-2.5 border border-destructive/30 text-destructive rounded-xl text-sm font-medium hover:bg-destructive/5 transition-colors">
          <Icon name="Trash2" size={15} />
          Очистить корзину
        </button>
        <button className="flex items-center gap-2 w-full px-4 py-2.5 border border-destructive/30 text-destructive rounded-xl text-sm font-medium hover:bg-destructive/5 transition-colors">
          <Icon name="UserX" size={15} />
          Удалить аккаунт
        </button>
      </div>
    </div>
  );
}
