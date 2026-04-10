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
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="w-full max-w-[360px] bg-white rounded-2xl overflow-hidden relative z-10 shadow-2xl border border-slate-200">
        <div className="p-6 space-y-8">
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles size={18} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                {initialData?.id ? 'Modifier' : 'Nouvel Objectif'}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="label-caps">Titre de la mission</label>
              <input 
                type="text" 
                placeholder="Ex. Sport, Méditation..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-medium focus:outline-none focus:border-indigo-500 transition-all"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                autoFocus
              />
            </div>

            <div className="space-y-2">
               <label className="label-caps">Catégorie</label>
               <div className="flex gap-2">
                <button 
                  onClick={() => setFormData({ ...formData, category: 'perso' })}
                  className={`flex-1 py-3 rounded-xl text-[11px] font-bold uppercase transition-all border ${
                    formData.category === 'perso' 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  Personnel
                </button>
                <button 
                  onClick={() => setFormData({ ...formData, category: 'pro' })}
                  className={`flex-1 py-3 rounded-xl text-[11px] font-bold uppercase transition-all border ${
                    formData.category === 'pro' 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  Professionnel
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="label-caps">Importance</label>
              <div className="flex gap-2">
                {[
                  { id: 'light', label: 'Basse' },
                  { id: 'medium', label: 'Modérée' },
                  { id: 'chronophage', label: 'Haute' }
                ].map(item => (
                  <button 
                    key={item.id}
                    onClick={() => setFormData({ ...formData, mentalLoad: item.id })}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase border transition-all ${
                      formData.mentalLoad === item.id 
                      ? 'bg-indigo-50 text-indigo-600 border-indigo-200' 
                      : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => onSubmit(formData)}
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all mt-4"
          >
            <Check size={18} strokeWidth={3} />
            <span>Valider</span>
          </button>
        </div>
      </div>
    </div>
  );
}
