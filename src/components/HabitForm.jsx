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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-4">
      {/* Sombre Overlay pour faire ressortir la modale */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-[12px] animate-fade"
        onClick={onClose}
      />
      
      {/* Contenu Opaque et Aéré Anthracite */}
      <div className="w-full max-w-[380px] bg-[#1a1e23] rounded-[40px] overflow-hidden border border-white/[0.08] shadow-luxe relative animate-kinetic z-10">
        <div className="p-10 space-y-12">
          {/* Header de la modale */}
          <div className="flex justify-between items-center bg-white/[0.02] p-4 rounded-3xl border border-white/[0.03]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-glow">
                <Sparkles className="text-white" size={20} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-black text-white tracking-tight uppercase italic scale-y-95">
                {initialData?.id ? 'Modifier' : 'Nouveau'}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-white/[0.03] hover:bg-white/[0.1] rounded-2xl transition-all border border-white/[0.05]"
            >
              <X size={20} className="text-white/40" />
            </button>
          </div>

          <div className="space-y-10">
            {/* Champ Intitulé - Très aéré */}
            <div className="space-y-4">
              <label className="label-caps opacity-40 px-2 tracking-[0.3em]">INTITULÉ DE LA TÂCHE</label>
              <input 
                type="text" 
                placeholder="Ex. Méditation matinale..."
                className="w-full bg-[#121418] border border-white/[0.06] rounded-3xl p-5 text-white font-black text-lg placeholder:text-white/10 focus:outline-none focus:border-primary/40 focus:bg-[#0c0d10] transition-all"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                autoFocus
              />
            </div>

            {/* Catégories - Design plus large */}
            <div className="space-y-4">
               <label className="label-caps opacity-40 px-2 tracking-[0.3em]">UNIVERS</label>
               <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setFormData({ ...formData, category: 'perso' })}
                  className={`py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-500 ${
                    formData.category === 'perso' 
                    ? 'bg-white text-black shadow-luxe scale-[1.03] border-white' 
                    : 'bg-[#121418] border-white/[0.05] text-white/30 hover:border-white/20'
                  }`}
                >
                  Personnel
                </button>
                <button 
                  onClick={() => setFormData({ ...formData, category: 'pro' })}
                  className={`py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-500 ${
                    formData.category === 'pro' 
                    ? 'bg-white text-black shadow-luxe scale-[1.03] border-white' 
                    : 'bg-[#121418] border-white/[0.05] text-white/30 hover:border-white/20'
                  }`}
                >
                  Professionnel
                </button>
              </div>
            </div>

            {/* Charge Mentale - Plus clair */}
            <div className="space-y-4">
              <label className="label-caps opacity-40 px-2 tracking-[0.3em]">INTENSITÉ</label>
              <div className="flex gap-3">
                {['light', 'medium', 'chronophage'].map(load => (
                  <button 
                    key={load}
                    onClick={() => setFormData({ ...formData, mentalLoad: load })}
                    className={`flex-1 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all duration-500 ${
                      formData.mentalLoad === load 
                      ? 'bg-primary/20 text-primary border-primary/50 shadow-glow' 
                      : 'bg-[#121418] text-white/20 border-white/[0.05] hover:border-white/20'
                    }`}
                  >
                    {load === 'light' ? 'Zen' : load === 'medium' ? 'Focus' : 'Hardcore'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bouton de confirmation géant et stylé */}
          <button 
            onClick={() => onSubmit(formData)}
            className="w-full bg-gradient-to-br from-[#ff9159] to-[#f66700] py-6 rounded-[32px] text-white text-xl font-black shadow-luxe flex items-center justify-center gap-3 active:scale-90 transition-all duration-300"
          >
            <Check size={28} strokeWidth={4} />
            <span className="uppercase tracking-[0.1em] italic">Valider la tâche</span>
          </button>
        </div>
      </div>
    </div>
  );
}
