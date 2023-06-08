import React, { useState } from "react";
import Footer from "./Footer";
import ChordProgression from "./ChordProgression";
import Loading from "./Loading";
import List from "./List";
import "./styles/App.css";

function App() {
  const [view, setView] = useState("chord-progressions");
  const [mood, setMood] = useState("");
  const [chordProgressions, setChordProgressions] = useState([]);
  const [selectedChordProgressions, setSelectedChordProgressions] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">
      {view === "chord-progressions" ? (
        isLoading ? (
          <Loading />
        ) : (
          <ChordProgression
            mood={mood}
            setMood={setMood}
            chordProgressions={chordProgressions}
            setChordProgressions={setChordProgressions}
            selectedChordProgressions={selectedChordProgressions}
            setSelectedChordProgressions={setSelectedChordProgressions}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )
      ) : (
        <List view={view} className="list" />
      )}
      <Footer setView={setView} />
    </div>
  );
}

export default App;
