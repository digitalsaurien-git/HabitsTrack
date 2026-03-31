import React, { useState, useEffect, useMemo } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { 
  LayoutGrid, 
  Plus, 
  CalendarDays, 
  AlertTriangle,
  History,
  BookOpen
} from 'lucide-react';

import Header from './components/Header';
import HabitCard from './components/HabitCard';
import HabitForm from './components/HabitForm';
import Journal from './components/Journal';
import { loadData, saveData, STORAGE_KEYS } from './utils/storage';

export default function App() {
  const [habits, setHabits] = useState(() => loadData(STORAGE_KEYS.HABITS, []));
  const [journal, setJournal] = useState(() => loadData(STORAGE_KEYS.JOURNAL, []));
  const [view, setView] = useState('perso'); // 'pro', 'perso', 'journal'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => saveData(STORAGE_KEYS.HABITS, habits), [habits]);
  useEffect(() => saveData(STORAGE_KEYS.JOURNAL, journal), [journal]);

  const today = new Date().toISOString().split('T')[0];

  const filteredHabits = useMemo(() => {
    return habits.filter(h => h.category === view);
  }, [habits, view]);

  const progressCount = useMemo(() => {
    return habits.filter(h => h.completedDates?.includes(today)).length;
  }, [habits, today]);

  const totalToday = habits.length;

  const surchargeAlert = useMemo(() => {
    const heavyToday = habits.filter(h => h.mentalLoad === 'chronophage');
    return heavyToday.length >= 3;
  }, [habits]);

  const handleToggleHabit = (id) => {
    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h;
      const completedDates = h.completedDates || [];
      const isDone = completedDates.includes(today);
      return {
        ...h,
        completedDates: isDone 
          ? completedDates.filter(d => d !== today) 
          : [...completedDates, today]
      };
    }));
  };

  const handleSaveHabit = (data) => {
    if (data.id) {
      setHabits(prev => prev.map(h => h.id === data.id ? data : h));
    } else {
      setHabits(prev => [...prev, { ...data, id: Date.now().toString(), completedDates: [] }]);
    }
    setIsFormOpen(false);
    setEditingHabit(null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setHabits((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSaveJournal = (entry) => {
    setJournal(prev => {
      const existingIdx = prev.findIndex(e => e.date === entry.date);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = entry;
        return updated;
      }
      return [entry, ...prev];
    });
  };

  const handleDeleteJournal = (date) => {
    setJournal(prev => prev.filter(e => e.date !== date));
  };

  return (
    <div className="min-h-screen pb-20">
      <Header 
        view={view === 'journal' ? 'perso' : view} 
        setView={setView}
        onAddClick={() => { setEditingHabit(null); setIsFormOpen(true); }}
        progressCount={progressCount}
        totalCount={totalToday}
      />

      <main className="max-w-md mx-auto px-4 mt-6">
        {/* Navigation Tabs (Habits vs Journal) */}
        <div className="flex justify-center mb-8">
          <div className="glass rounded-2xl flex p-1 shadow-sm border border-white/30">
            <button 
              onClick={() => setView(view === 'journal' ? 'perso' : view)}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black transition-all ${
                view !== 'journal' ? 'bg-white shadow-sm text-secondary' : 'text-gray-400'
              }`}
            >
              <CalendarDays size={16} /> Habitudes
            </button>
            <button 
              onClick={() => setView('journal')}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black transition-all ${
                view === 'journal' ? 'bg-white shadow-sm text-secondary' : 'text-gray-400'
              }`}
            >
              <BookOpen size={16} /> Journal
            </button>
          </div>
        </div>

        {view === 'journal' ? (
          <Journal 
            entries={journal} 
            onSave={handleSaveJournal} 
            onDelete={handleDeleteJournal} 
          />
        ) : (
          <div className="space-y-6">
            {surchargeAlert && (
              <div className="glass-heavy bg-danger/5 border-danger/20 p-5 rounded-3xl flex gap-4 animate-scale">
                <div className="p-3 bg-danger/10 rounded-2xl text-danger h-fit">
                  <AlertTriangle size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-danger uppercase tracking-tight">Surcharge détectée !</h4>
                  <p className="text-xs text-danger/70 font-medium">Attention, vous avez trop de tâches lourdes aujourd'hui. Pensez à déléguer ou prioriser.</p>
                </div>
              </div>
            )}

            {filteredHabits.length === 0 ? (
              <div className="py-20 text-center space-y-4 animate-fade">
                <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                  <LayoutGrid size={40} />
                </div>
                <p className="text-gray-400 font-bold text-sm tracking-wide uppercase">Aucune habitude ici.</p>
                <button 
                  onClick={() => setIsFormOpen(true)}
                  className="text-secondary font-black text-xs underline underline-offset-4"
                >
                  Ajouter une tâche
                </button>
              </div>
            ) : (
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={filteredHabits}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
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
                </SortableContext>
              </DndContext>
            )}
          </div>
        )}
      </main>

      <HabitForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSaveHabit}
        initialData={editingHabit}
        showSurchargeAlert={surchargeAlert}
      />
    </div>
  );
}
