'use client';
import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [size, setSize] = useState('Medium');

  // This magic function adds dashes as you type numbers
  const handleDateChange = (e) => {
    let val = e.target.value.replace(/\D/g, ''); // Remove anything that isn't a number
    if (val.length > 8) val = val.slice(0, 8); // Max 8 numbers
    
    // Add dashes at 2nd and 4th positions
    let formatted = val;
    if (val.length > 2) formatted = val.slice(0, 2) + '-' + val.slice(2);
    if (val.length > 4) formatted = formatted.slice(0, 5) + '-' + formatted.slice(5);
    
    setDate(formatted);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop the page from refreshing
    if (!name || date.length < 10) return; // Validation: Don't allow empty names or short dates
    onAdd(name, date, priority, size);
    setName('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#333] grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase font-bold text-gray-500">Event Name</label>
        <input 
          value={name} onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Annual Tech Gala" 
          className="bg-black border border-[#333] p-3 rounded-lg focus:border-[#ff6600] outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase font-bold text-gray-500">Date (mmddyyyy)</label>
        <input 
          value={date} onChange={handleDateChange}
          placeholder="12-25-2026" 
          className="bg-black border border-[#333] p-3 rounded-lg focus:border-[#ff6600] outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase font-bold text-gray-500">Priority Level</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="bg-black border border-[#333] p-3 rounded-lg outline-none">
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase font-bold text-gray-500">Event Size</label>
        <select value={size} onChange={(e) => setSize(e.target.value)} className="bg-black border border-[#333] p-3 rounded-lg outline-none">
          <option>Large</option>
          <option>Medium</option>
          <option>Small</option>
        </select>
      </div>

      <button className="md:col-span-2 bg-[#ff6600] hover:bg-white text-black font-black py-4 rounded-xl transition-all uppercase tracking-widest text-sm">
        Create Event
      </button>
    </form>
  );
}