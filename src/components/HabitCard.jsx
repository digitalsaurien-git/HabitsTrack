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
  // Standardized on Indigo for harmonization
  if (t.includes('méditation') || t.includes('meditation')) return <Flower2 size={20} />;
  if (t.includes('lire') || t.includes('livre') || t.includes('page')) return <Book size={20} />;
  if (t.includes('hiit') || t.includes('sport')) return <Dumbbell size={20} />;
  if (t.includes('hygiène') || t.includes('eau') || t.includes('hydratation')) return <Droplets size={20} />;
  return <Target size={20} />;
};

export default function HabitCard({ habit, onToggle, onEdit, isCompletedToday }) {
  const streak = habit.streak || 0;

  return (
    <div 
      className={`p-5 rounded-2xl flex items-center justify-between border transition-all duration-400 ${
        isCompletedToday 
        ? 'bg-slate-50 border-slate-200 opacity-60' 
        : 'bg-white border-slate-200 shadow-sm hover:border-indigo-300'
      }`}
    >
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
          isCompletedToday ? 'bg-slate-200 text-slate-400' : 'bg-indigo-50 text-indigo-600'
        }`}>
          {getIcon(habit.title)}
        </div>
        
        <div className="min-w-0 flex flex-col justify-center">
          <h3 className={`text-[17px] font-extrabold tracking-tight truncate transition-all ${
            isCompletedToday ? 'text-slate-400 line-through' : 'text-slate-900'
          }`}>
            {habit.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 opacity-70">
            <Zap size={11} fill={streak > 0 ? "currentColor" : "none"} className={streak > 0 ? "text-indigo-600" : "text-slate-400"} />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Série : {streak} jours
            </span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onToggle(habit.id)}
        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all border ${
          isCompletedToday 
          ? 'bg-indigo-600 border-indigo-600 text-white' 
          : 'bg-white border-slate-300 text-transparent hover:border-indigo-400'
        }`}
      >
        <Check size={20} strokeWidth={3} className={isCompletedToday ? "opacity-100 scale-100" : "opacity-0 scale-50"} />
      </button>
    </div>
  );
}
