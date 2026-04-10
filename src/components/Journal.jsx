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
    { id: 'good', icon: <Smile size={24} />, label: 'Optimal', color: 'text-[#00f2ff]' },
    { id: 'meh', icon: <Meh size={24} />, label: 'Stable', color: 'text-[#7000ff]' },
    { id: 'bad', icon: <Frown size={24} />, label: 'Critique', color: 'text-[#ff007a]' }
  ];

  return (
    <div className="max-w-md mx-auto space-y-12 animate-in pb-24 mt-4 px-1">
      <div className="glass-card rounded-[40px] p-1 overflow-hidden">
        <div className="bg-[#0a0a0b] rounded-[38px] p-8 space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-inner">
              <Calendar className="text-[#00f2ff]" size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Rapport d'État</h2>
              <p className="label-caps !text-[9px] mt-1 !text-[#00f2ff] opacity-80">JOURNAL DE SYNCHRONISATION</p>
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
                  className={`flex flex-col items-center gap-3 p-5 rounded-3xl border transition-all duration-500 ${
                    entry.mood === m.id 
                    ? `${m.color} bg-white/[0.05] border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] scale-[1.05]` 
                    : 'text-white/20 bg-white/[0.02] border-white/[0.04] hover:border-white/10'
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
                ? 'bg-[#ff007a]/10 border-[#ff007a]/30 text-[#ff007a] shadow-[0_0_15px_rgba(255,0,122,0.1)]' 
                : 'bg-white/[0.02] border-white/[0.04] text-white/30 hover:border-white/10'
              }`}
            >
              <Brain size={18} />
              <span className="text-xs font-bold">Migraine</span>
            </button>
            
            <div className="relative">
              <select 
                value={entry.stress}
                onChange={(e) => setEntry({ ...entry, stress: e.target.value })}
                className="w-full h-full bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4 text-xs font-bold text-white/40 focus:outline-none focus:border-white/20 appearance-none cursor-pointer"
              >
                <option value="none">Stress : Nul</option>
                <option value="low">Stress : Bas</option>
                <option value="high">Stress : Élevé</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <label className="label-caps px-1">Données Complémentaires</label>
            <textarea 
              placeholder="Journaliser les événements du jour..."
              className="w-full bg-white/[0.02] border border-white/[0.04] rounded-3xl p-5 text-sm text-white/80 focus:outline-none focus:border-[#00f2ff]/20 min-h-[140px] resize-none placeholder:text-white/10 transition-all"
              value={entry.notes}
              onChange={(e) => setEntry({ ...entry, notes: e.target.value })}
            />
          </div>

          <button 
            onClick={() => onSave(entry)}
            className="w-full h-16 bg-[#00f2ff] hover:bg-[#00e2ff] text-black rounded-2xl font-bold flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(0,242,255,0.2)] active:scale-95 transition-all"
          >
            <Save size={20} strokeWidth={3} />
            <span className="uppercase tracking-widest text-xs">Sauvegarder les Données</span>
          </button>
        </div>
      </div>

      {/* History */}
      <div className="space-y-6 px-1">
        <h3 className="label-caps flex items-center gap-2 opacity-50">
          <History size={14} className="text-[#00f2ff]" /> Archives des Synchronisations
        </h3>
        <div className="space-y-3">
          {entries.length === 0 ? (
            <div className="glass-card p-12 text-center rounded-[32px] border-dashed border-white/5 opacity-30">
              <Sparkles size={32} className="mx-auto mb-4 opacity-50" />
              <p className="text-xs font-medium italic">En attente de données historiques</p>
            </div>
          ) : (
            entries.slice(0, 5).map(e => (
              <div key={e.date} className="glass-card p-4 flex justify-between items-center group hover:bg-white/[0.05] rounded-3xl transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center shadow-inner ${
                    e.mood === 'good' ? 'text-[#00f2ff]' : e.mood === 'meh' ? 'text-[#7000ff]' : 'text-[#ff007a]'
                  }`}>
                    {moods.find(m => m.id === e.mood)?.icon || moods[0].icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[14px] font-bold text-white truncate capitalize">
                      {new Date(e.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })}
                    </h4>
                    <p className="label-caps mt-1 !text-[8.5px] opacity-40">
                      SYSTÈME : {e.stress !== 'none' ? `STRESS ${e.stress.toUpperCase()}` : 'NOMINAL'}{e.migraine ? ' • ALERTE MIGRAINE' : ''}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => onDelete(e.date)}
                  className="w-10 h-10 flex items-center justify-center text-white/10 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
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
