import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode";
import { BottomSheet } from "../common/BottomSheet";

export function QrConnectSheet({ open, shareLink, onClose }) {
  const { t } = useTranslation();
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open || !shareLink) {
      return;
    }

    QRCode.toDataURL(shareLink, {
      margin: 1,
      width: 240,
      color: {
        dark: "#dff8ff",
        light: "#08141b"
      }
    }).then(setQrDataUrl);
  }, [open, shareLink]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <BottomSheet open={open} title={t("qr.title")} onClose={onClose}>
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-[2rem] border border-white/10 bg-[#08141b] p-4">
          {qrDataUrl ? <img src={qrDataUrl} alt="Share QR" className="h-60 w-60 rounded-2xl" /> : null}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[color:var(--text-primary)]"
        >
          <Copy size={16} />
          {copied ? t("actions.copied") : t("qr.copyLink")}
        </button>
        <p className="text-center text-sm text-[color:var(--text-muted)]">
          {t("qr.helper")}
        </p>
      </div>
    </BottomSheet>
  );
}
