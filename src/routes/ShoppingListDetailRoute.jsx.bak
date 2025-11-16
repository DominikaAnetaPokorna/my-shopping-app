import React, {useEffect, useState, useMemo} from "react";
import {useParams, Link} from "react-router-dom";

/*
  ShoppingListDetailRoute.jsx
  - Single-file React route component for "Route detail seznamu" (úkol #2)
  - Default export is a React component that can be registered in your router.
  - Uses Tailwind CSS for styling (no external colors or styles hard-coded).
  - Data: initialData constant at route level; persisted to localStorage for the task.

  How to use:
  - Add a route in your app router: <Route path="/shoppingLists/:id" element={<ShoppingListDetailRoute/>} />
  - This file is intentionally self-contained and demonstrates business logic required by the assignment:
    - display list detail
    - owner-only actions (rename list, add/remove items)
    - toggling item done state
    - member list and simple member actions
    - filtering items (All / Active / Done)

  Notes:
  - Replace localStorage persistence with real API calls when backend is available.
  - The component expects an URL param `id` from react-router.
*/

// -------------------- Initial data (constant at route level) --------------------
const INITIAL_DATA = [
  {
    id: "1",
    name: "Grocery List",
    owner: "you@example.com",
    members: ["you@example.com", "mike@example.com", "alice@example.com"],
    items: [
      { id: "i1", text: "Milk", done: false },
      { id: "i2", text: "Apples", done: true },
      { id: "i3", text: "Bread", done: false },
      { id: "i4", text: "Coffee", done: false },
    ],
    archived: false,
  },
  {
    id: "2",
    name: "Party Supplies",
    owner: "david@example.com",
    members: ["david@example.com"],
    items: [
      { id: "i5", text: "Cups", done: false },
      { id: "i6", text: "Plates", done: true },
    ],
    archived: false,
  },
];

const STORAGE_KEY = "bfs_shoppinglists_v1"; // localStorage key used for persistence in this task

// helpers
const saveToStorage = (lists) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  } catch (e) {
    console.warn("Failed to save to localStorage", e);
  }
};

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_DATA;
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Failed to load from localStorage", e);
    return INITIAL_DATA;
  }
};

// -------------------- Subcomponents --------------------
function ItemRow({item, onToggle, onDelete}) {
  return (
    <div className="flex items-center justify-between py-2">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={item.done}
          onChange={() => onToggle(item.id)}
          className="w-5 h-5"
        />
        <span className={`select-none ${item.done ? "line-through text-gray-400" : ""}`}>
          {item.text}
        </span>
      </label>
      <div className="flex items-center gap-2">
        <button onClick={() => onDelete(item.id)} title="Delete item" className="p-1">
          🗑️
        </button>
      </div>
    </div>
  );
}

