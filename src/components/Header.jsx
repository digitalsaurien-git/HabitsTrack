import React from 'react';
import { Bell, Zap } from 'lucide-react';

export default function Header({ 
  view, 
  setView, 
  progressCount, 
  totalCount 
}) {
  const percentage = totalCount > 0 ? Math.round((progressCount / totalCount) * 100) : 0;
  const radius = 100; // Larger radius
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <header className="pt-10 pb-8 space-y-16 animate-fade">
      {/* Top Bar - Still floating at edges but within container */}
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shadow-glow">
            <Zap size={24} fill="white" className="text-white" />
          </div>
          <h1 className="text-2xl font-black italic tracking-tighter text-white">HabitsTrack</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-text-dim hover:text-white transition-colors p-2.5 rounded-xl bg-surface-low border border-white/5">
            <Bell size={22} />
          </button>
          <div className="w-12 h-12 rounded-full border-2 border-white/10 p-1 shadow-luxe overflow-hidden bg-white/5">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Circular Progress Section - Absolutely Centered */}
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative w-80 h-80 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90 scale-x-[-1]">
            <circle
              cx="160"
              cy="160"
              r={radius}
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="16"
              fill="transparent"
            />
            <circle
              cx="160"
              cy="160"
              r={radius}
              stroke="url(#orangeGradient)"
              strokeWidth="16"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: offset }}
              strokeLinecap="round"
              className="progress-ring-circle"
            />
            <defs>
              <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff9159" />
                <stop offset="100%" stopColor="#f66700" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex items-baseline">
              <span className="text-8xl font-black tracking-tighter text-white leading-none">
                {percentage}
              </span>
              <span className="text-3xl font-black text-primary ml-1">%</span>
            </div>
            <span className="label-caps opacity-30 mt-3 tracking-[0.25em]">DAILY PERFORMANCE</span>
          </div>
        </div>

        <div className="mt-10 text-center space-y-3 px-12">
          <h2 className="text-4xl font-black text-white tracking-tight leading-none">Stay Kinetic.</h2>
          <p className="text-base text-text-dim font-medium max-w-[280px] mx-auto leading-relaxed">
            You are <span className="text-white font-bold">{totalCount - progressCount} habits</span> away from a perfect streak.
          </p>
        </div>
      </div>

      {/* Mode Toggle Tabs */}
      <div className="px-4">
        <div className="bg-surface-low rounded-[32px] p-2 flex border border-white/5 shadow-inner">
          <button 
            onClick={() => setView('perso')}
            className={`flex-1 py-4.5 rounded-[28px] text-[11px] font-black transition-all duration-700 uppercase tracking-[0.2em] ${
              view === 'perso' 
              ? 'bg-surface-bright text-white shadow-luxe' 
              : 'text-text-dim hover:text-white'
            }`}
          >
            Personal
          </button>
          <button 
            onClick={() => setView('pro')}
            className={`flex-1 py-4.5 rounded-[28px] text-[11px] font-black transition-all duration-700 uppercase tracking-[0.2em] ${
              view === 'pro' 
              ? 'bg-surface-bright text-white shadow-luxe' 
              : 'text-text-dim hover:text-white'
            }`}
          >
            Professional
          </button>
        </div>
      </div>
    </header>
  );
}
