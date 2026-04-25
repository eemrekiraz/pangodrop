import { useTranslation } from "react-i18next";
import { AdSlot } from "./AdSlot";

export function VerticalAd({ position }) {
  const { t } = useTranslation();
  // Sağ ve sol kenarlara sabitleme ayarı
  const positionClass = position === "left" ? "left-4" : "right-4";
  
  return (
    <div className={`hidden 2xl:block fixed top-1/2 -translate-y-1/2 ${positionClass} w-[160px] h-[600px] z-20`}>
      <AdSlot 
        label={t("ads.interstitial")} 
        format="vertical"
        className="h-full w-full rounded-2xl" 
        slotId="7031728650"
      />
    </div>
  );
}