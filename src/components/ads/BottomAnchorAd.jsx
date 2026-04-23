import { useTranslation } from "react-i18next";
import { AdSlot } from "./AdSlot";

export function BottomAnchorAd() {
  const { t } = useTranslation();

  return (
    <div className="hidden md:block">
      <AdSlot label={t("ads.bottom")} className="mx-auto mt-10 max-w-4xl" />
    </div>
  );
}
