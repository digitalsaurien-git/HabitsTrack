import React from 'react';
import { Bell, Zap } from 'lucide-react';

export default function Header({ 
  view, 
  setView, 
  progressCount, 
  totalCount 
}) {
  const percentage = totalCount > 0 ? Math.round((progressCount / totalCount) * 100) : 0;
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <header className="pt-10 pb-4 space-y-12 animate-fade max-w-md mx-auto">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
            <Zap size={22} fill="white" className="text-white" />
          </div>
          <h1 className="text-2xl font-black italic tracking-tighter text-white">HabitsTrack</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-text-dim hover:text-white transition-colors p-2 rounded-xl bg-surface-low border border-white/5">
            <Bell size={20} />
          </button>
          <div className="w-11 h-11 rounded-full border-2 border-white/10 p-0.5 shadow-luxe">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Circular Progress Section */}
      <div className="relative flex flex-col items-center">
        <div className="relative w-72 h-72 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90 scale-x-[-1]">
            <circle
              cx="144"
              cy="144"
              r={radius}
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="14"
              fill="transparent"
            />
            <circle
              cx="144"
              cy="144"
              r={radius}
              stroke="url(#orangeGradient)"
              strokeWidth="14"
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
              <span className="text-7xl font-black tracking-tighter text-white leading-none">
                {percentage}
              </span>
              <span className="text-2xl font-black text-primary ml-1">%</span>
            </div>
            <span className="label-caps opacity-40 mt-2 tracking-[0.2em]">Daily Goal</span>
          </div>
        </div>

        <div className="mt-6 text-center space-y-2 px-10">
          <h2 className="text-3xl font-black text-white tracking-tight">Stay Kinetic.</h2>
          <p className="text-sm text-text-dim font-medium leading-relaxed">
            You are <span className="text-white font-bold">{totalCount - progressCount} habits</span> away from a perfect day.
          </p>
        </div>
      </div>

      {/* Mode Toggle Tabs */}
      <div className="px-8 flex">
        <div className="w-full bg-surface-low rounded-[28px] p-1.5 flex border border-white/5 shadow-inner">
          <button 
            onClick={() => setView('perso')}
            className={`flex-1 py-4 rounded-[24px] text-xs font-black transition-all duration-500 uppercase tracking-widest ${
              view === 'perso' 
              ? 'bg-surface-bright text-white shadow-[0_10px_20px_rgba(0,0,0,0.4)]' 
              : 'text-text-dim hover:text-white'
            }`}
          >
            Personal
          </button>
          <button 
            onClick={() => setView('pro')}
            className={`flex-1 py-4 rounded-[24px] text-xs font-black transition-all duration-500 uppercase tracking-widest ${
              view === 'pro' 
              ? 'bg-surface-bright text-white shadow-[0_10px_20px_rgba(0,0,0,0.4)]' 
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
