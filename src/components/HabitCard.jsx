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
  if (t.includes('read') || t.includes('livre')) return <Book size={20} className="text-primary" />;
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
      className="premium-card p-4 flex items-center justify-between group animate-fade mb-4 relative overflow-hidden"
    >
      <div 
        {...attributes} 
        {...listeners}
        className="flex items-center gap-4 flex-1"
      >
        <div className="icon-circle">
          {getIcon(habit.title)}
        </div>
        <div className="min-w-0">
          <h3 className="text-[15px] font-bold text-white tracking-tight truncate leading-tight">
            {habit.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <Zap size={10} fill={streak > 0 ? "var(--primary)" : "none"} className={streak > 0 ? "text-primary" : "text-text-dim"} />
            <span className="label-caps opacity-30 text-[9px] tracking-widest uppercase">
              {streak} Day Streak
            </span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onToggle(habit.id)}
        className={`check-btn ${
          isCompletedToday 
          ? 'bg-secondary text-white shadow-glow' 
          : 'bg-surface-low border border-white/10 hover:border-primary/30 text-transparent'
        }`}
      >
        <Check size={24} strokeWidth={4} className={isCompletedToday ? "scale-110" : "scale-0"} />
      </button>
    </div>
  );
}
