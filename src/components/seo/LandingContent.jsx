import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

export function LandingContent() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 text-[color:var(--text-primary)]">
      
      {/* 1. SEO BOTLARI İÇİN YOĞUN METİN ALANI (Makale Formatı) */}
      <article className="mb-16 rounded-2xl border border-white/5 bg-white/5 p-6 shadow-lg backdrop-blur-sm sm:p-8">
        <h2 className="mb-4 text-2xl font-bold text-cyan-400 sm:text-3xl">{t("seo.title")}</h2>
        <p className="mb-4 text-base leading-relaxed text-[color:var(--text-muted)]">{t("seo.p1")}</p>
        <p className="text-base leading-relaxed text-[color:var(--text-muted)]">{t("seo.p2")}</p>
      </article>

      {/* 2. NASIL ÇALIŞIR (Senin Tasarımın) */}
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

      {/* 3. SIKÇA SORULAN SORULAR (Akordiyon - SEO Uyumlu) */}
      <section>
        <h2 className="mb-8 text-center text-2xl font-bold text-cyan-400 sm:text-3xl">{t("seo.faqTitle")}</h2>
        <div className="mx-auto max-w-3xl space-y-4">
          {[1, 2, 3].map((num) => (
            <details key={num} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <summary className="flex cursor-pointer items-center justify-between p-6 text-base font-semibold text-[color:var(--text-primary)] outline-none transition-colors hover:text-cyan-300">
                {t(`seo.faq${num}Q`)}
                <ChevronDown size={20} className="text-cyan-400 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="border-t border-white/5 px-6 pb-6 pt-4 text-sm leading-relaxed text-[color:var(--text-muted)]">
                {t(`seo.faq${num}A`)}
              </div>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
}