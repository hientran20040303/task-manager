// COMPONENT: AddTaskForm
// PURPOSE: Handles user input for new match-day items.
// PATTERN: Controlled Component - React manages the input state.
// TYPE: Client Component.
'use client';
import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    // e.preventDefault() stops the browser from refreshing the page.
    // In React, we handle the data ourselves without a page reload.
    e.preventDefault();
    
    // Validation: Ensures no empty strings or just whitespace are added.
    if (!text.trim()) return;

    onAdd(text);
    setText(''); // Reset input field after success
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
      <input
        type="text"
        value={text}
        // Controlled Input: The UI value is bound to the 'text' state.
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g., Analyze Argentina vs Portugal odds..."
        className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-hidden focus:ring-2 focus:ring-green-500 transition-all placeholder:text-slate-500"
      />
      <button 
        type="submit"
        className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-lg transition-colors uppercase text-sm tracking-widest"
      >
        Add
      </button>
    </form>
  );
}