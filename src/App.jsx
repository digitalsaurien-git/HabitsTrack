import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus,
  User,
  Bell,
  Globe,
  HelpCircle,
  ChevronRight,
  LogOut
} from 'lucide-react';

import Header from './components/Header';
import HabitCard from './components/HabitCard';
import HabitForm from './components/HabitForm';
import BottomNav from './components/BottomNav';
import { loadData, saveData, STORAGE_KEYS } from './utils/storage';

const INITIAL_HABITS = [
  { id: '1', title: '30m Méditation', category: 'perso', streak: 12, completedDates: [new Date().toISOString().split('T')[0]] },
  { id: '2', title: 'Lire 20 Pages', category: 'perso', streak: 8, completedDates: [] },
  { id: '3', title: 'HIIT Matinal', category: 'perso', streak: 24, completedDates: [new Date().toISOString().split('T')[0]] },
  { id: '4', title: '2L Hydratation', category: 'perso', streak: 0, completedDates: [] },
  { id: '5', title: 'Travail Profond', category: 'pro', streak: 15, completedDates: [new Date().toISOString().split('T')[0]] },
  { id: '6', title: 'Zéro Emails', category: 'pro', streak: 5, completedDates: [new Date().toISOString().split('T')[0]] },
  { id: '7', title: 'Planifier Demain', category: 'pro', streak: 2, completedDates: [new Date().toISOString().split('T')[0]] },
];

export default function App() {
  const [habits, setHabits] = useState(() => {
    const saved = loadData(STORAGE_KEYS.HABITS, []);
    if (saved.length <= 1 || !saved[0].streak) return INITIAL_HABITS;
    return saved;
  });
  
  const [view, setView] = useState('perso');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  useEffect(() => saveData(STORAGE_KEYS.HABITS, habits), [habits]);

  const today = new Date().toISOString().split('T')[0];

  const filteredHabits = useMemo(() => {
    return habits.filter(h => h.category === view);
  }, [habits, view]);

  const progressCount = useMemo(() => {
    return habits.filter(h => h.completedDates?.includes(today)).length;
  }, [habits, today]);

  const handleToggleHabit = (id) => {
    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h;
      const completedDates = h.completedDates || [];
      const isDone = completedDates.includes(today);
      return {
        ...h,
        completedDates: isDone 
          ? completedDates.filter(d => d !== today) 
          : [...completedDates, today],
        streak: isDone ? (h.streak > 0 ? h.streak - 1 : 0) : (h.streak || 0) + 1
      };
    }));
  };

  const handleSaveHabit = (data) => {
    if (data.id) {
      setHabits(prev => prev.map(h => h.id === data.id ? data : h));
    } else {
      setHabits(prev => [...prev, { ...data, id: Date.now().toString(), streak: 0, completedDates: [] }]);
    }
    setIsFormOpen(false);
    setEditingHabit(null);
  };

  const SettingItem = ({ icon: Icon, label, color = "text-text-dim" }) => (
    <button className="w-full flex items-center justify-between p-4 premium-card border-none bg-[#111] hover:bg-[#151515] transition-all rounded-2xl mb-3">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-xl bg-white/5`}>
          <Icon size={20} className={color} />
        </div>
        <span className="text-sm font-bold text-white tracking-tight">{label}</span>
      </div>
      <ChevronRight size={16} className="text-white/20" />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center">
      <div className="w-full max-w-[400px] min-h-screen relative pb-40">
        <Header 
          view={view} 
          setView={setView}
          progressCount={progressCount}
          totalCount={habits.length}
        />

        <main className="px-6 mt-2">
          {activeTab === 'dashboard' ? (
            <div className="flex flex-col gap-8">
              {filteredHabits.map(habit => (
                <HabitCard 
                  key={habit.id} 
                  habit={habit} 
                  onToggle={handleToggleHabit}
                  onEdit={(h) => { setEditingHabit(h); setIsFormOpen(true); }}
                  isCompletedToday={habit.completedDates?.includes(today)}
                />
              ))}
            </div>
          ) : activeTab === 'settings' ? (
            <div className="animate-fade space-y-2 pt-6">
              <h3 className="label-caps opacity-30 px-2 mb-4 tracking-[0.2em] uppercase">Mon Profil</h3>
              <div className="p-6 premium-card mb-8 flex items-center gap-5 border-none bg-[#111]">
                <div className="w-16 h-16 rounded-3xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-glow">
                  <User size={32} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-white">Digital Saurien</h4>
                  <p className="text-[10px] font-bold text-text-dim uppercase tracking-widest mt-1">Niveau 12 • Kinetic Master</p>
                </div>
              </div>

              <h3 className="label-caps opacity-30 px-2 mb-4 tracking-[0.2em] uppercase">Préférences</h3>
              <SettingItem icon={Bell} label="Notifications" color="text-orange-400" />
              <SettingItem icon={Globe} label="Langue (Français)" color="text-blue-400" />
              
              <h3 className="label-caps opacity-30 px-2 mt-8 mb-4 tracking-[0.2em] uppercase">Assistance</h3>
              <SettingItem icon={HelpCircle} label="Centre d'aide" color="text-secondary" />
              <SettingItem icon={LogOut} label="Se déconnecter" color="text-red-400" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-600 italic text-sm">
              Section {activeTab} en cours...
            </div>
          )}
        </main>

        <button 
          onClick={() => setIsFormOpen(true)}
          className="fixed bottom-32 left-1/2 -translate-x-1/2 ml-36 w-14 h-14 fab-orange rounded-[20px] flex items-center justify-center z-50 shadow-2xl active:scale-90 transition-all border border-white/10"
        >
          <Plus size={28} strokeWidth={3.5} />
        </button>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <HabitForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSaveHabit}
        initialData={editingHabit}
      />
    </div>
  );
}
