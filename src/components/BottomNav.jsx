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
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] h-16 bg-indigo-900 rounded-2xl shadow-xl z-[100] flex items-center justify-around px-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
              isActive ? 'text-white' : 'text-indigo-300 hover:text-white'
            }`}
          >
            {isActive && (
              <div className="absolute inset-0 bg-white/10 rounded-xl" />
            )}
            <Icon 
              size={22} 
              strokeWidth={isActive ? 2.5 : 2}
              className="relative z-10"
            />
            
            {/* Tooltip on hover */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl border border-slate-700/50 scale-90 group-hover:scale-100 whitespace-nowrap">
              {tab.label}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900/90" />
            </div>
          </button>
        );
      })}
    </nav>
  );
}
