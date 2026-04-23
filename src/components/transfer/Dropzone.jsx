import { useRef, useState } from "react";
import { FileUp, UploadCloud } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Dropzone({ disabled, onPickFile, onSendFile }) {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (nextFile) => {
    if (!nextFile) {
      return;
    }

    setFile(nextFile);
    onPickFile(nextFile);
  };

  return (
    <div className="grid gap-4">
      <button
        type="button"
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          handleFile(event.dataTransfer.files?.[0]);
        }}
        onClick={() => inputRef.current?.click()}
        className={`group flex min-h-60 flex-col items-center justify-center rounded-[1.75rem] border border-dashed p-5 text-center transition sm:min-h-72 sm:rounded-[2rem] sm:p-8 ${
          dragging
            ? "border-cyan-300/60 bg-cyan-300/10"
            : "border-white/10 bg-white/5 hover:bg-white/10"
        }`}
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-cyan-300/10 text-cyan-200 sm:mb-5 sm:h-20 sm:w-20 sm:rounded-[1.75rem]">
          {dragging ? <UploadCloud size={28} /> : <FileUp size={28} />}
        </div>
        <h3 className="text-xl font-semibold text-[color:var(--text-primary)] sm:text-2xl">{t("dropzone.title")}</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-[color:var(--text-muted)]">{t("dropzone.subtitle")}</p>
        <p className="mt-4 text-xs uppercase tracking-[0.24em] text-[color:var(--text-muted)]">{t("dropzone.hint")}</p>
      </button>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      <div className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="truncate text-sm text-[color:var(--text-muted)]">{file?.name || t("dropzone.none")}</div>
          <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
            {disabled ? t("dropzone.connectFirst") : t("dropzone.connectionReady")}
          </div>
        </div>
        <button
          type="button"
          disabled={!file || disabled}
          onClick={() => onSendFile(file)}
          className="w-full rounded-2xl bg-[color:var(--accent)] px-4 py-3 font-medium text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {t("dropzone.send")}
        </button>
      </div>
    </div>
  );
}
