import { useMemo, useRef, useState } from "react";
import { QrCode, ScanLine, SendHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { AdSlot } from "../ads/AdSlot";
import { LanguageToggle } from "../common/LanguageToggle";
import { SitePolicyNotice } from "../common/SitePolicyNotice";
import { PeerCard } from "../discovery/PeerCard";
import { QrConnectSheet } from "../discovery/QrConnectSheet";
import { RoomCodePanel } from "../discovery/RoomCodePanel";
import { formatBytes } from "../../lib/utils/formatBytes";
import { generateRoomCode } from "../../lib/peer/roomCode";

function DeviceGlyph({ icon }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[rgba(32,31,31,0.6)] shadow-lg backdrop-blur-md">
      <div
        className={`h-5 w-5 ${icon === "laptop" ? "rounded-sm border-2 border-cyan-300" : "rounded-[0.4rem] border-2 border-cyan-300"}`}
      />
    </div>
  );
}

function RoomDigit({ value, onChange, onKeyDown, inputRef }) {
  return (
    <input
      ref={inputRef}
      value={value}
      maxLength={1}
      inputMode="numeric" 
      pattern="[0-9]*" 
      placeholder="-"
      onChange={(e) => {
        // Gelen karakterleri sadece rakam olacak şekilde temizle
        const val = e.target.value.replace(/[^0-9]/g, ''); 
        
        // Ana sayfanın (parent) beklediği formata (event objesi taklidi) çevirerek gönder!
        onChange({ target: { value: val } });
      }}
      onKeyDown={onKeyDown}
      className="h-14 w-12 rounded-none border-0 border-b-2 border-[rgba(132,147,150,0.35)] bg-transparent text-center text-2xl font-semibold text-[color:var(--text-primary)] outline-none transition placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--accent)]"
    />
  );
}

