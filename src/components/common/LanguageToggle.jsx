import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  return (
    <button
      type="button"
      onClick={() => i18n.changeLanguage(i18n.language.startsWith("tr") ? "en" : "tr")}
      className="inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2.5 text-sm text-[color:var(--text-primary)] transition hover:bg-white/10 sm:h-11 sm:min-w-11 sm:px-3"
      aria-label="Toggle language"
    >
      <Languages size={16} />
      <span className="text-xs font-semibold">{i18n.language.startsWith("tr") ? "TR" : "EN"}</span>
    </button>
  );
}
