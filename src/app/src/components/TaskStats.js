// COMPONENT: TaskStats
// PURPOSE: Displays numerical insights and the "Clear All" bulk action.
// TYPE: Client Component.
'use client';

export default function TaskStats({ total, completed, active, onClear }) {
  // If there are no tasks, we return null to hide the stats bar.
  if (total === 0) return null;

  return (
    <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-6">
      <div className="flex gap-6">
        <div className="text-center">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Total</p>
          <p className="text-xl font-black text-white">{total}</p>
        </div>
        <div className="text-center border-x border-slate-700 px-6">
          <p className="text-[10px] text-yellow-500 uppercase font-bold tracking-widest">Pending</p>
          <p className="text-xl font-black text-white">{active}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-green-500 uppercase font-bold tracking-widest">Analyzed</p>
          <p className="text-xl font-black text-white">{completed}</p>
        </div>
      </div>

      <button 
        onClick={onClear}
        className="text-[10px] bg-red-900/30 text-red-400 border border-red-900/50 px-3 py-1 rounded hover:bg-red-900/50 transition-all font-bold uppercase tracking-tighter"
      >
        Clear Completed
      </button>
    </div>
  );
}