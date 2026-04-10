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
      {/* Light Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/10 backdrop-blur-md transition-all duration-500"
        onClick={onClose}
      />
      
      {/* Pristine Modal Container */}
      <div className="w-full max-w-[370px] bg-white rounded-[40px] overflow-hidden relative z-10 animate-in shadow-[0_30px_100px_rgba(0,0,0,0.15)] border border-slate-100">
        <div className="p-8 space-y-10">
          
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Sparkles className="text-blue-600" size={18} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                  {initialData?.id ? 'Édition' : 'Nouvel Objectif'}
                </h2>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Planificateur Kinetic</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-all border border-slate-100"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-8">
            {/* Input Section */}
            <div className="space-y-3">
              <label className="label-caps px-1">Intitulé de l'habitude</label>
              <input 
                type="text" 
                placeholder="Ex. Lire 20 pages..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-800 font-semibold text-base placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-sm transition-all"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                autoFocus
              />
            </div>

            {/* Universe Selector */}
            <div className="space-y-3">
               <label className="label-caps px-1">Secteur d'activité</label>
               <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setFormData({ ...formData, category: 'perso' })}
                  className={`py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                    formData.category === 'perso' 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-blue-200 shadow-lg' 
                    : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300'
                  }`}
                >
                  Personnel
                </button>
                <button 
                  onClick={() => setFormData({ ...formData, category: 'pro' })}
                  className={`py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                    formData.category === 'pro' 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-blue-200 shadow-lg' 
                    : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300'
                  }`}
                >
                  Professionnel
                </button>
              </div>
            </div>

            {/* intensity */}
            <div className="space-y-3">
              <label className="label-caps px-1">Intensité</label>
              <div className="flex gap-2">
                {[
                  { id: 'light', label: 'Zen', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                  { id: 'medium', label: 'Focus', color: 'text-amber-500', bg: 'bg-amber-50' },
                  { id: 'chronophage', label: 'Hard', color: 'text-rose-500', bg: 'bg-rose-50' }
                ].map(item => (
                  <button 
                    key={item.id}
                    onClick={() => setFormData({ ...formData, mentalLoad: item.id })}
                    className={`flex-1 py-3.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                      formData.mentalLoad === item.id 
                      ? `${item.bg} ${item.color} border-transparent shadow-sm scale-[1.02]` 
                      : 'bg-slate-50 text-slate-400 border-slate-100'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Zap size={10} className={formData.mentalLoad === item.id ? item.color : 'text-slate-200'} fill={formData.mentalLoad === item.id ? 'currentColor' : 'none'} />
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
            className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(37,99,235,0.3)] active:scale-95 transition-all mt-4"
          >
            <Check size={20} strokeWidth={3} />
            <span className="uppercase tracking-widest text-xs">Valider l'objectif</span>
          </button>
        </div>
      </div>
    </div>
  );
}
