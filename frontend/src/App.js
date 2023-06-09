import React, { useState } from "react";
import Footer from "./Footer";
import ChordProgression from "./ChordProgression";
import Loading from "./Loading";
import List from "./List";
import "./styles/App.css";
import useMidi from "./hooks/useMidi";

function App() {
  const [view, setView] = useState("chord-progressions");
  const [mood, setMood] = useState("");
  const [chordProgressions, setChordProgressions] = useState([]);
  const [selectedChordProgressions, setSelectedChordProgressions] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChordProgression, setSelectedChordProgression] = useState("");
  const handleClick = (e) => {
    setSelectedChordProgression(e.target.id);
  };
  const { playMidi, downloadMidi, selectInstrument, isPlaying } = useMidi(
    selectedChordProgression,
    120
  );

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
            setIsLoading={setIsLoading}
            setSelectedChordProgression={setSelectedChordProgression}
            handleClick={handleClick}
          />
        )
      ) : (
        <List
          view={view}
          className="list"
          selectedChordProgression={selectedChordProgression}
          handleClick={handleClick}
        />
      )}
      <Footer
        setView={setView}
        playMidi={playMidi}
        isPlaying={isPlaying}
        downloadMidi={downloadMidi}
        selectInstrument={selectInstrument}
        selectedChordProgression={selectedChordProgression}
      />
    </div>
  );
}

export default App;
