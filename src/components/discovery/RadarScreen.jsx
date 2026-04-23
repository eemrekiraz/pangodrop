import { useState } from "react";
import { QrCode, SendHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { RadarAd } from "../ads/RadarAd";
import { GlassCard } from "../common/GlassCard";
import { PeerRadar } from "./PeerRadar";
import { RoomCodePanel } from "./RoomCodePanel";
import { PeerCard } from "./PeerCard";
import { QrConnectSheet } from "./QrConnectSheet";

export function RadarScreen({
  identity,
  roomCode,
  peerId,
  shareLink,
  remotePeer,
  connectionState,
  onConnect
}) {
  const { t } = useTranslation();
  const [manualCode, setManualCode] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const canConnect = manualCode.trim().length > 0;

  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <GlassCard className="relative overflow-hidden rounded-[1.75rem] p-4 sm:rounded-[2rem] sm:p-8">
        <div className="mb-5 max-w-xl sm:mb-6">
          <div className="mb-3 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-cyan-200 sm:text-xs">
            GlobeDrop Radar
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-5xl">
            {t("radar.title")}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--text-muted)] sm:text-base">
            {t("radar.subtitle")}
          </p>
        </div>

        <PeerRadar
          identity={identity}
          remotePeer={remotePeer}
          connected={connectionState === "connected"}
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <input
            value={manualCode}
            onChange={(event) => setManualCode(event.target.value)}
            placeholder={t("radar.placeholder")}
            className="h-14 rounded-2xl border border-white/10 bg-white/5 px-4 text-[color:var(--text-primary)] outline-none transition placeholder:text-[color:var(--text-muted)] focus:border-cyan-300/40"
          />

          <div className="grid grid-cols-2 gap-3 sm:contents">
            <button
              type="button"
              onClick={() => onConnect(manualCode)}
              disabled={!canConnect}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[color:var(--accent)] px-4 font-medium text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
            >
              <SendHorizontal size={18} />
              {t("radar.cta")}
            </button>

            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 font-medium text-[color:var(--text-primary)] transition hover:bg-white/10 sm:px-5"
            >
              <QrCode size={18} />
              QR
            </button>
          </div>
        </div>

        <p className="mt-4 text-sm text-[color:var(--text-muted)]">{t("radar.discoveryHint")}</p>
      </GlassCard>

      <div className="grid content-start gap-6">
        <RoomCodePanel roomCode={roomCode} peerId={peerId} shareLink={shareLink} />
        <GlassCard className="rounded-[2rem] p-5">
          <div className="mb-3 text-xs uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
            {connectionState === "connected" ? t("radar.connected", { name: remotePeer?.name }) : t("radar.waiting")}
          </div>
          <PeerCard peer={remotePeer} />
        </GlassCard>
        <RadarAd />
      </div>

      <QrConnectSheet open={sheetOpen} shareLink={shareLink} onClose={() => setSheetOpen(false)} />
    </section>
  );
}
