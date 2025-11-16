import { Link } from "react-router-dom";

export default function ShoppingListsOverview() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Přehled nákupních seznamů</h1>
      <p className="mb-2">Pro odevzdání otevři testovací seznam:</p>
      <ul className="list-disc pl-6">
        <li><Link to="/shoppingLists/1" className="text-blue-600">Otevřít Grocery List (id=1)</Link></li>
        <li><Link to="/shoppingLists/2" className="text-blue-600">Otevřít Party Supplies (id=2)</Link></li>
      </ul>
    </div>
  );
}
