import { Download } from "lucide-react";
import { usePWA } from "../../hooks/usePWA";

export function InstallPWAButton() {
  const { installPrompt, isInstalled, installApp } = usePWA();

  // Eğer uygulama zaten yüklüyse veya tarayıcı henüz "yüklenebilir" demediyse butonu gösterme
  if (isInstalled || !installPrompt) return null;

  return (
    <button
      onClick={installApp}
      className="flex items-center gap-2 rounded-xl bg-cyan-300/10 px-3 py-2 text-sm font-medium text-cyan-200 transition-all hover:bg-cyan-300/20 active:scale-95"
    >
      <Download size={18} />
      <span className="hidden sm:inline">Uygulamayı İndir</span>
    </button>
  );
}