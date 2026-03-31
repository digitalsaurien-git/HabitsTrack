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
  if (t.includes('meditation')) return <Flower2 size={22} className="text-secondary" />;
  if (t.includes('read') || t.includes('livre')) return <Book size={20} className="text-white opacity-80" />;
  if (t.includes('hiit') || t.includes('sport')) return <Dumbbell size={20} className="text-secondary" />;
  if (t.includes('hydration') || t.includes('eau')) return <Droplets size={20} className="text-blue-400" />;
  return <Target size={20} className="text-primary" />;
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
      className={`premium-card p-5 flex items-center justify-between group animate-fade shadow-2xl border-white/5 mx-minus-2 ${isCompletedToday ? 'opacity-60' : 'opacity-100'}`}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="flex items-center gap-4 flex-1 min-w-0"
      >
        <div className="icon-circle shadow-inner flex-shrink-0">
          {getIcon(habit.title)}
        </div>
        <div className="min-w-0 flex flex-col justify-center gap-1">
          <h3 className={`text-[15px] font-bold tracking-tight truncate leading-none ${isCompletedToday ? 'text-white/40' : 'text-white'}`}>
            {habit.title}
          </h3>
          <div className="flex items-center gap-1.5 opacity-40">
            <Zap size={9} fill={streak > 0 ? "var(--primary)" : "none"} className={streak > 0 ? "text-primary" : "text-text-dim"} />
            <span className="text-[8px] font-black tracking-widest uppercase">
              {streak} DAY STREAK
            </span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onToggle(habit.id)}
        className={`check-btn flex-shrink-0 ${
          isCompletedToday 
          ? 'bg-secondary text-white shadow-glow scale-105' 
          : 'bg-white/5 border border-white/10 hover:border-primary/40 text-transparent'
        }`}
      >
        <Check size={24} strokeWidth={4} className={isCompletedToday ? "opacity-100" : "opacity-0"} />
      </button>
    </div>
  );
}
