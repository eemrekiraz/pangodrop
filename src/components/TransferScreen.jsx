import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { UploadCloud, File, CheckCircle, X } from "lucide-react";

export default function TransferScreen({ transfer, sendFile, cancelTransfer }) {
  // Sürükle bırak (Drag & Drop) işlemleri için
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) sendFile(file);
    },
    [sendFile]
  );

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto space-y-8 mt-10">
      
      {/* 1. DURUM: Bekleme (Dosya Bırakma Alanı) */}
      {transfer.phase === "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex flex-col items-center justify-center w-full h-64 p-8 transition-all border-2 border-dashed rounded-3xl bg-white/5 border-blue-500/50 hover:bg-blue-500/10 hover:border-blue-400 backdrop-blur-xl cursor-pointer"
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={(e) => {
              if (e.target.files[0]) sendFile(e.target.files[0]);
            }}
          />
          <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
            <div className="p-4 mb-4 rounded-full bg-blue-500/20 text-blue-400">
              <UploadCloud size={40} />
            </div>
            <h3 className="text-xl font-bold text-white">Dosyayı Buraya Bırak</h3>
            <p className="mt-2 text-sm text-slate-400">veya seçmek için tıkla</p>
          </label>
        </motion.div>
      )}

      {/* 2. DURUM: Gönderiliyor / Alınıyor (İlerleme Çubuğu) */}
      {(transfer.phase === "sending" || transfer.phase === "receiving") && (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full p-6 shadow-2xl bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <File className="text-blue-400" size={24} />
              <div>
                <p className="font-medium text-white truncate max-w-[200px]">{transfer.fileName}</p>
                <p className="text-xs text-slate-400">
                  {transfer.phase === "sending" ? "Gönderiliyor..." : "Alınıyor..."}
                </p>
              </div>
            </div>
            <button onClick={cancelTransfer} className="p-2 text-red-400 transition-colors rounded-full hover:bg-red-400/20">
              <X size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 mb-2 overflow-hidden rounded-full bg-black/40">
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${transfer.percent}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="flex justify-between text-xs font-mono text-slate-300">
            <span>{Math.round(transfer.percent)}%</span>
            <span>{(transfer.speedBytesPerSecond / 1024 / 1024).toFixed(1)} MB/s</span>
            <span>{Math.round(transfer.remainingSeconds)} sn kaldı</span>
          </div>
        </motion.div>
      )}

      {/* 3. DURUM: Tamamlandı */}
      {transfer.phase === "completed" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center w-full p-8 text-center bg-green-500/10 backdrop-blur-xl rounded-3xl border border-green-500/30"
        >
          <CheckCircle className="text-green-400 mb-4" size={60} />
          <h3 className="text-2xl font-bold text-white">Transfer Başarılı!</h3>
          <p className="mt-2 text-green-200/70">{transfer.fileName}</p>
        </motion.div>
      )}
    </div>
  );
}