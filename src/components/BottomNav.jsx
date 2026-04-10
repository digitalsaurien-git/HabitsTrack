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
            className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
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
          </button>
        );
      })}
    </nav>
  );
}
