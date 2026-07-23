import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppShell } from "../components/layout/AppShell";
import { RadarScreen } from "../components/discovery/RadarScreen";
import { TransferPanel } from "../components/transfer/TransferPanel";
import { MobileHomeScreen } from "../components/mobile/MobileHomeScreen";
import { MobileTransferScreen } from "../components/mobile/MobileTransferScreen";
import { MobileSuccessScreen } from "../components/mobile/MobileSuccessScreen";
import { useWebRTC } from "../hooks/useWebRTC";
import { LandingContent } from "../components/seo/LandingContent";
import { Footer } from "../components/layout/Footer";
import { LegalPages } from "../components/seo/LegalPages";
import { ContentPages } from "../components/seo/ContentPages";
import { CookieConsent } from "../components/common/CookieConsent";

const legalPaths = new Set(["/gizlilik", "/kullanim-kosullari"]);
const contentPaths = new Set([
  "/rehber",
  "/webrtc-nedir",
  "/guvenli-dosya-transferi",
  "/buyuk-dosya-gonderme",
  "/sss"
]);

export default function App() {
  const { t } = useTranslation();
  const rtc = useWebRTC();
  const [activeFile, setActiveFile] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const summary = useMemo(
    () => ({
      fileName: rtc.transfer.fileName || activeFile?.name || t("transfer.emptyTitle"),
      totalBytes: rtc.transfer.totalBytes || activeFile?.size || 0,
      peerName: rtc.remotePeer?.name || t("transfer.unknownPeer")
    }),
    [activeFile?.name, activeFile?.size, rtc.remotePeer?.name, rtc.transfer.fileName, rtc.transfer.totalBytes, t]
  );

  const handleSendFile = async (filesInput) => {
    const filesArray = Array.isArray(filesInput) ? filesInput : [filesInput];
    const filesToSend = filesArray.slice(0, 3);

    if (filesArray.length > 3) {
      alert(t("transfer.maxFilesAlert"));
    }

    setActiveFile(filesToSend[0]);
    await rtc.sendFile(filesToSend);
  };

  const handleCloseTransfer = () => {
    setActiveFile(null);
    rtc.resetTransfer();
  };

  const mobileStage =
    rtc.transfer.phase === "completed"
      ? "success"
      : rtc.transfer.phase === "sending" || rtc.transfer.phase === "receiving"
        ? "transfer"
        : "home";

  if (legalPaths.has(currentPath)) {
    const type = currentPath === "/gizlilik" ? "gizlilik" : "kosullar";
    return (
      <div className="min-h-screen bg-[#06131b]">
        <AppShell>
          <LegalPages type={type} />
        </AppShell>
        <CookieConsent />
      </div>
    );
  }

  if (contentPaths.has(currentPath)) {
    return (
      <div className="min-h-screen bg-[#06131b]">
        <AppShell>
          <ContentPages path={currentPath} />
          <Footer />
        </AppShell>
        <CookieConsent />
      </div>
    );
  }

  return (
    <>
      <div className="md:hidden flex flex-col min-h-[100dvh] bg-[#06131b]">
        <div className="flex-1">
          {mobileStage === "home" ? (
            <>
              <MobileHomeScreen
                identity={rtc.identity}
                roomCode={rtc.roomCode}
                peerId={rtc.peerId}
                remotePeer={rtc.remotePeer}
                connectionState={rtc.connectionState}
                shareLink={rtc.shareLink}
                onConnect={rtc.connectToPeer}
                onSendFile={handleSendFile}
              />
              <LandingContent />
              <Footer />
            </>
          ) : null}

          {mobileStage === "transfer" ? (
            <MobileTransferScreen
              remotePeer={rtc.remotePeer}
              transfer={rtc.transfer}
              shareLink={rtc.shareLink}
              onCancel={() => {
                rtc.cancelTransfer();
                setActiveFile(null);
              }}
            />
          ) : null}

          {mobileStage === "success" ? (
            <MobileSuccessScreen
              summary={summary}
              onClose={handleCloseTransfer}
            />
          ) : null}
        </div>
      </div>

      <div className="hidden md:block bg-[#06131b] min-h-screen">
        <AppShell>
          <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-4 pb-6 pt-4 sm:px-6 sm:pt-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:gap-8">
              <RadarScreen
                identity={rtc.identity}
                roomCode={rtc.roomCode}
                peerId={rtc.peerId}
                remotePeer={rtc.remotePeer}
                connectionState={rtc.connectionState}
                shareLink={rtc.shareLink}
                onConnect={rtc.connectToPeer}
              />

              <TransferPanel
                activeFile={activeFile}
                connectionState={rtc.connectionState}
                transfer={rtc.transfer}
                remotePeer={rtc.remotePeer}
                onPickFile={setActiveFile}
                onSendFile={handleSendFile}
              />

              <LandingContent />
              <Footer />
            </div>
          </div>
        </AppShell>
      </div>

      <CookieConsent />
    </>
  );
}
