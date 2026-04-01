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
    { id: 'calendar', icon: Calendar, label: 'AGENDA' },
    { id: 'progress', icon: BarChart2, label: 'STATS' },
    { id: 'settings', icon: Settings, label: 'PROFIL' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[340px] z-[60] flex justify-center pb-10 pt-4 px-3 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none">
      <div className="w-full bg-[#0c0c0c]/90 backdrop-blur-[40px] rounded-[32px] p-2 flex justify-between items-center border border-white/[0.06] shadow-luxe pointer-events-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl transition-all duration-500 overflow-hidden relative ${
                isActive ? 'text-primary scale-[1.05] bg-white/[0.03]' : 'text-text-dim/40 hover:text-white/40'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
              )}
              <Icon 
                size={20} 
                strokeWidth={isActive ? 3 : 2}
                className={`transition-all duration-500 ${isActive ? 'drop-shadow-[0_0_12px_var(--primary-glow)] scale-110' : 'grayscale opacity-50'}`}
              />
              <span className={`text-[8px] font-black tracking-[0.2em] uppercase transition-all duration-700 ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
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
