import { useTranslation } from "react-i18next";
import { GlassCard } from "../common/GlassCard";
import { Dropzone } from "./Dropzone";
import { ProgressBar } from "./ProgressBar";
import { TransferStats } from "./TransferStats";
import { TransferSuccess } from "./TransferSuccess";

export function TransferPanel({
  activeFile,
  connectionState,
  remotePeer,
  transfer,
  onPickFile,
  onSendFile
}) {
  const { t } = useTranslation();
  const showProgress = transfer.phase !== "idle";

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <GlassCard className="rounded-[1.75rem] p-4 sm:rounded-[2rem] sm:p-8">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
            {connectionState === "connected"
              ? t("transfer.connectedTo", { name: remotePeer?.name || "peer" })
              : t("transfer.ready")}
          </div>
          <h2 className="mt-2 break-words text-2xl font-semibold text-[color:var(--text-primary)] sm:text-3xl">
            {activeFile?.name || t("dropzone.title")}
          </h2>
        </div>

        <Dropzone
          disabled={connectionState !== "connected"}
          onPickFile={onPickFile}
          onSendFile={onSendFile}
        />
      </GlassCard>

      <div className="grid content-start gap-6">
        <GlassCard className="rounded-[1.75rem] p-4 sm:rounded-[2rem] sm:p-5">
          <TransferStats transfer={transfer} />
          {showProgress ? <div className="mt-5"><ProgressBar percent={transfer.percent} /></div> : null}
          <p className="mt-4 text-sm leading-6 text-[color:var(--text-muted)]">{t("transfer.memoryNote")}</p>
        </GlassCard>

        {transfer.phase === "completed" ? <TransferSuccess transfer={transfer} /> : null}
      </div>
    </section>
  );
}
