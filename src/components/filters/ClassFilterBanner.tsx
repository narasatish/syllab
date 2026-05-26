import { Filter, Settings2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ClassFilterMode } from '../../utils/classFilters';

interface ClassFilterBannerProps {
  selectedClasses: number[];
  mode: ClassFilterMode;
  onModeChange: (mode: ClassFilterMode) => void;
  sectionName: string;
  resultCount?: number;
  onChangeClass?: () => void;
}

const MODES: { id: ClassFilterMode; label: string; description: string }[] = [
  { id: 'selected_only',     label: 'Selected Only',     description: 'Show only my classes' },
  { id: 'recommended_first', label: 'Recommended First', description: 'My classes first, then rest' },
  { id: 'explore_all',       label: 'Explore All',       description: 'Show every class' },
];

export default function ClassFilterBanner({
  selectedClasses,
  mode,
  onModeChange,
  sectionName,
  resultCount,
  onChangeClass,
}: ClassFilterBannerProps) {
  if (!selectedClasses.length) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
        <span className="flex items-center gap-2">
          <Filter size={16} />
          No class selected — showing all {sectionName} content.
        </span>
        {onChangeClass && (
          <button
            type="button"
            onClick={onChangeClass}
            className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-white hover:bg-amber-700 transition-colors"
          >
            Set My Class
          </button>
        )}
      </div>
    );
  }

  const classesLabel = selectedClasses.length === 1
    ? `Class ${selectedClasses[0]}`
    : `Classes ${selectedClasses.join(', ')}`;

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
      <div className="flex items-center gap-2 flex-shrink-0">
        <Filter size={16} />
        <span>{classesLabel}</span>
        {typeof resultCount === 'number' && (
          <span className="text-xs font-bold text-blue-500">· {resultCount} items</span>
        )}
      </div>

      <div className="ml-auto flex flex-wrap items-center gap-1.5">
        <div className="flex items-center gap-1 p-1 bg-white/60 rounded-xl border border-blue-100">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onModeChange(m.id)}
              title={m.description}
              className={cn(
                'rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-widest transition-all',
                mode === m.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-blue-600 hover:bg-blue-100'
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
        {onChangeClass && (
          <button
            type="button"
            onClick={onChangeClass}
            className="flex items-center gap-1 rounded-lg bg-white border border-blue-200 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-100 transition-colors"
            title="Change your class or selected ranges"
          >
            <Settings2 size={11} />
            Change Class
          </button>
        )}
      </div>
    </div>
  );
}
