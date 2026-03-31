import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';

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
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md animate-fade"
        onClick={onClose}
      />
      
      <div className="glass-heavy w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative animate-scale">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-secondary tracking-tight">
              {initialData?.id ? 'Modifier l\'habitude' : 'Nouvelle habitude'}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-400"
            >
              <X size={20} />
            </button>
          </div>

          {showSurchargeAlert && formData.mentalLoad === 'chronophage' && (
            <div className="bg-danger/10 border border-danger/20 p-4 rounded-2xl flex gap-3 text-danger animate-pulse">
              <AlertCircle size={20} />
              <div className="text-xs font-bold leading-tight uppercase tracking-wider">
                Attention : vous avez déjà 3+ tâches chronophages pour demain !
              </div>
            </div>
          )}

          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">
                Titre de l'habitude
              </label>
              <input 
                type="text" 
                placeholder="Ex. Faire du sport, Méditer..."
                className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-lg font-bold placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Category */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setFormData({ ...formData, category: 'perso' })}
                className={`py-3 rounded-2xl text-sm font-bold border transition-all ${
                  formData.category === 'perso' 
                  ? 'bg-perso/10 border-perso text-perso' 
                  : 'bg-white border-gray-100 text-gray-400 hover:border-perso/30'
                }`}
              >
                Perso
              </button>
              <button 
                onClick={() => setFormData({ ...formData, category: 'pro' })}
                className={`py-3 rounded-2xl text-sm font-bold border transition-all ${
                  formData.category === 'pro' 
                  ? 'bg-pro/10 border-pro text-pro' 
                  : 'bg-white border-gray-100 text-gray-400 hover:border-pro/30'
                }`}
              >
                Pro
              </button>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">
                Description courte
              </label>
              <textarea 
                placeholder="Quel est l'objectif ?"
                className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px] resize-none"
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              />
            </div>

            {/* Mental Load Selection */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">
                Niveau de charge mentale
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['light', 'medium', 'chronophage'].map(load => (
                  <button 
                    key={load}
                    onClick={() => setFormData({ ...formData, mentalLoad: load })}
                    className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                      formData.mentalLoad === load 
                      ? 'bg-secondary text-white shadow-lg shadow-secondary/20' 
                      : 'bg-white text-gray-400 border-gray-100'
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
            className="w-full bg-secondary text-white p-5 rounded-[24px] font-black text-lg shadow-xl shadow-secondary/10 hover:translate-y-[-2px] active:translate-y-[0] transition-all flex items-center justify-center gap-3"
          >
            <Check size={24} strokeWidth={3} />
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
