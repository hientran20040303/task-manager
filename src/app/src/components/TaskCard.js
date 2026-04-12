// ══════════════════════════════════════════════════════
// COMPONENT: TaskCard
// PURPOSE: Renders an individual planning item with action buttons.
// TYPE: Client Component (Requires Interactivity).
'use client';

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={`group flex items-center justify-between p-4 mb-3 rounded-lg border transition-all ${
      task.done 
        ? 'bg-slate-900/50 border-slate-800 opacity-60' 
        : 'bg-slate-800 border-slate-700 hover:border-green-500'
    }`}>
      <div className="flex items-center gap-4">
        {/* Checkbox: Fires onToggle back to parent TaskBoard */}
        <input 
          type="checkbox" 
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 accent-green-500 cursor-pointer"
        />
        <div>
          {/* Conditional Rendering for CSS: Applies line-through if done */}
          <p className={`font-medium transition-all ${task.done ? 'line-through text-slate-500' : 'text-slate-100'}`}>
            {task.title}
          </p>
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
            Match Priority: High
          </span>
        </div>
      </div>

      {/* Delete button: Only visible on hover for a cleaner "Professional" design */}
      <button 
        onClick={() => onDelete(task.id)}
        className="text-slate-500 hover:text-red-500 transition-colors p-2"
        aria-label="Delete Task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
      </button>
    </div>
  );
}