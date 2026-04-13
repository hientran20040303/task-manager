// COMPONENT: AddTaskForm
// PURPOSE:   A controlled form that collects user input for new events.
// TYPE:      Client Component
// PROPS:     onAdd (Function) - Sends the new data back up to TaskBoard.

'use client';
import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  // Controlled Inputs: These values live in local state so React is in charge of the typing
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [size, setSize] = useState('Medium');

  // Automatically adds dashes to mm-dd-yyyy as the user types
  const handleDateChange = (e) => {
    let val = e.target.value.replace(/\D/g, ''); // removes anything not number
    if (val.length > 8) val = val.slice(0, 8);
    let formatted = val;
    if (val.length > 2) formatted = val.slice(0, 2) + '-' + val.slice(2);
    if (val.length > 4) formatted = formatted.slice(0, 5) + '-' + formatted.slice(5);
    setDate(formatted);
  };

  const handleSubmit = (e) => {
    // preventDefault(): Stops the browser from refreshing the whole page
    // We need to keep our React state alive, not reset it with a reload
    e.preventDefault();
    if (!name || date.length < 10) return; // Validation: No blanks!
    
    onAdd(name, date, priority, size);
    
    // Resetting state: This clears the input fields after adding
    setName('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#333] grid grid-cols-1 md:grid-cols-2 gap-6 shadow-2xl">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase font-bold text-gray-500">Event Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. USF Gala" className="bg-black border border-[#333] p-3 rounded-lg focus:border-[#ff6600] outline-none transition-all" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase font-bold text-gray-500">Date (mmddyyyy)</label>
        <input value={date} onChange={handleDateChange} placeholder="12-25-2026" className="bg-black border border-[#333] p-3 rounded-lg focus:border-[#ff6600] outline-none transition-all" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase font-bold text-gray-500">Priority Level</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="bg-black border border-[#333] p-3 rounded-lg outline-none text-[#ff6600]">
          <option>High</option><option>Medium</option><option>Low</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase font-bold text-gray-500">Event Size</label>
        <select value={size} onChange={(e) => setSize(e.target.value)} className="bg-black border border-[#333] p-3 rounded-lg outline-none text-[#ff6600]">
          <option>Large</option><option>Medium</option><option>Small</option>
        </select>
      </div>
      <button className="md:col-span-2 bg-[#ff6600] hover:bg-white text-black font-black py-4 rounded-xl transition-all uppercase tracking-widest text-sm">Create Event</button>
    </form>
  );
}