import React, { useState } from 'react';
import { 
  Smile, 
  Frown, 
  Meh, 
  Brain, 
  History,
  Save,
  Trash2,
  Calendar
} from 'lucide-react';

export default function Journal({ entries, onSave, onDelete }) {
  const [entry, setEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: 'good',
    fatigue: 'low',
    migraine: false,
    stress: 'none',
    notes: ''
  });

  const moods = [
    { id: 'good', icon: <Smile size={24} />, label: 'Super', color: 'text-secondary' },
    { id: 'meh', icon: <Meh size={24} />, label: 'Bof', color: 'text-primary' },
    { id: 'bad', icon: <Frown size={24} />, label: 'Pas ouf', color: 'text-danger' }
  ];

  return (
    <div className="max-w-md mx-auto space-y-10 animate-fade pb-24 mt-8">
      <div className="premium-card p-6 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-low flex items-center justify-center border border-white/5">
            <Calendar className="text-primary" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white tracking-tight leading-none">Journal quotidien</h2>
            <p className="label-caps mt-1">Comment vous sentez-vous ?</p>
          </div>
        </div>
        
        {/* Mood Selection */}
        <div className="space-y-4">
          <label className="label-caps opacity-50">Humeur du jour</label>
          <div className="grid grid-cols-3 gap-3">
            {moods.map(m => (
              <button 
                key={m.id}
                onClick={() => setEntry({ ...entry, mood: m.id })}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                  entry.mood === m.id 
                  ? `${m.color} bg-surface-high border-primary/30 shadow-glow scale-105` 
                  : 'text-surface-bright bg-surface-low border-white/5 hover:bg-surface-high'
                }`}
              >
                {m.icon}
                <span className="text-[10px] font-black uppercase tracking-wider">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Symptoms & Stress */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setEntry({ ...entry, migraine: !entry.migraine })}
            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
              entry.migraine 
              ? 'bg-danger/20 border-danger/30 text-danger shadow-[0_0_15px_rgba(255,75,43,0.2)]' 
              : 'bg-surface-low border-white/5 text-surface-bright hover:bg-surface-high'
            }`}
          >
            <Brain size={20} />
            <span className="text-xs font-bold">Migraine</span>
          </button>
          
          <div className="relative">
            <select 
              value={entry.stress}
              onChange={(e) => setEntry({ ...entry, stress: e.target.value })}
              className="w-full bg-surface-low border border-white/5 rounded-2xl p-4 text-xs font-bold text-white focus:outline-none focus:border-primary/30 appearance-none"
            >
              <option value="none">Stress : Aucun</option>
              <option value="low">Stress : Léger</option>
              <option value="high">Stress : Élevé</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="label-caps opacity-50">Observations</label>
          <textarea 
            placeholder="Écrivez ce qui vous passe par la tête..."
            className="w-full bg-surface-low border border-white/5 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-primary/30 min-h-[140px] resize-none placeholder:text-surface-bright"
            value={entry.notes}
            onChange={(e) => setEntry({ ...entry, notes: e.target.value })}
          />
        </div>

        <button 
          onClick={() => onSave(entry)}
          className="w-full btn-primary py-5 rounded-[24px] text-lg shadow-2xl flex items-center justify-center gap-3 active:scale-95"
        >
          <Save size={24} strokeWidth={3} />
          Enregistrer ma journée
        </button>
      </div>

      {/* History */}
      <div className="space-y-6">
        <h3 className="label-caps opacity-50 flex items-center gap-2">
          <History size={16} /> Historique récent
        </h3>
        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="premium-card p-10 text-center border-dashed border-white/10">
              <p className="text-surface-bright text-xs italic">Aucun historique pour le moment.</p>
            </div>
          ) : (
            entries.slice(0, 5).map(e => (
              <div key={e.date} className="premium-card p-4 flex justify-between items-center group hover:bg-surface-low">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-surface-high flex items-center justify-center shadow-inner ${
                    e.mood === 'good' ? 'text-secondary' : e.mood === 'meh' ? 'text-primary' : 'text-danger'
                  }`}>
                    {moods.find(m => m.id === e.mood)?.icon || moods[0].icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[13px] font-bold text-white truncate capitalize">
                      {new Date(e.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })}
                    </h4>
                    <p className="label-caps opacity-30 mt-0.5">
                      {e.stress !== 'none' ? `Stress: ${e.stress}` : 'Calme'}{e.migraine ? ' • Migraine' : ''}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => onDelete(e.date)}
                  className="p-2 text-surface-bright hover:text-danger rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
