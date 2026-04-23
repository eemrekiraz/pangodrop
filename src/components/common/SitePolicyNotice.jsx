import { ExternalLink, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

const LINKS = {
  ads: "https://policies.google.com/technologies/ads",
  privacy: "https://policies.google.com/privacy"
};

export function SitePolicyNotice({ compact = false }) {
  const { t } = useTranslation();

  return (
    <details className={`rounded-[1.5rem] border border-white/10 bg-white/5 backdrop-blur-xl ${compact ? "p-4" : "p-5"}`}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200">
            <ShieldCheck size={18} />
          </div>
          <div>
            <div className="font-medium text-[color:var(--text-primary)]">{t("policy.title")}</div>
            <div className="text-sm text-[color:var(--text-muted)]">{t("policy.summary")}</div>
          </div>
        </div>
      </summary>

      <div className="mt-4 grid gap-3 text-sm leading-6 text-[color:var(--text-muted)]">
        <p>{t("policy.cookies")}</p>
        <p>{t("policy.labeling")}</p>
        <p>{t("policy.consent")}</p>
        <p>{t("policy.safety")}</p>

        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href={LINKS.ads}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-2 text-sm text-[color:var(--text-primary)]"
          >
            {t("policy.googleAds")}
            <ExternalLink size={14} />
          </a>
          <a
            href={LINKS.privacy}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-2 text-sm text-[color:var(--text-primary)]"
          >
            {t("policy.googlePrivacy")}
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </details>
  );
}
