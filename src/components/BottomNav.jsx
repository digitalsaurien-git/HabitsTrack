import React from 'react';
import { 
  LayoutGrid, 
  Calendar, 
  BarChart2, 
  Settings 
} from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', icon: LayoutGrid, label: 'DASHBOARD' },
    { id: 'calendar', icon: Calendar, label: 'CALENDAR' },
    { id: 'progress', icon: BarChart2, label: 'PROGRESS' },
    { id: 'settings', icon: Settings, label: 'SETTINGS' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[60] flex justify-center pb-8 pt-4 px-4 pointer-events-none">
      <div className="w-full max-w-lg bg-[#0d0f13]/98 backdrop-blur-3xl rounded-[40px] p-2 flex justify-between items-center border border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] pointer-events-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1.5 px-6 py-4 rounded-[32px] transition-all duration-500 group ${
                isActive ? 'bg-white/5 text-white scale-105' : 'text-text-dim hover:text-white'
              }`}
            >
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 2}
                className={`transition-all duration-500 ${isActive ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'opacity-60'}`}
              />
              <span className={`text-[8px] font-black tracking-widest uppercase transition-all duration-500 ${
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
