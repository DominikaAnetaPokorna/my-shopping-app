import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShoppingListDetailRoute from "./routes/ShoppingListDetailRoute";
import ShoppingListsOverview from "./pages/ShoppingListsOverview";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shoppingLists" element={<ShoppingListsOverview />} />
        <Route path="/shoppingLists/:id" element={<ShoppingListDetailRoute />} />
        <Route
          path="*"
          element={
            <div className="p-6">
              Stránka nenalezena.{" "}
              <a href="/shoppingLists" className="text-blue-600">
                Přejít na přehled
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
