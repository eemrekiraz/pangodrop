import { Download } from "lucide-react";
import { usePWA } from "../../hooks/usePWA";
import { useTranslation } from "react-i18next";

export function InstallPWAButton() {
  const { installPrompt, isInstalled, installApp } = usePWA();
  const { t } = useTranslation();

  // Yüklüyse veya tarayıcı desteklemiyorsa butonu gizle
  if (isInstalled || !installPrompt) return null;

  return (
    <button
      type="button"
      onClick={installApp}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-3 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/20 sm:h-11 sm:px-4 shadow-[0_0_15px_rgba(0,229,255,0.1)]"
    >
      <Download size={16} />
      <span className="hidden sm:inline">Uygulamayı Yükle</span>
    </button>
  );
}