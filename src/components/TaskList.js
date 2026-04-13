// COMPONENT: TaskList
// PURPOSE:  Acts as a container for the filtered list of matches.
//           It receives the 'visibleTasks' array from TaskBoard 
//           and maps them into individual TaskCard items.
// PROPS:    tasks (Array), onToggle (Function), onDelete (Function)
// TYPE:     Client Component
'use client';

import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onDelete }) {
  
  // ── CONDITIONAL RENDERING: Empty State ──────────────
  // If the user has filtered for 'Done' but hasn't completed 
  // any tasks, or the list is brand new, we show a helpful
  // placeholder instead of a blank screen.
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 px-4 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/30">
        <svg 
          className="mx-auto h-12 w-12 text-slate-700 mb-3" 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-slate-500 font-medium italic">
          No strategies found for this category.
        </p>
        <p className="text-slate-600 text-xs mt-1">
          Add a new match analysis to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {/* 
          LIST RENDERING: .map()
          We use .map() to transform our data array into UI elements. 
          React requires a 'key' (task.id) here so it can uniquely 
          identify which item changed, moved, or was deleted without 
          re-rendering the entire list. 
      */}
      {tasks.map((task) => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}