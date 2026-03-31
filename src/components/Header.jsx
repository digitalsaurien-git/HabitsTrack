import React from 'react';
import { Bell, Zap, Menu } from 'lucide-react';

export default function Header({ 
  view, 
  setView, 
  progressCount, 
  totalCount 
}) {
  const percentage = totalCount > 0 ? Math.round((progressCount / totalCount) * 100) : 0;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <header className="pt-14 pb-4 animate-fade">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6">
        <button className="text-text-dim hover:text-white transition-colors p-2">
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-glow">
            <Zap size={20} fill="white" className="text-white" />
          </div>
          <span className="text-lg font-black italic tracking-tighter text-white uppercase">HabitsTrack</span>
        </div>
        <div className="w-10 h-10 rounded-full border border-white/10 p-0.5 overflow-hidden bg-white/5">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" 
            alt="Profil" 
            className="w-full h-full rounded-full object-cover grayscale"
          />
        </div>
      </div>

      {/* Circular Progress Section */}
      <div className="relative flex flex-col items-center mt-12 mb-16">
        <div className="relative w-72 h-72 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90 scale-x-[-1]">
            <circle
              cx="144"
              cy="144"
              r={radius}
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="144"
              cy="144"
              r={radius}
              stroke="url(#stitchGradient)"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: offset }}
              strokeLinecap="round"
              className="progress-ring-circle"
            />
            <defs>
              <linearGradient id="stitchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff9159" />
                <stop offset="100%" stopColor="#f66700" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex items-baseline">
              <span className="text-7xl font-black tracking-tighter text-white leading-none">
                {percentage}
              </span>
              <span className="text-2xl font-black text-primary ml-1">%</span>
            </div>
            <span className="label-caps opacity-20 mt-3 tracking-[0.3em]">SCORE DU JOUR</span>
          </div>
        </div>

        <div className="mt-8 text-center space-y-3">
          <h2 className="text-3xl font-black text-white tracking-tight leading-none">Restez Kinetic.</h2>
          <p className="text-xs text-text-dim font-bold uppercase tracking-widest opacity-40">
            {totalCount - progressCount} {totalCount - progressCount > 1 ? 'Tâches Restantes' : 'Tâche Restante'}
          </p>
        </div>
      </div>

      {/* Mode Toggle Tabs - Black styling with white text/highlight */}
      <div className="px-6 mt-10">
        <div className="bg-black/80 rounded-[28px] p-1.5 flex border border-white/5 shadow-inner">
          <button 
            onClick={() => setView('perso')}
            className={`flex-1 py-4 rounded-[24px] text-[10px] font-black transition-all duration-500 uppercase tracking-[0.15em] ${
              view === 'perso' 
              ? 'bg-white/95 text-black shadow-2xl scale-[1.02]' 
              : 'text-text-dim hover:text-white'
            }`}
          >
            Personnel
          </button>
          <button 
            onClick={() => setView('pro')}
            className={`flex-1 py-4 rounded-[24px] text-[10px] font-black transition-all duration-500 uppercase tracking-[0.15em] ${
              view === 'pro' 
              ? 'bg-white/95 text-black shadow-2xl scale-[1.02]' 
              : 'text-text-dim hover:text-white'
            }`}
          >
            Professionnel
          </button>
        </div>
      </div>
    </header>
  );
}
