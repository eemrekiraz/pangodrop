import { motion } from "framer-motion";

export function ProgressBar({ percent }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-white/8">
      <motion.div
        className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-2))]"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(percent, 100)}%` }}
        transition={{ type: "spring", damping: 24, stiffness: 140 }}
      />
    </div>
  );
}
