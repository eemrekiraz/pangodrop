import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppShell } from "../components/layout/AppShell";
import { RadarScreen } from "../components/discovery/RadarScreen";
import { TransferPanel } from "../components/transfer/TransferPanel";
import { MobileHomeScreen } from "../components/mobile/MobileHomeScreen";
import { MobileTransferScreen } from "../components/mobile/MobileTransferScreen";
import { MobileSuccessScreen } from "../components/mobile/MobileSuccessScreen";
import { useWebRTC } from "../hooks/useWebRTC";

export default function App() {
  const { t } = useTranslation();
  const rtc = useWebRTC();
  const [activeFile, setActiveFile] = useState(null);

  const summary = useMemo(
    () => ({
      fileName: rtc.transfer.fileName || activeFile?.name || t("transfer.emptyTitle"),
      totalBytes: rtc.transfer.totalBytes || activeFile?.size || 0,
      peerName: rtc.remotePeer?.name || t("transfer.unknownPeer")
    }),
    [activeFile?.name, activeFile?.size, rtc.remotePeer?.name, rtc.transfer.fileName, rtc.transfer.totalBytes, t]
  );

  const handleSendFile = async (file) => {
    setActiveFile(file);
    await rtc.sendFile(file);
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

  return (
    <>
      <div className="md:hidden">
        {mobileStage === "home" ? (
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

      <div className="hidden md:block">
        <AppShell>
          <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 pb-12 pt-4 sm:gap-8 sm:px-6 sm:pb-16 sm:pt-6 lg:px-8 lg:pb-20">
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
          </div>
        </AppShell>
      </div>
    </>
  );
}
