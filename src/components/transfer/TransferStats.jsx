import { useTranslation } from "react-i18next";
import { formatBytes } from "../../lib/utils/formatBytes";
import { formatSpeed } from "../../lib/utils/formatSpeed";
import { formatTime } from "../../lib/utils/formatTime";

export function TransferStats({ transfer }) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <StatCard
        label={t("transfer.progress")}
        value={`${Math.round(transfer.percent)}%`}
        detail={`${formatBytes(transfer.transferredBytes)} / ${formatBytes(transfer.totalBytes)}`}
      />
      <StatCard
        label={t("transfer.speed")}
        value={formatSpeed(transfer.speedBytesPerSecond)}
        detail={transfer.phase}
      />
      <StatCard
        label={t("transfer.remaining")}
        value={formatTime(transfer.remainingSeconds)}
        detail={transfer.fileName || "-"}
      />
    </div>
  );
}

function StatCard({ label, value, detail }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-muted)]">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-[color:var(--text-primary)]">{value}</div>
      <div className="mt-2 text-sm text-[color:var(--text-muted)]">{detail}</div>
    </div>
  );
}
