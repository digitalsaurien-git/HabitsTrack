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
  if (t.includes('meditation')) return <Flower2 size={24} className="text-secondary" />;
  if (t.includes('read') || t.includes('livre')) return <Book size={24} className="text-primary" />;
  if (t.includes('hiit') || t.includes('sport')) return <Dumbbell size={24} className="text-secondary" />;
  if (t.includes('hydration') || t.includes('eau')) return <Droplets size={24} className="text-blue-400" />;
  return <Target size={24} className="text-primary" />;
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
      className="premium-card p-6 flex items-center justify-between group animate-fade shadow-luxe border-[#ffffff08]"
    >
      <div 
        {...attributes} 
        {...listeners}
        className="flex items-center gap-5 flex-1 min-w-0"
      >
        <div className="icon-circle shadow-inner">
          {getIcon(habit.title)}
        </div>
        <div className="min-w-0 flex flex-col justify-center">
          <h3 className={`text-[17px] font-bold tracking-tight truncate leading-tight ${isCompletedToday ? 'text-white/50 line-through transition-all' : 'text-white'}`}>
            {habit.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-2">
            <Zap size={10} fill={streak > 0 ? "var(--primary)" : "none"} className={streak > 0 ? "text-primary" : "text-text-dim/40"} />
            <span className="label-caps opacity-60 text-[9px] tracking-[0.2em]">
              {streak} DAY STREAK
            </span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onToggle(habit.id)}
        className={`check-btn flex-shrink-0 ${
          isCompletedToday 
          ? 'bg-secondary text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-110' 
          : 'bg-surface-high border border-white/10 hover:border-primary/40 text-transparent'
        }`}
      >
        <Check size={28} strokeWidth={4} className={isCompletedToday ? "opacity-100" : "opacity-0"} />
      </button>
    </div>
  );
}
