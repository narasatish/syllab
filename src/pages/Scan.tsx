"use client";

import { useState, useRef } from "react";
import { scanAndSolve } from "../lib/api";
import PageHero from "../components/PageHero";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const ACCEPT_ATTR = ".jpg,.jpeg,.png,.webp,.pdf";

interface SolutionRenderBlock {
  type: 'heading' | 'paragraph' | 'list' | 'code' | 'blank';
  content: string;
}

/**
 * Parse markdown-like solution into renderable blocks.
 * Handles: **bold**, headings (#), bullet points (-), code blocks (```), and LaTeX ($...$).
 */
function parseMarkdown(text: string): SolutionRenderBlock[] {
  const lines = text.split('\n');
  const blocks: SolutionRenderBlock[] = [];
  let currentList: string[] = [];
  let inCodeBlock = false;
  let codeContent = '';

  for (const line of lines) {
    const trimmed = line.trim();

    // Code block
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        blocks.push({ type: 'code', content: codeContent.trim() });
        codeContent = '';
        inCodeBlock = false;
      } else {
        if (currentList.length > 0) {
          blocks.push({ type: 'list', content: currentList.join('\n') });
          currentList = [];
        }
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + '\n';
      continue;
    }

    // Heading
    if (trimmed.startsWith('#')) {
      if (currentList.length > 0) {
        blocks.push({ type: 'list', content: currentList.join('\n') });
        currentList = [];
      }
      const title = trimmed.replace(/^#+\s*/, '');
      blocks.push({ type: 'heading', content: title });
      continue;
    }

    // Bullet list
    if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
      const item = trimmed.replace(/^[-•]\s*/, '');
      currentList.push(item);
      continue;
    }

    // Blank line
    if (!trimmed) {
      if (currentList.length > 0) {
        blocks.push({ type: 'list', content: currentList.join('\n') });
        currentList = [];
      }
      blocks.push({ type: 'blank', content: '' });
      continue;
    }

    // Regular paragraph
    if (currentList.length > 0) {
      blocks.push({ type: 'list', content: currentList.join('\n') });
      currentList = [];
    }
    blocks.push({ type: 'paragraph', content: trimmed });
  }

  if (currentList.length > 0) {
    blocks.push({ type: 'list', content: currentList.join('\n') });
  }

  return blocks;
}

/**
 * Render a block with formatted text, LaTeX, and bold support.
 * LaTeX: $...$ for inline, $$...$$ for block.
 */
function renderTextWithFormatting(text: string) {
  // Split by LaTeX delimiters while preserving them
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const inlineLatexRegex = /\$([^$]+)\$/g;

  let match;
  const matches: Array<{ index: number; length: number; content: string; isBlock: boolean }> = [];

  // Find all inline LaTeX
  while ((match = inlineLatexRegex.exec(text)) !== null) {
    matches.push({ index: match.index, length: match[0].length, content: match[1], isBlock: false });
  }

  // Sort by index
  matches.sort((a, b) => a.index - b.index);

  for (const latex of matches) {
    if (latex.index > lastIndex) {
      const segment = text.slice(lastIndex, latex.index);
      parts.push(renderBoldAndText(segment));
    }
    // Render LaTeX in a monospace, slightly emphasized way
    parts.push(
      <code key={`latex-${latex.index}`} className="bg-gray-100 px-1 rounded text-emerald-700 font-medium">
        {latex.content}
      </code>
    );
    lastIndex = latex.index + latex.length;
  }

  if (lastIndex < text.length) {
    parts.push(renderBoldAndText(text.slice(lastIndex)));
  }

  return parts.length > 0 ? parts : renderBoldAndText(text);
}

/**
 * Render bold (**text**) and plain text.
 */
