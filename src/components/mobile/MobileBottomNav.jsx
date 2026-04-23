import { FolderOpen, History, Settings, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";

const NAV_ITEMS = [
  { key: "transfer", label: "Transfer", icon: FolderOpen },
  { key: "history", label: "History", icon: History },
  { key: "devices", label: "Devices", icon: Smartphone },
  { key: "settings", label: "Settings", icon: Settings }
];

export function MobileBottomNav({ active = "transfer", hidden = false }) {
  const { i18n } = useTranslation();

  if (hidden) {
    return null;
  }

  const labels = {
    en: {
      transfer: "Transfer",
      history: "History",
      devices: "Devices",
      settings: "Settings"
    },
    tr: {
      transfer: "Aktarim",
      history: "Gecmis",
      devices: "Cihazlar",
      settings: "Ayarlar"
    }
  };

  const locale = i18n.language.startsWith("tr") ? "tr" : "en";

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full rounded-t-[1.75rem] border-t border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-around px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-3">
        {NAV_ITEMS.map(({ key, icon: Icon }) => {
          const isActive = active === key;

          return (
            <button
              key={key}
              type="button"
              className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 transition-all duration-300 ${
                isActive
                  ? "bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-400/30 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                  : "text-slate-500"
              }`}
            >
              <Icon size={18} />
              <span className="mt-1 font-[inherit] text-[10px] uppercase tracking-[0.22em]">
                {labels[locale][key]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
