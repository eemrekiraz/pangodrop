import { useTranslation } from "react-i18next";

export function LandingContent() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 text-[color:var(--text-primary)]">
      
      {/* NASIL ÇALIŞIR */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-cyan-400 sm:text-3xl">{t("seo.howItWorks")}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((num) => (
            <div key={num} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/20 text-xl font-bold text-cyan-400">
                {num}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{t(`seo.step${num}Title`)}</h3>
              <p className="text-sm leading-relaxed text-[color:var(--text-muted)]">{t(`seo.step${num}Desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ÖZELLİKLER */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-cyan-400 sm:text-3xl">{t("seo.features")}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((num) => (
            <div key={num} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="mb-2 text-lg font-semibold">{t(`seo.feat${num}Title`)}</h3>
              <p className="text-sm leading-relaxed text-[color:var(--text-muted)]">{t(`seo.feat${num}Desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SIKÇA SORULAN SORULAR */}
      <section>
        <h2 className="mb-8 text-center text-2xl font-bold text-cyan-400 sm:text-3xl">{t("seo.faq")}</h2>
        <div className="mx-auto max-w-3xl space-y-4">
          {[1, 2].map((num) => (
            <div key={num} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h4 className="mb-2 text-base font-semibold">{t(`seo.faq${num}Q`)}</h4>
              <p className="text-sm leading-relaxed text-[color:var(--text-muted)]">{t(`seo.faq${num}A`)}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}