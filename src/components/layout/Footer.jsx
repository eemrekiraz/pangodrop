import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto border-t border-white/10 bg-black/20 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-cyan-400">DirectlyDrop</h3>
            <p className="mt-1 text-xs text-[color:var(--text-muted)]">{t("footer.description")}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-[color:var(--text-muted)]">
            <a href="#gizlilik" className="hover:text-cyan-400 transition">{t("footer.privacy")}</a>
            <a href="#kosullar" className="hover:text-cyan-400 transition">{t("footer.terms")}</a>
            <a href="mailto:iletisim@directlydrop.com" className="hover:text-cyan-400 transition">{t("footer.contact")}</a>
          </div>

        </div>
        <div className="mt-8 text-center text-xs text-white/30">
          &copy; {new Date().getFullYear()} DirectlyDrop. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}