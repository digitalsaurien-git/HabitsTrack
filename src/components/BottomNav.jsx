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
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-[60] flex justify-center pb-8 pt-4 px-4 bg-gradient-to-t from-black to-transparent">
      <div className="w-full bg-[#0a0a0a]/98 backdrop-blur-xl rounded-[40px] p-2 flex justify-between items-center border border-white/5 shadow-[0_-15px_30px_rgba(0,0,0,0.4)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-3 rounded-[32px] transition-all duration-300 ${
                isActive ? 'text-primary' : 'text-text-dim hover:text-white/60'
              }`}
            >
              <Icon 
                size={20} 
                strokeWidth={isActive ? 2.5 : 2}
                className={`transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_10px_rgba(255,107,0,0.3)] opacity-100' : 'opacity-40'}`}
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
