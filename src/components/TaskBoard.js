// COMPONENT: TaskBoard
// PURPOSE: Acts as the "Source of Truth" for the Match Day Planner.
//          It manages the state of all match tasks, handles 
//          persistence via localStorage, and distributes data.
// TYPE: Client Component ('use client') - Required for State & Effects.
'use client';

import { useState, useEffect } from 'react';
import TaskStats from './TaskStats';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';

export default function TaskBoard() {
  // ── STATE DECLARATIONS ──────────────────────────────
  // Lazy initializer: We use a function inside useState so this logic 
  // only runs once during the initial mount.
  // The 'typeof window' guard is critical for Next.js because this 
  // component pre-renders on the server where 'window' doesn't exist.
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('world-cup-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // Filter state: Tracks if we are viewing 'all', 'active', or 'done'.
  // We keep this separate because changing the filter shouldn't 
  // modify the actual task data, only how we view it.
  const [filter, setFilter] = useState('all');

  // ── EFFECTS ─────────────────────────────────────────
  // This Effect syncs our React state to the browser's localStorage.
  // Dependency Array [tasks]: React will only run this when the task
  // list changes, making it efficient.
  useEffect(() => {
    localStorage.setItem('world-cup-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ── DERIVED VALUES ──────────────────────────────────
  // We do NOT store 'visibleTasks' or 'counts' in state. Why?
  // Because they can be calculated instantly from 'tasks'. 
  // This prevents "sync bugs" where state variables get out of whack.
  const completedCount = tasks.filter(t => t.done).length;
  const activeCount = tasks.length - completedCount;

  const visibleTasks = tasks.filter(task => {
    if (filter === 'done') return task.done;
    if (filter === 'active') return !task.done;
    return true; // 'all'
  });

  // ── HANDLERS (Callback Logic) ───────────────────────
  // IMMUTABILITY RULE: We never use tasks.push() or tasks[i] = x.
  // We use .map(), .filter(), and [...] spread to return NEW arrays.
  // This tells React the memory reference changed, triggering a re-render.

  function addTask(title) {
    const newTask = {
      id: crypto.randomUUID(), // Generates a unique, stable key
      title: title,
      done: false,
      timestamp: new Date().toLocaleTimeString()
    };
    setTasks([...tasks, newTask]);
  }

  function toggleTask(id) {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  function clearCompleted() {
    setTasks(tasks.filter(t => !t.done));
  }

  return (
    <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden mt-10">
      <div className="p-6 bg-linear-to-r from-green-800 to-slate-900 border-b border-slate-700">
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
          Match Day Strategy <span className="text-yellow-500">2026</span>
        </h2>
        <p className="text-slate-400 text-xs mt-1">Organize your betting research and match analysis</p>
      </div>

      <div className="p-6">
        <AddTaskForm onAdd={addTask} />
        
        <TaskStats 
          total={tasks.length} 
          completed={completedCount} 
          active={activeCount} 
          onClear={clearCompleted}
        />

        {/* Filter Bar */}
        <div className="flex gap-2 mb-6">
          {['all', 'active', 'done'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all
                ${filter === f 
                  ? 'bg-yellow-500 text-slate-900' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <TaskList 
          tasks={visibleTasks} 
          onToggle={toggleTask} 
          onDelete={deleteTask} 
        />
      </div>
    </div>
  );
}