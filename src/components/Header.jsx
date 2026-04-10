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
    <header className="pt-8 pb-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <button className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400" aria-label="Menu">
          <Menu size={18} />
        </button>
        
        <div className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 rounded-full shadow-sm">
          <Zap size={14} className="text-white fill-white" />
          <span className="text-[11px] font-bold text-white uppercase tracking-wider">Habit Pulse</span>
        </div>

        <button className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400" aria-label="Notifications">
          <Bell size={18} />
        </button>
      </div>

      {/* Harmonized Gauge Section */}
      <div className="flex flex-col items-center mt-8">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r={radius}
              stroke="#e2e8f0"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="128"
              cy="128"
              r={radius}
              stroke="#4f46e5"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ 
                strokeDashoffset: offset,
                transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              strokeLinecap="round"
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="label-caps !text-[10px] mb-1">SCORE</span>
            <div className="flex items-baseline">
              <span className="text-6xl font-extrabold text-slate-800 tracking-tighter">
                {percentage}
              </span>
              <span className="text-xl font-bold text-indigo-600 ml-1">%</span>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center px-6">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">Continuez ainsi.</h2>
          <div className="mt-2">
            <p className="text-[14px] font-bold text-slate-400 capitalize bg-slate-100/50 inline-block px-5 py-2 rounded-full tracking-wide">
              {totalCount - progressCount} Missions à compléter
            </p>
          </div>
        </div>
        
        {/* Spacer for a single interligne */}
        {/* Spacer for a single interligne */}
        <div className="h-8" />
      </div>

      {/* Styled Tabs */}
      <div className="mt-4 px-2">
        <div className="bg-slate-200/50 p-1 rounded-xl flex gap-1">
          <button 
            onClick={() => setView('perso')}
            className={`flex-1 py-4 rounded-xl text-[15px] font-extrabold transition-all uppercase tracking-wider ${
              view === 'perso' 
              ? 'bg-white text-indigo-600 shadow-md' 
              : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Personnel
          </button>
          <button 
            onClick={() => setView('pro')}
            className={`flex-1 py-4 rounded-xl text-[15px] font-extrabold transition-all uppercase tracking-wider ${
              view === 'pro' 
              ? 'bg-white text-indigo-600 shadow-md' 
              : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Professionnel
          </button>
        </div>
      </div>
    </header>
  );
}
