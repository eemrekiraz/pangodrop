import { CheckCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AdSlot } from "../ads/AdSlot";
import { formatBytes } from "../../lib/utils/formatBytes";

export function TransferSuccess({ transfer }) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4">
      <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-300/10 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300/15 text-emerald-200">
            <CheckCheck size={22} />
          </div>
          <div className="min-w-0">
            <div className="text-lg font-semibold text-[color:var(--text-primary)]">{t("transfer.completed")}</div>
            <div className="break-all text-sm text-[color:var(--text-muted)]">
              {transfer.fileName} | {formatBytes(transfer.totalBytes)}
            </div>
          </div>
        </div>
      </div>
      <AdSlot label={t("mobile.advertisement")} compact className="h-14" />
    </div>
  );
}
