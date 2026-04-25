import { useTranslation } from "react-i18next";
import { AdSlot } from "./AdSlot";

export function InlineAd() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-[300px] mx-auto my-6">
      <AdSlot 
        label={t("ads.bottom")} 
        format="rectangle"
        className="min-h-[250px] rounded-2xl" 
        slotId="6077739635"
      />
    </div>
  );
}