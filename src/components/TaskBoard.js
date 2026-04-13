// COMPONENT: TaskBoard
// PURPOSE:   This is the main. It holds the master list of events and handles all the heavy lifting like saving to the browser.
// TYPE:      Client Component ('use client')
// PROPS:     None (It is the top-level data owner)

'use client';

import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import TaskStats from './TaskStats';

export default function TaskBoard() {
  // We put events in state because we want the UI to automatically refresh whenever we add or change something
  
  // Lazy Initializer: This function runs once when the page loads
  const [events, setEvents] = useState(() => {
    // The 'typeof window' guard is here because Next.js tries to run this on the server
    // The server doesn't have a "LocalStorage," so need to check if we are in the browser first to prevent the app from crashing during startup
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('usf-event-planner');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Filter state: tracks if we are looking at 'all', 'active', or 'done'
  const [filter, setFilter] = useState('all');

  // LOCAL STORAGE
  // This effect syncs our React memory with the browser's hard drive
  // Use [events] in the dependency array so it only saves when the list actually changes
  useEffect(() => {
    localStorage.setItem('usf-event-planner', JSON.stringify(events));
  }, [events]);

  // DATA FLOW
  // These functions are passed DOWN as callback props to children
  
  function addEvent(name, date, priority, size) {
    const newEntry = { id: crypto.randomUUID(), name, date, priority, size, done: false };
    // Immutable Update: The spread operator [...] to create a new array
    // React only rerenders if it sees a new memory reference. If we just used .push(), the reference wouldn't change, and the screen would stay stuck.
    setEvents([...events, newEntry]);
  }

  function updateEvent(id, updatedData) {
    // .map() creates a fresh array. If the ID matches, swap in the new data. This allows the "Edit" feature to update any field (name, date, priority, size)
    setEvents(events.map(e => e.id === id ? { ...e, ...updatedData } : e));
  }

  function deleteEvent(id) {
    // .filter() creates a new array exclude the one we want to toss out
    setEvents(events.filter(e => e.id !== id));
  }

  function clearCompleted() {
    // Removes all events where 'done' is true
    setEvents(events.filter(e => !e.done));
  }

  // Not state. We calculate them during render. Because store them in state would be duplicated data and lead to bugs
  const total = events.length;
  const active = events.filter(e => !e.done).length;
  const completed = total - active;

  const visibleEvents = events.filter(e => {
    if (filter === 'done') return e.done;
    if (filter === 'active') return !e.done;
    return true; // 'all'
  });

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-[#333] pb-8">
        <h1 className="text-5xl font-black uppercase italic tracking-tighter text-[#ff6600]">Event Planner</h1>
        {/* Callback prop: onClear allows TaskStats to trigger the clear function here */}
        <TaskStats total={total} active={active} completed={completed} onClear={clearCompleted} />
      </header>

      <AddTaskForm onAdd={addEvent} />

      <div className="flex gap-8 border-b border-[#333]">
        {['all', 'active', 'done'].map((f) => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all ${
              filter === f ? 'text-[#ff6600] border-b-2 border-[#ff6600]' : 'text-gray-500 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <TaskList events={visibleEvents} onUpdate={updateEvent} onDelete={deleteEvent} />
    </div>
  );
}