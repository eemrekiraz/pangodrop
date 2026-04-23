import { useTranslation } from "react-i18next";
import { AdSlot } from "./AdSlot";

export function BottomAnchorAd() {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <AdSlot 
        label={t("ads.bottom")} 
        slotId="1234567890" /* BURAYA ADSENSE'TEN ALDIĞIN ALT REKLAM SLOT KODUNU GİR */
        compact={true} 
        className="mx-auto max-w-4xl" 
      />
    </div>
  );
}