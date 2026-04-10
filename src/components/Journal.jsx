import React, { useState } from 'react';
import { 
  Smile, 
  Frown, 
  Meh, 
  Brain, 
  History,
  Save,
  Trash2,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function Journal({ entries = [], onSave, onDelete }) {
  const [entry, setEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: 'good',
    fatigue: 'low',
    migraine: false,
    stress: 'none',
    notes: ''
  });

  const moods = [
    { id: 'good', icon: <Smile size={24} />, label: 'Optimal', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'meh', icon: <Meh size={24} />, label: 'Stable', color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'bad', icon: <Frown size={24} />, label: 'Critique', color: 'text-rose-500', bg: 'bg-rose-50' }
  ];

  return (
    <div className="max-w-md mx-auto space-y-12 animate-in pb-24 mt-4 px-1">
      <div className="bg-white rounded-[40px] p-8 space-y-10 shadow-soft border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
            <Calendar className="text-blue-600" size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Rapport d'État</h2>
            <p className="label-caps !text-[9px] mt-1 text-blue-500">SYNCHRONISATION QUOTIDIENNE</p>
          </div>
        </div>
        
        {/* Mood Selection */}
        <div className="space-y-4">
          <label className="label-caps px-1">Résonance Émotionnelle</label>
          <div className="grid grid-cols-3 gap-3">
            {moods.map(m => (
              <button 
                key={m.id}
                onClick={() => setEntry({ ...entry, mood: m.id })}
                className={`flex flex-col items-center gap-3 p-5 rounded-3xl border transition-all duration-300 ${
                  entry.mood === m.id 
                  ? `${m.color} ${m.bg} border-transparent shadow-sm scale-[1.05]` 
                  : 'text-slate-300 bg-slate-50 border-slate-100 hover:border-slate-300'
                }`}
              >
                {m.icon}
                <span className="text-[9px] font-bold uppercase tracking-widest">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Symptoms & Stress */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setEntry({ ...entry, migraine: !entry.migraine })}
            className={`flex items-center gap-3 p-5 rounded-2xl border transition-all duration-300 ${
              entry.migraine 
              ? 'bg-rose-50 border-rose-200 text-rose-500 shadow-sm' 
              : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300'
            }`}
          >
            <Brain size={18} />
            <span className="text-xs font-bold">Migraine</span>
          </button>
          
          <div className="relative">
            <select 
              value={entry.stress}
              onChange={(e) => setEntry({ ...entry, stress: e.target.value })}
              className="w-full h-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-bold text-slate-500 focus:outline-none focus:border-blue-300 appearance-none cursor-pointer"
            >
              <option value="none">Stress : Nul</option>
              <option value="low">Stress : Bas</option>
              <option value="high">Stress : Élevé</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-4">
          <label className="label-caps px-1">Notes de Session</label>
          <textarea 
            placeholder="Journaliser les événements..."
            className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-5 text-sm text-slate-700 focus:outline-none focus:border-blue-400 focus:bg-white min-h-[140px] resize-none placeholder:text-slate-300 transition-all shadow-inner"
            value={entry.notes}
            onChange={(e) => setEntry({ ...entry, notes: e.target.value })}
          />
        </div>

        <button 
          onClick={() => onSave(entry)}
          className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(37,99,235,0.3)] active:scale-95 transition-all"
        >
          <Save size={20} strokeWidth={3} />
          <span className="uppercase tracking-widest text-xs">Sauvegarder le Rapport</span>
        </button>
      </div>

      {/* History */}
      <div className="space-y-6 px-1">
        <h3 className="label-caps flex items-center gap-2">
          <History size={14} className="text-blue-600" /> Archives de Bord
        </h3>
        <div className="space-y-3">
          {entries.length === 0 ? (
            <div className="bg-slate-50 p-12 text-center rounded-[32px] border border-dashed border-slate-200">
              <Sparkles size={32} className="mx-auto mb-4 text-slate-200" />
              <p className="text-xs font-medium italic text-slate-400">Aucune archive disponible</p>
            </div>
          ) : (
            entries.slice(0, 5).map(e => (
              <div key={e.date} className="bg-white p-4 flex justify-between items-center group hover:bg-slate-50 rounded-3xl border border-slate-100 transition-all shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 ${
                    e.mood === 'good' ? 'text-emerald-500' : e.mood === 'meh' ? 'text-blue-500' : 'text-rose-500'
                  }`}>
                    {moods.find(m => m.id === e.mood)?.icon || moods[0].icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[14px] font-bold text-slate-800 truncate capitalize">
                      {new Date(e.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })}
                    </h4>
                    <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                      {e.stress !== 'none' ? `Stress ${e.stress}` : 'Calme'}{e.migraine ? ' • Migraine' : ''}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => onDelete(e.date)}
                  className="w-10 h-10 flex items-center justify-center text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
