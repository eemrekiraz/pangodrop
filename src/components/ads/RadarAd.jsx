import { useTranslation } from "react-i18next";
import { AdSlot } from "./AdSlot";

export function RadarAd() {
  const { t } = useTranslation();

  return <AdSlot label={t("ads.radar")} className="min-h-24 rounded-[1.75rem]" />;
}
