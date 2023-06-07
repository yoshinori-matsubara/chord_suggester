import React, { useState } from "react";
import Footer from "./Footer";
import ChordProgression from "./ChordProgression";
import List from "./List";
import "./styles/App.css";

function App() {
  const [view, setView] = useState("chord-progressions");
  const [mood, setMood] = useState("");
  const [chordProgressions, setChordProgressions] = useState([]);
  const [selectedChordProgressions, setSelectedChordProgressions] = useState(
    []
  );

  return (
    <div className="App">
      {view === "chord-progressions" ? (
        <ChordProgression
          mood={mood}
          setMood={setMood}
          chordProgressions={chordProgressions}
          setChordProgressions={setChordProgressions}
          selectedChordProgressions={selectedChordProgressions}
          setSelectedChordProgressions={setSelectedChordProgressions}
        />
      ) : (
        <List view={view} className="list" />
      )}
      <Footer setView={setView} />
    </div>
  );
}

export default App;
