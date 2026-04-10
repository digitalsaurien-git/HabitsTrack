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
  if (t.includes('méditation') || t.includes('meditation')) return <Flower2 size={20} strokeWidth={2.5} className="text-emerald-500" />;
  if (t.includes('lire') || t.includes('livre') || t.includes('page')) return <Book size={20} strokeWidth={2.5} className="text-indigo-500" />;
  if (t.includes('hiit') || t.includes('sport')) return <Dumbbell size={20} strokeWidth={2.5} className="text-rose-500" />;
  if (t.includes('hygiène') || t.includes('eau') || t.includes('hydratation')) return <Droplets size={20} strokeWidth={2.5} className="text-blue-500" />;
  return <Target size={20} strokeWidth={2.5} className="text-slate-300" />;
};

export default function HabitCard({ habit, onToggle, onEdit, isCompletedToday }) {
  const streak = habit.streak || 0;

  return (
    <div 
      className={`p-5 rounded-3xl flex items-center justify-between group transition-all duration-300 border ${
        isCompletedToday 
        ? 'bg-slate-50/50 border-slate-100 opacity-60' 
        : 'bg-white border-slate-100 shadow-soft hover:shadow-premium hover:-translate-y-0.5 active:scale-[0.98]'
      }`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isCompletedToday ? 'bg-slate-100' : 'bg-slate-50 border border-slate-100'
        }`}>
          {getIcon(habit.title)}
        </div>
        
        <div className="min-w-0 flex flex-col justify-center">
          <h3 className={`text-[16px] font-bold tracking-tight truncate leading-tight transition-all duration-300 ${
            isCompletedToday ? 'text-slate-400 line-through' : 'text-slate-800'
          }`}>
            {habit.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5 transition-opacity duration-300" style={{ opacity: isCompletedToday ? 0.3 : 0.8 }}>
            <Zap size={10} fill={streak > 0 ? "#EAB308" : "none"} className={streak > 0 ? "text-yellow-500" : "text-slate-300"} />
            <span className="text-[10px] font-bold text-slate-400 tracking-tight">
              Série de {streak} jours
            </span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onToggle(habit.id)}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
          isCompletedToday 
          ? 'bg-blue-600 border-blue-600 text-white shadow-blue-200 shadow-lg' 
          : 'bg-white border-slate-200 text-transparent hover:border-blue-400 hover:bg-blue-50'
        }`}
      >
        <Check size={22} strokeWidth={3} className={`transition-all duration-300 ${isCompletedToday ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} />
      </button>
    </div>
  );
}
