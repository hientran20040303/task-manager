// COMPONENT: TaskList
// PURPOSE:   Maps over the filtered array and creates a TaskCard for each.
// TYPE:      Client Component
// PROPS:     events (Array), onUpdate (Function), onDelete (Function)

'use client';
import TaskCard from './TaskCard';

export default function TaskList({ events, onUpdate, onDelete }) {
  // Requirement: Conditional rendering. If no events match, show a clean message
  if (events.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-[#333] rounded-2xl">
        <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">No Events Found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* List Rendering: Loop through 'events' using .map() */}
      {/* The 'key' is essential so React can track which specific item changed */}
      {events.map((e) => (
        <TaskCard key={e.id} event={e} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}