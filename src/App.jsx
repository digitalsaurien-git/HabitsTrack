import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus,
  User,
  Bell,
  Globe,
  HelpCircle,
  ChevronRight,
  LogOut,
  Target,
  LayoutGrid
} from 'lucide-react';

import Header from './components/Header';
import HabitCard from './components/HabitCard';
import HabitForm from './components/HabitForm';
import BottomNav from './components/BottomNav';
import { loadData, saveData, STORAGE_KEYS } from './utils/storage';

const INITIAL_HABITS = [
  { id: '1', title: 'Méditation', category: 'perso', streak: 12, completedDates: [new Date().toISOString().split('T')[0]] },
  { id: '2', title: 'Lecture', category: 'perso', streak: 8, completedDates: [] },
  { id: '3', title: 'Sport HIIT', category: 'perso', streak: 24, completedDates: [new Date().toISOString().split('T')[0]] },
  { id: '4', title: 'Hydratation', category: 'perso', streak: 0, completedDates: [] },
  { id: '5', title: 'Travail Profond', category: 'pro', streak: 15, completedDates: [new Date().toISOString().split('T')[0]] },
  { id: '6', title: 'Zéro Emails', category: 'pro', streak: 5, completedDates: [new Date().toISOString().split('T')[0]] },
  { id: '7', title: 'Planification', category: 'pro', streak: 2, completedDates: [new Date().toISOString().split('T')[0]] },
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

  const SettingItem = ({ icon: Icon, label }) => (
    <button className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl mb-3 hover:bg-slate-50 transition-all">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
          <Icon size={18} />
        </div>
        <span className="text-[14px] font-medium text-slate-700">{label}</span>
      </div>
      <ChevronRight size={16} className="text-slate-300" />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex justify-center selection:bg-indigo-100">
      <div className="w-full max-w-[400px] min-h-screen relative pb-36 px-4">
        <Header 
          view={view} 
          setView={setView}
          progressCount={progressCount}
          totalCount={habits.length}
        />

        <main className="transition-all duration-500 pt-24">
          {activeTab === 'dashboard' ? (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between px-3 mb-4">
                <h3 className="label-caps !text-[16px] !text-slate-800">Missions quotidiennes</h3>
                <span className="text-[14px] font-bold text-slate-400">{filteredHabits.length} Objectifs</span>
              </div>
              
              {filteredHabits.map(habit => (
                <HabitCard 
                  key={habit.id} 
                  habit={habit} 
                  onToggle={handleToggleHabit}
                  onEdit={(h) => { setEditingHabit(h); setIsFormOpen(true); }}
                  isCompletedToday={habit.completedDates?.includes(today)}
                />
              ))}
              
              {filteredHabits.length === 0 && (
                <div className="py-20 flex flex-col items-center justify-center opacity-30">
                  <Target size={40} strokeWidth={1.5} />
                  <p className="text-sm mt-2">Aucun objectif</p>
                </div>
              )}
            </div>
          ) : activeTab === 'settings' ? (
            <div className="space-y-4 pt-4">
              <div className="p-5 bg-white border border-slate-200 rounded-2xl mb-6 flex items-center gap-4 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                  DS
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Digital Saurien</h4>
                  <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">Compte Actif</p>
                </div>
              </div>

              <section>
                <h3 className="label-caps mb-3 px-1">Application</h3>
                <SettingItem icon={Bell} label="Notifications" />
                <SettingItem icon={Globe} label="Langue" />
              </section>
              
              <section className="pt-2">
                <h3 className="label-caps mb-3 px-1">Autres</h3>
                <SettingItem icon={HelpCircle} label="Aide" />
                <SettingItem icon={LogOut} label="Déconnexion" />
              </section>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-300">
              <LayoutGrid size={32} className="animate-pulse" />
            </div>
          )}
        </main>

        <button 
          onClick={() => setIsFormOpen(true)}
          className="fixed bottom-28 left-1/2 -translate-x-1/2 ml-[120px] w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center z-[110] shadow-xl active:scale-95 transition-all"
        >
          <Plus size={24} strokeWidth={2.5} />
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
