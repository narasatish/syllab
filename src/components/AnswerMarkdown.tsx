/**
 * AnswerMarkdown — renders an AI-generated board answer as clean, colour-coded
 * content (headings, bold, lists, code) instead of raw "###" / "**" markdown.
 * Used by the Important Questions answers.
 */
import Markdown from 'react-markdown';

export default function AnswerMarkdown({ text }: { text: string }) {
  return (
    <div className="text-sm leading-relaxed text-slate-700">
      <Markdown
        components={{
          h1: ({ children }) => <h3 className="mb-1 mt-3 text-base font-black text-emerald-700">{children}</h3>,
          h2: ({ children }) => <h4 className="mb-1 mt-3 text-sm font-black text-indigo-700">{children}</h4>,
          h3: ({ children }) => <h4 className="mb-1 mt-2.5 text-sm font-black text-indigo-600">{children}</h4>,
          h4: ({ children }) => <h5 className="mb-0.5 mt-2 text-sm font-bold text-slate-800">{children}</h5>,
          strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
          em: ({ children }) => <em className="italic text-slate-700">{children}</em>,
          ul: ({ children }) => <ul className="my-1.5 list-disc space-y-1 pl-5">{children}</ul>,
          ol: ({ children }) => <ol className="my-1.5 list-decimal space-y-1 pl-5">{children}</ol>,
          li: ({ children }) => <li className="text-slate-700">{children}</li>,
          p: ({ children }) => <p className="my-1.5">{children}</p>,
          code: ({ children }) => <code className="rounded bg-slate-100 px-1 py-0.5 text-[0.85em] font-semibold text-rose-600">{children}</code>,
          blockquote: ({ children }) => <blockquote className="my-1.5 border-l-4 border-emerald-300 bg-emerald-50/60 py-1 pl-3 text-slate-700">{children}</blockquote>,
          hr: () => <hr className="my-2.5 border-slate-200" />,
          table: ({ children }) => <div className="my-2 overflow-x-auto"><table className="w-full border-collapse text-xs">{children}</table></div>,
          th: ({ children }) => <th className="border border-slate-200 bg-slate-50 px-2 py-1 text-left font-bold text-slate-700">{children}</th>,
          td: ({ children }) => <td className="border border-slate-200 px-2 py-1">{children}</td>,
        }}
      >
        {text}
      </Markdown>
    </div>
  );
}
