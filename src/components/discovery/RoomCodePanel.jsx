import { useState } from "react";
import { Copy, Link2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { GlassCard } from "../common/GlassCard";

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export function RoomCodePanel({ roomCode, shareLink }) {
  const { t } = useTranslation();
  const [copiedField, setCopiedField] = useState("");

  const handleCopy = async (field, value) => {
    const copied = await copyText(value);
    if (!copied) {
      return;
    }

    setCopiedField(field);
    window.setTimeout(() => {
      setCopiedField((current) => (current === field ? "" : current));
    }, 1200);
  };

  return (
    <GlassCard className="grid gap-4 rounded-[2rem] p-5">
      <div className="grid gap-2">
        <div className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
          {t("radar.roomCode")}
        </div>
        <div className="text-2xl font-semibold tracking-[0.28em] text-[color:var(--text-primary)] sm:text-3xl sm:tracking-[0.4em]">
          {roomCode}
        </div>
      </div>

      <div className="grid gap-3 text-sm text-[color:var(--text-muted)]">
        {/* Peer ID kısmı tamamen kaldırıldı. Sadece Paylaşım Linki kaldı. */}
        <div className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
          <div className="min-w-0 flex-1">
            <div className="text-xs uppercase tracking-[0.2em]">{t("radar.shareLink")}</div>
            <div className="break-all leading-5 text-[color:var(--text-primary)]">{shareLink}</div>
          </div>
          <button
            type="button"
            onClick={() => handleCopy("shareLink", shareLink)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10"
            aria-label={t("actions.copy")}
          >
            {copiedField === "shareLink" ? <span className="text-[10px]">{t("actions.copied")}</span> : <Link2 size={16} />}
          </button>
        </div>
      </div>
    </GlassCard>
  );
}