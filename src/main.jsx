// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client"; // << správný import pro React 18
import App from "./App";
import "./index.css"; // ujisti se, že index.css je importováno

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
