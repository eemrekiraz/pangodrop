import { CheckCircle2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AdSlot } from "../ads/AdSlot";
import { LanguageToggle } from "../common/LanguageToggle";
import { SitePolicyNotice } from "../common/SitePolicyNotice";
import { formatBytes } from "../../lib/utils/formatBytes";

export function MobileSuccessScreen({ summary, onClose }) {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-[max(884px,100dvh)] overflow-x-hidden bg-[color:var(--surface-base)] text-[color:var(--text-primary)] md:hidden">
      <div className="pointer-events-none fixed left-1/2 top-[20%] z-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-emerald-300/15 blur-[100px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 z-0 h-[400px] w-full bg-gradient-to-t from-cyan-300/5 to-transparent" />

      <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-white/10 bg-transparent px-6 backdrop-blur-xl">
        <button type="button" onClick={onClose} className="rounded-full p-2 text-cyan-400 hover:bg-white/5">
          <X size={18} />
        </button>
        <h1 className="text-xl font-bold tracking-[0.14em] text-cyan-400">{t("transfer.completed")}</h1>
        <div className="flex items-center gap-2">
          <LanguageToggle />
        </div>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[500px] flex-col items-center justify-center px-6 pb-8 pt-24">
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute -inset-5 rounded-full bg-emerald-300/10 blur-[20px]" />
          <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-[rgba(42,42,42,0.4)] backdrop-blur-[12px] shadow-[0_0_40px_rgba(107,255,143,0.2)]">
            <CheckCircle2 size={64} className="text-emerald-300" />
          </div>
        </div>

        <h2 className="mb-10 text-center text-[28px] font-semibold tracking-tight text-[color:var(--text-primary)]">
          {t("transfer.completed")}
        </h2>

        <div className="relative mb-10 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.28)] backdrop-blur-[20px]">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="flex flex-col gap-6">
            <div className="flex items-end justify-between gap-4">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
                {t("mobile.fileSent")}
              </span>
              <span className="text-lg font-semibold text-cyan-300 drop-shadow-[0_0_8px_rgba(0,218,243,0.35)]">
                {summary.fileName}
              </span>
            </div>

            <div className="h-px w-full bg-white/10" />

            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
                {t("mobile.recipient")}
              </span>
              <span className="text-sm tracking-[0.18em] text-[color:var(--text-primary)]">
                {summary.peerName}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
                Size
              </span>
              <span className="text-sm tracking-[0.18em] text-[color:var(--text-primary)]">
                {formatBytes(summary.totalBytes)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex w-full flex-col gap-6">
          <button
            type="button"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-cyan-400 bg-white/5 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400 shadow-[inset_0_0_20px_rgba(0,229,255,0.08),0_8px_32px_rgba(0,0,0,0.35)] transition-colors hover:bg-cyan-400/10"
          >
            {t("mobile.closeTransfer")}
          </button>

          <AdSlot label={t("mobile.advertisement")} compact className="h-[60px]" />
          <SitePolicyNotice compact />
        </div>
      </main>
    </div>
  );
}
