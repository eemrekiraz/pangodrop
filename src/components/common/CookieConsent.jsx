import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function CookieConsent() {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("directlydrop_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("directlydrop_cookie_consent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-cyan-400/20 bg-[#06131b]/95 px-4 py-4 backdrop-blur-md sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-[color:var(--text-muted)] sm:text-sm text-center sm:text-left">
          {/* Zaten policy.cookies altında çerez metnin var, onu kullanıyoruz */}
          {t("policy.cookies")}
        </p>
        <button
          onClick={handleAccept}
          className="whitespace-nowrap rounded-full bg-cyan-400 px-6 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          {i18n.language === "tr" ? "Anladım ve Kabul Ediyorum" : "I Understand & Accept"}
        </button>
      </div>
    </div>
  );
}