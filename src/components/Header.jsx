import React from 'react';
import { Zap, Menu } from 'lucide-react';

export default function Header({ 
  view, 
  setView, 
  progressCount, 
  totalCount 
}) {
  const percentage = totalCount > 0 ? Math.round((progressCount / totalCount) * 100) : 0;
  const radius = 80; // Slightly smaller for 340px width
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <header className="pt-12 pb-2 animate-fade">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4">
        <button className="text-text-dim hover:text-white transition-colors p-2" aria-label="Menu">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-glow">
            <Zap size={18} fill="white" className="text-white" />
          </div>
          <span className="text-base font-black italic tracking-tighter text-white uppercase">HabitsTrack</span>
        </div>
        <div className="w-9 h-9 rounded-full border border-white/10 p-0.5 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" 
            alt="Profil" 
            className="w-full h-full rounded-full object-cover grayscale"
          />
        </div>
      </div>

      {/* Circular Progress Section */}
      <div className="relative flex flex-col items-center mt-12">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90 scale-x-[-1]">
            <circle
              cx="128"
              cy="128"
              r={radius}
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="128"
              cy="128"
              r={radius}
              stroke="url(#stitchGradient)"
              strokeWidth="10"
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
              <span className="text-6xl font-black tracking-tighter text-white leading-none">
                {percentage}
              </span>
              <span className="text-xl font-black text-primary ml-1">%</span>
            </div>
            <span className="label-caps opacity-20 mt-2 tracking-[0.2em] text-[8px]">PROGRESSION</span>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-black text-white tracking-tight leading-none mb-3">Gardez le rythme.</h2>
          <p className="text-[9px] text-text-dim font-black uppercase tracking-[0.2em] opacity-40">
            {totalCount - progressCount} {totalCount - progressCount > 1 ? 'Tâches Restantes' : 'Tâche Restante'}
          </p>
        </div>
      </div>

      {/* Toggle Tabs - EXACT 20px gap below (mb-5) */}
      <div className="px-2 mt-12 mb-5">
        <div className="bg-black/90 rounded-[24px] p-1 flex border border-white/5 shadow-inner">
          <button 
            onClick={() => setView('perso')}
            className={`flex-1 py-4 rounded-[20px] text-xs font-black transition-all duration-300 uppercase tracking-widest ${
              view === 'perso' 
              ? 'bg-white text-black shadow-2xl scale-[1.02]' 
              : 'text-text-dim hover:text-white'
            }`}
          >
            Personnel
          </button>
          <button 
            onClick={() => setView('pro')}
            className={`flex-1 py-4 rounded-[20px] text-xs font-black transition-all duration-300 uppercase tracking-widest ${
              view === 'pro' 
              ? 'bg-white text-black shadow-2xl scale-[1.02]' 
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
