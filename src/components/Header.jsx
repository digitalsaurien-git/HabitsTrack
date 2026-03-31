import React from 'react';
import { Plus, LayoutGrid, Briefcase, User, BarChart3 } from 'lucide-react';

export default function Header({ 
  view, 
  setView, 
  onAddClick, 
  progressCount, 
  totalCount 
}) {
  const percentage = totalCount > 0 ? (progressCount / totalCount) * 100 : 0;

  return (
    <header className="glass-heavy sticky top-0 z-50 px-4 py-4 mb-6 shadow-sm border-b">
      <div className="max-w-md mx-auto space-y-4">
        {/* Title and Add Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-xl text-secondary shadow-inner">
              <LayoutGrid size={24} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-black text-secondary tracking-tight">HabitsTrack</h1>
          </div>
          
          <button 
            onClick={onAddClick}
            className="p-3 bg-secondary text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={24} strokeWidth={2.5} />
          </button>
        </div>

        {/* Categories Toggle */}
        <div className="grid grid-cols-2 p-1 bg-gray-100/50 rounded-2xl border border-gray-100">
          <button 
            onClick={() => setView('perso')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${
              view === 'perso' 
              ? 'bg-white shadow-sm text-perso font-bold' 
              : 'text-gray-500 hover:bg-white/50'
            }`}
          >
            <User size={18} />
            <span>Perso</span>
          </button>
          <button 
            onClick={() => setView('pro')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${
              view === 'pro' 
              ? 'bg-white shadow-sm text-pro font-bold' 
              : 'text-gray-500 hover:bg-white/50'
            }`}
          >
            <Briefcase size={18} />
            <span>Pro</span>
          </button>
        </div>

        {/* Progress Display */}
        <div className="space-y-2 px-1">
          <div className="flex justify-between items-end">
            <span className="text-sm font-semibold text-text-muted flex items-center gap-1">
              <BarChart3 size={14} /> Progression du jour
            </span>
            <span className="text-xs font-bold bg-success/10 text-success px-2 py-0.5 rounded-full">
              {progressCount}/{totalCount}
            </span>
          </div>
          <div className="h-2.5 w-full bg-gray-200/50 rounded-full overflow-hidden border border-white/40">
            <div 
              className="h-full bg-success transition-all duration-700 ease-out rounded-full shadow-[0_0_8px_rgba(129,199,132,0.5)]"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
