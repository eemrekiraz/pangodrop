import { BottomAnchorAd } from "../ads/BottomAnchorAd";
import { MobileNav } from "./MobileNav";
import { TopBar } from "./TopBar";

export function AppShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[color:var(--surface-base)] text-[color:var(--text-primary)]">
      <div className="mesh-background pointer-events-none absolute inset-0 opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(83,224,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(141,127,255,0.12),transparent_24%)]" />
      <div className="relative z-10 pb-[max(6rem,env(safe-area-inset-bottom))] md:pb-8">
        <TopBar />
        <div className="mx-auto flex w-full max-w-7xl flex-col">
          {children}
          <div className="grid gap-6 px-4 pb-10 sm:px-6 lg:px-8">
            <BottomAnchorAd />
            {/* Eski Reklam ve Gizlilik kutusu buradan silindi! */}
          </div>
        </div>
        <MobileNav />
      </div>
    </div>
  );
}