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
    { id: 'good', icon: <Smile size={24} />, label: 'Super' },
    { id: 'meh', icon: <Meh size={24} />, label: 'Bof' },
    { id: 'bad', icon: <Frown size={24} />, label: 'Pas top' }
  ];

  return (
    <div className="max-w-md mx-auto space-y-8 pb-24 mt-4">
      <div className="bg-white rounded-2xl p-6 space-y-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
            <Calendar size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Journal d'état</h2>
            <p className="label-caps !text-[9px] text-indigo-600 font-bold">Synchronisation</p>
          </div>
        </div>
        
        {/* Mood Selection */}
        <div className="space-y-3">
          <label className="label-caps">Humeur générale</label>
          <div className="grid grid-cols-3 gap-2">
            {moods.map(m => (
              <button 
                key={m.id}
                onClick={() => setEntry({ ...entry, mood: m.id })}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                  entry.mood === m.id 
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-600 scale-[1.02]' 
                  : 'text-slate-400 bg-slate-50 border-slate-100 hover:border-slate-200'
                }`}
              >
                {m.icon}
                <span className="text-[10px] font-bold uppercase">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Symptoms & Stress */}
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => setEntry({ ...entry, migraine: !entry.migraine })}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
              entry.migraine 
              ? 'bg-rose-50 border-rose-100 text-rose-600' 
              : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-200'
            }`}
          >
            <Brain size={18} />
            <span className="text-xs font-bold">Migraine</span>
          </button>
          
          <div className="relative">
            <select 
              value={entry.stress}
              onChange={(e) => setEntry({ ...entry, stress: e.target.value })}
              className="w-full h-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold text-slate-600 focus:outline-none focus:border-indigo-300 appearance-none cursor-pointer"
            >
              <option value="none">Stress : Nul</option>
              <option value="low">Stress : Bas</option>
              <option value="high">Stress : Haut</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-3">
          <label className="label-caps">Observations</label>
          <textarea 
            placeholder="Écrivez vos pensées ici..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 focus:outline-none focus:border-indigo-400 min-h-[120px] resize-none placeholder:text-slate-300 transition-all font-medium"
            value={entry.notes}
            onChange={(e) => setEntry({ ...entry, notes: e.target.value })}
          />
        </div>

        <button 
          onClick={() => onSave(entry)}
          className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
        >
          <Save size={18} />
          <span>Enregistrer ma journée</span>
        </button>
      </div>

      {/* History */}
      <div className="space-y-4">
        <h3 className="label-caps flex items-center gap-2 px-1">
          <History size={14} className="text-indigo-600" /> Historique récent
        </h3>
        <div className="space-y-2">
          {entries.length === 0 ? (
            <div className="bg-slate-200/30 p-10 text-center rounded-xl border border-dashed border-slate-300">
              <p className="text-xs font-medium italic text-slate-400">Aucun historique disponible</p>
            </div>
          ) : (
            entries.slice(0, 5).map(e => (
              <div key={e.date} className="bg-white p-3 flex justify-between items-center group hover:bg-slate-50 rounded-xl border border-slate-200 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center ${
                    e.mood === 'good' ? 'text-indigo-600' : e.mood === 'meh' ? 'text-slate-500' : 'text-rose-500'
                  }`}>
                    {moods.find(m => m.id === e.mood)?.icon || moods[0].icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[14px] font-bold text-slate-800 capitalize">
                      {new Date(e.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })}
                    </h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">
                      {e.stress !== 'none' ? `Stress ${e.stress}` : 'Calme'}{e.migraine ? ' • Migraine' : ''}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => onDelete(e.date)}
                  className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-rose-500 transition-all"
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