function Members({owner, members, currentUser, onRemove}) {
  return (
    <div className="mt-4">
      <h4 className="font-medium">Members</h4>
      <div className="flex gap-2 mt-2 flex-wrap">
        {members.map((m) => (
          <div key={m} className="px-3 py-1 rounded-full border text-sm flex items-center gap-2">
            <span>{m === owner ? `${m} (owner)` : m}</span>
            {currentUser === owner && m !== owner ? (
              <button onClick={() => onRemove(m)} className="text-xs px-1">✖</button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------- Main route component --------------------
export default function ShoppingListDetailRoute() {
  const { id } = useParams();

  // simulate currently logged user (in real app use auth context)
  const currentUser = "you@example.com";

  // store all lists in state (would be managed by higher-level store or fetched per-route in real app)
  const [lists, setLists] = useState(() => loadFromStorage());
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [newItemText, setNewItemText] = useState("");
  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'done'

  useEffect(() => {
    saveToStorage(lists);
  }, [lists]);

  const list = useMemo(() => lists.find((l) => l.id === id), [lists, id]);

  if (!list) {
    return (
      <div className="p-6">
        <h2 className="text-2xl">Seznam nenalezen</h2>
        <p>
          <Link to="/shoppingLists" className="text-blue-600">Zpět na přehled</Link>
        </p>
      </div>
    );
  }

  const isOwner = currentUser === list.owner;

  // business logic functions
  const setListField = (patch) => {
    setLists((prev) => prev.map((l) => (l.id === list.id ? {...l, ...patch} : l)));
  };

  const toggleItem = (itemId) => {
    setLists((prev) => prev.map((l) => l.id === list.id ? {
      ...l,
      items: l.items.map(it => it.id === itemId ? {...it, done: !it.done} : it)
    } : l));
  };

  const deleteItem = (itemId) => {
    setLists((prev) => prev.map((l) => l.id === list.id ? {...l, items: l.items.filter(it => it.id !== itemId)} : l));
  };

  const addItem = (text) => {
    if (!text.trim()) return;
    const newItem = { id: Math.random().toString(36).slice(2,9), text: text.trim(), done: false };
    setLists((prev) => prev.map((l) => l.id === list.id ? {...l, items: [...l.items, newItem]} : l));
    setNewItemText("");
  };

  const renameList = () => {
    if (!nameDraft.trim()) return;
    setListField({name: nameDraft.trim()});
    setEditingName(false);
  };

  const removeMember = (memberEmail) => {
    setLists((prev) => prev.map((l) => l.id === list.id ? {...l, members: l.members.filter(m => m !== memberEmail)} : l));
  };

  const filteredItems = useMemo(() => {
    if (filter === "active") return list.items.filter(i => !i.done);
    if (filter === "done") return list.items.filter(i => i.done);
    return list.items;
  }, [list.items, filter]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-start justify-between gap-4">
        <div>
          {editingName ? (
            <div className="flex gap-2">
              <input value={nameDraft} onChange={(e) => setNameDraft(e.target.value)} className="border px-2 py-1" />
              <button onClick={renameList} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
              <button onClick={() => setEditingName(false)} className="px-3 py-1">Cancel</button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">{list.name}</h1>
              {isOwner && <button onClick={() => { setEditingName(true); setNameDraft(list.name); }} className="text-sm px-2 py-1 border rounded">Edit</button>}
              <span className="text-sm text-gray-500">{list.items.length} items</span>
            </div>
          )}
          <div className="text-xs text-gray-500 mt-1">Owner: {list.owner}</div>
        </div>

        <div className="text-right">
          <div className="mb-2">Members: {list.members.length}</div>
          <div className="text-sm text-gray-500">{list.archived ? "Archived" : "Active"}</div>
        </div>
      </div>

      <div className="mt-6 p-4 border rounded">
        <div className="flex gap-2 items-center">
          <input
            placeholder="Add item..."
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addItem(newItemText); }}
            className="flex-1 px-3 py-2 border rounded"
          />
          <button onClick={() => addItem(newItemText)} className="px-4 py-2 bg-green-600 text-white rounded">Add</button>
        </div>

        <div className="mt-4 flex gap-2 items-center">
          <div className="text-sm">Filter:</div>
          <div className="flex gap-2">
            <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded ${filter === "all" ? "border bg-gray-100" : "border"}`}>All</button>
            <button onClick={() => setFilter("active")} className={`px-3 py-1 rounded ${filter === "active" ? "border bg-gray-100" : "border"}`}>Active</button>
            <button onClick={() => setFilter("done")} className={`px-3 py-1 rounded ${filter === "done" ? "border bg-gray-100" : "border"}`}>Done</button>
          </div>
        </div>

        <div className="mt-4">
          {filteredItems.length === 0 ? (
            <div className="text-gray-500">No items match the filter.</div>
          ) : (
            filteredItems.map((it) => (
              <ItemRow key={it.id} item={it} onToggle={toggleItem} onDelete={deleteItem} />
            ))
          )}
        </div>

        <div className="mt-4 border-t pt-4">
          <Members owner={list.owner} members={list.members} currentUser={currentUser} onRemove={removeMember} />
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <Link to="/shoppingLists" className="px-3 py-2 border rounded">Back</Link>
        {isOwner ? (
          <button onClick={() => setListField({ archived: !list.archived })} className="px-3 py-2 border rounded">
            {list.archived ? "Unarchive" : "Archive"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
