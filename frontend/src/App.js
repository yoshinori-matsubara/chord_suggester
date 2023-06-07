import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import ChordProgression from "./ChordProgression";
import List from "./List";

function App() {
  const [view, setView] = useState("chord-progressions");

  return (
    <div className="App">
      <h2>Suggestion</h2>
      <ChordProgression />
      <List view={view} />
      <Footer setView={setView} />
    </div>
  );
}

export default App;
