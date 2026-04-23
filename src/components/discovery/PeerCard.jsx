import { useTranslation } from "react-i18next";

export function PeerCard({ peer }) {
  const { t } = useTranslation();

  if (!peer) {
    return (
      <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
        <div className="font-medium text-[color:var(--text-primary)]">{t("peer.emptyTitle")}</div>
        <div className="mt-1 text-sm text-[color:var(--text-muted)]">{t("peer.emptyDetail")}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/10 font-semibold text-cyan-200">
        {peer.avatar}
      </div>
      <div className="min-w-0">
        <div className="font-medium text-[color:var(--text-primary)]">{peer.name}</div>
        <div className="break-all text-xs text-[color:var(--text-muted)]">{peer.peerId}</div>
      </div>
    </div>
  );
}