export function MobileHomeScreen({
  identity,
  roomCode,
  peerId,
  remotePeer,
  connectionState,
  shareLink,
  onConnect,
  onSendFile
}) {
  const { t } = useTranslation();
  const [roomDigits, setRoomDigits] = useState(() => Array(6).fill(""));
  const [peerInput, setPeerInput] = useState("");
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const fileInputRef = useRef(null);
  const digitRefs = useRef([]);

  const devices = useMemo(() => {
    if (!remotePeer) {
      return [
        { name: identity.name, label: t("mobile.thisDevice"), icon: "phone" },
        { name: t("peer.emptyTitle"), label: t("radar.waiting"), icon: "laptop" },
        { name: t("radar.roomCode"), label: roomCode, icon: "phone" }
      ];
    }

    return [
      { name: identity.name, label: t("mobile.thisDevice"), icon: "phone" },
      { name: remotePeer.name, label: t("mobile.connectedPeer"), icon: "laptop" },
      { name: t("radar.roomCode"), label: roomCode, icon: "phone" }
    ];
  }, [identity.name, remotePeer, roomCode, t]);

  const connectValue = peerInput.trim() || roomDigits.join("");
  const sheetY = isSheetExpanded ? 0 : 232; 
  const canConnect = connectValue.trim().length > 0;

  const handleDigitChange = (index, nextValue) => {
    const cleanValue = nextValue.slice(-1).toUpperCase();
    setRoomDigits((current) => {
      const nextDigits = [...current];
      nextDigits[index] = cleanValue;
      return nextDigits;
    });

    if (cleanValue && index < digitRefs.current.length - 1) {
      digitRefs.current[index + 1]?.focus();
    }
  };

  const handleDigitKeyDown = (index, event) => {
    if (event.key === "Backspace" && !roomDigits[index] && index > 0) {
      digitRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="relative min-h-[max(884px,100dvh)] overflow-hidden bg-[color:var(--surface-base)] text-[color:var(--text-primary)] md:hidden">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-transparent px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10">
            <div className="h-3.5 w-3.5 rounded-full border-2 border-cyan-400" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-cyan-400">DirectlyDrop</h1>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
        </div>
      </header>

      <main className="relative flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden pb-48 pt-10">
        
        <section className="relative flex flex-1 items-center justify-center px-4">
          <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-20">
            <div className="absolute h-64 w-64 rounded-full border border-cyan-400" />
            <div className="absolute h-96 w-96 rounded-full border border-cyan-400" />
            <div className="absolute h-[32rem] w-[32rem] rounded-full border border-cyan-400" />
            <div className="absolute h-px w-[150vw] bg-cyan-400" />
            <div className="absolute h-[150vh] w-px bg-cyan-400" />
          </div>

          <motion.div
            animate={{
              scale: [0.95, 1, 0.95],
              boxShadow: [
                "0 0 0 0 rgba(0,229,255,0.35)",
                "0 0 0 20px rgba(0,229,255,0)",
                "0 0 0 0 rgba(0,229,255,0)"
              ]
            }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/50 bg-[rgba(32,31,31,0.8)] shadow-[0_0_24px_rgba(0,229,255,0.15)] backdrop-blur-xl"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] text-lg font-semibold text-slate-950">
              {identity.avatar}
            </div>
          </motion.div>

          <div className="absolute left-[25%] top-[20%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
            <DeviceGlyph icon={devices[0].icon} />
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-[color:var(--text-primary)]">{devices[0].name}</span>
              <span className="text-[10px] text-[color:var(--text-muted)]">{devices[0].label}</span>
            </div>
          </div>

          <div className="absolute right-[20%] top-[35%] flex translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
            <DeviceGlyph icon={devices[1].icon} />
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-[color:var(--text-primary)]">{devices[1].name}</span>
              <span className="text-[10px] text-[color:var(--text-muted)]">{devices[1].label}</span>
            </div>
          </div>

          <div className="absolute bottom-[45%] left-[30%] flex -translate-x-1/2 translate-y-1/2 flex-col items-center gap-2">
            <DeviceGlyph icon={devices[2].icon} />
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-[color:var(--text-primary)]">{devices[2].name}</span>
              <span className="text-[10px] text-[color:var(--text-muted)]">{devices[2].label}</span>
            </div>
          </div>
        </section>

        <div className="pointer-events-none fixed bottom-[5.25rem] z-[60] flex w-full flex-col items-center px-4">
          <motion.div
            drag="y"
            dragElastic={0.1}
            dragMomentum={false}
            dragConstraints={{ top: 0, bottom: 232 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 50 || info.velocity.y > 300) {
                setIsSheetExpanded(false);
              } else if (info.offset.y < -50 || info.velocity.y < -300) {
                setIsSheetExpanded(true);
              }
            }}
            animate={{ y: sheetY }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="pointer-events-auto w-full max-w-md rounded-t-[32px] border-x border-t border-white/10 bg-[rgba(32,31,31,0.8)] shadow-[0_-20px_40px_rgba(0,0,0,0.5)] backdrop-blur-[40px]"
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsSheetExpanded((current) => !current)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setIsSheetExpanded((current) => !current);
                }
              }}
              className="flex w-full cursor-grab flex-col items-center px-6 pb-3 pt-4 active:cursor-grabbing"
            >
              <div className="mb-4 h-1 w-12 rounded-full bg-white/20" />
              <div className="flex w-full items-center justify-between">
                <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">{t("mobile.joinRoom")}</h2>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSheetOpen(true);
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400"
                >
                  <QrCode size={18} />
                </button>
              </div>
            </div>

            <div
              className={`overflow-y-auto px-6 pb-6 transition-[max-height] duration-300 ease-out ${
                isSheetExpanded ? "max-h-[58dvh]" : "max-h-[22rem]"
              }`}
            >
              <div className="flex justify-between gap-2 px-2">
                {roomDigits.map((digit, index) => (
                  <RoomDigit
                    key={index}
                    value={digit}
                    inputRef={(element) => {
                      digitRefs.current[index] = element;
                    }}
                    onChange={(event) => handleDigitChange(index, event.target.value)}
                    onKeyDown={(event) => handleDigitKeyDown(index, event)}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => onConnect(connectValue)}
                disabled={!canConnect}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-400/10 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all hover:bg-cyan-400 hover:text-[color:var(--surface-base)] disabled:cursor-not-allowed disabled:opacity-45"
              >
                <SendHorizontal size={16} />
                {connectionState === "connected" && remotePeer ? t("radar.connected", { name: remotePeer.name }) : t("radar.cta")}
              </button>

              <div className="mt-4 rounded-2xl border border-white/5 bg-black/10 px-4 py-3">
                <div className="mb-2 text-[10px] uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
                  {t("radar.roomCode")}
                </div>
                <input
                  value={peerInput}
                  onChange={(event) => setPeerInput(event.target.value)}
                  placeholder={t("radar.placeholder")}
                  className="w-full border-0 bg-transparent p-0 text-sm text-[color:var(--text-primary)] outline-none placeholder:text-[color:var(--text-muted)]"
                />
              </div>

              <p className="mt-3 text-xs leading-5 text-[color:var(--text-muted)]">{t("mobile.peerLinkHint")}</p>

              <div className="mt-4">
                <RoomCodePanel roomCode={roomCode} peerId={peerId} shareLink={shareLink} />
              </div>

              <div className="mt-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-4">
                <div className="mb-3 text-xs uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
                  {connectionState === "connected"
                    ? t("radar.connected", { name: remotePeer?.name })
                    : t("radar.waiting")}
                </div>
                <PeerCard peer={remotePeer} />
              </div>

              {connectionState === "connected" && remotePeer ? (
                <div className="mt-4 rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">
                    {t("mobile.readyToShare", { name: remotePeer.name })}
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm text-[color:var(--text-primary)]">{remotePeer.peerId || shareLink}</div>
                      <div className="text-xs text-[color:var(--text-muted)]">{formatBytes(0)} queued</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-full bg-[color:var(--accent)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950"
                    >
                      {t("mobile.chooseFile")}
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="mt-5">
                <AdSlot
                  label={isSheetExpanded ? t("ads.radar") : t("mobile.advertisement")}
                  compact
                />
              </div>

              {isSheetExpanded ? <div className="mt-5"><SitePolicyNotice compact /></div> : null}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  onSendFile(file);
                }
              }}
            />
          </motion.div>
        </div>
      </main>
      <QrConnectSheet open={sheetOpen} shareLink={shareLink} onClose={() => setSheetOpen(false)} />
    </div>
  );
}