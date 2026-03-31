import React from 'react';
import { LayoutGrid, Calendar, Activity, Settings } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'DASHBOARD', icon: <LayoutGrid size={20} /> },
    { id: 'calendar', label: 'CALENDAR', icon: <Calendar size={20} /> },
    { id: 'progress', label: 'PROGRESS', icon: <Activity size={20} /> },
    { id: 'settings', label: 'SETTINGS', icon: <Settings size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-nav px-6 pb-8 pt-4 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              activeTab === tab.id ? 'text-primary scale-110' : 'text-text-dim hover:text-white'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all ${
              activeTab === tab.id ? 'bg-primary/10' : ''
            }`}>
              {tab.icon}
            </div>
            <span className="text-[8px] font-black tracking-[0.2em]">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
