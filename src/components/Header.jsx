import React from 'react';
import { Plus, LayoutGrid, Briefcase, User, Activity } from 'lucide-react';

export default function Header({ 
  view, 
  setView, 
  onAddClick, 
  progressCount, 
  totalCount 
}) {
  const percentage = totalCount > 0 ? (progressCount / totalCount) * 100 : 0;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <header className="glass sticky top-0 z-50 px-6 py-6 border-b border-white/5 shadow-2xl">
      <div className="max-w-md mx-auto space-y-8">
        {/* Top Bar: Logo & Add */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-high flex items-center justify-center border border-white/5 shadow-inner">
              <Activity className="text-primary" size={22} />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-white leading-none">HabitsTrack</h1>
              <p className="label-caps mt-1">Tableau de bord</p>
            </div>
          </div>
          
          <button 
            onClick={onAddClick}
            className="w-12 h-12 bg-primary-gradient text-white rounded-2xl shadow-glow flex items-center justify-center hover:scale-105 active:scale-95"
          >
            <Plus size={26} strokeWidth={3} />
          </button>
        </div>

        {/* Circular Progress Section */}
        <div className="flex items-center justify-center py-4">
          <div className="relative flex items-center justify-center">
            <svg className="w-40 h-40 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="var(--surface-high)"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Progress circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="var(--primary)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                style={{ 
                  strokeDashoffset,
                  transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  strokeLinecap: 'round'
                }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-white">{Math.round(percentage)}%</span>
              <span className="label-caps opacity-50">{progressCount} / {totalCount}</span>
            </div>
          </div>
        </div>

        {/* Pro/Perso Toggle */}
        <div className="flex p-1.5 bg-surface-low rounded-[20px] border border-white/5">
          <button 
            onClick={() => setView('perso')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[14px] text-xs font-bold transition-all ${
              view === 'perso' 
              ? 'bg-surface-bright text-white shadow-xl scale-[1.02]' 
              : 'text-text-dim hover:text-white'
            }`}
          >
            <User size={16} className={view === 'perso' ? 'text-primary' : ''} />
            <span>Personnel</span>
          </button>
          <button 
            onClick={() => setView('pro')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[14px] text-xs font-bold transition-all ${
              view === 'pro' 
              ? 'bg-surface-bright text-white shadow-xl scale-[1.02]' 
              : 'text-text-dim hover:text-white'
            }`}
          >
            <Briefcase size={16} className={view === 'pro' ? 'text-primary' : ''} />
            <span>Professionnel</span>
          </button>
        </div>
      </div>
    </header>
  );
}
