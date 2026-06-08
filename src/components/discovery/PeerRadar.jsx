import { useEffect } from "react";
import { motion } from "framer-motion";
import { Radar, Wifi, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { triggerTransferHaptics } from "../../lib/utils/vibration";

export function PeerRadar({ identity, remotePeer, connected }) {
  const { t } = useTranslation();

  // Bağlantı sağlandığında telefonu "Zıııt!" diye titreştir
  useEffect(() => {
    if (connected) {
      triggerTransferHaptics();
    }
  }, [connected]);

  return (
    <div className="relative mx-auto flex h-[15.5rem] w-[15.5rem] max-w-full items-center justify-center sm:h-[24rem] sm:w-[24rem]">
      
      {/* Animasyonlu Halkalar: Beklerken Cyan, Bağlanınca Yeşil */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className={`absolute rounded-full border transition-colors duration-700 ${
            connected ? "border-green-400/40" : "border-cyan-300/25"
          }`}
          style={{
            width: `${ring * 34}%`,
            height: `${ring * 34}%`
          }}
          animate={
            connected 
              ? { scale: [1, 1.04, 1], opacity: [0.2, 0.45, 0.2] } // Bağlıyken daha sakin bir "nefes alma" efekti
              : { scale: [0.96, 1.03, 0.96], opacity: [0.3, 0.65, 0.3] } // Ararken radar dalgası
          }
          transition={{ repeat: Infinity, duration: 3 + ring, ease: "easeInOut" }}
        />
      ))}

      {/* Merkezdeki Avatar Kutusu */}
      <motion.div
        animate={{ 
          boxShadow: connected 
            ? "0 0 50px rgba(74,222,128,0.45)" 
            : "0 0 30px rgba(83,224,255,0.2)" 
        }}
        className={`glass-panel relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-[1.75rem] border text-center transition-colors duration-700 sm:h-28 sm:w-28 sm:rounded-[2rem] ${
          connected ? "border-green-400/50 bg-[rgba(20,50,30,0.6)]" : "border-white/10"
        }`}
      >
        {/* İkon Değişimi: Bağlanınca Tik, Beklerken Radar */}
        {connected ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <CheckCircle2 size={28} className="text-green-400 sm:size-[30px]" />
          </motion.div>
        ) : (
          <Radar size={28} className="text-cyan-300 sm:size-[30px]" />
        )}
        
        <span className="mt-2 text-sm font-semibold text-[color:var(--text-primary)]">
          {identity.avatar}
        </span>

        {/* EŞLEŞME ANI ŞOVU: Karşı Tarafın Avatarı Omuzunda Beliriyor */}
        {connected && remotePeer && (
          <motion.div 
            initial={{ opacity: 0, scale: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#06131b] text-lg shadow-xl ring-2 ring-green-400/50 sm:-right-4 sm:-top-4 sm:h-12 sm:w-12 sm:text-xl"
          >
            {remotePeer.avatar}
          </motion.div>
        )}
      </motion.div>

      {/* Üst Etiket (Benim İsmim) */}
      <div className={`absolute left-1/2 top-3 -translate-x-1/2 rounded-2xl border px-3 py-2 text-xs text-[color:var(--text-primary)] shadow-lg backdrop-blur-xl transition-colors duration-700 sm:left-6 sm:top-10 sm:translate-x-0 sm:text-sm ${
        connected ? "border-green-400/20 bg-green-950/40" : "border-white/10 bg-[color:var(--surface-panel)]/80"
      }`}>
        {identity.name}
      </div>

      {/* Alt Etiket (Karşı Tarafın İsmi / Aranıyor Durumu) */}
      <div className={`absolute bottom-4 left-1/2 max-w-[12rem] -translate-x-1/2 rounded-2xl border px-3 py-2 text-center text-xs text-[color:var(--text-primary)] shadow-lg backdrop-blur-xl transition-colors duration-700 sm:bottom-12 sm:left-auto sm:right-4 sm:max-w-none sm:translate-x-0 sm:text-sm ${
        connected ? "border-green-400/50 bg-green-900/40" : "border-white/10 bg-[color:var(--surface-panel)]/80"
      }`}>
        {remotePeer ? (
          <span className="flex items-center gap-2 font-medium text-green-50">
            {remotePeer.name}
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 text-[color:var(--text-muted)]">
            <Wifi size={14} className="animate-pulse" />
            {t("radar.waiting")}
          </span>
        )}
      </div>
    </div>
  );
}