function renderBoldAndText(text: string) {
  const parts: React.ReactNode[] = [];
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={`bold-${match.index}`}>{match[1]}</strong>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

interface PhotoDoubtSolverProps {
  /** If true, omit the hero and embed as a compact component */
  compact?: boolean;
}

export default function PhotoDoubtSolver({ compact = false }: PhotoDoubtSolverProps) {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const isPdf = file?.type === "application/pdf";

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
      const response = await scanAndSolve(filePreview);
      setSolution(response || "");
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
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const solutionBlocks = solution ? parseMarkdown(solution) : [];

  // Example chips for mobile guidance
  const exampleQuestions = [
    "📐 Find the value of x",
    "🧪 Balance this equation",
    "📖 Explain this concept",
  ];

  const content = (
    <div className="flex flex-col gap-6">
      {/* Mobile camera + file upload section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Camera (mobile-first big button) */}
        <button
          onClick={() => cameraInputRef.current?.click()}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500 text-white font-semibold text-sm sm:text-base hover:bg-emerald-600 transition active:scale-95"
        >
          <span className="text-lg">📷</span>
          Take Photo
        </button>

        {/* File upload button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-emerald-500 text-emerald-600 font-semibold text-sm sm:text-base hover:bg-emerald-50 transition active:scale-95"
        >
          <span className="text-lg">📎</span>
          Upload File
        </button>
      </div>

      {/* File inputs (hidden) */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPT_ATTR}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {/* Drag-drop zone (secondary on mobile) */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition cursor-pointer ${
          dragActive
            ? "border-emerald-500 bg-emerald-50"
            : "border-gray-300 hover:border-emerald-400 bg-gray-50"
        }`}
      >
        <p className="text-gray-600 font-medium">Drag & drop here</p>
        <p className="text-gray-400 text-xs">or use the buttons above</p>
      </div>

      {/* File preview */}
      {file && (
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          {isPdf ? (
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500 mt-1">{formatSize(file.size)}</p>
              </div>
              <button
                onClick={reset}
                className="ml-2 px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded-lg transition"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <img
                src={imagePreviewUrl!}
                alt="Uploaded question"
                loading="lazy"
                className="max-h-64 w-full rounded-lg object-contain"
              />
              <button
                onClick={reset}
                className="w-full py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition font-medium"
              >
                Remove & Try Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Solve button */}
      {file && (
        <button
          onClick={handleSolve}
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold transition hover:shadow-lg disabled:opacity-60 active:scale-95"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block animate-spin">⏳</span>
              Reading your question…
            </span>
          ) : (
            "Solve Step-by-Step"
          )}
        </button>
      )}

      {/* Error message */}
      {error && (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Example questions (guidance) */}
      {!file && !solution && (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide px-1">Example questions</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {exampleQuestions.map((example, i) => (
              <div key={i} className="rounded-xl bg-gray-50 px-3 py-2 text-xs text-gray-700 text-center">
                {example}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Solution rendering */}
      {solution && (
        <div className="space-y-1">
          <div className="rounded-2xl bg-white border border-gray-200 p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {solutionBlocks.map((block, i) => {
              if (block.type === 'blank') return null;

              if (block.type === 'heading') {
                return (
                  <h2 key={i} className="text-lg font-bold text-emerald-700 pt-2">
                    {renderTextWithFormatting(block.content)}
                  </h2>
                );
              }

              if (block.type === 'list') {
                const items = block.content.split('\n');
                return (
                  <ul key={i} className="space-y-2 ml-4">
                    {items.map((item, j) => (
                      <li key={j} className="text-gray-800 leading-relaxed list-disc">
                        {renderTextWithFormatting(item)}
                      </li>
                    ))}
                  </ul>
                );
              }

              if (block.type === 'code') {
                return (
                  <pre key={i} className="bg-gray-100 p-4 rounded-lg text-xs sm:text-sm font-mono text-gray-900 overflow-x-auto">
                    {block.content}
                  </pre>
                );
              }

              // paragraph
              return (
                <p key={i} className="text-gray-800 leading-relaxed">
                  {renderTextWithFormatting(block.content)}
                </p>
              );
            })}
          </div>

          {/* "Solve another" reset button */}
          <button
            onClick={reset}
            className="w-full py-2 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition"
          >
            💡 Solve Another Question
          </button>
        </div>
      )}

      {/* No file, no solution: empty state */}
      {!file && !solution && (
        <div className="text-center py-8 space-y-2">
          <p className="text-gray-500 text-sm">
            Stuck on homework? Take a photo and get instant step-by-step solutions!
          </p>
        </div>
      )}
    </div>
  );

  if (compact) {
    return content;
  }

  return (
    <div className="space-y-6">
      <PageHero
        emoji="📸"
        title="Photo Doubt-Solver"
        subtitle="Snap a photo of any question. Get instant step-by-step solutions—completely free, no signup needed."
      />
      {content}
    </div>
  );
}
