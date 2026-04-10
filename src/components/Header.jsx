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
      <div className="flex justify-between items-center px-2 mb-2">
        <button className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-all" aria-label="Menu">
          <Menu size={18} />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="label-caps !text-[9px] mb-0.5 text-blue-600/50">Performance Hub</span>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-slate-100 shadow-sm">
            <Zap size={12} className="text-blue-600 fill-blue-600" />
            <span className="text-[10px] font-bold tracking-widest text-slate-800 uppercase">Habits Pulse</span>
          </div>
        </div>

        <button className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-all" aria-label="Notifications">
          <Bell size={18} />
        </button>
      </div>

      {/* Main Gauge System - Pristine Light */}
      <div className="relative flex flex-col items-center mt-12">
        <div className="relative w-72 h-72 flex items-center justify-center">
          {/* Subtle Outer Shadow for depth */}
          <div className="absolute inset-4 rounded-full bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)]" />
          
          <svg className="w-full h-full transform -rotate-90 relative z-10">
            {/* Background Track */}
            <circle
              cx="144"
              cy="144"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-50"
            />
            {/* Progress Stroke */}
            <circle
              cx="144"
              cy="144"
              r={radius}
              stroke="url(#blueGradient)"
              strokeWidth="10"
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
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <span className="text-[10px] font-bold tracking-[0.3em] text-slate-300 mb-1">SCORE DU JOUR</span>
            <div className="flex items-baseline mb-1">
              <span className="text-7xl font-extrabold tracking-tighter text-slate-800 leading-none">
                {percentage}
              </span>
              <span className="text-xl font-bold text-blue-500/80 ml-1">%</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase">{totalCount - progressCount} à faire</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">Poursuivez l'effort.</h2>
          <p className="text-xs font-medium text-slate-400">Optimisation de routine quotidienne</p>
        </div>
      </div>

      {/* Pristine Tab Switcher */}
      <div className="px-2 mt-12 mb-4">
        <div className="bg-slate-50 rounded-2xl p-1 flex border border-slate-100">
          <button 
            onClick={() => setView('perso')}
            className={`flex-1 py-3 rounded-xl text-[10px] font-bold transition-all duration-300 uppercase tracking-[0.15em] ${
              view === 'perso' 
              ? 'bg-white text-blue-600 shadow-sm border border-slate-100' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Personnel
          </button>
          <button 
            onClick={() => setView('pro')}
            className={`flex-1 py-3 rounded-xl text-[10px] font-bold transition-all duration-300 uppercase tracking-[0.15em] ${
              view === 'pro' 
              ? 'bg-white text-blue-600 shadow-sm border border-slate-100' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Professionnel
          </button>
        </div>
      </div>
    </header>
  );
}
