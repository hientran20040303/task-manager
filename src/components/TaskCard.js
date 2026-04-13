'use client';
import { useState } from 'react';

export default function TaskCard({ event, onUpdate, onDelete }) {
  // Memory to check if we are currently editing this card
  const [isEditing, setIsEditing] = useState(false);
  
  // Memory to hold the "temporary" changes before we save them
  const [editData, setEditData] = useState({ ...event });

  // Function to save the changes
  const handleSave = () => {
    onUpdate(event.id, editData);
    setIsEditing(false);
  };

  return (
    <div className={`p-6 rounded-2xl border transition-all ${
      event.done ? 'bg-black border-[#333] opacity-50' : 'bg-[#1a1a1a] border-[#333] hover:border-[#ff6600]'
    }`}>
      
      {isEditing ? (
        /* --- EDIT MODE VIEW --- */
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input 
              className="bg-black border border-[#ff6600] p-2 rounded text-sm outline-none"
              value={editData.name} 
              onChange={(e) => setEditData({...editData, name: e.target.value})}
            />
            <input 
              className="bg-black border border-[#ff6600] p-2 rounded text-sm outline-none"
              value={editData.date} 
              onChange={(e) => setEditData({...editData, date: e.target.value})}
            />
            <select 
              className="bg-black border border-[#ff6600] p-2 rounded text-sm outline-none"
              value={editData.priority} 
              onChange={(e) => setEditData({...editData, priority: e.target.value})}
            >
              <option>High</option><option>Medium</option><option>Low</option>
            </select>
            <select 
              className="bg-black border border-[#ff6600] p-2 rounded text-sm outline-none"
              value={editData.size} 
              onChange={(e) => setEditData({...editData, size: e.target.value})}
            >
              <option>Large</option><option>Medium</option><option>Small</option>
            </select>
          </div>
          <button onClick={handleSave} className="w-full bg-[#ff6600] text-black font-bold py-2 rounded text-xs uppercase">
            Save Changes
          </button>
        </div>
      ) : (
        /* --- NORMAL VIEW --- */
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h3 className={`text-2xl font-black uppercase italic ${event.done ? 'line-through text-gray-600' : 'text-white'}`}>
              {event.name}
            </h3>
            <div className="flex gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <span>📅 {event.date}</span>
              <span>🔥 {event.priority}</span>
              <span>📏 {event.size}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            {/* Right-aligned Status Dropdown */}
            <select 
              value={event.done ? 'done' : 'active'}
              onChange={(e) => onUpdate(event.id, { done: e.target.value === 'done' })}
              className="bg-black border border-[#333] text-[10px] font-bold uppercase p-2 text-[#ff6600] outline-none"
            >
              <option value="active">Active</option>
              <option value="done">Done</option>
            </select>

            <div className="flex gap-4">
              <button onClick={() => setIsEditing(true)} className="text-gray-500 hover:text-white text-[10px] font-bold uppercase transition-colors">
                Edit
              </button>
              <button onClick={() => onDelete(event.id)} className="text-gray-500 hover:text-white text-[10px] font-bold uppercase transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}