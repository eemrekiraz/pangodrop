import { useState } from "react";
import { QrCode, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AdSlot } from "../ads/AdSlot";
import { LanguageToggle } from "../common/LanguageToggle";
import { SitePolicyNotice } from "../common/SitePolicyNotice";
import { PeerCard } from "../discovery/PeerCard";
import { QrConnectSheet } from "../discovery/QrConnectSheet";
import { formatBytes } from "../../lib/utils/formatBytes";
import { formatSpeed } from "../../lib/utils/formatSpeed";
import { formatTime } from "../../lib/utils/formatTime";
import { TransferStats } from "../transfer/TransferStats";

export function MobileTransferScreen({
  remotePeer,
  transfer,
  shareLink,
  onCancel
}) {
  const { t } = useTranslation();
  const isSending = transfer.phase === "sending";
  const topLabel = isSending ? t("mobile.myDevice") : remotePeer?.name || t("transfer.unknownPeer");
  const bottomLabel = isSending ? remotePeer?.name || t("transfer.unknownPeer") : t("mobile.myDevice");
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="relative min-h-[max(884px,100dvh)] overflow-hidden bg-[color:var(--surface-base)] text-[color:var(--text-primary)] md:hidden">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[80px]" />
      </div>

      <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-white/10 bg-slate-950/50 px-6 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-2">
          <LanguageToggle />
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold tracking-tight text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.45)]">
            GlobeDrop
          </h1>
          <div className="mt-0.5 flex items-center gap-1 rounded-full bg-cyan-400/20 px-2 py-0.5 ring-1 ring-cyan-400/50">
            <div className="h-2 w-2 rounded-full bg-cyan-200" />
            <span className="text-[10px] font-medium text-cyan-200">{t("mobile.secureTunnel")}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400"
        >
          <QrCode size={18} />
        </button>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-4 pb-32 pt-24">
        <div className="relative flex flex-col items-center justify-center py-8">
          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-[rgba(32,31,31,0.4)] backdrop-blur-[20px] ring-1 ring-cyan-400/20">
            <div className="h-5 w-3 rounded-[0.35rem] border-2 border-white/80" />
            <div className="absolute -bottom-2 right-0 rounded bg-[rgba(32,31,31,0.95)] px-1.5 py-0.5 ring-1 ring-white/10">
              <span className="text-[10px] text-[color:var(--text-muted)]">{topLabel}</span>
            </div>
          </div>

          <div className="my-2 h-24 w-1 overflow-hidden rounded-full bg-[rgba(53,53,52,0.8)]">
            <div className="relative h-full w-full bg-gradient-to-b from-cyan-400 via-fuchsia-400 to-cyan-400 opacity-80">
              <div className="absolute left-1/2 top-1/4 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-100 shadow-[0_0_8px_rgba(195,245,255,0.85)]" />
              <div className="absolute left-1/2 top-3/4 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-100 shadow-[0_0_8px_rgba(195,245,255,0.85)]" />
            </div>
          </div>

          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-[rgba(32,31,31,0.4)] backdrop-blur-[20px] ring-1 ring-cyan-400/20">
            <div className="h-4 w-5 rounded-sm border-2 border-cyan-300" />
            <div className="absolute -top-2 left-0 rounded bg-[rgba(32,31,31,0.95)] px-1.5 py-0.5 ring-1 ring-white/10">
              <span className="text-[10px] text-[color:var(--text-muted)]">{bottomLabel}</span>
            </div>
          </div>
        </div>

        <div className="relative mb-6 overflow-hidden rounded-xl border-t border-white/10 bg-[rgba(32,31,31,0.4)] p-4 backdrop-blur-[20px]">
          <div className="absolute inset-0 translate-x-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          <div className="relative flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-[rgba(42,42,42,0.9)] text-cyan-400">
              <div className="h-5 w-4 rounded-sm border-2 border-current" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-semibold text-[color:var(--text-primary)]">{transfer.fileName}</h3>
              <p className="text-sm text-[color:var(--text-muted)]">{formatBytes(transfer.totalBytes)}</p>
            </div>

            <div className="text-right">
              <span className="block text-xs font-semibold text-cyan-400">{formatSpeed(transfer.speedBytesPerSecond)}</span>
              <span className="text-[11px] text-[color:var(--text-muted)]">{formatTime(transfer.remainingSeconds)}</span>
            </div>
          </div>

          <div className="relative pt-4">
            <div className="mb-2 flex justify-between text-[11px]">
              <span className="text-cyan-400">{Math.round(transfer.percent)}%</span>
              <span className="text-[color:var(--text-muted)]">
                {formatBytes(transfer.transferredBytes)} / {formatBytes(transfer.totalBytes)}
              </span>
            </div>

            <div className="h-1 w-full overflow-hidden rounded-full bg-[rgba(53,53,52,0.8)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 shadow-[0_0_10px_rgba(0,229,255,0.45)]"
                style={{ width: `${Math.min(transfer.percent, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <TransferStats transfer={transfer} />
        </div>

        <div className="mb-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-4">
          <div className="mb-3 text-xs uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
            {remotePeer ? t("radar.connected", { name: remotePeer.name }) : t("radar.waiting")}
          </div>
          <PeerCard peer={remotePeer} />
        </div>

        <div className="mb-6">
          <AdSlot label={t("mobile.advertisement")} compact className="h-14" />
        </div>

        <div className="mb-6">
          <SitePolicyNotice compact />
        </div>

        <div className="mt-auto">
          <div className="rounded-2xl border-t border-white/10 bg-[rgba(32,31,31,0.4)] p-4 backdrop-blur-[20px]">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-950/30 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-red-300 ring-1 ring-red-500/20"
              >
                <XCircle size={18} />
                {t("mobile.cancelTransfer")}
              </button>
            </div>
          </div>
        </div>
      </main>
      <QrConnectSheet open={sheetOpen} shareLink={shareLink} onClose={() => setSheetOpen(false)} />
    </div>
  );
}
