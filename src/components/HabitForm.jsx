import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles, Zap } from 'lucide-react';

export default function HabitForm({ 
  onSubmit, 
  initialData, 
  isOpen, 
  onClose
}) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'perso',
    mentalLoad: 'light',
    ...initialData
  });

  useEffect(() => {
    if (initialData) setFormData({ ...formData, ...initialData });
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-5">
      {/* Dynamic Overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-[20px] transition-all duration-700"
        onClick={onClose}
      />
      
      {/* Futuristic Modal Container */}
      <div className="w-full max-w-[360px] glass-card rounded-[40px] overflow-hidden relative z-10 animate-in p-1">
        <div className="bg-[#0a0a0b] rounded-[38px] p-8 space-y-10">
          
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00f2ff]/10 border border-[#00f2ff]/20 flex items-center justify-center">
                <Sparkles className="text-[#00f2ff]" size={18} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {initialData?.id ? 'Édition Pulse' : 'Nouvelle Mission'}
                </h2>
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">Configurateur de vie</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-white/20 hover:text-white transition-all"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-8">
            {/* Input Section */}
            <div className="space-y-3">
              <label className="label-caps px-1">Intitulé de la mission</label>
              <input 
                type="text" 
                placeholder="Ex. Séance de HIIT..."
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 text-white font-semibold text-base placeholder:text-white/10 focus:outline-none focus:border-[#00f2ff]/30 focus:bg-white/[0.05] transition-all"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                autoFocus
              />
            </div>

            {/* Universe Selector */}
            <div className="space-y-3">
               <label className="label-caps px-1">Univers de déploiement</label>
               <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setFormData({ ...formData, category: 'perso' })}
                  className={`py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                    formData.category === 'perso' 
                    ? 'bg-[#00f2ff] text-black border-transparent shadow-[0_0_20px_rgba(0,242,255,0.3)]' 
                    : 'bg-white/[0.03] border-white/[0.05] text-white/30'
                  }`}
                >
                  Personnel
                </button>
                <button 
                  onClick={() => setFormData({ ...formData, category: 'pro' })}
                  className={`py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                    formData.category === 'pro' 
                    ? 'bg-[#00f2ff] text-black border-transparent shadow-[0_0_20px_rgba(0,242,255,0.3)]' 
                    : 'bg-white/[0.03] border-white/[0.05] text-white/30'
                  }`}
                >
                  Professionnel
                </button>
              </div>
            </div>

            {/* intensity */}
            <div className="space-y-3">
              <label className="label-caps px-1">Intensité neurologique</label>
              <div className="flex gap-2">
                {[
                  { id: 'light', label: 'Zen', color: 'text-emerald-400' },
                  { id: 'medium', label: 'Focus', color: 'text-amber-400' },
                  { id: 'chronophage', label: 'Hardcore', color: 'text-rose-500' }
                ].map(item => (
                  <button 
                    key={item.id}
                    onClick={() => setFormData({ ...formData, mentalLoad: item.id })}
                    className={`flex-1 py-3.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all duration-500 ${
                      formData.mentalLoad === item.id 
                      ? 'bg-white/10 text-white border-white/20' 
                      : 'bg-white/[0.02] text-white/20 border-white/[0.04]'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Zap size={10} className={formData.mentalLoad === item.id ? item.color : 'text-white/10'} />
                      {item.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            onClick={() => onSubmit(formData)}
            className="w-full h-16 bg-[#00f2ff] hover:bg-[#00e2ff] text-black rounded-2xl font-bold flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(0,242,255,0.2)] active:scale-95 transition-all mt-4"
          >
            <Check size={20} strokeWidth={3} />
            <span className="uppercase tracking-widest text-xs">Initialiser la Mission</span>
          </button>
        </div>
      </div>
    </div>
  );
}
