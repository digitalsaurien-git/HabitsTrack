import React from 'react';
import { Zap, Menu } from 'lucide-react';

export default function Header({ 
  view, 
  setView, 
  progressCount, 
  totalCount 
}) {
  const percentage = totalCount > 0 ? Math.round((progressCount / totalCount) * 100) : 0;
  const radius = 95; 
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <header className="pt-8 pb-2 animate-kinetic">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4">
        <button className="text-[#444] hover:text-white transition-all p-2 bg-white/5 rounded-xl border border-white/5" aria-label="Menu">
          <Menu size={18} />
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] rounded-full border border-white/[0.05]">
          <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center shadow-glow">
            <Zap size={14} fill="white" className="text-white" />
          </div>
          <span className="text-[12px] font-black italic tracking-tighter text-white/90 uppercase">HabitsTrack</span>
        </div>
        <div className="w-10 h-10 rounded-2xl border border-white/10 p-0.5 overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" 
            alt="Profil" 
            className="w-full h-full rounded-[14px] object-cover grayscale brightness-125"
          />
        </div>
      </div>

      {/* Circular Progress Section */}
      <div className="relative flex flex-col items-center mt-12">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r={radius}
              stroke="white"
              strokeWidth="14"
              fill="transparent"
              className="opacity-[0.03]"
            />
            <circle
              cx="128"
              cy="128"
              r={radius}
              stroke="url(#premiumGradient)"
              strokeWidth="14"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: offset }}
              strokeLinecap="round"
              className="progress-ring-circle"
            />
            <defs>
              <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffb38a" />
                <stop offset="100%" stopColor="#ff6b00" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex items-baseline mb-[-8px]">
              <span className="text-[88px] font-black tracking-tighter text-white leading-none">
                {percentage}
              </span>
              <span className="text-2xl font-black text-primary ml-1">%</span>
            </div>
            <span className="label-caps opacity-30 tracking-[0.4em] text-[10px]">OBJECTIF</span>
          </div>
        </div>

        <div className="mt-8 text-center animate-kinetic">
          <h2 className="text-3xl font-black text-white tracking-tight leading-none mb-3">Gardez le rythme.</h2>
          <p className="text-[11px] text-text-dim font-black uppercase tracking-[0.3em] opacity-40">
            {totalCount - progressCount} {totalCount - progressCount > 1 ? 'HABITUDES RESTANTES' : 'HABITUDE RESTANTE'}
          </p>
        </div>
      </div>

      {/* Toggle Tabs - MOVED even lower for more space (mb-16) */}
      <div className="px-2 mt-12 mb-16 px-4">
        <div className="bg-[#121212] rounded-[32px] p-1.5 flex border border-white/5 shadow-premium">
          <button 
            onClick={() => setView('perso')}
            className={`flex-1 py-4 rounded-[24px] text-[11px] font-black transition-all duration-700 uppercase tracking-[0.2em] ${
              view === 'perso' 
              ? 'bg-white text-black shadow-luxe scale-[1.03]' 
              : 'text-text-dim/50 hover:text-white'
            }`}
          >
            Personnel
          </button>
          <button 
            onClick={() => setView('pro')}
            className={`flex-1 py-4 rounded-[24px] text-[11px] font-black transition-all duration-700 uppercase tracking-[0.2em] ${
              view === 'pro' 
              ? 'bg-white text-black shadow-luxe scale-[1.03]' 
              : 'text-text-dim/50 hover:text-white'
            }`}
          >
            Professionnel
          </button>
        </div>
      </div>
    </header>
  );
}
