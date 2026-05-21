"use client";

import { useState, useRef } from "react";
import { scanAndSolve } from "../lib/api";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const ACCEPT_ATTR = ".jpg,.jpeg,.png,.webp,.pdf";

export default function ScanAndSolve() {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPdf = file?.type === "application/pdf";

  const cleanText = (text: string) =>
    text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/---/g, "")
      .trim();

  const handleFile = (selected: File | undefined) => {
    setError("");
    setSolution("");

    if (!selected) return;
    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setError("Unsupported file. Use JPG, PNG, WEBP, or PDF.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("File too large. Max 10 MB.");
      return;
    }

    setFile(selected);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setFilePreview(dataUrl);
      if (selected.type.startsWith("image/")) {
        setImagePreviewUrl(dataUrl);
      } else {
        setImagePreviewUrl(null);
      }
    };
    reader.readAsDataURL(selected);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  };

  const handleSolve = async () => {
    if (!filePreview) return;
    setLoading(true);
    setError("");
    setSolution("");

    try {
      // ✅ Uses API_URL from api.ts (works locally AND on syllab.in)
      const response = await scanAndSolve(filePreview);
      setSolution(cleanText(response || ""));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setFilePreview(null);
    setImagePreviewUrl(null);
    setSolution("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-5">
      {/* LEFT (20%) */}
      <div className="flex min-w-0 flex-col gap-4 md:col-span-1">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-5 min-h-[260px] flex flex-col items-center justify-center cursor-pointer transition ${
            dragActive
              ? "border-emerald-500 bg-emerald-50"
              : "border-gray-300 hover:border-emerald-400"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT_ATTR}
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />

          {!file ? (
            <>
              <p className="text-emerald-600 font-semibold">Upload</p>
              <p className="text-gray-500 text-xs">JPG · PNG · PDF</p>
            </>
          ) : isPdf ? (
            <div className="text-center text-sm">
              <p className="break-all font-medium">{file.name}</p>
              <p className="text-gray-500">{formatSize(file.size)}</p>
              <button onClick={reset} className="text-red-400 mt-2">Remove</button>
            </div>
          ) : (
            <div className="relative">
              <img src={imagePreviewUrl!} alt="Uploaded question preview" loading="lazy" className="max-h-40 rounded object-contain" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  reset();
                }}
                className="absolute top-1 right-1 bg-white px-2 rounded"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleSolve}
          disabled={!file || loading}
          className="py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Solve"}
        </button>

        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>

      {/* RIGHT (80%) */}
      <div className="min-w-0 rounded-2xl border-2 border-dashed bg-gray-50 p-4 sm:p-6 md:col-span-4 min-h-[260px]">
        {loading ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            Solving...
          </div>
        ) : solution ? (
          <div className="prose max-w-none overflow-x-auto whitespace-pre-wrap break-words text-gray-800 leading-relaxed">
            {solution}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Solution will appear here
          </div>
        )}
      </div>
    </div>
  );
}
