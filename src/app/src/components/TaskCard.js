'use client';

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onToggle(task.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
            ${task.done ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
        >
          {task.done && <span className="text-white text-xs">✓</span>}
        </button>
        
        <span className={`text-sm ${task.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {task.title}
        </span>
      </div>

      <button 
        onClick={() => onDelete(task.id)}
        className="text-gray-400 hover:text-red-500 text-sm font-medium"
      >
        Delete
      </button>
    </div>
  );
}