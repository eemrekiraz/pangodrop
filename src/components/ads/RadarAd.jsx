import { useTranslation } from "react-i18next";
import { AdSlot } from "./AdSlot";

export function RadarAd() {
  const { t } = useTranslation();

  return (
    <AdSlot 
      label={t("ads.radar")} 
      slotId="0987654321" /* BURAYA RADAR İÇİN ALDIĞIN SLOT KODUNU GİR */
      className="min-h-24 rounded-[1.75rem] mt-6" 
    />
  );
}