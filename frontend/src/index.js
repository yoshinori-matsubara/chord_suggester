import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <h1>Chord Coach</h1>
    <App />
  </React.StrictMode>
);
