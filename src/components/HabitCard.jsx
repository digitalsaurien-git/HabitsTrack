import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Check, 
  Dumbbell, 
  Book, 
  Flower2, 
  Droplets,
  Zap,
  Target
} from 'lucide-react';

const getIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes('méditation') || t.includes('meditation')) return <Flower2 size={20} className="text-secondary" />;
  if (t.includes('lire') || t.includes('livre') || t.includes('page')) return <Book size={18} className="text-white opacity-60" />;
  if (t.includes('hiit') || t.includes('sport')) return <Dumbbell size={18} className="text-secondary" />;
  if (t.includes('hygiène') || t.includes('eau') || t.includes('hydratation')) return <Droplets size={18} className="text-blue-400" />;
  return <Target size={18} className="text-primary" />;
};

export default function HabitCard({ habit, onToggle, onEdit, isCompletedToday }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: habit.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const streak = habit.streak || 0;

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`premium-card p-4 flex items-center justify-between group animate-fade border-white/5 shadow-xl transition-all duration-300 ${isCompletedToday ? 'bg-black/40 border-transparent scale-[0.98]' : 'bg-[#0f0f0f]'}`}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="flex items-center gap-4 flex-1 min-w-0"
      >
        <div className="w-10 h-10 rounded-[14px] flex-shrink-0 flex items-center justify-center bg-white/5 border border-white/5">
          {getIcon(habit.title)}
        </div>
        <div className="min-w-0 flex flex-col justify-center gap-0.5">
          <h3 className={`text-[14px] font-bold tracking-tight truncate leading-tight ${isCompletedToday ? 'text-white/30' : 'text-white'}`}>
            {habit.title}
          </h3>
          <div className="flex items-center gap-1 opacity-20">
            <Zap size={8} fill={streak > 0 ? "var(--primary)" : "none"} className={streak > 0 ? "text-primary" : "text-text-dim"} />
            <span className="text-[7px] font-black tracking-[0.15em] uppercase">
              {streak} {streak > 1 ? 'JOURS' : 'JOUR'} DE SUITE
            </span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onToggle(habit.id)}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
          isCompletedToday 
          ? 'bg-secondary text-white shadow-glow scale-105' 
          : 'bg-white/5 border border-white/10 hover:border-primary/40 text-transparent'
        }`}
      >
        <Check size={20} strokeWidth={4} className={isCompletedToday ? "opacity-100" : "opacity-0"} />
      </button>
    </div>
  );
}
