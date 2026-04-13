// COMPONENT: TaskBoard
// PURPOSE: This is the "Central Brain" of your app. 
//          It holds the list of events and decides what to show.
// TYPE: Client Component (It needs memory/state)

'use client';

import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import TaskStats from './TaskStats';

export default function TaskBoard() {
  // Memory (State) 
  // Persist on refresh
  // Check the browser's "LocalStorage" when the app first opens
  const [events, setEvents] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('my-event-plan');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [filter, setFilter] = useState('all');

  // Saving Effect
  // Every time our list changes, we save it to the browser automatically
  useEffect(() => {
    localStorage.setItem('my-event-plan', JSON.stringify(events));
  }, [events]);

  // Logic Functions (Handlers)

  // Add a brand new event
  function addEvent(name, date, priority, size) {
    const newEntry = {
      id: crypto.randomUUID(), // Gives every event a unique ID "fingerprint"
      name,
      date,
      priority,
      size,
      done: false // New events start as "Active"
    };
    // Create a NEW array with the new entry. Never "push" directly in React.
    setEvents([...events, newEntry]);
  }

  // Update an existing event
  function updateEvent(id, updatedData) {
    setEvents(events.map(e => e.id === id ? { ...e, ...updatedData } : e));
  }

  // Delete an event
  function deleteEvent(id) {
    setEvents(events.filter(e => e.id !== id));
  }

  // Clear completed
  function clearCompleted() {
    setEvents(events.filter(e => !e.done));
  }

  // Live Calculations (Derived Values)
  // Stats bar display
  const total = events.length;
  const active = events.filter(e => !e.done).length;
  const completed = total - active;

  // Filter the list based on which tab is clicked
  const visibleEvents = events.filter(e => {
    if (filter === 'done') return e.done;
    if (filter === 'active') return !e.done;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-[#333] pb-8">
        <h1 className="text-5xl font-black uppercase italic tracking-tighter text-[#ff6600]">
          Event Planner
        </h1>
        <TaskStats total={total} active={active} completed={completed} onClear={clearCompleted} />
      </header>

      <AddTaskForm onAdd={addEvent} />

      {/* Filter Tabs */}
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

      <TaskList 
        events={visibleEvents} 
        onUpdate={updateEvent} 
        onDelete={deleteEvent} 
      />
    </div>
  );
}