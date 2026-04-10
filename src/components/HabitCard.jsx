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
  if (t.includes('méditation') || t.includes('meditation')) return <Flower2 size={20} strokeWidth={2.5} className="text-[#00f2ff]" />;
  if (t.includes('lire') || t.includes('livre') || t.includes('page')) return <Book size={20} strokeWidth={2.5} className="text-[#7000ff]" />;
  if (t.includes('hiit') || t.includes('sport')) return <Dumbbell size={20} strokeWidth={2.5} className="text-[#ff007a]" />;
  if (t.includes('hygiène') || t.includes('eau') || t.includes('hydratation')) return <Droplets size={20} strokeWidth={2.5} className="text-[#0072ff]" />;
  return <Target size={20} strokeWidth={2.5} className="text-white/40" />;
};

export default function HabitCard({ habit, onToggle, onEdit, isCompletedToday }) {
  const streak = habit.streak || 0;

  return (
    <div 
      className={`glass-card p-5 rounded-3xl flex items-center justify-between group transition-all duration-500 relative overflow-hidden ${
        isCompletedToday 
        ? 'opacity-60 grayscale-[0.5] scale-[0.98]' 
        : 'hover:border-white/10 active:scale-[0.97]'
      }`}
    >
      {/* Background Glow Effect */}
      {isCompletedToday && (
        <div className="absolute inset-0 bg-[#00f2ff]/5 transition-opacity" />
      )}

      <div className="flex items-center gap-4 flex-1 min-w-0 relative z-10">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/[0.06] transition-all duration-500 ${
          isCompletedToday ? 'border-transparent bg-transparent' : 'shadow-[0_0_15px_rgba(255,255,255,0.02)]'
        }`}>
          {getIcon(habit.title)}
        </div>
        
        <div className="min-w-0 flex flex-col justify-center">
          <h3 className={`text-[16px] font-bold tracking-tight truncate leading-tight transition-all duration-500 ${
            isCompletedToday ? 'text-white/30 line-through' : 'text-white'
          }`}>
            {habit.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 transition-opacity duration-500" style={{ opacity: isCompletedToday ? 0.2 : 0.6 }}>
            <Zap size={10} fill={streak > 0 ? "#ffaa00" : "none"} className={streak > 0 ? "text-[#ffaa00]" : "text-white/30"} />
            <span className="label-caps !text-[9px] !tracking-[0.15em] font-medium">
              Série de {streak} jours
            </span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onToggle(habit.id)}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 relative z-10 ${
          isCompletedToday 
          ? 'bg-[#00f2ff] text-black shadow-[0_0_20px_rgba(0,242,255,0.3)]' 
          : 'bg-white/[0.03] border border-white/[0.05] text-transparent hover:bg-white/[0.08] hover:border-white/20'
        }`}
      >
        <Check size={22} strokeWidth={3.5} className={`transition-all duration-500 ${isCompletedToday ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} />
      </button>
    </div>
  );
}
