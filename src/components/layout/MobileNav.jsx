import { FolderArchive, Radar, Repeat2, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

const ITEMS = [
  { key: "discover", icon: Radar },
  { key: "transfers", icon: Repeat2 },
  { key: "vault", icon: FolderArchive },
  { key: "settings", icon: Settings }
];

export function MobileNav() {
  const { t } = useTranslation();

  return (
    <nav className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 flex items-center justify-between rounded-[1.75rem] border border-white/10 bg-[color:var(--surface-panel-strong)]/90 px-2 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl md:hidden">
      {ITEMS.map(({ key, icon: Icon }, index) => (
        <button
          key={key}
          type="button"
          className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] ${
            index === 0 ? "bg-cyan-300/10 text-cyan-200" : "text-[color:var(--text-muted)]"
          }`}
        >
          <Icon size={18} />
          <span className="truncate">{t(`nav.${key}`)}</span>
        </button>
      ))}
    </nav>
  );
}
