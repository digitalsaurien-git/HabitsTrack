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
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] h-20 bg-white/90 backdrop-blur-2xl rounded-[28px] border border-slate-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.06)] z-[100] flex items-center justify-around px-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
              isActive ? 'text-blue-600' : 'text-slate-300 hover:text-slate-500'
            }`}
          >
            {/* Active Indicator Background */}
            {isActive && (
              <div className="absolute inset-0 bg-blue-50 rounded-2xl" />
            )}
            
            <Icon 
              size={22} 
              strokeWidth={isActive ? 2.5 : 2}
              className={`transition-all duration-300 relative z-10 ${isActive ? 'scale-110' : ''}`}
            />
            {isActive && (
              <span className="absolute -bottom-1 w-1 h-1 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
