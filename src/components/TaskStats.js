'use client';

export default function TaskStats({ total, active, completed, onClear }) {
  if (total === 0) return null; // Hide if no events exist

  return (
    <div className="flex items-center gap-8 bg-[#1a1a1a] p-4 rounded-xl border border-[#333]">
      <div className="flex gap-6">
        <div className="text-center">
          <p className="text-[9px] text-gray-500 uppercase font-black">Total</p>
          <p className="text-lg font-black text-white">{total}</p>
        </div>
        <div className="text-center border-x border-[#333] px-6">
          <p className="text-[9px] text-[#ff6600] uppercase font-black">Active</p>
          <p className="text-lg font-black text-white">{active}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] text-gray-500 uppercase font-black">Done</p>
          <p className="text-lg font-black text-white">{completed}</p>
        </div>
      </div>
      
      <button 
        onClick={onClear}
        className="text-[9px] bg-red-950 text-red-500 border border-red-900 px-3 py-1 rounded-md font-black uppercase hover:bg-red-500 hover:text-white transition-all"
      >
        Clear All
      </button>
    </div>
  );
}