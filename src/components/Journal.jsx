import React, { useState } from 'react';
import { 
  Smile, 
  Frown, 
  Meh, 
  Thermometer, 
  Brain, 
  History,
  Save,
  Trash2
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
    { id: 'good', icon: <Smile size={24} />, label: 'Super', color: 'text-success' },
    { id: 'meh', icon: <Meh size={24} />, label: 'Bof', color: 'text-warning' },
    { id: 'bad', icon: <Frown size={24} />, label: 'Pas ouf', color: 'text-danger' }
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-8 animate-fade pb-24">
      <div className="glass rounded-[32px] p-6 space-y-6">
        <h2 className="text-xl font-black text-secondary tracking-tight">Journal du jour</h2>
        
        {/* Mood Selection */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Humeur</label>
          <div className="grid grid-cols-3 gap-3">
            {moods.map(m => (
              <button 
                key={m.id}
                onClick={() => setEntry({ ...entry, mood: m.id })}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
                  entry.mood === m.id 
                  ? `${m.color} bg-white shadow-lg border-primary` 
                  : 'text-gray-300 bg-white/50 border-gray-100'
                }`}
              >
                {m.icon}
                <span className="text-[10px] font-bold">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Symptoms & Stress */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setEntry({ ...entry, migraine: !entry.migraine })}
            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
              entry.migraine 
              ? 'bg-danger/10 border-danger/20 text-danger' 
              : 'bg-white border-gray-100 text-gray-400'
            }`}
          >
            <Brain size={20} />
            <span className="text-sm font-bold">Migraine</span>
          </button>
          
          <div className="relative group">
            <select 
              value={entry.stress}
              onChange={(e) => setEntry({ ...entry, stress: e.target.value })}
              className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm font-bold text-secondary focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
            >
              <option value="none">Pas de stress</option>
              <option value="low">Stress léger</option>
              <option value="high">Stress élevé</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <textarea 
          placeholder="Notes libres..."
          className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px] resize-none"
          value={entry.notes}
          onChange={(e) => setEntry({ ...entry, notes: e.target.value })}
        />

        <button 
          onClick={() => onSave(entry)}
          className="w-full bg-secondary text-white p-5 rounded-[24px] font-black text-lg shadow-xl shadow-secondary/10 hover:translate-y-[-2px] active:translate-y-[0] transition-all flex items-center justify-center gap-3"
        >
          <Save size={24} strokeWidth={3} />
          Enregistrer ma journée
        </button>
      </div>

      {/* History */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <History size={16} /> Historique récent
        </h3>
        <div className="space-y-3">
          {entries.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-8 italic">Aucun historique pour le moment.</p>
          ) : (
            entries.slice(0, 5).map(e => (
              <div key={e.date} className="glass rounded-2xl p-4 border border-white/40 flex justify-between items-center group">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl bg-white shadow-sm ${
                    e.mood === 'good' ? 'text-success' : e.mood === 'meh' ? 'text-warning' : 'text-danger'
                  }`}>
                    {moods.find(m => m.id === e.mood)?.icon || moods[0].icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-secondary">{new Date(e.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</h4>
                    <p className="text-[10px] text-gray-400 uppercase font-black">{e.stress !== 'none' ? `Stress: ${e.stress}` : 'Calme'}{e.migraine ? ' • Migraine' : ''}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onDelete(e.date)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-danger hover:bg-danger/5 rounded-lg transition-all"
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
