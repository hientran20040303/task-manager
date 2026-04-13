'use client';
import TaskCard from './TaskCard';

export default function TaskList({ events, onUpdate, onDelete }) {
  if (events.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-[#333] rounded-2xl">
        <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">No Events Found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((e) => (
        <TaskCard key={e.id} event={e} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}