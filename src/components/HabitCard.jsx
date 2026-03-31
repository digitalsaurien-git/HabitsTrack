import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  CheckCircle2, 
  Circle, 
  MoreVertical, 
  GripVertical,
  Flame,
  Zap,
  Leaf
} from 'lucide-react';

export default function HabitCard({ 
  habit, 
  onToggle, 
  onEdit, 
  isCompletedToday 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: habit.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  const getLoadBadge = (load) => {
    switch (load) {
      case 'chronophage':
        return { 
          icon: <Flame size={14} />, 
          bg: 'bg-danger/10', 
          color: 'text-danger',
          label: 'Chronophage'
        };
      case 'medium':
        return { 
          icon: <Zap size={14} />, 
          bg: 'bg-warning/10', 
          color: 'text-warning',
          label: 'Moyen'
        };
      default:
        return { 
          icon: <Leaf size={14} />, 
          bg: 'bg-success/10', 
          color: 'text-success',
          label: 'Léger'
        };
    }
  };

  const badge = getLoadBadge(habit.mentalLoad);

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`glass rounded-3xl p-5 border border-white/50 transition-all duration-300 animate-scale ${
        isCompletedToday ? 'bg-success/5 border-success/20' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Drag Handle */}
        <button 
          {...attributes} 
          {...listeners}
          className="mt-1 text-gray-300 hover:text-gray-400 cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={20} />
        </button>

        {/* Content */}
        <div className="flex-1 space-y-3" onClick={() => onEdit(habit)}>
          <div className="flex justify-between items-start">
            <h3 className={`text-lg font-bold tracking-tight transition-all duration-500 ${
              isCompletedToday ? 'text-success opacity-70 line-through' : 'text-text-main'
            }`}>
              {habit.title}
            </h3>
            
            <button className="text-gray-300 hover:text-gray-500 p-1">
              <MoreVertical size={18} />
            </button>
          </div>

          <p className="text-sm text-text-muted line-clamp-2 leading-relaxed">
            {habit.desc || "Pas de description"}
          </p>

          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${badge.bg} ${badge.color}`}>
              {badge.icon} {badge.label}
            </span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest px-2 py-1 bg-gray-100/50 rounded-full">
              {habit.frequency || 'Quotidien'}
            </span>
          </div>
        </div>

        {/* Action Button (1-Click) */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggle(habit.id);
          }}
          className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm ${
            isCompletedToday 
            ? 'bg-success text-white scale-110 shadow-[0_0_15px_rgba(129,199,132,0.4)]' 
            : 'bg-white border-2 border-gray-100 text-gray-200 hover:border-success/30 hover:text-success/50'
          }`}
        >
          {isCompletedToday 
            ? <CheckCircle2 size={28} strokeWidth={2.5} /> 
            : <Circle size={28} strokeWidth={2.5} />
          }
        </button>
      </div>
    </div>
  );
}
