import { useEffect } from "react";

export function AdSlot({ label, className = "", compact = false, slotId, format = "auto" }) {
  useEffect(() => {
    // Sadece slotId gönderildiyse AdSense kodunu tetikle
    if (slotId) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense yükleme hatası:", e);
      }
    }
  }, [slotId]);

  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden rounded-[1.25rem] border border-white/8 bg-[color:var(--surface-panel)]/75 text-center text-[color:var(--text-muted)] shadow-[0_14px_36px_rgba(0,0,0,0.2)] backdrop-blur-xl ${
        compact ? "min-h-12" : "min-h-16"
      } ${className}`.trim()}
    >
      {slotId ? (
        // Gerçek Reklam Kodu (Yayına alırken çalışır)
        <ins
          className="adsbygoogle w-full h-full flex items-center justify-center"
          style={{ display: "block" }}
          data-ad-client="pub-4656295367363190" /* KENDİ YAYINCI KODUNU BURAYA YAZ */
          data-ad-slot={6821554676}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        // Geliştirici Modu (Yer Tutucu)
        <span className={`uppercase tracking-[0.28em] px-4 ${compact ? "text-[11px]" : "text-sm"}`}>
          {label}
        </span>
      )}
    </div>
  );
}