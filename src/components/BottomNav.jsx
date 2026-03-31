import React from 'react';
import { 
  LayoutGrid, 
  Calendar, 
  BarChart2, 
  Settings 
} from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', icon: LayoutGrid, label: 'ACCUEIL' },
    { id: 'calendar', icon: Calendar, label: 'CALENDRIER' },
    { id: 'progress', icon: BarChart2, label: 'SUIVI' },
    { id: 'settings', icon: Settings, label: 'RÉGLAGES' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[380px] z-[60] flex justify-center pb-8 pt-4 px-2 bg-gradient-to-t from-black via-black/80 to-transparent">
      <div className="w-full bg-[#0a0a0a]/98 backdrop-blur-2xl rounded-full p-1.5 flex justify-between items-center border border-white/5 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-full transition-all duration-300 ${
                isActive ? 'text-primary scale-105' : 'text-text-dim hover:text-white/60'
              }`}
            >
              <Icon 
                size={18} 
                strokeWidth={isActive ? 2.5 : 2}
                className={`transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_8px_rgba(255,107,0,0.4)]' : 'opacity-40'}`}
              />
              <span className={`text-[7px] font-black tracking-widest uppercase transition-all duration-300 ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
