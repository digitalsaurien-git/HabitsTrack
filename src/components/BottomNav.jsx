import React from 'react';
import { 
  LayoutGrid, 
  Calendar, 
  BarChart2, 
  Settings 
} from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Accueil' },
    { id: 'calendar', icon: Calendar, label: 'Journal' },
    { id: 'progress', icon: BarChart2, label: 'Stats' },
    { id: 'settings', icon: Settings, label: 'Profil' },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-[320px] h-20 bg-[#050505]/80 backdrop-blur-[32px] rounded-[28px] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[100] flex items-center justify-around px-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-500 ${
              isActive ? 'text-[#00f2ff]' : 'text-white/20 hover:text-white/40'
            }`}
          >
            {/* Active Highlight */}
            {isActive && (
              <div className="absolute inset-0 bg-[#00f2ff]/5 rounded-2xl animate-pulse" />
            )}
            
            <Icon 
              size={22} 
              strokeWidth={isActive ? 2.5 : 2}
              className={`transition-all duration-500 ${isActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(0,242,255,0.4)]' : ''}`}
            />
            {isActive && (
              <span className="absolute -bottom-1 w-1 h-1 bg-[#00f2ff] rounded-full shadow-[0_0_8px_#00f2ff]" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
