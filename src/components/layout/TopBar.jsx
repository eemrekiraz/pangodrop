import { useTranslation } from "react-i18next";
import { LanguageToggle } from "../common/LanguageToggle";
import { InstallPWAButton } from "../common/InstallPWAButton";
import { Link } from "../seo/Link";

export function TopBar() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-30 mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4 lg:px-8">
      <div className="min-w-0 flex items-center gap-3">
        <a href="/" className="shrink-0" aria-label="DirectlyDrop ana sayfa">
          <img
            src="/directlydrop-icon.svg"
            alt="DirectlyDrop Logo"
            className="h-16 w-auto object-contain sm:h-12"
          />
        </a>

        <div className="min-w-0">
          <a href="/" className="truncate text-base font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-lg">
            DirectlyDrop
          </a>
          <div className="hidden text-sm text-[color:var(--text-muted)] sm:block">
            {t("app.tagline")}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <nav className="hidden items-center gap-4 text-sm text-[color:var(--text-muted)] lg:flex">
          <Link href="/rehber" className="text-[color:var(--text-muted)] hover:text-cyan-300">Rehber</Link>
          <Link href="/webrtc-nedir" className="text-[color:var(--text-muted)] hover:text-cyan-300">WebRTC</Link>
          <Link href="/sss" className="text-[color:var(--text-muted)] hover:text-cyan-300">SSS</Link>
        </nav>
        <InstallPWAButton />
        <LanguageToggle />
      </div>
    </header>
  );
}
