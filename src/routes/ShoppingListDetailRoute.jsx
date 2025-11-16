// src/routes/ShoppingListDetailRoute.jsx
import React from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function ShoppingListDetailRoute(){
  const items = [
    { id:1, text:"Milk", done:true },
    { id:2, text:"Apples", done:true },
    { id:3, text:"Bread", done:false },
    { id:4, text:"Coffee", done:false }
  ];

  const doneCount = items.filter(i=>i.done).length;

  return (
    <div className="app-shell">
      {/* header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="text-4xl heading-large">Grocery List</div>
          <div className="mt-3 flex items-center gap-3">
            <img src="/src/assets/avatar.jpg" alt="owner" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <div className="text-sm font-semibold">Owner</div>
              <div className="text-xs text-gray-500">you@example.com</div>
            </div>
          </div>
        </div>
        <button className="p-2 rounded-md border border-gray-200">
          {/* pencil icon placeholder */}
          ✎
        </button>
      </div>

      {/* add input */}
      <div className="mt-6">
        <input placeholder="Add item" className="input-primary" />
      </div>

      {/* filters */}
      <div className="mt-4 flex gap-3">
        <button className="pill bg-[var(--brand-blue)] text-white">All</button>
        <button className="pill bg-[#e9eef7] text-[var(--brand-blue)]">Active</button>
        <button className="pill bg-[#e9eef7] text-[var(--brand-blue)]">Done</button>
      </div>

      {/* list */}
      <div className="mt-4">
        {items.map(it=>(
          <div key={it.id} className="list-row">
            <div className="flex items-center gap-4">
              <div className="circle-check">
                {it.done ? <span style={{color:'var(--brand-blue)'}}>✔</span> : null}
              </div>
              <div className={`text-lg ${it.done ? 'line-through text-gray-400' : ''}`}>{it.text}</div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-md border border-gray-200">✎</button>
              <button className="p-2 rounded-md border border-gray-200">🗑</button>
            </div>
          </div>
        ))}
      </div>

      {/* progress */}
      <div className="mt-6">
        <div className="progress-track">
          <div className="progress-fill" style={{width: `${(doneCount/items.length)*100}%`}} />
        </div>
        <div className="mt-2 text-sm font-semibold">{doneCount} of {items.length}</div>
      </div>

      {/* members */}
      <div className="mt-6">
        <div className="text-lg font-semibold mb-3">Members</div>
        <div className="flex gap-3">
          <div className="chip">Áťa</div>
          <div className="chip">Mike</div>
        </div>
      </div>
    </div>
  );
}
