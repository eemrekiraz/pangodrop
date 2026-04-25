import { useMemo, useState } from "react";
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
import { useEffect } from "react";
import { LegalPages } from "../components/seo/LegalPages";

export default function App() {
  const { t } = useTranslation();
  const rtc = useWebRTC();
  const [activeFile, setActiveFile] = useState(null);

  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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

  if (currentHash === "#gizlilik" || currentHash === "#kosullar") {
    const type = currentHash === "#gizlilik" ? "gizlilik" : "kosullar";
    return (
      <div className="min-h-screen bg-[#06131b]">
        <AppShell>
          <LegalPages type={type} />
        </AppShell>
      </div>
    );
  }           

  return (
    <>
      {/* MOBİL GÖRÜNÜM */}
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
              {/* MOBİL İÇİN YENİ EKLENEN İÇERİK VE FOOTER */}
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

        {/* Mobil AdSense Anchor (Yapışkan Alt Reklam) - Yüksek Gelir Alanı */}
        <div className="w-full bg-white/5 border-t border-white/10 sticky bottom-0 z-50 flex items-center justify-center p-2 min-h-[60px]">
          <span className="text-xs text-slate-500">[AdSense Mobile Bottom Anchor]</span>
        </div>
      </div>

      {/* MASAÜSTÜ GÖRÜNÜM */}
      <div className="hidden md:block bg-[#06131b] min-h-screen">
        <AppShell>
          <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-4 pb-6 pt-4 sm:px-6 sm:pt-6 lg:px-8">
            
            {/* Üst Kısım: Radar ve Transfer */}
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

              {/* Masaüstü AdSense Banner - Radar Altı / Butonlardan Uzak Güvenli Bölge */}
              <div className="w-full max-w-3xl mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-4 min-h-[90px] shadow-lg">
                <span className="text-xs text-slate-500">[AdSense Desktop Horizontal Banner]</span>
              </div>

              <TransferPanel
                activeFile={activeFile}
                connectionState={rtc.connectionState}
                transfer={rtc.transfer}
                remotePeer={rtc.remotePeer}
                onPickFile={setActiveFile}
                onSendFile={handleSendFile}
              />
              
              {/* MASAÜSTÜ İÇİN YENİ EKLENEN İÇERİK VE FOOTER */}
              <LandingContent />
              <Footer />
            </div>

          </div>
        </AppShell>
      </div>
    </>
  );
}