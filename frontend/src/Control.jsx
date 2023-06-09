import React from "react";
import { FaPlay, FaStop, FaDownload, FaMusic } from "react-icons/fa";

const Control = (props) => {
  const {
    playMidi,
    isPlaying,
    downloadMidi,
    selectInstrument,
    selectedChordProgression,
  } = props;
  return (
    <div className="controls">
      <span className="title-selected-chord-progression">
        Selected Chord Progression
      </span>
      <div className="selected-chord-progression">
        {selectedChordProgression}
      </div>
      <button className="control-button" onClick={playMidi}>
        {isPlaying ? <FaStop /> : <FaPlay />}
      </button>
      <button className="control-button" onClick={downloadMidi}>
        <FaDownload />
      </button>
      <div className="instrument-select-container">
        <FaMusic />
        <select
          className="instrument-select"
          onChange={(e) => selectInstrument(e.target.value)}
        >
          {/* <option value="piano">Piano</option> */}
        </select>
      </div>
    </div>
  );
};

export default Control;
