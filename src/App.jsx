import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus
} from 'lucide-react';

import Header from './components/Header';
import HabitCard from './components/HabitCard';
import HabitForm from './components/HabitForm';
import BottomNav from './components/BottomNav';
import { loadData, saveData, STORAGE_KEYS } from './utils/storage';

const INITIAL_HABITS = [
  { id: '1', title: '30m Meditation', category: 'perso', streak: 12, completedDates: [new Date().toISOString().split('T')[0]] },
  { id: '2', title: 'Read 20 Pages', category: 'perso', streak: 8, completedDates: [] },
  { id: '3', title: 'Morning HIIT', category: 'perso', streak: 24, completedDates: [new Date().toISOString().split('T')[0]] },
  { id: '4', title: '2L Hydration', category: 'perso', streak: 0, completedDates: [] },
  { id: '5', title: 'Deep Work', category: 'pro', streak: 15, completedDates: [new Date().toISOString().split('T')[0]] },
  { id: '6', title: 'Email Zero', category: 'pro', streak: 5, completedDates: [new Date().toISOString().split('T')[0]] },
  { id: '7', title: 'Plan Tomorrow', category: 'pro', streak: 2, completedDates: [new Date().toISOString().split('T')[0]] },
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

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      {/* Container wrapper to enforce max-width and centering */}
      <div className="w-full max-w-lg min-h-screen relative pb-32">
        <Header 
          view={view} 
          setView={setView}
          progressCount={progressCount}
          totalCount={habits.length}
        />

        <main className="px-8 mt-6">
          {activeTab === 'dashboard' ? (
            <div className="space-y-6">
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
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-text-dim italic text-sm">
              Section {activeTab} en cours...
            </div>
          )}
        </main>

        <button 
          onClick={() => setIsFormOpen(true)}
          className="fixed bottom-32 right-12 w-16 h-16 fab-orange rounded-full flex items-center justify-center z-50 animate-scale"
        >
          <Plus size={32} strokeWidth={3.5} />
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
