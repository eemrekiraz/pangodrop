import React, { useState } from "react";
import { motion } from "framer-motion";
import { Radar, Link as LinkIcon, Smartphone, QrCode, ArrowRight } from "lucide-react";

export default function ConnectionScreen({ 
  identity, 
  roomCode, 
  connectToPeer, 
  connectionState 
}) {
  const [inputValue, setInputValue] = useState("");

  const handleConnect = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      connectToPeer(inputValue);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-12">
      
      {/* --- RADAR BÖLÜMÜ --- */}
      <div className="relative flex items-center justify-center w-64 h-64 mt-10">
        
        {/* Radar Dalgaları (Framer Motion) */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute w-24 h-24 bg-blue-500 rounded-full opacity-20"
            animate={{
              scale: [1, 2.5, 4],
              opacity: [0.4, 0.1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: ring * 1, // Dalgaların peş peşe çıkması için
              ease: "easeOut",
            }}
          />
        ))}

        {/* Merkezdeki Kullanıcı (Sen) */}
        <div className="relative z-10 flex flex-col items-center justify-center w-24 h-24 shadow-2xl bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
          <span className="text-4xl">{identity.avatar}</span>
        </div>

        {/* Cihaz Arama Yazısı */}
        <div className="absolute -bottom-12 flex items-center gap-2 text-blue-300 animate-pulse">
          <Radar size={18} />
          <span className="text-sm font-medium tracking-wider uppercase">Yakındaki Cihazlar Aranıyor...</span>
        </div>
      </div>

      {/* --- KİMLİK VE KOD BÖLÜMÜ --- */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Sen {identity.name}</h2>
        <p className="text-slate-400 text-sm">
          Bağlanmak isteyenler için oda kodun:
        </p>
        <div className="inline-block px-6 py-2 mt-2 text-3xl font-mono font-bold tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          {roomCode || "..."}
        </div>
      </div>

      {/* --- MANUEL BAĞLANTI (GLASSMORPHISM KART) --- */}
      <div className="w-full p-6 space-y-4 shadow-xl bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10">
        <div className="flex items-center gap-2 text-slate-300 mb-2">
          <Smartphone size={18} />
          <h3 className="text-sm font-medium">Uzak bir cihaza bağlan</h3>
        </div>

        <form onSubmit={handleConnect} className="flex gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LinkIcon size={16} className="text-slate-500" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Oda kodu veya link..."
              className="w-full py-3 pl-10 pr-4 text-white placeholder-slate-500 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim() || connectionState === "connecting"}
            className="flex items-center justify-center px-4 py-3 text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {connectionState === "connecting" ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <ArrowRight size={20} />
            )}
          </button>
        </form>

        <button 
          type="button"
          className="flex items-center justify-center w-full gap-2 py-3 text-sm font-medium transition-colors text-slate-300 bg-white/5 rounded-xl hover:bg-white/10 hover:text-white"
        >
          <QrCode size={18} />
          <span>Kamerayla QR Kod Okut</span>
        </button>
      </div>

      {/* --- ADSENSE REKLAM ALANI (Görünmez Yer Tutucu) --- */}
      <div className="w-full h-16 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-600 text-xs">
        [AdSense Radar Banner Area]
      </div>

    </div>
  );
}