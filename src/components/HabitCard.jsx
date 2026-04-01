import React from 'react';
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
  if (t.includes('méditation') || t.includes('meditation')) return <Flower2 size={24} strokeWidth={2.5} className="text-[#4ade80]" />;
  if (t.includes('lire') || t.includes('livre') || t.includes('page')) return <Book size={24} strokeWidth={2.5} className="text-white opacity-80" />;
  if (t.includes('hiit') || t.includes('sport')) return <Dumbbell size={24} strokeWidth={2.5} className="text-[#ffb38a]" />;
  if (t.includes('hygiène') || t.includes('eau') || t.includes('hydratation')) return <Droplets size={24} strokeWidth={2.5} className="text-blue-400" />;
  return <Target size={24} strokeWidth={2.5} className="text-primary" />;
};

export default function HabitCard({ habit, onToggle, onEdit, isCompletedToday }) {
  const streak = habit.streak || 0;

  return (
    <div 
      className={`premium-card p-6 flex items-center justify-between group animate-kinetic transition-all duration-700 ${
        isCompletedToday 
        ? 'bg-[#060606] border-white/[0.02] scale-[0.98]' 
        : 'bg-[#0c0c0c] active:bg-[#111111]'
      }`}
    >
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <div className={`icon-circle ${isCompletedToday ? 'opacity-20 grayscale' : 'opacity-100 shadow-glow'}`}>
          {getIcon(habit.title)}
        </div>
        <div className="min-w-0 flex flex-col justify-center gap-1.5">
          <h3 className={`text-[17px] font-black tracking-tighter truncate leading-none transition-all duration-500 ${
            isCompletedToday ? 'text-white/20 line-through' : 'text-white'
          }`}>
            {habit.title}
          </h3>
          <div className="flex items-center gap-1.5 transition-opacity duration-700" style={{ opacity: isCompletedToday ? 0.1 : 0.4 }}>
            <Zap size={11} fill={streak > 0 ? "var(--primary)" : "none"} className={streak > 0 ? "text-primary" : "text-white"} />
            <span className="label-caps !text-[10px] tracking-[0.25em]">
              {streak} {streak > 1 ? 'JOURS' : 'JOUR'} DE SUITE
            </span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onToggle(habit.id)}
        aria-label={isCompletedToday ? "Annuler" : "Terminer"}
        className={`check-btn ${
          isCompletedToday 
          ? 'bg-secondary text-black shadow-[0_0_30px_rgba(74,222,128,0.3)]' 
          : 'bg-white/[0.03] border border-white/5 text-transparent hover:border-white/20'
        }`}
      >
        <Check size={26} strokeWidth={4} className={isCompletedToday ? "opacity-100 scale-100" : "opacity-0 scale-50"} />
      </button>
    </div>
  );
}
