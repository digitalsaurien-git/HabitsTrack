import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle, Sparkles } from 'lucide-react';

export default function HabitForm({ 
  onSubmit, 
  initialData, 
  isOpen, 
  onClose,
  showSurchargeAlert 
}) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'perso',
    desc: '',
    frequency: 'Quotidien',
    priority: 'Normal',
    mentalLoad: 'light',
    ...initialData
  });

  useEffect(() => {
    if (initialData) setFormData({ ...formData, ...initialData });
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade"
        onClick={onClose}
      />
      
      <div className="glass-heavy w-full max-w-md rounded-[32px] overflow-hidden border border-white/10 shadow-premium relative animate-scale">
        <div className="p-8 space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Sparkles className="text-primary" size={20} />
              </div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                {initialData?.id ? 'Modifier' : 'Nouveau'}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-surface-bright rounded-xl text-surface-bright transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {showSurchargeAlert && formData.mentalLoad === 'chronophage' && (
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl flex gap-3 text-primary animate-pulse">
              <AlertCircle size={20} />
              <div className="text-[10px] font-black uppercase tracking-wider leading-tight">
                Attention : surcharge mentale détectée (3+ tâches lourdes) !
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="label-caps opacity-50 px-1">Intitulé</label>
              <input 
                type="text" 
                placeholder="Ex. Méditation matinale..."
                className="w-full bg-surface-low border border-white/5 rounded-2xl p-4 text-white font-bold placeholder:text-surface-bright focus:outline-none focus:border-primary/30"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Category */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setFormData({ ...formData, category: 'perso' })}
                className={`py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider border transition-all duration-300 ${
                  formData.category === 'perso' 
                  ? 'bg-primary/20 border-primary shadow-glow text-white' 
                  : 'bg-surface-low border-white/5 text-surface-bright hover:bg-surface-high'
                }`}
              >
                Personnel
              </button>
              <button 
                onClick={() => setFormData({ ...formData, category: 'pro' })}
                className={`py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider border transition-all duration-300 ${
                  formData.category === 'pro' 
                  ? 'bg-primary/20 border-primary shadow-glow text-white' 
                  : 'bg-surface-low border-white/5 text-surface-bright hover:bg-surface-high'
                }`}
              >
                Professionnel
              </button>
            </div>

            {/* Mental Load Selection */}
            <div className="space-y-3">
              <label className="label-caps opacity-50 px-1">Charge mentale</label>
              <div className="grid grid-cols-3 gap-2">
                {['light', 'medium', 'chronophage'].map(load => (
                  <button 
                    key={load}
                    onClick={() => setFormData({ ...formData, mentalLoad: load })}
                    className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all duration-300 ${
                      formData.mentalLoad === load 
                      ? 'bg-surface-high text-white border-primary shadow-glow' 
                      : 'bg-surface-low text-surface-bright border-white/5'
                    }`}
                  >
                    {load === 'light' ? 'Léger' : load === 'medium' ? 'Moyen' : 'Lourd'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => onSubmit(formData)}
            className="w-full btn-primary py-5 rounded-[24px] text-lg shadow-2xl flex items-center justify-center gap-3 active:scale-95 mt-4"
          >
            <Check size={24} strokeWidth={3} />
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
