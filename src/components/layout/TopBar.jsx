import { Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "../common/LanguageToggle";

export function TopBar() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-30 mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4 lg:px-8">
      <div className="min-w-0 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.25rem] bg-cyan-300/10 text-cyan-200 shadow-[0_0_24px_rgba(83,224,255,0.15)] sm:h-12 sm:w-12 sm:rounded-[1.5rem]">
          <Globe2 size={20} />
        </div>
        <div className="min-w-0">
          <div className="truncate text-base font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-lg">GlobeDrop</div>
          <div className="hidden text-sm text-[color:var(--text-muted)] sm:block">{t("app.tagline")}</div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <LanguageToggle />
      </div>
    </header>
  );
}
