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
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  const getLoadBadge = (load) => {
    switch (load) {
      case 'chronophage':
        return { 
          icon: <Flame size={12} />, 
          bg: 'bg-danger/10', 
          color: 'text-danger',
          label: 'Critique'
        };
      case 'medium':
        return { 
          icon: <Zap size={12} />, 
          bg: 'bg-primary/10', 
          color: 'text-primary',
          label: 'Moyen'
        };
      default:
        return { 
          icon: <Leaf size={12} />, 
          bg: 'bg-secondary/10', 
          color: 'text-secondary',
          label: 'Léger'
        };
    }
  };

  const badge = getLoadBadge(habit.mentalLoad);

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`premium-card p-4 animate-scale ${
        isCompletedToday ? 'opacity-80' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Drag Handle */}
        <button 
          {...attributes} 
          {...listeners}
          className="text-surface-bright hover:text-text-dim cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={20} />
        </button>

        {/* Action Button (1-Click) */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggle(habit.id);
          }}
          className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${
            isCompletedToday 
            ? 'bg-secondary text-white scale-110 shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
            : 'bg-surface-low border border-white/5 text-surface-bright hover:border-primary/30 hover:text-primary'
          }`}
        >
          {isCompletedToday 
            ? <CheckCircle2 size={24} strokeWidth={3} /> 
            : <Circle size={24} strokeWidth={2.5} />
          }
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0" onClick={() => onEdit(habit)}>
          <div className="flex justify-between items-center mb-1">
            <h3 className={`text-[15px] font-bold tracking-tight truncate transition-all duration-500 ${
              isCompletedToday ? 'text-secondary line-through' : 'text-white'
            }`}>
              {habit.title}
            </h3>
            
            <button className="text-surface-bright hover:text-text-dim p-1">
              <MoreVertical size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider ${badge.bg} ${badge.color}`}>
              {badge.icon} {badge.label}
            </span>
            <span className="label-caps opacity-40 px-1 border-l border-white/10 ml-1">
              {habit.frequency || 'Quotidien'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
