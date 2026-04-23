import { motion } from "framer-motion";
import { Radar, Wifi } from "lucide-react";
import { useTranslation } from "react-i18next";

export function PeerRadar({ identity, remotePeer, connected }) {
  const { t } = useTranslation();

  return (
    <div className="relative mx-auto flex h-[15.5rem] w-[15.5rem] max-w-full items-center justify-center sm:h-[24rem] sm:w-[24rem]">
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-cyan-300/25"
          style={{
            width: `${ring * 34}%`,
            height: `${ring * 34}%`
          }}
          animate={{ scale: [0.96, 1.03, 0.96], opacity: [0.3, 0.65, 0.3] }}
          transition={{ repeat: Infinity, duration: 3 + ring, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        animate={{ boxShadow: connected ? "0 0 50px rgba(83,224,255,0.45)" : "0 0 30px rgba(83,224,255,0.2)" }}
        className="glass-panel relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-[1.75rem] border border-white/10 text-center sm:h-28 sm:w-28 sm:rounded-[2rem]"
      >
        <Radar size={28} className="text-cyan-300 sm:size-[30px]" />
        <span className="mt-2 text-sm font-semibold text-[color:var(--text-primary)]">{identity.avatar}</span>
      </motion.div>

      <div className="absolute left-1/2 top-3 -translate-x-1/2 rounded-2xl border border-white/10 bg-[color:var(--surface-panel)]/80 px-3 py-2 text-xs text-[color:var(--text-primary)] shadow-lg backdrop-blur-xl sm:left-6 sm:top-10 sm:translate-x-0 sm:text-sm">
        {identity.name}
      </div>

      <div className="absolute bottom-4 left-1/2 max-w-[12rem] -translate-x-1/2 rounded-2xl border border-white/10 bg-[color:var(--surface-panel)]/80 px-3 py-2 text-center text-xs text-[color:var(--text-primary)] shadow-lg backdrop-blur-xl sm:bottom-12 sm:left-auto sm:right-4 sm:max-w-none sm:translate-x-0 sm:text-sm">
        {remotePeer ? (
          remotePeer.name
        ) : (
          <span className="inline-flex items-center gap-2 text-[color:var(--text-muted)]">
            <Wifi size={14} />
            {t("radar.waiting")}
          </span>
        )}
      </div>
    </div>
  );
}
