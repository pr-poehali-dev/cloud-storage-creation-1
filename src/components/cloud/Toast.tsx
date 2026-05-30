import { useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: Props) {
  useEffect(() => {
    const t = setTimeout(onClose, 2800);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="flex items-center gap-2.5 bg-foreground text-background px-4 py-3 rounded-2xl shadow-xl text-sm font-medium">
        <Icon name="Check" size={15} className="text-emerald-400" />
        {message}
      </div>
    </div>
  );
}
