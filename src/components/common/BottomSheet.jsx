import { AnimatePresence, motion } from "framer-motion";

export function BottomSheet({ open, title, children, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          {/* Arka plan karartması: z-[70] yapılarak ana menünün (z-60) üstüne çıkarıldı */}
          <motion.button
            type="button"
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* QR Penceresinin kendisi: z-[80] yapılarak uygulamanın mutlak hakimi yapıldı */}
          <motion.section
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="fixed inset-x-0 bottom-0 z-[80] rounded-t-[2rem] border border-white/10 bg-[color:var(--surface-panel)] p-5 shadow-2xl"
          >
            <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-white/15" />
            <div className="mb-4 text-lg font-semibold text-[color:var(--text-primary)]">{title}</div>
            {children}
          </motion.section>
        </>
      ) : null}
    </AnimatePresence>
  );
}