import React from 'react';
import { Zap, Menu, Bell } from 'lucide-react';

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
    <header className="pt-8 pb-4 animate-in">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 mb-2">
        <button className="w-10 h-10 flex items-center justify-center bg-white/[0.03] border border-white/[0.06] rounded-xl text-white/40 hover:text-white transition-all" aria-label="Menu">
          <Menu size={18} />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="label-caps !text-[9px] mb-0.5 opacity-50">Pulse Center</span>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.03] rounded-full border border-white/[0.05]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00f2ff] shadow-[0_0_8px_#00f2ff] animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-white/90 uppercase">Habit Pulse</span>
          </div>
        </div>

        <button className="w-10 h-10 flex items-center justify-center bg-white/[0.03] border border-white/[0.06] rounded-xl text-white/40 hover:text-white transition-all" aria-label="Notifications">
          <Bell size={18} />
        </button>
      </div>

      {/* Main Gauge System */}
      <div className="relative flex flex-col items-center mt-10">
        <div className="relative w-72 h-72 flex items-center justify-center">
          {/* Subtle Outer Glow */}
          <div className="absolute inset-0 rounded-full bg-[#00f2ff]/5 blur-[60px]" />
          
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Track */}
            <circle
              cx="144"
              cy="144"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-white/[0.03]"
            />
            {/* Progress Stroke */}
            <circle
              cx="144"
              cy="144"
              r={radius}
              stroke="url(#cyanGradient)"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ 
                strokeDashoffset: offset,
                transition: 'stroke-dashoffset 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
              strokeLinecap="round"
              className="gauge-progress"
            />
            <defs>
              <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f2ff" />
                <stop offset="100%" stopColor="#7000ff" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold tracking-[0.4em] text-white/20 mb-2">COMPLÉTION</span>
            <div className="flex items-baseline">
              <span className="text-7xl font-bold tracking-tighter text-white leading-none">
                {percentage}
              </span>
              <span className="text-xl font-bold text-[#00f2ff]/60 ml-1">%</span>
            </div>
            <div className="mt-4 flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className={`indicator-glow ${percentage >= i * 20 ? 'active' : 'inactive'}`} 
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold text-white tracking-tight leading-none mb-2">Optimisation de vie.</h2>
          <p className="label-caps">
            {totalCount - progressCount} {totalCount - progressCount > 1 ? 'Objectifs Restants' : 'Objectif Restant'} aujourd'hui
          </p>
        </div>
      </div>

      {/* View Switcher */}
      <div className="px-5 mt-12 mb-8">
        <div className="bg-white/[0.03] rounded-2xl p-1.5 flex border border-white/[0.06] shadow-xl">
          <button 
            onClick={() => setView('perso')}
            className={`flex-1 py-3.5 rounded-xl text-[10px] font-bold transition-all duration-500 uppercase tracking-[0.2em] ${
              view === 'perso' 
              ? 'bg-[#00f2ff] text-black shadow-[0_0_20px_rgba(0,242,255,0.4)]' 
              : 'text-white/30 hover:text-white/60'
            }`}
          >
            Personnel
          </button>
          <button 
            onClick={() => setView('pro')}
            className={`flex-1 py-3.5 rounded-xl text-[10px] font-bold transition-all duration-500 uppercase tracking-[0.2em] ${
              view === 'pro' 
              ? 'bg-[#00f2ff] text-black shadow-[0_0_20px_rgba(0,242,255,0.4)]' 
              : 'text-white/30 hover:text-white/60'
            }`}
          >
            Professionnel
          </button>
        </div>
      </div>
    </header>
  );
}
