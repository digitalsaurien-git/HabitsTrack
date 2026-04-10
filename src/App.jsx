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
  Sparkles,
  LayoutGrid
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

  const SettingItem = ({ icon: Icon, label, color = "text-slate-400" }) => (
    <button className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl mb-3 hover:bg-slate-50 transition-all group">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center transition-colors group-hover:bg-white`}>
          <Icon size={18} className={color} />
        </div>
        <span className="text-[14px] font-semibold text-slate-700">{label}</span>
      </div>
      <ChevronRight size={16} className="text-slate-200 group-hover:text-slate-400 transition-all" />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FDFEFE] flex justify-center selection:bg-blue-100 selection:text-blue-900">
      <div className="w-full max-w-[390px] min-h-screen relative pb-36 px-6">
        <Header 
          view={view} 
          setView={setView}
          progressCount={progressCount}
          totalCount={habits.length}
        />

        <main className="animate-in pt-4">
          {activeTab === 'dashboard' ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1 mb-2">
                <h3 className="label-caps">Missions en cours</h3>
                <div className="flex items-center gap-1.5 opacity-50">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{filteredHabits.length} Objectifs</span>
                </div>
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
                <div className="py-20 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Target size={24} className="text-slate-300" />
                  </div>
                  <p className="text-sm font-medium text-slate-400 italic">Liste vide pour le moment</p>
                </div>
              )}
            </div>
          ) : activeTab === 'settings' ? (
            <div className="space-y-4 pt-4">
              <div className="p-6 bg-white border border-slate-100 rounded-[32px] mb-8 flex items-center gap-5 shadow-soft border-b-2">
                <div className="w-16 h-16 rounded-[24px] bg-slate-50 p-1 border border-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" 
                    alt="Profil" 
                    className="w-full h-full rounded-[20px] object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800 tracking-tight">Utilisateur Premium</h4>
                  <p className="label-caps !text-[9px] mt-1 text-blue-500 font-extrabold">Membre Kinetic Gold</p>
                </div>
              </div>

              <div className="space-y-6">
                <section>
                  <h3 className="label-caps mb-4 px-1">Préférences</h3>
                  <SettingItem icon={Bell} label="Alertes & Notifications" color="text-blue-500" />
                  <SettingItem icon={Globe} label="Langue (Français)" color="text-indigo-500" />
                </section>
                
                <section>
                  <h3 className="label-caps mb-4 px-1">Support</h3>
                  <SettingItem icon={HelpCircle} label="Centre d'aide" color="text-slate-400" />
                  <SettingItem icon={LogOut} label="Se déconnecter" color="text-rose-500" />
                </section>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-300 italic text-sm">
              <LayoutGrid size={40} strokeWidth={1} className="mb-4 opacity-20" />
              Initialisation...
            </div>
          )}
        </main>

        {/* Floating Action Button - Modern Pristine Style */}
        <button 
          onClick={() => setIsFormOpen(true)}
          className="fixed bottom-28 left-1/2 -translate-x-1/2 ml-[120px] w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center z-[110] shadow-[0_10px_25px_rgba(59,130,246,0.4)] active:scale-90 transition-all"
        >
          <Plus size={28} strokeWidth={3} />
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
