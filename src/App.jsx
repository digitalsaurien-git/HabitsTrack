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
  Sparkles
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

  const SettingItem = ({ icon: Icon, label, color = "text-white/40" }) => (
    <button className="w-full flex items-center justify-between p-4 bg-white/[0.03] border border-white/[0.05] rounded-2xl mb-3 hover:bg-white/[0.06] transition-all group">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-colors group-hover:bg-white/10`}>
          <Icon size={18} className={color} />
        </div>
        <span className="text-[14px] font-semibold text-white/80">{label}</span>
      </div>
      <ChevronRight size={16} className="text-white/10 group-hover:text-white/30 transition-all" />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050505] flex justify-center selection:bg-[#00f2ff]/30 selection:text-white">
      {/* Background Decor */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#7000ff]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00f2ff]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[375px] min-h-screen relative pb-36 px-5 z-10">
        <Header 
          view={view} 
          setView={setView}
          progressCount={progressCount}
          totalCount={habits.length}
        />

        <main className="animate-in">
          {activeTab === 'dashboard' ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1 mb-2">
                <h3 className="label-caps !text-[9px] opacity-40">Missions Actives</h3>
                <div className="flex items-center gap-1.5 opacity-40">
                  <Sparkles size={12} className="text-[#00f2ff]" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white">{filteredHabits.length} Tasks</span>
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
                <div className="py-20 flex flex-col items-center justify-center text-center opacity-20">
                  <Target size={48} strokeWidth={1} className="mb-4" />
                  <p className="text-sm font-medium italic">Aucune mission pour le moment</p>
                </div>
              )}
            </div>
          ) : activeTab === 'settings' ? (
            <div className="space-y-4 pt-4">
              <div className="p-6 glass-card rounded-[32px] mb-8 flex items-center gap-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f2ff]/5 blur-3xl rounded-full" />
                <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-[#00f2ff] to-[#7000ff] p-0.5 shadow-[0_0_25px_rgba(0,242,255,0.2)]">
                  <div className="w-full h-full rounded-[22px] bg-[#0a0a0b] flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" 
                      alt="Profil" 
                      className="w-full h-full object-cover grayscale brightness-110"
                    />
                  </div>
                </div>
                <div className="z-10">
                  <h4 className="text-xl font-bold text-white tracking-tight">Cyborg Alpha</h4>
                  <p className="label-caps !text-[8.5px] mt-1 !text-[#00f2ff] opacity-80">RANG : MAÎTRE KINÉTIQUE</p>
                </div>
              </div>

              <div className="space-y-6">
                <section>
                  <h3 className="label-caps mb-4 px-1">Configurations</h3>
                  <SettingItem icon={Bell} label="Notifications Intelligentes" color="text-cyan-400" />
                  <SettingItem icon={Globe} label="Langue du Système" color="text-violet-400" />
                </section>
                
                <section>
                  <h3 className="label-caps mb-4 px-1">Infrastructure</h3>
                  <SettingItem icon={HelpCircle} label="Noyau d'Assistance" color="text-[#00f2ff]" />
                  <SettingItem icon={LogOut} label="Terminer la Session" color="text-rose-500" />
                </section>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-white/20 italic text-sm">
              <div className="w-12 h-12 border-2 border-dashed border-white/10 rounded-full animate-spin mb-4" />
              Initialisation {activeTab}...
            </div>
          )}
        </main>

        {/* Floating Action Button */}
        <button 
          onClick={() => setIsFormOpen(true)}
          className="fixed bottom-32 left-1/2 -translate-x-1/2 translate-x-[110px] w-14 h-14 bg-[#00f2ff] rounded-2xl flex items-center justify-center z-[110] shadow-[0_10px_30px_rgba(0,242,255,0.3)] active:scale-90 transition-all group overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Plus size={28} strokeWidth={3} className="text-black" />
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
