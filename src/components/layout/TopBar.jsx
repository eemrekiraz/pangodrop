import { useTranslation } from "react-i18next";
import { LanguageToggle } from "../common/LanguageToggle";
import { InstallPWAButton } from "../common/InstallPWAButton";

export function TopBar() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-30 mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4 lg:px-8">
      <div className="min-w-0 flex items-center gap-3">
        
        {/* ESKİ DÜNYA İKONU YERİNE YENİ LOGO EKLENDİ */}
        <img 
          src="/directlydrop-icon.svg" 
          alt="DirectlyDrop Logo" 
          className="h-16 w-auto object-contain sm:h-12 shrink-0" 
        />
        
        <div className="min-w-0">
          <div className="truncate text-base font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-lg">
            DirectlyDrop
          </div>
          <div className="hidden text-sm text-[color:var(--text-muted)] sm:block">
            {t("app.tagline")}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <InstallPWAButton />
        <LanguageToggle />
      </div>
    </header>
  );
}